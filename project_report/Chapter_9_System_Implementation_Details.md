# CHAPTER 9: SYSTEM IMPLEMENTATION DETAILS

## 9.1 Application Folder Structure
The ParkPro codebase is organized according to Next.js 14 App Router standards. The structure is designed to separate routing concerns, reusable components, global state, and utility functions:

```
/src
├── /app
│   ├── /(auth)                 # Auth routes (login, register, forgot-password)
│   ├── /(public)               # Public pages (Landing Page, Public Slots)
│   ├── /(super-admin)          # Super Admin dashboard and administration
│   ├── /(sub-admin)            # Sub Admin dashboard and zone management
│   ├── /(user)                 # User dashboard, vehicle setup, and booking
│   ├── globals.css             # Tailwind CSS global styles
│   ├── layout.tsx              # Root HTML wrapper
│   └── page.tsx                # Public Landing Page Component
├── /components
│   ├── /ui                     # Shachn/Radix atomic UI components
│   ├── /shared                 # Shared components (Sidebar, TopNavbar, StatsCard)
│   ├── /super-admin            # Super admin widgets and tables
│   ├── /sub-admin              # Sub admin widgets and requests list
│   └── /user                   # User slot grids and vehicle cards
├── /lib
│   ├── supabase.ts             # Supabase client initialization
│   ├── utils.ts                # Tailwind merge and formatting helpers
│   ├── /store                  # Zustand stores (auth, UI, cart)
│   └── /types                  # TypeScript interfaces matching database tables
└── middleware.ts               # Route guard and authentication interceptor
```

---

## 9.2 Registration Wizard and Validation (Zod Schemas)
User signup is implemented as a multi-step form wizard to simplify onboarding. Each step is validated using **Zod** schema validation and managed by **React Hook Form**.

### Zod Form Schema Example:
```typescript
import * as z from "zod";

export const RegisterFormSchema = z.object({
  // Step 1: Basic Info
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),
  
  // Step 2: Account Info
  username: z.string().min(4, "Username must be at least 4 characters").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  userType: z.enum(["driver", "owner"]),

  // Step 3: Verification Info
  address: z.string().min(10, "Please enter your full address"),
  nidNumber: z.string().regex(/^\d{10}$|^\d{13}$|^\d{17}$/, "Invalid NID number"),
  passportNumber: z.string().optional(),
  emergencyContact: z.string().min(11, "Emergency contact must be a valid phone number"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});
```

---

## 9.3 Dashboards and Navigations

### 9.3.1 Sidebar Component (`Sidebar.tsx`)
The application sidebar is shared across all dashboard layouts but adjusts its menu items based on the authenticated user's role:
* **Super Admin Menu:** Shows Admins, Users, Geography (Divisions, Districts, Areas), Zones, Slots, Bookings, Payments, Audit Logs, and Reports.
* **Sub Admin Menu:** Shows My Zones, Slots, Booking Requests, Active Bookings, Payments, Support Tickets, and Local Reports.
* **User Menu:** Shows Home, Profile, Vehicles, Search Slots, Bookings, Payment History, and Reviews.

It features a collapsible design that toggles between 280px (full) and 80px (compact icon-only view) with smooth CSS transitions.

### 9.3.2 Mobile Bottom Navigation (`MobileBottomNav.tsx`)
For users accessing their dashboard via mobile web browsers, the standard sidebar is hidden. In its place, a mobile bottom navigation bar is rendered:
* Icons include: Home (Dashboard), Search (Slots), Car (Vehicles), Booking (Bookings), and User (Profile).
* This provides a native app-like experience and ensures all primary actions are accessible within thumb reach.

---

## 9.4 Recharts Analytics Integration
Both Super Admin and Sub Admin dashboards use **Recharts** for data visualization.

* **Revenue Line Chart:** Queries `get_revenue_report()` to retrieve monthly earnings and plots a smooth curved line (`<AreaChart>` with a gradient fill) displaying revenue growth.
* **Slot Occupancy Gauge:** Displays a radial donut chart `<PieChart>` representing occupied slots vs. available slots in a zone, color-coded in green (available) and orange (occupied).
* **Slot Type Distribution:** A `<BarChart>` showing the count of slots broken down by slot type (Car, Bike, Bus, Truck), helping admins identify which vehicle types are driving demand.

---

## 9.5 Cashless Payment Flow
When a user's booking request is approved, they click "Pay Now" to resolve the payment.

### Integrated manual verification flow:
1. The user selects a mobile banking provider (bKash or Nagad).
2. The UI displays the platform's merchant wallet number and payment instructions.
3. The user makes the transfer via their mobile banking app and copies the resulting **Transaction ID** (e.g., `BKG83HA1D9`).
4. The user inputs the transaction ID in our form and submits.
5. The form invokes the Supabase RPC function `make_payment(booking_id, amount, payment_method, transaction_id)`.
6. The transaction is logged as `paid` and pending verification, and the slot status transitions to `'occupied'`.

---

## 9.6 Booking QR Code Generation
To streamline check-in validation, every booking detail page generates a unique QR code:
* The system uses the `react-qr-code` package to generate the QR code.
* The payload embedded in the QR code contains the unique `booking_code` and the user's `unique_id`.
* When the driver arrives at the parking zone, the Sub Admin or gatekeeper scans the QR code using a mobile device, which queries the database to verify the booking validity and vehicle details instantly.
