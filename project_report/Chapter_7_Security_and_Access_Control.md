# CHAPTER 7: SECURITY AND ACCESS CONTROL

## 7.1 Authentication Architecture
ParkPro utilizes a secure, modern authentication architecture managed by **Supabase Auth** (which is built on top of GoTrue).

Key security features of the authentication layer include:
* **Session Validation:** When a user logs in, the authentication server validates their credentials and returns an encrypted JSON Web Token (JWT). This JWT is stored securely in the client's browser (using HTTP-only cookies) and is automatically attached to the authorization header of every API request.
* **Token Hashing:** User passwords are never stored in plain text. They are hashed using the standard **bcrypt** or **argon2** cryptographic functions at the authentication layer before being written to disk, protecting them from decryption in the event of a database leak.
* **Strict Email/Phone Uniqueness:** The authentication system enforces uniqueness constraints on emails and phone numbers, preventing accounts from overlapping.
* **Role-Based Redirects:** Upon successful login, the frontend inspects the user's role from their profile and redirects them to the appropriate route (`/super-admin/dashboard`, `/sub-admin/dashboard`, or `/dashboard`).

---

## 7.2 Administrative Helper Functions
To enforce Row Level Security (RLS) policies efficiently, the database implements custom helper functions that verify the current user's role.

### 7.2.1 `is_super_admin()`
This function checks if the current authenticated user has the `'super_admin'` role.

```sql
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super_admin' AND deleted_at IS NULL
  );
$$;
```

### 7.2.2 `is_sub_admin()`
This function checks if the current user has the `'sub_admin'` role.

```sql
CREATE OR REPLACE FUNCTION is_sub_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'sub_admin' AND deleted_at IS NULL
  );
$$;
```

---

## 7.3 Row Level Security (RLS) Policies
Row Level Security (RLS) acts as a firewall directly on the PostgreSQL tables. When RLS is enabled on a table, all queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) are filtered by policies that check the executing user's JWT (`auth.uid()`).

### 7.3.1 Policies for the `profiles` Table
The `profiles` table contains sensitive personal details. The RLS policies prevent users from viewing or updating other users' data.

* **Super Admin Policy:** Full CRUD access.
  ```sql
  CREATE POLICY "Super admin full access profiles"
    ON public.profiles FOR ALL
    USING (is_super_admin());
  ```
* **Sub Admin Policy:** Can read or update their own profile and the profiles of users they supervise (where `parent_admin_id = auth.uid()`).
  ```sql
  CREATE POLICY "Sub admin view own users profiles"
    ON public.profiles FOR SELECT
    USING (is_sub_admin() AND (id = auth.uid() OR parent_admin_id = auth.uid()));
  ```
* **User Policy:** Can read and update only their own profile.
  ```sql
  CREATE POLICY "User view own profile"
    ON public.profiles FOR SELECT
    USING (id = auth.uid());
  ```

### 7.3.2 Policies for the `parking_slots` Table
The public must be able to read available slots, while slot modification must be restricted.

* **Public Read Policy:** Anyone (including anonymous visitors) can view available and active slots.
  ```sql
  CREATE POLICY "Public can read available slots"
    ON public.parking_slots FOR SELECT 
    USING (status = 'available' AND is_active = TRUE AND deleted_at IS NULL);
  ```
* **Super Admin Policy:** Full access to manage all slots.
  ```sql
  CREATE POLICY "Super admin manage slots"
    ON public.parking_slots FOR ALL 
    USING (is_super_admin());
  ```
* **Sub Admin Policy:** Can manage slots only within their assigned zones.
  ```sql
  CREATE POLICY "Sub admin manage own zone slots"
    ON public.parking_slots FOR ALL
    USING (
      is_sub_admin() AND zone_id IN (
        SELECT id FROM public.parking_zones WHERE sub_admin_id = auth.uid()
      )
    );
  ```

### 7.3.3 Policies for the `bookings` Table
* **User View Policy:** Drivers can view only their own bookings.
  ```sql
  CREATE POLICY "User view own bookings"
    ON public.bookings FOR SELECT 
    USING (user_id = auth.uid());
  ```
* **Sub Admin Manage Policy:** Sub-admins can manage bookings assigned to their sub-admin ID.
  ```sql
  CREATE POLICY "Sub admin manage own zone bookings"
    ON public.bookings FOR ALL
    USING (is_sub_admin() AND sub_admin_id = auth.uid());
  ```

### 7.3.4 Policies for the `payments` Table
* **User Payment Submission:** Users can submit payments only for their own bookings.
  ```sql
  CREATE POLICY "User create own payment"
    ON public.payments FOR INSERT
    WITH CHECK (
      booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
    );
  ```
* **Sub Admin View Policy:** Sub-admins can view payments made for bookings in their zones.
  ```sql
  CREATE POLICY "Sub admin view zone payments"
    ON public.payments FOR SELECT
    USING (
      is_sub_admin() AND booking_id IN (
        SELECT id FROM public.bookings WHERE sub_admin_id = auth.uid()
      )
    );
  ```

---

## 7.4 Session Tracking and Audit Logs
To guarantee accountability, ParkPro implements two security logs:

1. **Login History (`login_history`):** When a user logs in, the system registers their IP address, device type (browser/OS), and timestamp. This allows users and admins to identify unauthorized access attempts.
2. **Audit Trail (`audit_logs`):** Every insertion, deletion, or modification of critical business records triggers an audit log entry. Since audit log policies only allow system insertions and prevent any updates or deletions, the audit trail is append-only, protecting it from modification even by compromised Sub-Admin accounts.
