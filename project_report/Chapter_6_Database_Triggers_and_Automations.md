# CHAPTER 6: DATABASE TRIGGERS, PL/pgSQL FUNCTIONS, AND AUTOMATIONS

## 6.1 Database-Level Automation vs. Application Logic
A common design vulnerability in web applications is implementing critical business logic solely in the application code (e.g., Next.js APIs or client-side forms). If a user bypasses the UI and accesses the database directly via external API clients, they can bypass these business rules.

ParkPro solves this by enforcing core business rules directly at the database layer using **PostgreSQL Triggers** and **PL/pgSQL functions**. This approach guarantees:
* **Consistency:** The rules apply regardless of whether data is modified through the Next.js UI, the Supabase SQL editor, or an external script.
* **Concurrency Safety:** PostgreSQL processes triggers within database transactions, preventing race conditions (e.g., two users booking the same slot simultaneously).
* **Performance:** Operations run directly on the database server, eliminating the latency of round-trip network calls between the server and database.

---

## 6.2 Implementation Details of Trigger Functions

### 6.2.1 Automatically Creating User Profiles (`handle_new_user`)
When a user signs up using Supabase Auth, they are registered in the internal `auth.users` table. The trigger function below listens to this insert event and creates a profile in our public `profiles` table.

#### SQL Implementation:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, username, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || LEFT(NEW.id::TEXT, 8)),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    'user'
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### Detailed Flow:
1. A client submits a signup form, registering a user in `auth.users`.
2. The trigger `on_auth_user_created` fires **AFTER INSERT** on `auth.users`.
3. The function reads the newly created user record (`NEW`). It extracts metadata like `first_name`, `last_name`, and `username` from the JSONB field `raw_user_meta_data`.
4. It inserts a corresponding row into `public.profiles` with the same `id` (Primary Key).
5. The `SECURITY DEFINER` option allows the function to execute with the privileges of the database owner, bypassing RLS constraints to write to the `profiles` table.

---

### 6.2.2 Enforcing Slot Request Limits (`check_max_pending_requests`)
To prevent a single parking slot from receiving unlimited requests, the database enforces a limit of 5 pending requests per slot.

#### SQL Implementation:
```sql
CREATE OR REPLACE FUNCTION check_max_pending_requests()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  pending_count INTEGER;
BEGIN
  IF NEW.request_status = 'pending' THEN
    SELECT COUNT(*) INTO pending_count
    FROM public.booking_requests
    WHERE slot_id = NEW.slot_id AND request_status = 'pending';
    IF pending_count >= 5 THEN
      RAISE EXCEPTION 'Maximum 5 pending requests allowed per slot.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_check_max_pending_requests
  BEFORE INSERT ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION check_max_pending_requests();
```

#### Detailed Flow:
1. A driver attempts to create a request for a parking slot.
2. The trigger fires **BEFORE INSERT** on the `booking_requests` table.
3. The function counts the active requests for the targeted `slot_id` where the status is `'pending'`.
4. If the count is 5 or more, the trigger raises a database exception using `RAISE EXCEPTION`.
5. Raising an exception aborts the transaction, and the client receives an error message, protecting the slot from over-subscription.

---

### 6.2.3 Enforcing Blacklist Constraints (`check_blacklist_before_booking`)
This trigger blocks blacklisted users from creating booking requests.

#### SQL Implementation:
```sql
CREATE OR REPLACE FUNCTION check_blacklist_before_booking()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  is_bl BOOLEAN;
BEGIN
  SELECT is_blacklisted INTO is_bl FROM public.profiles WHERE id = NEW.user_id;
  IF is_bl THEN
    RAISE EXCEPTION 'Blacklisted users cannot create booking requests.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_check_blacklist_booking
  BEFORE INSERT ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION check_blacklist_before_booking();
```

#### Detailed Flow:
1. A user attempts to submit a booking request.
2. The trigger fires **BEFORE INSERT** on `booking_requests`.
3. The function queries the `profiles` table to check if `is_blacklisted` is `TRUE` for the requesting `user_id`.
4. If it is `TRUE`, the transaction is aborted with an error, preventing blacklisted users from reserving spaces.

---

### 6.2.4 Auto-Rejecting Competitors and Locking Slots (`auto_reject_other_requests`)
When a Sub Admin approves a booking request, all other pending requests for that slot must be rejected, and the slot's status must be updated.

#### SQL Implementation:
```sql
CREATE OR REPLACE FUNCTION auto_reject_other_requests()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.request_status = 'approved' AND OLD.request_status = 'pending' THEN
    -- Reject all other pending requests for the same slot
    UPDATE public.booking_requests
    SET request_status = 'rejected'
    WHERE slot_id = NEW.slot_id
      AND id != NEW.id
      AND request_status = 'pending';

    -- Lock slot status to booked
    UPDATE public.parking_slots
    SET status = 'booked'
    WHERE id = NEW.slot_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_auto_reject_other_requests
  AFTER UPDATE ON public.booking_requests
  FOR EACH ROW EXECUTE FUNCTION auto_reject_other_requests();
```

#### Detailed Flow:
1. A Sub Admin changes the status of a request from `'pending'` to `'approved'`.
2. The trigger fires **AFTER UPDATE** on the `booking_requests` table.
3. The function checks if the status transitioned from `'pending'` to `'approved'`.
4. If the conditions are met, it executes a bulk update on the `booking_requests` table, setting `request_status = 'rejected'` for all other requests linked to that `slot_id`.
5. It then updates the `parking_slots` table, setting `status = 'booked'` for the corresponding slot, locking it from further booking attempts.

---

### 6.2.5 Freeing Slots on Booking Cancellation (`free_slot_on_cancel`)
If an active booking is cancelled, the slot must immediately become available for other drivers.

#### SQL Implementation:
```sql
CREATE OR REPLACE FUNCTION free_slot_on_cancel()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.booking_status = 'cancelled' AND OLD.booking_status != 'cancelled' THEN
    -- Set slot availability status back to available
    UPDATE public.parking_slots
    SET status = 'available'
    WHERE id = NEW.slot_id;

    -- Record cancellation time
    NEW.cancelled_at = NOW();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_free_slot_on_cancel
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION free_slot_on_cancel();
```

#### Detailed Flow:
1. A user or admin cancels a booking, changing `booking_status` to `'cancelled'`.
2. The trigger fires **BEFORE UPDATE** on the `bookings` table.
3. The function updates the matching slot in `parking_slots`, setting `status = 'available'`.
4. It sets the `cancelled_at` timestamp of the modified record (`NEW`) to the current system time before writing the row to disk.

---

### 6.2.6 Automated Auditing System (`audit_insert_trigger`)
To maintain accountability, every insertion, update, and deletion on critical tables (such as `bookings`, `profiles`, and `blacklist`) is automatically audited.

#### SQL Implementation:
```sql
CREATE OR REPLACE FUNCTION audit_insert_trigger()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (
    auth.uid(),
    COALESCE((SELECT role FROM public.profiles WHERE id = auth.uid()), 'user'),
    'insert',
    NEW.id,
    TG_TABLE_NAME,
    'Record inserted into ' || TG_TABLE_NAME
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER audit_bookings_insert 
  AFTER INSERT ON public.bookings 
  FOR EACH ROW EXECUTE FUNCTION audit_insert_trigger();
```

#### Detailed Flow:
1. A user inserts a row into the `bookings` table.
2. The trigger fires **AFTER INSERT** on `bookings`.
3. The function reads the session context via Supabase's `auth.uid()`, retrieves the actor's role from their profile, and inserts a row into `audit_logs` capturing the actor's ID, role, action type (`insert`), target table (`bookings`), and target record ID.
4. Separate update and delete triggers (`audit_update_trigger`, `audit_delete_trigger`) operate similarly to capture updates and deletions.
