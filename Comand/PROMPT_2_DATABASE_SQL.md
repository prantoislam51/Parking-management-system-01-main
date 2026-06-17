MASTER PROMPT — BUILD COMPLETE SUPABASE DATABASE ARCHITECTURE FOR ENTERPRISE PARKING MANAGEMENT SYSTEM

=======================================================================
STRICT OUTPUT RULES
=======================================================================

Return SQL migration code only.
No markdown formatting.
No explanation text.
No comments outside SQL comments (-- style only).
No code blocks.
No preamble.
No postamble.
Production-ready.
Supabase PostgreSQL compatible.
Error-free.
Ready to paste directly into Supabase SQL Editor.

=======================================================================
PROJECT OVERVIEW
=======================================================================

Build a complete, scalable, production-ready, normalized, secure,
and optimized Supabase PostgreSQL database for an Enterprise Parking
Management System for Bangladesh.

Database Engine: Supabase PostgreSQL
Authentication: Supabase auth.users (DO NOT create custom auth tables)
Storage: Supabase Storage
Realtime: Supabase Realtime

=======================================================================
SYSTEM HIERARCHY
=======================================================================

User Hierarchy:
  Super Admin → Sub Admin → Users

Geographical Hierarchy:
  Division → District → Area → Parking Zone → Parking Slot

Vehicle Hierarchy:
  User → Vehicle → Booking Request → Booking → Payment

=======================================================================
OUTPUT ORDER (STRICT — DO NOT CHANGE ORDER)
=======================================================================

STEP 1: Extensions
STEP 2: Enum Types
STEP 3: Utility Functions
STEP 4: Tables
STEP 5: Check Constraints
STEP 6: Indexes
STEP 7: Trigger Functions + Triggers
STEP 8: Enable RLS on All Tables
STEP 9: RLS Policies
STEP 10: Business Logic Functions
STEP 11: Seed Data

=======================================================================
STEP 1 — EXTENSIONS
=======================================================================

Enable:
- uuid-ossp
- pgcrypto

=======================================================================
STEP 2 — ENUM TYPES
=======================================================================

Create all enums before any table.

CREATE TYPE user_role AS ENUM:
  super_admin, sub_admin, user

CREATE TYPE user_type AS ENUM:
  driver, owner

CREATE TYPE vehicle_type AS ENUM:
  car, bike, truck, bus

CREATE TYPE slot_type AS ENUM:
  car, bike, truck, bus

CREATE TYPE slot_status AS ENUM:
  available, pending, booked, occupied, cancelled, maintenance

CREATE TYPE booking_status AS ENUM:
  pending, approved, rejected, cancelled, completed, expired

CREATE TYPE payment_status AS ENUM:
  unpaid, paid, failed, refunded

CREATE TYPE payment_method AS ENUM:
  bkash, nagad, bank, cash, stripe, sslcommerz

CREATE TYPE ticket_status AS ENUM:
  open, in_progress, resolved, closed

CREATE TYPE notification_type AS ENUM:
  booking, payment, approval, rejection, cancellation, system

CREATE TYPE review_status AS ENUM:
  pending, approved, hidden

CREATE TYPE audit_action AS ENUM:
  insert, update, delete, login, logout, password_reset, approval, rejection

=======================================================================
STEP 3 — UTILITY FUNCTIONS
=======================================================================

Create function: generate_unique_id(prefix TEXT)
  Returns TEXT
  Format: PREFIX-YYYYMMDD-RANDOM6CHARS (uppercase)
  Used for: profiles.unique_id, bookings.booking_code, slots.unique_slot_id

Create function: update_updated_at_column()
  Returns TRIGGER
  Sets NEW.updated_at = NOW()
  Used on all tables with updated_at column

=======================================================================
STEP 4 — TABLES
=======================================================================

--- TABLE: profiles ---

CREATE TABLE public.profiles (
  id                      UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  unique_id               TEXT UNIQUE NOT NULL DEFAULT generate_unique_id('USR'),
  role                    user_role NOT NULL DEFAULT 'user',
  parent_admin_id         UUID NULLABLE REFERENCES public.profiles(id) ON DELETE SET NULL,
  first_name              TEXT NOT NULL,
  last_name               TEXT NOT NULL,
  username                TEXT UNIQUE NOT NULL,
  email                   TEXT UNIQUE NOT NULL,
  phone                   TEXT UNIQUE NOT NULL,
  address                 TEXT,
  profession              TEXT,
  user_type               user_type NULLABLE,
  nid_number              TEXT NULLABLE,
  passport_number         TEXT NULLABLE,
  profile_image           TEXT,
  emergency_contact       TEXT,
  is_active               BOOLEAN NOT NULL DEFAULT TRUE,
  is_blacklisted          BOOLEAN NOT NULL DEFAULT FALSE,
  password_reset_required BOOLEAN NOT NULL DEFAULT FALSE,
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at              TIMESTAMPTZ NULLABLE
);

COMMENT ON TABLE public.profiles IS 'All user profiles linked to Supabase auth.users';
COMMENT ON COLUMN public.profiles.parent_admin_id IS 'NULL for super_admin, super_admin id for sub_admin, sub_admin id for user';

--- TABLE: divisions ---

CREATE TABLE public.divisions (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT NOT NULL,
  code       TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.divisions IS 'Top-level geographical division (e.g. Dhaka, Chittagong)';

--- TABLE: districts ---

CREATE TABLE public.districts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  division_id UUID NOT NULL REFERENCES public.divisions(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  code        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.districts IS 'District under a division';

--- TABLE: areas ---

CREATE TABLE public.areas (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  district_id UUID NOT NULL REFERENCES public.districts(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  code        TEXT UNIQUE NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.areas IS 'Area under a district';

--- TABLE: parking_zones ---

CREATE TABLE public.parking_zones (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  area_id     UUID NOT NULL REFERENCES public.areas(id) ON DELETE CASCADE,
  sub_admin_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  zone_name   TEXT NOT NULL,
  zone_code   TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.parking_zones IS 'Parking zone assigned to a sub admin under an area';

--- TABLE: parking_slots ---

CREATE TABLE public.parking_slots (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id        UUID NOT NULL REFERENCES public.parking_zones(id) ON DELETE CASCADE,
  unique_slot_id TEXT UNIQUE NOT NULL DEFAULT generate_unique_id('SLT'),
  slot_type      slot_type NOT NULL,
  price          NUMERIC(10,2) NOT NULL,
  status         slot_status NOT NULL DEFAULT 'available',
  max_requests   INTEGER NOT NULL DEFAULT 5,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at     TIMESTAMPTZ NULLABLE
);

COMMENT ON TABLE public.parking_slots IS 'Individual parking slot within a zone';

--- TABLE: vehicles ---

CREATE TABLE public.vehicles (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  vehicle_type   vehicle_type NOT NULL,
  vehicle_number TEXT UNIQUE NOT NULL,
  license_number TEXT NOT NULL,
  brand          TEXT,
  model          TEXT,
  color          TEXT,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.vehicles IS 'Vehicles owned by users';

--- TABLE: booking_requests ---

CREATE TABLE public.booking_requests (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slot_id        UUID NOT NULL REFERENCES public.parking_slots(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  request_status booking_status NOT NULL DEFAULT 'pending',
  requested_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.booking_requests IS 'User requests to book a slot. Max 5 pending per slot enforced by trigger.';

--- TABLE: bookings ---

CREATE TABLE public.bookings (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_code        TEXT UNIQUE NOT NULL DEFAULT generate_unique_id('BKG'),
  booking_request_id  UUID NOT NULL REFERENCES public.booking_requests(id) ON DELETE RESTRICT,
  user_id             UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  slot_id             UUID NOT NULL REFERENCES public.parking_slots(id) ON DELETE CASCADE,
  sub_admin_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  booking_start_date  DATE NOT NULL,
  booking_end_date    DATE NOT NULL,
  duration_month      INTEGER NOT NULL,
  booking_status      booking_status NOT NULL DEFAULT 'approved',
  payment_status      payment_status NOT NULL DEFAULT 'unpaid',
  approved_by         UUID NULLABLE REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  cancelled_at        TIMESTAMPTZ NULLABLE,
  deleted_at          TIMESTAMPTZ NULLABLE
);

COMMENT ON TABLE public.bookings IS 'Confirmed bookings after request approval';

--- TABLE: payments ---

CREATE TABLE public.payments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id     UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount         NUMERIC(10,2) NOT NULL,
  payment_method payment_method NOT NULL,
  transaction_id TEXT UNIQUE NOT NULL,
  payment_status payment_status NOT NULL DEFAULT 'unpaid',
  paid_at        TIMESTAMPTZ NULLABLE
);

COMMENT ON TABLE public.payments IS 'Payment records for bookings';

--- TABLE: notifications ---

CREATE TABLE public.notifications (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_id   UUID NULLABLE REFERENCES public.profiles(id) ON DELETE SET NULL,
  type        notification_type NOT NULL,
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.notifications IS 'In-app notifications for all users';

--- TABLE: reviews ---

CREATE TABLE public.reviews (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating     INTEGER NOT NULL,
  review     TEXT,
  comment    TEXT,
  status     review_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.reviews IS 'User reviews and ratings';

--- TABLE: support_tickets ---

CREATE TABLE public.support_tickets (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject    TEXT NOT NULL,
  message    TEXT NOT NULL,
  status     ticket_status NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.support_tickets IS 'User support ticket requests';

--- TABLE: blacklist ---

CREATE TABLE public.blacklist (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  admin_id   UUID NOT NULL REFERENCES public.profiles(id) ON DELETE RESTRICT,
  reason     TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.blacklist IS 'Blacklisted users with reason and admin who blacklisted';

--- TABLE: audit_logs ---

CREATE TABLE public.audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id     UUID NULLABLE REFERENCES public.profiles(id) ON DELETE SET NULL,
  actor_role   user_role NOT NULL,
  action       audit_action NOT NULL,
  target_id    UUID NULLABLE,
  target_table TEXT NULLABLE,
  description  TEXT,
  ip_address   TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.audit_logs IS 'Complete audit trail of all system actions';

--- TABLE: login_history ---

CREATE TABLE public.login_history (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ip_address TEXT,
  device     TEXT,
  login_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.login_history IS 'User login history for security tracking';

--- TABLE: password_reset_logs ---

CREATE TABLE public.password_reset_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reset_by     UUID NULLABLE REFERENCES public.profiles(id) ON DELETE SET NULL,
  reset_reason TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.password_reset_logs IS 'Log of all password reset actions';

=======================================================================
STEP 5 — CHECK CONSTRAINTS
=======================================================================

ALTER TABLE public.reviews
  ADD CONSTRAINT reviews_rating_range CHECK (rating >= 1 AND rating <= 5);

ALTER TABLE public.parking_slots
  ADD CONSTRAINT slots_price_positive CHECK (price > 0);

ALTER TABLE public.parking_slots
  ADD CONSTRAINT slots_max_requests_limit CHECK (max_requests <= 5);

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_duration_positive CHECK (duration_month > 0);

ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_dates_valid CHECK (booking_end_date > booking_start_date);

=======================================================================
STEP 6 — INDEXES
=======================================================================

CREATE INDEX idx_profiles_unique_id ON public.profiles(unique_id);
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_phone ON public.profiles(phone);
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_parent_admin_id ON public.profiles(parent_admin_id);
CREATE INDEX idx_profiles_is_active ON public.profiles(is_active);
CREATE INDEX idx_profiles_is_blacklisted ON public.profiles(is_blacklisted);
CREATE INDEX idx_profiles_deleted_at ON public.profiles(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_parking_zones_area_id ON public.parking_zones(area_id);
CREATE INDEX idx_parking_zones_sub_admin_id ON public.parking_zones(sub_admin_id);
CREATE INDEX idx_parking_zones_is_active ON public.parking_zones(is_active);

CREATE INDEX idx_parking_slots_unique_slot_id ON public.parking_slots(unique_slot_id);
CREATE INDEX idx_parking_slots_zone_id ON public.parking_slots(zone_id);
CREATE INDEX idx_parking_slots_status ON public.parking_slots(status);
CREATE INDEX idx_parking_slots_slot_type ON public.parking_slots(slot_type);
CREATE INDEX idx_parking_slots_deleted_at ON public.parking_slots(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_vehicles_user_id ON public.vehicles(user_id);
CREATE INDEX idx_vehicles_vehicle_number ON public.vehicles(vehicle_number);
CREATE INDEX idx_vehicles_vehicle_type ON public.vehicles(vehicle_type);

CREATE INDEX idx_booking_requests_slot_id ON public.booking_requests(slot_id);
CREATE INDEX idx_booking_requests_user_id ON public.booking_requests(user_id);
CREATE INDEX idx_booking_requests_status ON public.booking_requests(request_status);

CREATE INDEX idx_bookings_booking_code ON public.bookings(booking_code);
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX idx_bookings_slot_id ON public.bookings(slot_id);
CREATE INDEX idx_bookings_sub_admin_id ON public.bookings(sub_admin_id);
CREATE INDEX idx_bookings_booking_status ON public.bookings(booking_status);
CREATE INDEX idx_bookings_payment_status ON public.bookings(payment_status);
CREATE INDEX idx_bookings_deleted_at ON public.bookings(deleted_at) WHERE deleted_at IS NULL;

CREATE INDEX idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX idx_payments_payment_status ON public.payments(payment_status);

CREATE INDEX idx_notifications_receiver_id ON public.notifications(receiver_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_type ON public.notifications(type);

CREATE INDEX idx_audit_logs_actor_id ON public.audit_logs(actor_id);
CREATE INDEX idx_audit_logs_action ON public.audit_logs(action);
CREATE INDEX idx_audit_logs_target_table ON public.audit_logs(target_table);
CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at);

CREATE INDEX idx_login_history_user_id ON public.login_history(user_id);
CREATE INDEX idx_login_history_login_at ON public.login_history(login_at);

=======================================================================
STEP 7 — TRIGGER FUNCTIONS + TRIGGERS
=======================================================================

-- Trigger Function: update_updated_at_column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_parking_slots_updated_at
  BEFORE UPDATE ON public.parking_slots
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger Function: enforce max 5 pending requests per slot
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

-- Trigger Function: block blacklisted users from creating booking requests
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

-- Trigger Function: auto-reject other pending requests after approval
CREATE OR REPLACE FUNCTION auto_reject_other_requests()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.request_status = 'approved' AND OLD.request_status = 'pending' THEN
    UPDATE public.booking_requests
    SET request_status = 'rejected'
    WHERE slot_id = NEW.slot_id
      AND id != NEW.id
      AND request_status = 'pending';

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

-- Trigger Function: free slot when booking is cancelled
CREATE OR REPLACE FUNCTION free_slot_on_cancel()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF NEW.booking_status = 'cancelled' AND OLD.booking_status != 'cancelled' THEN
    UPDATE public.parking_slots
    SET status = 'available'
    WHERE id = NEW.slot_id;

    NEW.cancelled_at = NOW();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_free_slot_on_cancel
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION free_slot_on_cancel();

-- Trigger Function: audit INSERT
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

-- Trigger Function: audit UPDATE
CREATE OR REPLACE FUNCTION audit_update_trigger()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (
    auth.uid(),
    COALESCE((SELECT role FROM public.profiles WHERE id = auth.uid()), 'user'),
    'update',
    NEW.id,
    TG_TABLE_NAME,
    'Record updated in ' || TG_TABLE_NAME
  );
  RETURN NEW;
END;
$$;

-- Trigger Function: audit DELETE
CREATE OR REPLACE FUNCTION audit_delete_trigger()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (
    auth.uid(),
    COALESCE((SELECT role FROM public.profiles WHERE id = auth.uid()), 'user'),
    'delete',
    OLD.id,
    TG_TABLE_NAME,
    'Record deleted from ' || TG_TABLE_NAME
  );
  RETURN OLD;
END;
$$;

-- Apply audit triggers to key tables
CREATE TRIGGER audit_bookings_insert AFTER INSERT ON public.bookings FOR EACH ROW EXECUTE FUNCTION audit_insert_trigger();
CREATE TRIGGER audit_bookings_update AFTER UPDATE ON public.bookings FOR EACH ROW EXECUTE FUNCTION audit_update_trigger();
CREATE TRIGGER audit_bookings_delete AFTER DELETE ON public.bookings FOR EACH ROW EXECUTE FUNCTION audit_delete_trigger();
CREATE TRIGGER audit_profiles_update AFTER UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION audit_update_trigger();
CREATE TRIGGER audit_blacklist_insert AFTER INSERT ON public.blacklist FOR EACH ROW EXECUTE FUNCTION audit_insert_trigger();
CREATE TRIGGER audit_payments_insert AFTER INSERT ON public.payments FOR EACH ROW EXECUTE FUNCTION audit_insert_trigger();

-- Trigger Function: create notification helper (called by other triggers)
CREATE OR REPLACE FUNCTION notify_on_booking_status_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  msg TEXT;
  notif_type notification_type;
BEGIN
  IF NEW.booking_status = 'approved' AND OLD.booking_status != 'approved' THEN
    msg := 'Your booking ' || NEW.booking_code || ' has been approved.';
    notif_type := 'approval';
  ELSIF NEW.booking_status = 'rejected' AND OLD.booking_status != 'rejected' THEN
    msg := 'Your booking request for slot has been rejected.';
    notif_type := 'rejection';
  ELSIF NEW.booking_status = 'cancelled' AND OLD.booking_status != 'cancelled' THEN
    msg := 'Your booking ' || NEW.booking_code || ' has been cancelled.';
    notif_type := 'cancellation';
  ELSE
    RETURN NEW;
  END IF;

  INSERT INTO public.notifications(receiver_id, sender_id, type, message)
  VALUES (NEW.user_id, NEW.approved_by, notif_type, msg);

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_booking_status
  AFTER UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION notify_on_booking_status_change();

-- Trigger Function: notify on payment
CREATE OR REPLACE FUNCTION notify_on_payment()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  booking_user UUID;
  booking_code TEXT;
BEGIN
  IF NEW.payment_status = 'paid' THEN
    SELECT b.user_id, b.booking_code INTO booking_user, booking_code
    FROM public.bookings b WHERE b.id = NEW.booking_id;

    INSERT INTO public.notifications(receiver_id, type, message)
    VALUES (booking_user, 'payment', 'Payment of BDT ' || NEW.amount || ' received for booking ' || booking_code);
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_notify_payment
  AFTER INSERT OR UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION notify_on_payment();

-- Trigger Function: auto-create profile on auth.users signup
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

=======================================================================
STEP 8 — ENABLE RLS ON ALL TABLES
=======================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.divisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.districts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parking_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parking_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_logs ENABLE ROW LEVEL SECURITY;

=======================================================================
STEP 9 — RLS POLICIES
=======================================================================

-- Helper function: check if current user is super_admin
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super_admin' AND deleted_at IS NULL
  );
$$;

-- Helper function: check if current user is sub_admin
CREATE OR REPLACE FUNCTION is_sub_admin()
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'sub_admin' AND deleted_at IS NULL
  );
$$;

-- Helper function: get current user role
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS user_role LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$;

-- PROFILES
CREATE POLICY "Super admin full access profiles"
  ON public.profiles FOR ALL
  USING (is_super_admin());

CREATE POLICY "Sub admin view own users profiles"
  ON public.profiles FOR SELECT
  USING (is_sub_admin() AND (id = auth.uid() OR parent_admin_id = auth.uid()));

CREATE POLICY "Sub admin update own users"
  ON public.profiles FOR UPDATE
  USING (is_sub_admin() AND (id = auth.uid() OR parent_admin_id = auth.uid()));

CREATE POLICY "User view own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "User update own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

-- DIVISIONS
CREATE POLICY "Public can read divisions"
  ON public.divisions FOR SELECT USING (TRUE);

CREATE POLICY "Super admin manage divisions"
  ON public.divisions FOR ALL USING (is_super_admin());

-- DISTRICTS
CREATE POLICY "Public can read districts"
  ON public.districts FOR SELECT USING (TRUE);

CREATE POLICY "Super admin manage districts"
  ON public.districts FOR ALL USING (is_super_admin());

-- AREAS
CREATE POLICY "Public can read areas"
  ON public.areas FOR SELECT USING (TRUE);

CREATE POLICY "Super admin manage areas"
  ON public.areas FOR ALL USING (is_super_admin());

-- PARKING ZONES
CREATE POLICY "Public can read active zones"
  ON public.parking_zones FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Super admin manage zones"
  ON public.parking_zones FOR ALL USING (is_super_admin());

CREATE POLICY "Sub admin manage own zones"
  ON public.parking_zones FOR ALL
  USING (is_sub_admin() AND sub_admin_id = auth.uid());

-- PARKING SLOTS
CREATE POLICY "Public can read available slots"
  ON public.parking_slots FOR SELECT USING (status = 'available' AND is_active = TRUE AND deleted_at IS NULL);

CREATE POLICY "Super admin manage slots"
  ON public.parking_slots FOR ALL USING (is_super_admin());

CREATE POLICY "Sub admin manage own zone slots"
  ON public.parking_slots FOR ALL
  USING (
    is_sub_admin() AND zone_id IN (
      SELECT id FROM public.parking_zones WHERE sub_admin_id = auth.uid()
    )
  );

CREATE POLICY "User read active slots"
  ON public.parking_slots FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = TRUE AND deleted_at IS NULL);

-- VEHICLES
CREATE POLICY "Super admin view all vehicles"
  ON public.vehicles FOR SELECT USING (is_super_admin());

CREATE POLICY "User manage own vehicles"
  ON public.vehicles FOR ALL USING (user_id = auth.uid());

-- BOOKING REQUESTS
CREATE POLICY "Super admin view all requests"
  ON public.booking_requests FOR ALL USING (is_super_admin());

CREATE POLICY "Sub admin manage zone requests"
  ON public.booking_requests FOR ALL
  USING (
    is_sub_admin() AND slot_id IN (
      SELECT ps.id FROM public.parking_slots ps
      JOIN public.parking_zones pz ON pz.id = ps.zone_id
      WHERE pz.sub_admin_id = auth.uid()
    )
  );

CREATE POLICY "User manage own requests"
  ON public.booking_requests FOR ALL USING (user_id = auth.uid());

-- BOOKINGS
CREATE POLICY "Super admin full access bookings"
  ON public.bookings FOR ALL USING (is_super_admin());

CREATE POLICY "Sub admin manage own zone bookings"
  ON public.bookings FOR ALL
  USING (is_sub_admin() AND sub_admin_id = auth.uid());

CREATE POLICY "User view own bookings"
  ON public.bookings FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "User cancel own booking"
  ON public.bookings FOR UPDATE USING (user_id = auth.uid());

-- PAYMENTS
CREATE POLICY "Super admin full access payments"
  ON public.payments FOR ALL USING (is_super_admin());

CREATE POLICY "Sub admin view zone payments"
  ON public.payments FOR SELECT
  USING (
    is_sub_admin() AND booking_id IN (
      SELECT id FROM public.bookings WHERE sub_admin_id = auth.uid()
    )
  );

CREATE POLICY "User view own payments"
  ON public.payments FOR SELECT
  USING (
    booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
  );

CREATE POLICY "User create own payment"
  ON public.payments FOR INSERT
  WITH CHECK (
    booking_id IN (SELECT id FROM public.bookings WHERE user_id = auth.uid())
  );

-- NOTIFICATIONS
CREATE POLICY "User view own notifications"
  ON public.notifications FOR SELECT USING (receiver_id = auth.uid());

CREATE POLICY "User update own notifications"
  ON public.notifications FOR UPDATE USING (receiver_id = auth.uid());

CREATE POLICY "Super admin view all notifications"
  ON public.notifications FOR ALL USING (is_super_admin());

CREATE POLICY "System insert notifications"
  ON public.notifications FOR INSERT WITH CHECK (TRUE);

-- REVIEWS
CREATE POLICY "Public read approved reviews"
  ON public.reviews FOR SELECT USING (status = 'approved');

CREATE POLICY "User manage own reviews"
  ON public.reviews FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Super admin manage reviews"
  ON public.reviews FOR ALL USING (is_super_admin());

-- SUPPORT TICKETS
CREATE POLICY "User manage own tickets"
  ON public.support_tickets FOR ALL USING (user_id = auth.uid());

CREATE POLICY "Sub admin view all tickets"
  ON public.support_tickets FOR SELECT USING (is_sub_admin());

CREATE POLICY "Super admin manage all tickets"
  ON public.support_tickets FOR ALL USING (is_super_admin());

-- BLACKLIST
CREATE POLICY "Super admin manage blacklist"
  ON public.blacklist FOR ALL USING (is_super_admin());

CREATE POLICY "Sub admin view blacklist"
  ON public.blacklist FOR SELECT USING (is_sub_admin());

-- AUDIT LOGS
CREATE POLICY "Super admin view all audit logs"
  ON public.audit_logs FOR SELECT USING (is_super_admin());

CREATE POLICY "System insert audit logs"
  ON public.audit_logs FOR INSERT WITH CHECK (TRUE);

-- LOGIN HISTORY
CREATE POLICY "Super admin view all login history"
  ON public.login_history FOR ALL USING (is_super_admin());

CREATE POLICY "User view own login history"
  ON public.login_history FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System insert login history"
  ON public.login_history FOR INSERT WITH CHECK (TRUE);

-- PASSWORD RESET LOGS
CREATE POLICY "Super admin view reset logs"
  ON public.password_reset_logs FOR ALL USING (is_super_admin());

CREATE POLICY "System insert reset logs"
  ON public.password_reset_logs FOR INSERT WITH CHECK (TRUE);

=======================================================================
STEP 10 — BUSINESS LOGIC FUNCTIONS
=======================================================================

-- FUNCTION: create_booking_request
CREATE OR REPLACE FUNCTION create_booking_request(
  p_slot_id UUID,
  p_user_id UUID
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_request_id UUID;
  v_pending_count INTEGER;
  v_is_blacklisted BOOLEAN;
BEGIN
  SELECT is_blacklisted INTO v_is_blacklisted FROM public.profiles WHERE id = p_user_id;
  IF v_is_blacklisted THEN
    RAISE EXCEPTION 'Blacklisted user cannot create booking request.';
  END IF;

  SELECT COUNT(*) INTO v_pending_count
  FROM public.booking_requests
  WHERE slot_id = p_slot_id AND request_status = 'pending';

  IF v_pending_count >= 5 THEN
    RAISE EXCEPTION 'Maximum pending requests reached for this slot.';
  END IF;

  INSERT INTO public.booking_requests(slot_id, user_id, request_status)
  VALUES (p_slot_id, p_user_id, 'pending')
  RETURNING id INTO v_request_id;

  UPDATE public.parking_slots SET status = 'pending' WHERE id = p_slot_id AND status = 'available';

  INSERT INTO public.notifications(receiver_id, type, message)
  VALUES (p_user_id, 'booking', 'Your booking request has been submitted and is pending approval.');

  RETURN v_request_id;
END;
$$;

-- FUNCTION: approve_booking_request
CREATE OR REPLACE FUNCTION approve_booking_request(
  p_request_id UUID,
  p_sub_admin_id UUID,
  p_start_date DATE,
  p_duration_month INTEGER
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_booking_id UUID;
  v_slot_id UUID;
  v_user_id UUID;
BEGIN
  SELECT slot_id, user_id INTO v_slot_id, v_user_id
  FROM public.booking_requests WHERE id = p_request_id AND request_status = 'pending';

  IF v_slot_id IS NULL THEN
    RAISE EXCEPTION 'Booking request not found or not pending.';
  END IF;

  UPDATE public.booking_requests SET request_status = 'approved' WHERE id = p_request_id;

  UPDATE public.booking_requests
  SET request_status = 'rejected'
  WHERE slot_id = v_slot_id AND id != p_request_id AND request_status = 'pending';

  INSERT INTO public.bookings(
    booking_request_id, user_id, slot_id, sub_admin_id,
    booking_start_date, booking_end_date, duration_month,
    booking_status, payment_status, approved_by
  )
  VALUES (
    p_request_id, v_user_id, v_slot_id, p_sub_admin_id,
    p_start_date, p_start_date + (p_duration_month || ' months')::INTERVAL,
    p_duration_month, 'approved', 'unpaid', p_sub_admin_id
  )
  RETURNING id INTO v_booking_id;

  UPDATE public.parking_slots SET status = 'booked' WHERE id = v_slot_id;

  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (p_sub_admin_id, 'sub_admin', 'approval', v_booking_id, 'bookings', 'Booking approved by sub admin');

  RETURN v_booking_id;
END;
$$;

-- FUNCTION: reject_booking_request
CREATE OR REPLACE FUNCTION reject_booking_request(
  p_request_id UUID,
  p_admin_id UUID
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_slot_id UUID;
  v_user_id UUID;
  v_remaining_pending INTEGER;
BEGIN
  SELECT slot_id, user_id INTO v_slot_id, v_user_id
  FROM public.booking_requests WHERE id = p_request_id;

  UPDATE public.booking_requests SET request_status = 'rejected' WHERE id = p_request_id;

  SELECT COUNT(*) INTO v_remaining_pending
  FROM public.booking_requests WHERE slot_id = v_slot_id AND request_status = 'pending';

  IF v_remaining_pending = 0 THEN
    UPDATE public.parking_slots SET status = 'available' WHERE id = v_slot_id;
  END IF;

  INSERT INTO public.notifications(receiver_id, sender_id, type, message)
  VALUES (v_user_id, p_admin_id, 'rejection', 'Your booking request has been rejected.');

  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (p_admin_id, 'sub_admin', 'rejection', p_request_id, 'booking_requests', 'Booking request rejected');
END;
$$;

-- FUNCTION: cancel_booking
CREATE OR REPLACE FUNCTION cancel_booking(
  p_booking_id UUID,
  p_cancelled_by UUID
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_slot_id UUID;
  v_user_id UUID;
BEGIN
  SELECT slot_id, user_id INTO v_slot_id, v_user_id
  FROM public.bookings WHERE id = p_booking_id;

  UPDATE public.bookings
  SET booking_status = 'cancelled', cancelled_at = NOW(), deleted_at = NOW()
  WHERE id = p_booking_id;

  UPDATE public.parking_slots SET status = 'available' WHERE id = v_slot_id;

  INSERT INTO public.notifications(receiver_id, type, message)
  VALUES (v_user_id, 'cancellation', 'Your booking has been cancelled successfully.');

  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (p_cancelled_by,
    COALESCE((SELECT role FROM public.profiles WHERE id = p_cancelled_by), 'user'),
    'update', p_booking_id, 'bookings', 'Booking cancelled');
END;
$$;

-- FUNCTION: make_payment
CREATE OR REPLACE FUNCTION make_payment(
  p_booking_id UUID,
  p_amount NUMERIC,
  p_payment_method payment_method,
  p_transaction_id TEXT
)
RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_payment_id UUID;
BEGIN
  INSERT INTO public.payments(booking_id, amount, payment_method, transaction_id, payment_status, paid_at)
  VALUES (p_booking_id, p_amount, p_payment_method, p_transaction_id, 'paid', NOW())
  RETURNING id INTO v_payment_id;

  UPDATE public.bookings SET payment_status = 'paid', booking_status = 'completed' WHERE id = p_booking_id;

  UPDATE public.parking_slots
  SET status = 'occupied'
  WHERE id = (SELECT slot_id FROM public.bookings WHERE id = p_booking_id);

  RETURN v_payment_id;
END;
$$;

-- FUNCTION: blacklist_user
CREATE OR REPLACE FUNCTION blacklist_user(
  p_user_id UUID,
  p_admin_id UUID,
  p_reason TEXT
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.profiles SET is_blacklisted = TRUE WHERE id = p_user_id;

  INSERT INTO public.blacklist(user_id, admin_id, reason)
  VALUES (p_user_id, p_admin_id, p_reason);

  INSERT INTO public.notifications(receiver_id, sender_id, type, message)
  VALUES (p_user_id, p_admin_id, 'system', 'Your account has been blacklisted. Reason: ' || p_reason);

  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (p_admin_id, 'super_admin', 'update', p_user_id, 'profiles', 'User blacklisted: ' || p_reason);
END;
$$;

-- FUNCTION: remove_blacklist
CREATE OR REPLACE FUNCTION remove_blacklist(
  p_user_id UUID,
  p_admin_id UUID
)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE public.profiles SET is_blacklisted = FALSE WHERE id = p_user_id;

  DELETE FROM public.blacklist WHERE user_id = p_user_id;

  INSERT INTO public.notifications(receiver_id, sender_id, type, message)
  VALUES (p_user_id, p_admin_id, 'system', 'Your account blacklist has been removed.');

  INSERT INTO public.audit_logs(actor_id, actor_role, action, target_id, target_table, description)
  VALUES (p_admin_id, 'super_admin', 'update', p_user_id, 'profiles', 'User removed from blacklist');
END;
$$;

-- FUNCTION: get_available_slots
CREATE OR REPLACE FUNCTION get_available_slots(
  p_area_id UUID DEFAULT NULL,
  p_slot_type slot_type DEFAULT NULL
)
RETURNS TABLE (
  slot_id UUID, unique_slot_id TEXT, slot_type slot_type,
  price NUMERIC, zone_name TEXT, area_name TEXT, district_name TEXT
) LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT ps.id, ps.unique_slot_id, ps.slot_type, ps.price,
         pz.zone_name, a.name, d.name
  FROM public.parking_slots ps
  JOIN public.parking_zones pz ON pz.id = ps.zone_id
  JOIN public.areas a ON a.id = pz.area_id
  JOIN public.districts d ON d.id = a.district_id
  WHERE ps.status = 'available'
    AND ps.is_active = TRUE
    AND ps.deleted_at IS NULL
    AND pz.is_active = TRUE
    AND (p_area_id IS NULL OR a.id = p_area_id)
    AND (p_slot_type IS NULL OR ps.slot_type = p_slot_type)
  ORDER BY ps.price ASC;
$$;

-- FUNCTION: get_booking_analytics
CREATE OR REPLACE FUNCTION get_booking_analytics(
  p_sub_admin_id UUID DEFAULT NULL
)
RETURNS TABLE (
  total_bookings BIGINT,
  active_bookings BIGINT,
  cancelled_bookings BIGINT,
  completed_bookings BIGINT,
  total_revenue NUMERIC,
  pending_requests BIGINT
) LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT
    COUNT(*)::BIGINT AS total_bookings,
    COUNT(*) FILTER (WHERE booking_status = 'approved')::BIGINT AS active_bookings,
    COUNT(*) FILTER (WHERE booking_status = 'cancelled')::BIGINT AS cancelled_bookings,
    COUNT(*) FILTER (WHERE booking_status = 'completed')::BIGINT AS completed_bookings,
    COALESCE(SUM(CASE WHEN payment_status = 'paid' THEN
      (SELECT amount FROM public.payments WHERE booking_id = b.id LIMIT 1) ELSE 0 END), 0) AS total_revenue,
    (SELECT COUNT(*) FROM public.booking_requests WHERE request_status = 'pending'
      AND (p_sub_admin_id IS NULL OR slot_id IN (
        SELECT ps.id FROM public.parking_slots ps
        JOIN public.parking_zones pz ON pz.id = ps.zone_id
        WHERE pz.sub_admin_id = p_sub_admin_id
      ))
    )::BIGINT AS pending_requests
  FROM public.bookings b
  WHERE p_sub_admin_id IS NULL OR sub_admin_id = p_sub_admin_id;
$$;

-- FUNCTION: get_revenue_report
CREATE OR REPLACE FUNCTION get_revenue_report(
  p_start_date DATE DEFAULT (CURRENT_DATE - INTERVAL '12 months'),
  p_end_date DATE DEFAULT CURRENT_DATE,
  p_sub_admin_id UUID DEFAULT NULL
)
RETURNS TABLE (
  month_label TEXT,
  total_amount NUMERIC,
  payment_count BIGINT
) LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT
    TO_CHAR(p.paid_at, 'YYYY-MM') AS month_label,
    SUM(p.amount) AS total_amount,
    COUNT(*)::BIGINT AS payment_count
  FROM public.payments p
  JOIN public.bookings b ON b.id = p.booking_id
  WHERE p.payment_status = 'paid'
    AND p.paid_at::DATE BETWEEN p_start_date AND p_end_date
    AND (p_sub_admin_id IS NULL OR b.sub_admin_id = p_sub_admin_id)
  GROUP BY TO_CHAR(p.paid_at, 'YYYY-MM')
  ORDER BY month_label ASC;
$$;

-- FUNCTION: get_zone_occupancy
CREATE OR REPLACE FUNCTION get_zone_occupancy(
  p_sub_admin_id UUID DEFAULT NULL
)
RETURNS TABLE (
  zone_id UUID,
  zone_name TEXT,
  total_slots BIGINT,
  occupied_slots BIGINT,
  available_slots BIGINT,
  occupancy_percent NUMERIC
) LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT
    pz.id AS zone_id,
    pz.zone_name,
    COUNT(ps.id)::BIGINT AS total_slots,
    COUNT(ps.id) FILTER (WHERE ps.status IN ('booked','occupied'))::BIGINT AS occupied_slots,
    COUNT(ps.id) FILTER (WHERE ps.status = 'available')::BIGINT AS available_slots,
    ROUND(
      COUNT(ps.id) FILTER (WHERE ps.status IN ('booked','occupied'))::NUMERIC
      / NULLIF(COUNT(ps.id), 0) * 100, 2
    ) AS occupancy_percent
  FROM public.parking_zones pz
  LEFT JOIN public.parking_slots ps ON ps.zone_id = pz.id AND ps.deleted_at IS NULL
  WHERE p_sub_admin_id IS NULL OR pz.sub_admin_id = p_sub_admin_id
  GROUP BY pz.id, pz.zone_name;
$$;

-- FUNCTION: get_user_bookings
CREATE OR REPLACE FUNCTION get_user_bookings(p_user_id UUID)
RETURNS TABLE (
  booking_id UUID, booking_code TEXT, slot_id UUID, unique_slot_id TEXT,
  zone_name TEXT, booking_start_date DATE, booking_end_date DATE,
  booking_status booking_status, payment_status payment_status
) LANGUAGE sql SECURITY DEFINER STABLE AS $$
  SELECT b.id, b.booking_code, b.slot_id, ps.unique_slot_id,
         pz.zone_name, b.booking_start_date, b.booking_end_date,
         b.booking_status, b.payment_status
  FROM public.bookings b
  JOIN public.parking_slots ps ON ps.id = b.slot_id
  JOIN public.parking_zones pz ON pz.id = ps.zone_id
  WHERE b.user_id = p_user_id AND b.deleted_at IS NULL
  ORDER BY b.created_at DESC;
$$;

=======================================================================
STEP 11 — SEED DATA
=======================================================================

DO $$
DECLARE
  v_super_admin_id UUID := gen_random_uuid();
  v_sub1 UUID := gen_random_uuid();
  v_sub2 UUID := gen_random_uuid();
  v_sub3 UUID := gen_random_uuid();
  v_div1 UUID := gen_random_uuid();
  v_div2 UUID := gen_random_uuid();
  v_div3 UUID := gen_random_uuid();
  v_dist UUID[] := ARRAY(SELECT gen_random_uuid() FROM generate_series(1,10));
  v_area UUID[] := ARRAY(SELECT gen_random_uuid() FROM generate_series(1,20));
  v_zone UUID[] := ARRAY(SELECT gen_random_uuid() FROM generate_series(1,20));
  v_users UUID[] := ARRAY(SELECT gen_random_uuid() FROM generate_series(1,10));
  v_vehicles UUID[] := ARRAY(SELECT gen_random_uuid() FROM generate_series(1,10));
  i INTEGER;
BEGIN

-- Profiles: 1 super admin
INSERT INTO public.profiles (id, unique_id, role, first_name, last_name, username, email, phone, address, is_active)
VALUES (v_super_admin_id, 'USR-SA-001', 'super_admin', 'Super', 'Admin', 'superadmin', 'superadmin@parkpro.com', '01700000001', 'Dhaka, Bangladesh', TRUE);

-- Profiles: 3 sub admins
INSERT INTO public.profiles (id, unique_id, role, parent_admin_id, first_name, last_name, username, email, phone, address, is_active) VALUES
(v_sub1, 'USR-SUB-001', 'sub_admin', v_super_admin_id, 'Rahim', 'Khan', 'rahim_khan', 'rahim@parkpro.com', '01711000001', 'Dhaka', TRUE),
(v_sub2, 'USR-SUB-002', 'sub_admin', v_super_admin_id, 'Karim', 'Ahmed', 'karim_ahmed', 'karim@parkpro.com', '01711000002', 'Chittagong', TRUE),
(v_sub3, 'USR-SUB-003', 'sub_admin', v_super_admin_id, 'Hasan', 'Ali', 'hasan_ali', 'hasan@parkpro.com', '01711000003', 'Sylhet', TRUE);

-- Divisions
INSERT INTO public.divisions (id, name, code) VALUES
(v_div1, 'Dhaka Division', 'DHK'),
(v_div2, 'Chittagong Division', 'CTG'),
(v_div3, 'Sylhet Division', 'SYL');

-- Districts (10)
INSERT INTO public.districts (id, division_id, name, code) VALUES
(v_dist[1], v_div1, 'Dhaka District', 'DHK-01'),
(v_dist[2], v_div1, 'Gazipur', 'DHK-02'),
(v_dist[3], v_div1, 'Narayanganj', 'DHK-03'),
(v_dist[4], v_div1, 'Manikganj', 'DHK-04'),
(v_dist[5], v_div2, 'Chittagong District', 'CTG-01'),
(v_dist[6], v_div2, 'Cox Bazar', 'CTG-02'),
(v_dist[7], v_div2, 'Comilla', 'CTG-03'),
(v_dist[8], v_div3, 'Sylhet District', 'SYL-01'),
(v_dist[9], v_div3, 'Moulvibazar', 'SYL-02'),
(v_dist[10], v_div3, 'Habiganj', 'SYL-03');

-- Areas (20)
FOR i IN 1..20 LOOP
  INSERT INTO public.areas (id, district_id, name, code)
  VALUES (
    v_area[i],
    v_dist[((i-1) % 10) + 1],
    'Area ' || i,
    'AREA-' || LPAD(i::TEXT, 3, '0')
  );
END LOOP;

-- Zones (20)
FOR i IN 1..20 LOOP
  INSERT INTO public.parking_zones (id, area_id, sub_admin_id, zone_name, zone_code, description, is_active)
  VALUES (
    v_zone[i],
    v_area[((i-1) % 20) + 1],
    CASE WHEN i % 3 = 0 THEN v_sub3 WHEN i % 2 = 0 THEN v_sub2 ELSE v_sub1 END,
    'Zone ' || i,
    'ZN-' || LPAD(i::TEXT, 3, '0'),
    'Parking zone ' || i || ' description',
    TRUE
  );
END LOOP;

-- Parking Slots (100 slots across zones)
FOR i IN 1..100 LOOP
  INSERT INTO public.parking_slots (zone_id, unique_slot_id, slot_type, price, status, max_requests, is_active)
  VALUES (
    v_zone[((i-1) % 20) + 1],
    'SLT-' || LPAD(i::TEXT, 4, '0'),
    (ARRAY['car','bike','truck','bus']::slot_type[])[(i % 4) + 1],
    CASE (i % 4)
      WHEN 0 THEN 1500.00
      WHEN 1 THEN 800.00
      WHEN 2 THEN 3000.00
      ELSE 5000.00
    END,
    'available',
    5,
    TRUE
  );
END LOOP;

-- Users (10)
FOR i IN 1..10 LOOP
  INSERT INTO public.profiles (id, unique_id, role, parent_admin_id, first_name, last_name, username, email, phone, user_type, is_active)
  VALUES (
    v_users[i],
    'USR-U-' || LPAD(i::TEXT, 3, '0'),
    'user',
    CASE WHEN i % 3 = 0 THEN v_sub3 WHEN i % 2 = 0 THEN v_sub2 ELSE v_sub1 END,
    'User' || i,
    'Test',
    'user_' || i,
    'user' || i || '@parkpro.com',
    '018' || LPAD(i::TEXT, 8, '0'),
    (ARRAY['driver','owner']::user_type[])[((i % 2) + 1)],
    TRUE
  );
END LOOP;

-- Vehicles (10)
FOR i IN 1..10 LOOP
  INSERT INTO public.vehicles (id, user_id, vehicle_type, vehicle_number, license_number, brand, model, color)
  VALUES (
    v_vehicles[i],
    v_users[i],
    (ARRAY['car','bike','truck','bus']::vehicle_type[])[(i % 4) + 1],
    'DHAKA-' || LPAD(i::TEXT, 4, '0'),
    'LIC-' || LPAD(i::TEXT, 6, '0'),
    (ARRAY['Toyota','Honda','Suzuki','Yamaha','Tata'])[((i % 5) + 1)],
    'Model ' || i,
    (ARRAY['Red','Blue','White','Black','Silver'])[((i % 5) + 1)]
  );
END LOOP;

-- Booking Requests + Bookings (5)
FOR i IN 1..5 LOOP
  PERFORM create_booking_request(
    (SELECT id FROM public.parking_slots WHERE status = 'available' LIMIT 1 OFFSET i-1),
    v_users[i]
  );
END LOOP;

-- Reviews (5)
FOR i IN 1..5 LOOP
  INSERT INTO public.reviews (user_id, rating, review, comment, status)
  VALUES (
    v_users[i],
    (i % 5) + 1,
    'Review by user ' || i,
    'Great service and easy booking experience.',
    'approved'
  );
END LOOP;

END $$;
