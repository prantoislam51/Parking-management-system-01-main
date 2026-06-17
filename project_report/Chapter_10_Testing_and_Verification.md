# CHAPTER 10: TESTING, VERIFICATION, AND FUTURE ENHANCEMENTS

## 10.1 Testing Strategy
To ensure the system's stability, security, and performance, a multi-tiered testing strategy was adopted during development.

1. **Unit Testing:** Verified individual helper functions (such as ID generation formats and date calculation utilities) using **Jest**.
2. **Integration Testing:** Verified database triggers and transaction flows (e.g., checking if approving a request successfully rejects competing requests and updates the slot status) by executing SQL transactions in the Supabase test environment.
3. **Security Testing:** Verified that Row Level Security (RLS) policies correctly blocked unauthorized access. Tests were conducted by authenticating as a standard user and attempting to query administrative tables like `audit_logs` or `blacklist`.
4. **Load Testing:** Simulated concurrent user activity (using tools like **k6**) to verify that the database could handle multiple booking requests for the same slot without double-booking or transaction deadlocks.

---

## 10.2 Manual Test Cases and Verification Results
Below are the manual test cases executed to verify core business flows:

| Test ID | Test Scenario | Steps to Execute | Expected Result | Status |
|---|---|---|---|---|
| **TC-01** | User Registration Validation | Submit registration form with empty email and invalid phone number. | Form submission is blocked; Zod validation displays inline error messages. | **Passed** |
| **TC-02** | Multi-Vehicle Registration | Navigate to Vehicles page, click "Add Vehicle", enter valid details, and save. | Vehicle card renders in UI; record is inserted in the `vehicles` table. | **Passed** |
| **TC-03** | Max Pending Requests Limit | Attempt to insert a 6th pending booking request for Slot SLT-0012. | Transaction fails; trigger raises exception: "Maximum 5 pending requests allowed." | **Passed** |
| **TC-04** | Blacklist Enforcement | Blacklist User A. Attempt to submit a booking request as User A. | Action fails; trigger raises exception: "Blacklisted users cannot create requests." | **Passed** |
| **TC-05** | Auto-Rejection Trigger | Approve Request A for Slot SLT-0005. Check status of Request B for same slot. | Request A becomes 'approved'; Request B is updated to 'rejected'; slot is locked to 'booked'.| **Passed** |
| **TC-06** | Cancellation Slot Release | Cancel active Booking A. Inspect slot status. | Booking status updates to 'cancelled'; slot status changes to 'available'. | **Passed** |
| **TC-07** | Unauthorized API Prevention | Attempt to update `profiles` table role using client API key. | Database rejects request; RLS policy blocks access. | **Passed** |
| **TC-08** | Payment Verification | Submit a payment with Transaction ID. Check analytics. | Booking updates to 'completed'; payment is recorded; revenue analytics update. | **Passed** |

---

## 10.3 Performance Optimizations
To achieve fast response times under load, several performance optimizations were implemented:

* **Next.js Image Component:** All user avatars and UI illustrations utilize the Next.js `<Image />` component, which automatically optimizes, resizes, and lazy-loads images in modern formats like WebP.
* **React Query (TanStack Query) Caching:** Client-side dashboards cache database query results. When navigating between tabs, the application displays cached data instantly while refetching in the background, minimizing loading screens.
* **Search Input Debouncing:** Global searches on slots, users, and audit logs implement a 300ms debounce. The system waits until the user finishes typing before executing the API query, reducing database query overhead.
* **Database Indexing:** We created indexes on high-frequency query columns, including `profiles(email, phone, role)`, `parking_slots(status, slot_type)`, `bookings(booking_status, payment_status)`, and `audit_logs(actor_id)`.

---

## 10.4 Future Enhancements and Roadmap
While the current version of ParkPro is fully operational, several advanced features are planned for future iterations:

### 10.4.1 IoT Sensor Integration
To eliminate the need for manual slot status updates:
* We plan to install ultrasonic distance sensors (e.g., HC-SR04) at each physical parking slot, controlled by ESP32 microcontrollers.
* The microcontrollers will publish slot occupancy status (occupied/available) directly to a cloud MQTT broker (such as HiveMQ).
* An MQTT-to-PostgreSQL bridge will update the `parking_slots` table, reflecting real-world occupancy in the Next.js UI in real-time.

### 10.4.2 License Plate Recognition (LPR)
* Install CCTV cameras at parking entry and exit gates.
* Feed the video stream into a machine learning model (e.g., YOLOv8 for plate detection and Tesseract OCR for character recognition) to identify incoming vehicles.
* The system will match the recognized plate with the driver's registered vehicle number in the database, automatically opening the gate and initiating the booking timer without human intervention.

### 10.4.3 Dynamic Pricing Algorithm
* Implement a machine learning model (using Python/FastAPI) that analyzes historical booking occupancy, local traffic levels, weather, and seasonal events.
* The model will dynamically adjust parking rates (e.g., increasing rates during peak office hours in commercial districts and reducing them during off-peak hours) to maximize space owner revenue.

### 10.4.4 Electric Vehicle (EV) Charging integration
* Add support for EV charging slots.
* Drivers can request a slot equipped with a smart EV charger.
* The system will calculate charging duration and add the electricity fee directly to their booking bill at checkout.
