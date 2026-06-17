# CHAPTER 5: DATABASE ARCHITECTURE AND DATA DICTIONARY

## 5.1 Relational Database Model
ParkPro uses a PostgreSQL relational database. The schema is normalized up to the Third Normal Form (3NF) to minimize data redundancy, eliminate update anomalies, and ensure referential integrity. 

Key architectural elements include:
* **Strict Hierarchies:** Geographical and administrative structures are enforced using cascading foreign key relationships.
* **UUID Primary Keys:** All tables use globally unique identifiers (UUIDs) for primary keys rather than auto-incrementing integers, preventing enumeration attacks and preparing the database for future distributed replication.
* **Timestamps:** Every record tracks creation and update times, and crucial tables (like profiles, slots, and bookings) utilize `deleted_at` timestamps to support soft-deletion, preserving historical data for audit and revenue analysis.

---

## 5.2 Data Dictionary
Below is a detailed breakdown of all tables in the ParkPro database, including column names, data types, constraints, and descriptions.

### 5.2.1 Table: `profiles`
Stores profile details for all users, linked to Supabase authentication.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, FK (auth.users) | Unique user ID from auth system. |
| `unique_id` | TEXT | Unique, NOT NULL | Public ID, e.g., USR-20260522-83HA1D. |
| `role` | user_role | NOT NULL, DEFAULT 'user' | Enum: `super_admin`, `sub_admin`, `user`. |
| `parent_admin_id`| UUID | FK (profiles), NULLABLE | Super Admin ID for sub-admins; Sub-Admin ID for users. |
| `first_name` | TEXT | NOT NULL | First name. |
| `last_name` | TEXT | NOT NULL | Last name/Surname. |
| `username` | TEXT | Unique, NOT NULL | Unique handle for login/profile. |
| `email` | TEXT | Unique, NOT NULL | Primary email address. |
| `phone` | TEXT | Unique, NOT NULL | Primary mobile number. |
| `address` | TEXT | NULLABLE | Billing or residential address. |
| `profession` | TEXT | NULLABLE | User's profession. |
| `user_type` | user_type | NULLABLE | Enum: `driver`, `owner`. |
| `nid_number` | TEXT | NULLABLE | National ID number. |
| `passport_number`| TEXT | NULLABLE | Passport number (alternative verification). |
| `profile_image` | TEXT | NULLABLE | Supabase storage URL. |
| `emergency_contact`| TEXT | NULLABLE | Emergency phone number. |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Status flag. If FALSE, login is blocked. |
| `is_blacklisted` | BOOLEAN | NOT NULL, DEFAULT FALSE| If TRUE, booking requests are blocked. |
| `password_reset_required`| BOOLEAN| NOT NULL, DEFAULT FALSE| Flag for forced password resets. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |
| `updated_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Last update timestamp. |
| `deleted_at` | TIMESTAMPTZ| NULLABLE | soft-delete timestamp. |

---

### 5.2.2 Table: `divisions`
Top-level geographical divisions (e.g., Dhaka, Chittagong).

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique division ID. |
| `name` | TEXT | NOT NULL | Name of the division. |
| `code` | TEXT | Unique, NOT NULL | Short code (e.g., DHK, CTG). |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.3 Table: `districts`
Districts situated within a division.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique district ID. |
| `division_id` | UUID | FK (divisions) ON DELETE CASCADE | Parent division ID. |
| `name` | TEXT | NOT NULL | Name of the district. |
| `code` | TEXT | Unique, NOT NULL | District code (e.g., DHK-01). |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.4 Table: `areas`
Specific sub-district areas (e.g., Banani, Gulshan).

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique area ID. |
| `district_id` | UUID | FK (districts) ON DELETE CASCADE | Parent district ID. |
| `name` | TEXT | NOT NULL | Name of the area. |
| `code` | TEXT | Unique, NOT NULL | Area code (e.g., AREA-001). |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.5 Table: `parking_zones`
Defined parking zones managed by a Sub Admin.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique zone ID. |
| `area_id` | UUID | FK (areas) ON DELETE CASCADE | Parent area ID. |
| `sub_admin_id` | UUID | FK (profiles) ON DELETE RESTRICT | Assigned Sub Admin ID. |
| `zone_name` | TEXT | NOT NULL | Name of the parking zone. |
| `zone_code` | TEXT | Unique, NOT NULL | Zone code (e.g., ZN-001). |
| `description` | TEXT | NULLABLE | Description of location rules. |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Status of the zone. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.6 Table: `parking_slots`
Individual physical parking slots within a zone.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique slot ID. |
| `zone_id` | UUID | FK (parking_zones) ON DELETE CASCADE| Parent zone ID. |
| `unique_slot_id`| TEXT | Unique, NOT NULL | Public slot ID (e.g., SLT-0001). |
| `slot_type` | slot_type | NOT NULL | Enum: `car`, `bike`, `truck`, `bus`. |
| `price` | NUMERIC(10,2)| NOT NULL, CHECK (price > 0) | Monthly rental price in BDT. |
| `status` | slot_status| NOT NULL, DEFAULT 'available' | Enum: `available`, `pending`, `booked`, `occupied`, `cancelled`, `maintenance`. |
| `max_requests` | INTEGER | NOT NULL, DEFAULT 5, CHECK (<= 5)| Maximum pending requests allowed concurrently. |
| `is_active` | BOOLEAN | NOT NULL, DEFAULT TRUE | Active status flag. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |
| `updated_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Last update timestamp. |
| `deleted_at` | TIMESTAMPTZ| NULLABLE | soft-delete timestamp. |

---

### 5.2.7 Table: `vehicles`
User-owned vehicles eligible for booking.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique vehicle ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Owner's profile ID. |
| `vehicle_type` | vehicle_type| NOT NULL | Enum: `car`, `bike`, `truck`, `bus`. |
| `vehicle_number`| TEXT | Unique, NOT NULL | BD registration plate (e.g., DHAKA-G-12-34). |
| `license_number`| TEXT | NOT NULL | Driving or vehicle license number. |
| `brand` | TEXT | NULLABLE | Brand of the vehicle. |
| `model` | TEXT | NULLABLE | Model designation. |
| `color` | TEXT | NULLABLE | Exterior color. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.8 Table: `booking_requests`
Intermediate table representing requests submitted by drivers.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique request ID. |
| `slot_id` | UUID | FK (parking_slots) ON DELETE CASCADE| Targeted slot ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Requesting driver ID. |
| `request_status`| booking_status| NOT NULL, DEFAULT 'pending'| Status: `pending`, `approved`, `rejected`, `cancelled`, `completed`, `expired`. |
| `requested_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Request submission timestamp. |

---

### 5.2.9 Table: `bookings`
Approved bookings generated from requests.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique booking ID. |
| `booking_code` | TEXT | Unique, NOT NULL | Public code, e.g., BKG-20260522-83HA1D. |
| `booking_request_id`| UUID | FK (booking_requests) ON DELETE RESTRICT | Source request ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Driver ID. |
| `slot_id` | UUID | FK (parking_slots) ON DELETE CASCADE| Reserved slot ID. |
| `sub_admin_id` | UUID | FK (profiles) ON DELETE RESTRICT | Slot manager ID. |
| `booking_start_date`| DATE | NOT NULL | Date when parking lease starts. |
| `booking_end_date`| DATE | NOT NULL, CHECK (> start_date)| Date when parking lease ends. |
| `duration_month`| INTEGER | NOT NULL, CHECK (> 0) | Duration of the lease in months. |
| `booking_status`| booking_status| NOT NULL, DEFAULT 'approved'| Overall booking status. |
| `payment_status`| payment_status| NOT NULL, DEFAULT 'unpaid'| Payment status (unpaid, paid, refunded). |
| `approved_by` | UUID | FK (profiles) ON DELETE SET NULL| Sub-Admin who approved. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Booking creation timestamp. |
| `updated_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Last update timestamp. |
| `cancelled_at` | TIMESTAMPTZ| NULLABLE | Cancellation timestamp. |
| `deleted_at` | TIMESTAMPTZ| NULLABLE | soft-delete timestamp. |

---

### 5.2.10 Table: `payments`
Financial transaction records linked to bookings.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique transaction ID. |
| `booking_id` | UUID | FK (bookings) ON DELETE CASCADE | Target booking ID. |
| `amount` | NUMERIC(10,2)| NOT NULL | Amount paid in BDT. |
| `payment_method`| payment_method| NOT NULL | Enum: `bkash`, `nagad`, `bank`, `sslcommerz`. |
| `transaction_id`| TEXT | Unique, NOT NULL | gateway transaction ID. |
| `payment_status`| payment_status| NOT NULL, DEFAULT 'unpaid'| Payment status. |
| `paid_at` | TIMESTAMPTZ| NULLABLE | payment completion timestamp. |

---

### 5.2.11 Table: `notifications`
In-app notifications sent to users.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique notification ID. |
| `receiver_id` | UUID | FK (profiles) ON DELETE CASCADE | Recipient user ID. |
| `sender_id` | UUID | FK (profiles) ON DELETE SET NULL, NULLABLE | Sender user ID. |
| `type` | notification_type| NOT NULL | Enum: `booking`, `payment`, `approval`, etc. |
| `message` | TEXT | NOT NULL | Notification body. |
| `is_read` | BOOLEAN | NOT NULL, DEFAULT FALSE | Read state indicator. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.12 Table: `reviews`
User feedback rating (1-5 stars) and comments.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique review ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Reviewing driver ID. |
| `rating` | INTEGER | NOT NULL, CHECK (>= 1 AND <= 5) | Star rating value. |
| `review` | TEXT | NULLABLE | Review title/summary. |
| `comment` | TEXT | NULLABLE | Detailed feedback comment. |
| `status` | review_status| NOT NULL, DEFAULT 'pending' | Enum: `pending`, `approved`, `hidden`. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.13 Table: `support_tickets`
User service queries or support requests.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique ticket ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Creating user ID. |
| `subject` | TEXT | NOT NULL | Summary of the issue. |
| `message` | TEXT | NOT NULL | Description of the issue. |
| `status` | ticket_status| NOT NULL, DEFAULT 'open' | Enum: `open`, `in_progress`, `resolved`, `closed`. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Record creation timestamp. |

---

### 5.2.14 Table: `blacklist`
Contains list of blacklisted users and reasons.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique blacklist entry ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Blacklisted user ID. |
| `admin_id` | UUID | FK (profiles) ON DELETE RESTRICT| Admin ID who blacklisted. |
| `reason` | TEXT | NOT NULL | Reason for blacklisting. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Timestamp of blacklisting. |

---

### 5.2.15 Table: `audit_logs`
Chronological records of database actions.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique log ID. |
| `actor_id` | UUID | FK (profiles) ON DELETE SET NULL, NULLABLE | User ID who took the action. |
| `actor_role` | user_role | NOT NULL | Role of the actor. |
| `action` | audit_action | NOT NULL | Enum: `insert`, `update`, `delete`, `approval`, etc. |
| `target_id` | UUID | NULLABLE | ID of the target record. |
| `target_table` | TEXT | NULLABLE | Target table name. |
| `description` | TEXT | NULLABLE | Description of the change. |
| `ip_address` | TEXT | NULLABLE | IP address of the client. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Action timestamp. |

---

### 5.2.16 Table: `login_history`
Security log tracking user logins.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique login log ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | User ID who logged in. |
| `ip_address` | TEXT | NULLABLE | IP address of the client. |
| `device` | TEXT | NULLABLE | User agent string/device model. |
| `login_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Login timestamp. |

---

### 5.2.17 Table: `password_reset_logs`
Logs reset actions for compliance auditing.

| Column Name | Data Type | Constraints | Description |
|---|---|---|---|
| `id` | UUID | PK, DEFAULT uuid_generate_v4() | Unique reset log ID. |
| `user_id` | UUID | FK (profiles) ON DELETE CASCADE | Target user ID. |
| `reset_by` | UUID | FK (profiles) ON DELETE SET NULL, NULLABLE | Admin ID who reset the password. |
| `reset_reason` | TEXT | NULLABLE | Reason for reset. |
| `created_at` | TIMESTAMPTZ| NOT NULL, DEFAULT NOW() | Action timestamp. |
