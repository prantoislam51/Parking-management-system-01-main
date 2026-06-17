# CHAPTER 3: SYSTEM REQUIREMENTS AND SPECIFICATION

## 3.1 Functional Requirements
Functional requirements define the specific behaviors, services, and operations that the system must provide. For ParkPro, these requirements are organized according to the user hierarchy.

### 3.1.1 Super Admin Requirements
* **FR-SA-1 (Sub-Admin Provisioning):** The system must allow Super Admins to create new Sub-Admin accounts, assign them to geographical regions, and suspend or delete their accounts.
* **FR-SA-2 (Geographical Configuration):** The system must allow Super Admins to manage the administrative structure, including adding, editing, and deleting Divisions, Districts, and Areas.
* **FR-SA-3 (User Blacklisting):** The Super Admin must be able to blacklist any user profile, rendering them unable to create new booking requests, and log the reason in the database.
* **FR-SA-4 (Audit Log View):** The Super Admin must have a dedicated view to inspect all system actions (inserts, updates, deletes, and approvals) performed by any user, including their IP address and timestamps.
* **FR-SA-5 (Revenue Overview):** The Super Admin must be able to view aggregate revenue reports across all zones, filtered by date ranges and payment methods.

### 3.1.2 Sub Admin Requirements
* **FR-SUB-1 (Zone Management):** Sub Admins must be able to view and manage their assigned parking zones.
* **FR-SUB-2 (Slot Creation and Pricing):** Sub Admins must be able to add parking slots to their zones and specify their slot type (car, bike, truck, bus) and monthly rental price.
* **FR-SUB-3 (Booking Request Moderation):** Sub Admins must receive real-time notifications of incoming requests and be able to Approve or Reject them (providing a rejection reason).
* **FR-SUB-4 (Slot Status Toggle):** Sub Admins must be able to toggle the status of slots manually, such as putting a slot into 'maintenance' mode.
* **FR-SUB-5 (Local Financial Reports):** Sub Admins must be able to view monthly revenue reports and occupant analytics specific to their zones.

### 3.1.3 User (Driver/Owner) Requirements
* **FR-U-1 (Registration and Multi-Step Onboarding):** Users must be able to register an account by providing basic info, choosing their user type (driver/owner), uploading a profile image, and providing their NID or passport number.
* **FR-U-2 (Vehicle Registration):** Users must be able to add, edit, or delete multiple vehicles, specifying vehicle type, brand, model, color, and license plate number.
* **FR-U-3 (Slot Search and Filtering):** Users must be able to search for available slots based on Division, District, Area, Slot Type, and Price Range.
* **FR-U-4 (Booking Request Submission):** Users must be able to select a slot, input the start date and duration (in months), select one of their registered vehicles, and submit a booking request.
* **FR-U-5 (Secure Cashless Payment):** Users must be able to pay for their approved bookings using mobile banking (bKash/Nagad) or cards, inputting transaction IDs for manual or automatic validation.
* **FR-U-6 (Booking Cancellation):** Users must be able to cancel their bookings, which automatically frees up the parking slot.
* **FR-U-7 (Support Ticket Creation):** Users must be able to open support tickets to report issues to the administrator.
* **FR-U-8 (Review Submission):** Users must be able to submit ratings (1 to 5 stars) and reviews for the service.

---

## 3.2 Non-Functional Requirements
Non-functional requirements specify the criteria used to judge the operation of the system, rather than specific behaviors.

### 3.2.1 Performance
* **Response Time:** Page loads and API responses must be delivered in under 2 seconds under normal network conditions.
* **Database Queries:** Database queries must utilize optimized indexes to ensure that search queries against slots and zones execute in less than 200 milliseconds.
* **Real-time Sync latency:** Booking request updates and notification deliveries must reflect on user dashboards within 1.5 seconds of the database change.

### 3.2.2 Security
* **Data Protection:** All API interactions must be governed by PostgreSQL Row Level Security (RLS) policies. Raw database keys (service role keys) must never be exposed to the client.
* **Authentication:** User authentication must utilize secure JWT (JSON Web Tokens) handled by Supabase Auth.
* **Audit Trail:** Every data-modifying operation must trigger an audit log entry documenting the actor, target table, action type, and timestamp.
* **Input Validation:** All client forms must undergo client-side validation using React Hook Form + Zod, and server-side validation enforced by PostgreSQL constraints.

### 3.2.3 Reliability and Availability
* **Uptime:** The system must aim for a 99.9% uptime, utilizing cloud-hosted infrastructure (Supabase and Vercel).
* **Fault Tolerance:** If a payment gateway API fails, the booking status must remain 'unpaid' without database corruption, allowing the user to retry the payment.
* **Concurrency:** The database must handle concurrent booking requests for the same slot without double-booking, enforced by PostgreSQL transaction isolation and triggers.

### 3.2.4 Usability
* **User Interface:** The UI must follow modern design guidelines, using an aesthetic color scheme (Navy Blue, Emerald Green, Amber), clean typography, and clear visual status indicators.
* **Mobile Responsiveness:** 100% of user pages and forms must be fully responsive, adopting a touch-friendly bottom navigation bar on screens under 768px wide.
* **Internationalization:** The system must support bilingual toggling between English and Bengali (bn).

---

## 3.3 User Stories and Scenarios

### Scenario A: A Driver Booking a Parking Slot
* **As a** Registered Driver named Tanvir,
* **I want to** search for a car parking slot in Banani, Dhaka,
* **So that** I can secure a monthly parking space for my new vehicle.
* **Flow:** 
  1. Tanvir logs into the ParkPro User Dashboard.
  2. He navigates to "Browse Slots" and filters by Division (Dhaka), District (Dhaka District), Area (Banani), and Slot Type (Car).
  3. The system displays a grid of available slots. He selects a slot priced at 3,500 BDT/month.
  4. He inputs a start date (June 1, 2026), selects a duration of 3 months, selects his Toyota Premio car, and clicks "Request Booking".
  5. The screen shifts to a "Pending Approval" state, and the slot status is locked to "pending" to prevent other users from occupying it.

### Scenario B: A Sub Admin Approving a Request
* **As a** Sub Admin named Rahim (Zone Manager for Banani),
* **I want to** review the booking request submitted by Tanvir,
* **So that** I can verify his vehicle details and approve his parking booking.
* **Flow:**
  1. Rahim receives a real-time notification on his dashboard: "New booking request for Slot SLT-0045".
  2. He opens the "Requests" page, inspects Tanvir's profile, and verifies his vehicle number (Dhaka Metro-Ga-45-6789) and license number.
  3. Rahim clicks the "Approve" button.
  4. The system automatically shifts Tanvir's request to "approved", creates a booking entry, automatically rejects any other pending requests for that slot, and updates the slot status to "booked".
  5. Tanvir receives a notification: "Your booking request has been approved. Please complete your payment."

### Scenario C: Super Admin Blacklisting a Malicious User
* **As a** Super Admin,
* **I want to** block a user who has consistently violated parking terms,
* **So that** I can maintain the security and integrity of the parking zone.
* **Flow:**
  1. The Super Admin navigates to the "Users" list and searches for the user's username.
  2. The Admin clicks "Blacklist User", enters the reason ("Frequent non-payment and blocking driveway"), and confirms.
  3. The database updates `is_blacklisted = TRUE` in the user's profile and logs the action in the `blacklist` and `audit_logs` tables.
  4. The user receives a system notification, is logged out, and any attempts to log back in or book a slot are blocked by RLS policies and triggers.

---

## 3.4 System Stack Specification
The following software configurations are designated for the development, deployment, and testing of the system:

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Frontend Framework** | Next.js (App Router) | 14.x | Core Web Application |
| **Language** | TypeScript | 5.x | Strict static typing |
| **Styling** | Tailwind CSS + shadcn/ui | 3.x / Radix UI | Responsive and modern styling |
| **State Management** | Zustand | 4.x | Client-side persistent state |
| **Database Engine** | PostgreSQL (Supabase) | 15.x | Data storage, triggers, and RLS |
| **Authentication** | Supabase GoTrue Auth | - | Secure session management |
| **Charts** | Recharts | 2.x | Revenue & occupancy analytics |
| **File Storage** | Supabase Storage Buckets | - | Avatars (public) & Documents (private) |
| **Deployment Platform** | Vercel | - | Frontend hosting |
