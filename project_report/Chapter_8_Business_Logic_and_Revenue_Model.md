# CHAPTER 8: BUSINESS LOGIC, REVENUE MODELS, AND FINANCIAL ANALYSIS

## 8.1 Pricing Strategy and Location Classification
ParkPro implements a flexible pricing model where the rental cost of a parking slot is determined by two main dimensions: **Slot Type** (Car, Bike, Truck, Bus) and **Geographical Location** (Division capital, District town, Area status).

### 8.1.1 Location Classification (Tiers)
To reflect different land valuations, locations are classified into three pricing tiers:
1. **Tier A (Prime Commercial/Metropolitan Areas):** Includes commercial centers in major divisions (e.g., Gulshan, Banani, Motijheel in Dhaka; Agrabad in Chittagong). Land valuation is high, and parking slots are in high demand.
2. **Tier B (Standard Residential/Urban Areas):** Residential neighborhoods in divisional capitals (e.g., Mirpur, Uttara in Dhaka) or commercial areas in district capitals (e.g., Comilla, Gazipur).
3. **Tier C (Suburban/District Towns):** Suburban locations and smaller districts (e.g., Moulvibazar, Habiganj) where land valuation is lower.

### 8.1.2 Base Monthly Rental Grid (BDT)
Below is the standard pricing grid used by Sub Admins as a baseline for monthly leases:

| Vehicle Type | Tier A (Prime) | Tier B (Standard) | Tier C (Suburban) |
|---|---|---|---|
| **Motorbike** | 1,000 BDT | 500 BDT | 300 BDT |
| **Private Car / SUV** | 4,000 BDT | 2,500 BDT | 1,500 BDT |
| **Mini-Bus / Microbus** | 6,000 BDT | 4,000 BDT | 2,500 BDT |
| **Heavy Truck / Cargo Bus**| 10,000 BDT | 7,000 BDT | 5,000 BDT |

---

## 8.2 Revenue Generation Channels
ParkPro generates revenue through four main channels, creating a sustainable financial model:

1. **Platform Commission (Transactional Fee):** The system charges a percentage commission (typically 10% to 15%) on all completed parking bookings. For example, if a driver pays 4,000 BDT for a Tier A car slot, the platform retains 400 BDT to 600 BDT as operational revenue, and the remaining amount is transferred to the space owner (Sub Admin).
2. **Premium Listing Fees:** Space owners can pay a flat monthly fee to list their slots under "Featured Parking Spots" at the top of the search results, driving higher occupancy.
3. **Cancellation Penalty Fees:** If a user cancels an approved booking after a specific grace period (e.g., 24 hours), the system retains a cancellation fee (e.g., 10% of the monthly fee), which is split between the platform and the Sub Admin.
4. **Convenience Charges:** A small processing fee (e.g., 2% of the transaction amount) is charged to cover MFS/payment gateway charges (such as bKash/SSLCommerz fees).

---

## 8.3 Profit & Loss Reporting Architecture
The database function `get_booking_analytics()` calculates realized and unrealized financial positions in real-time.

* **Realized Revenue:** Sum of all transactions in the `payments` table where `payment_status = 'paid'`. This represents the actual cash collected.
* **Unrealized Revenue (Pending Accounts Receivable):** Sum of all approved bookings in the `bookings` table where `payment_status = 'unpaid'`. This represents expected income that has not yet been collected.
* **Financial Position Analysis:** If a booking's end date passes without payment, the booking status transitions to `'expired'`. The system moves the associated amount to the "Loss/Unpaid" column in reports, enabling administrators to identify zones with high delinquency rates.

---

## 8.4 Case Study: Motijheel Zone Business Model
To demonstrate the financial viability of ParkPro, we present a financial projection for a single commercial parking zone in Motijheel, Dhaka, managed by a Sub Admin (Space Owner) using our platform.

### 8.4.1 Zone Assumptions:
* **Total Slots:** 50 slots (30 Cars, 15 Bikes, 5 Buses/Trucks).
* **Location Tier:** Tier A (Prime Commercial).
* **Occupancy Rate:** 80% (Conservative projection).
* **Commission Rate:** 10% platform commission.

### 8.4.2 Monthly Revenue Calculation:

* **Cars:** $24 \text{ occupied slots} \times 4,000 \text{ BDT} = 96,000 \text{ BDT}$
* **Bikes:** $12 \text{ occupied slots} \times 1,000 \text{ BDT} = 12,000 \text{ BDT}$
* **Buses/Trucks:** $4 \text{ occupied slots} \times 10,000 \text{ BDT} = 40,000 \text{ BDT}$
* **Total Zone Monthly Revenue:** $148,000 \text{ BDT}$

### 8.4.3 Distribution of Income:
* **Platform Share (10% Commission):** $14,800 \text{ BDT/month}$
* **Sub-Admin Share (90% Payout):** $133,200 \text{ BDT/month}$

### 8.4.4 Expenses & P&L (Sub-Admin Perspective):
* **Operational Costs (Guards/Electricity):** 30,000 BDT/month.
* **Net Monthly Profit for Space Owner:** $133,200 \text{ BDT} - 30,000 \text{ BDT} = 103,200 \text{ BDT/month}$.
* **Estimated ROI:** The space owner covers the platform listing setup within the first month.

---

## 8.5 Cancellation, Refund, and User Exit Policies
To protect both drivers and space owners, ParkPro enforces a clear refund policy:

1. **Grace Period Cancellation:** If a driver cancels a booking request before it is approved by the Sub Admin, or within 2 hours of approval, they are eligible for a **100% refund**.
2. **Late Cancellation:** If a driver cancels an approved booking after 2 hours but before the start date, a **10% penalty fee** is deducted, and the remaining 90% is refunded.
3. **Active Lease Cancellation:** If a driver cancels an active monthly booking mid-month, they are charged for the current month in full, and the remaining months of the lease are refunded. The slot status immediately changes back to `'available'` so it can be re-leased.
4. **User Deactivation (Exit):** If a user is deactivated or blacklisted due to rule violations, their active bookings are cancelled, their active parking slots are freed, and any pending payouts are frozen pending administrative review.
