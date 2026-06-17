MASTER PROMPT — BUILD COMPLETE ENTERPRISE PARKING MANAGEMENT SYSTEM WEBSITE

=======================================================================
PROJECT OVERVIEW
=======================================================================

Build a complete, production-ready, full-stack Enterprise Parking Management System web application with a stunning, modern UI/UX. This is a multi-role hierarchical platform for managing parking zones, slots, bookings, payments, and users across Bangladesh's geographical hierarchy.

Tech Stack:
- Frontend: Next.js 14 (App Router) + TypeScript
- Styling: Tailwind CSS + shadcn/ui components
- Backend: Supabase (PostgreSQL + Auth + Storage + Realtime)
- State Management: Zustand
- Forms: React Hook Form + Zod validation
- Charts & Analytics: Recharts
- Maps: Leaflet.js or Google Maps API
- Icons: Lucide React
- Animations: Framer Motion
- Tables: TanStack Table v8
- Date Picker: React Day Picker
- Notifications: React Hot Toast
- File Upload: React Dropzone
- PDF Export: jsPDF + html2canvas
- Real-time: Supabase Realtime subscriptions

=======================================================================
SYSTEM HIERARCHY
=======================================================================

User Hierarchy:
  Super Admin → Sub Admin → Users (Drivers / Owners)

Geographical Hierarchy:
  Division → District → Area → Parking Zone → Parking Slot

Data Hierarchy:
  User → Vehicle → Booking Request → Booking → Payment

=======================================================================
DESIGN SYSTEM
=======================================================================

Theme:
- Primary Color: #0F4C81 (Deep Navy Blue)
- Secondary Color: #00A86B (Emerald Green)
- Accent Color: #F59E0B (Amber)
- Danger Color: #EF4444 (Red)
- Background Dark: #0D1117
- Background Light: #F8FAFC
- Surface: #FFFFFF
- Border: #E2E8F0

Typography:
- Display Font: "Plus Jakarta Sans" (headings, hero text)
- Body Font: "Inter" (body text, labels)
- Mono Font: "JetBrains Mono" (codes, IDs)

Design Style:
- Clean, professional, enterprise-grade
- Dark sidebar + light content area
- Glassmorphism cards for stats
- Smooth micro-animations on interactions
- Mobile-first responsive design
- Skeleton loading states
- Empty state illustrations
- Consistent 8px spacing system

=======================================================================
APPLICATION STRUCTURE
=======================================================================

PAGES AND ROUTES:

Public Pages (No Auth Required):
  /                          → Landing page
  /login                     → Login page
  /register                  → Register page
  /forgot-password           → Forgot password
  /reset-password            → Reset password
  /public/slots              → Browse available slots (public)

Super Admin Dashboard: /super-admin/...
  /super-admin/dashboard     → Overview analytics
  /super-admin/admins        → Manage sub admins
  /super-admin/users         → Manage all users
  /super-admin/divisions     → Manage divisions
  /super-admin/districts     → Manage districts
  /super-admin/areas         → Manage areas
  /super-admin/zones         → Manage all zones
  /super-admin/slots         → Manage all slots
  /super-admin/bookings      → All bookings overview
  /super-admin/payments      → Revenue & payments
  /super-admin/blacklist     → Blacklisted users
  /super-admin/audit-logs    → Audit trail
  /super-admin/reports       → Analytics & reports
  /super-admin/notifications → Notifications
  /super-admin/settings      → System settings

Sub Admin Dashboard: /sub-admin/...
  /sub-admin/dashboard       → Zone overview
  /sub-admin/my-zones        → Assigned zones
  /sub-admin/slots           → Zone slots management
  /sub-admin/requests        → Booking requests (approve/reject)
  /sub-admin/bookings        → Active bookings
  /sub-admin/users           → My registered users
  /sub-admin/payments        → Zone payment history
  /sub-admin/notifications   → Notifications
  /sub-admin/reports         → Zone reports
  /sub-admin/tickets         → Support tickets
  /sub-admin/settings        → Profile settings

User Dashboard: /dashboard/...
  /dashboard                 → User home
  /dashboard/profile         → Profile management
  /dashboard/vehicles        → My vehicles
  /dashboard/slots           → Browse & search slots
  /dashboard/bookings        → My bookings
  /dashboard/booking/[id]    → Booking detail
  /dashboard/payments        → Payment history
  /dashboard/notifications   → Notifications
  /dashboard/reviews         → My reviews
  /dashboard/tickets         → Support tickets
  /dashboard/settings        → Account settings

=======================================================================
LANDING PAGE
=======================================================================

Build a stunning public landing page with:

1. Hero Section:
   - Full-screen animated hero
   - Headline: "Smart Parking Management for Modern Cities"
   - Sub-headline: "Find, Book, and Manage Parking Slots Across Bangladesh in Seconds"
   - Two CTA buttons: "Book a Slot Now" and "Manage Your Zone"
   - Animated parking illustration or real parking map preview
   - Floating stat cards: Total Slots, Active Zones, Happy Users

2. Features Section:
   - 6 feature cards with icons and descriptions
   - Real-time slot availability
   - Online booking & payment
   - Multi-zone management
   - Role-based access control
   - Analytics & reports
   - Mobile-friendly

3. How It Works Section:
   - 4-step process with icons
   - Step 1: Register
   - Step 2: Find a Slot
   - Step 3: Book & Pay
   - Step 4: Park Your Vehicle

4. Coverage Section:
   - Map or grid showing covered divisions/districts
   - Total zones and slots counter

5. Pricing / Slot Types Section:
   - Cards for Car, Bike, Truck, Bus slots
   - Price ranges

6. Testimonials / Reviews Section:
   - User reviews carousel

7. Stats Banner:
   - Animated counters: 1000+ Slots, 50+ Zones, 10+ Districts, 500+ Users

8. CTA Section:
   - Final call to action

9. Footer:
   - Logo, links, contact, social media

=======================================================================
AUTHENTICATION PAGES
=======================================================================

LOGIN PAGE:
- Split layout: Left branding panel + Right form
- Email + Password fields
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Login with Google (optional, if Supabase OAuth enabled)
- Error messages with shake animation
- Loading spinner on submit

REGISTER PAGE:
- Multi-step form (3 steps):
  Step 1: Basic Info (First Name, Last Name, Email, Phone)
  Step 2: Account Info (Username, Password, Confirm Password, User Type: Driver/Owner)
  Step 3: Additional Info (Address, NID/Passport, Emergency Contact)
- Progress bar at top
- Step validation before proceeding
- Profile image upload (Supabase Storage)

FORGOT PASSWORD PAGE:
- Email input
- Send reset link button
- Success state with email sent confirmation

=======================================================================
SUPER ADMIN — ALL PAGES
=======================================================================

LAYOUT:
- Fixed dark sidebar (280px width)
- Top navbar with: search bar, notification bell, profile menu
- Breadcrumb navigation
- Collapsible sidebar on mobile

DASHBOARD PAGE:
Stats Cards (with trend indicators):
  - Total Users
  - Total Sub Admins
  - Total Zones
  - Total Slots
  - Active Bookings
  - Total Revenue (BDT)
  - Pending Requests
  - Blacklisted Users

Charts:
  - Monthly Revenue Line Chart (last 12 months)
  - Booking Status Donut Chart
  - Slot Type Distribution Bar Chart
  - Top 5 Zones by Revenue
  - Daily Bookings Area Chart

Tables:
  - Recent Bookings (last 10)
  - Recent Registrations (last 10)
  - Pending Requests (last 10)

Quick Actions:
  - Add Sub Admin
  - Add Zone
  - Add Slots
  - View Reports

ADMINS MANAGEMENT PAGE:
- DataTable with columns: Name, Email, Phone, Zones Count, Users Count, Status, Actions
- Add Sub Admin button → Modal form
- Edit, Deactivate, Delete actions
- Search + filter by status
- Assigned zones chip list per admin

USERS MANAGEMENT PAGE:
- DataTable: Name, Email, Phone, User Type, Sub Admin, Bookings, Status, Actions
- View profile modal
- Blacklist user button with reason modal
- Filter by: role, status, sub admin, user type
- Export to CSV/PDF

GEOGRAPHICAL MANAGEMENT PAGES:

Divisions Page:
  - Simple table: Name, Code, Districts Count, Actions
  - Add/Edit/Delete with confirmation modal

Districts Page:
  - Table with Division filter
  - Inline add form

Areas Page:
  - Table with Division + District filter
  - Inline add form

ZONES MANAGEMENT PAGE:
- Card grid view + table view toggle
- Zone cards showing: Zone Name, Area, Sub Admin, Active Slots, Occupancy %
- Add Zone modal: select area, assign sub admin
- Edit Zone modal
- Deactivate/Activate toggle

SLOTS MANAGEMENT PAGE:
- Advanced DataTable with filters:
  - Zone, Slot Type, Status, Price Range
- Bulk add slots button (add multiple slots at once)
- Individual slot: edit price, change status, maintenance mode
- Slot status badge with colors:
  - Available → Green
  - Booked → Blue
  - Occupied → Orange
  - Maintenance → Gray
  - Cancelled → Red

BOOKINGS PAGE:
- Full booking history with advanced filters
- Booking detail modal/drawer
- Export to PDF

PAYMENTS PAGE:
- Revenue overview cards: Total, Monthly, Weekly, Today
- Payments table: Booking Code, User, Amount, Method, Status, Date
- Filter by: payment method, status, date range
- Revenue chart by month
- Export to CSV

BLACKLIST PAGE:
- Table: User, Blacklisted By, Reason, Date, Actions
- Remove from blacklist button
- Add to blacklist button

AUDIT LOGS PAGE:
- Timeline view + table view
- Filter by: action type, actor, date range, table
- Color-coded actions: INSERT=Green, UPDATE=Blue, DELETE=Red, LOGIN=Purple

REPORTS PAGE:
- Booking Analytics Report
- Revenue Report
- Zone Occupancy Report
- User Activity Report
- Date range picker
- Export to PDF/Excel

=======================================================================
SUB ADMIN — ALL PAGES
=======================================================================

LAYOUT:
- Same sidebar layout but with limited nav items
- Zone selector at top (if multiple zones assigned)

DASHBOARD:
Stats Cards:
  - My Zones Count
  - My Active Slots
  - Pending Requests
  - Active Bookings
  - Monthly Revenue
  - My Users Count

Charts:
  - Weekly booking trend
  - Slot occupancy rate
  - Revenue this month

MY ZONES PAGE:
- Zone cards with live occupancy bars
- Click zone → zone detail page with all slots

SLOTS PAGE:
- Slot grid with status filter
- Update slot status
- View slot booking history

REQUESTS PAGE (Most Important):
- Cards/List of pending booking requests
- Each request shows:
  - User name + photo
  - Vehicle details
  - Requested dates
  - Slot details
- APPROVE button → opens confirmation modal → auto-rejects others
- REJECT button → requires rejection reason
- Filter by: slot, date, status
- Real-time updates via Supabase Realtime

BOOKINGS PAGE:
- Active bookings table
- Booking status management
- Contact user button

USERS PAGE:
- My registered users list
- User detail drawer

PAYMENTS PAGE:
- Zone-specific payment history
- Revenue summary

SUPPORT TICKETS PAGE:
- Ticket list with status
- Reply/resolve ticket

=======================================================================
USER — ALL PAGES
=======================================================================

LAYOUT:
- Clean top navbar
- Simple sidebar or bottom tab bar on mobile

DASHBOARD / HOME:
- Welcome card with user name
- Active booking summary card
- Quick action buttons:
  - Find a Slot
  - My Bookings
  - My Vehicles
- Recent notifications
- Upcoming booking reminder

PROFILE PAGE:
- Profile photo with upload button
- Edit personal info form
- NID/Passport upload
- Change password section
- Account danger zone: delete account

VEHICLES PAGE:
- Vehicle cards with icon by type
- Add vehicle modal: type, number, license, brand, model, color
- Edit/Delete vehicle

BROWSE SLOTS PAGE:
- Filters: Division, District, Area, Zone, Slot Type, Price Range
- Slot cards showing: Slot ID, Type icon, Zone, Price/month, Status badge
- Real-time availability indicator
- "Request Booking" button on available slots
- Map view option (Google Maps/Leaflet showing zones)
- Slots sorted by price, distance, availability

BOOKING REQUEST FLOW:
Step 1: Select slot
Step 2: Select dates (start month, duration in months)
Step 3: Select vehicle
Step 4: Review & Confirm
Step 5: Wait for sub admin approval (pending state screen)

MY BOOKINGS PAGE:
- Tabs: Active, Pending, Completed, Cancelled
- Booking cards showing:
  - Booking Code
  - Slot info
  - Dates
  - Status badge
  - Payment status badge
  - Action buttons (Pay, Cancel, Review)

BOOKING DETAIL PAGE:
- Full booking info
- Timeline: Requested → Approved → Paid → Active → Completed
- Payment button if unpaid
- Cancel booking button
- Download receipt button (PDF)

PAYMENTS PAGE:
- Payment history table
- Payment detail modal
- Payment methods: bKash, Nagad, Card, Bank

NOTIFICATIONS PAGE:
- List with icons by type
- Mark all read button
- Real-time badge count in navbar

REVIEWS PAGE:
- Write a review form (star rating + comment)
- My past reviews

SUPPORT TICKETS PAGE:
- Create ticket form: subject + message
- Ticket history with status

=======================================================================
SHARED COMPONENTS TO BUILD
=======================================================================

Build these reusable components:

1. StatsCard — icon, label, value, trend arrow, color variant
2. DataTable — sorting, filtering, pagination, export, row actions
3. BookingStatusBadge — color-coded badge
4. SlotStatusBadge — color-coded badge
5. UserAvatar — image with fallback initials
6. ConfirmModal — reusable delete/action confirmation
7. NotificationDropdown — realtime notification bell
8. PageHeader — title, breadcrumb, action button
9. EmptyState — illustration + message + CTA
10. SkeletonLoader — for all loading states
11. SlotCard — slot info card for browse page
12. BookingCard — booking summary card
13. VehicleCard — vehicle info card
14. ZoneCard — zone summary card
15. RevenueChart — recharts line chart
16. OccupancyGauge — donut/gauge chart
17. Timeline — booking status timeline
18. MapView — Leaflet/Google Maps zone viewer
19. FileUpload — drag & drop with preview
20. DateRangePicker — start/end date selector
21. SearchBar — global search with debounce
22. Sidebar — collapsible, role-aware navigation
23. TopNavbar — search, notifications, profile
24. MobileBottomNav — for mobile user dashboard

=======================================================================
SUPABASE INTEGRATION
=======================================================================

Authentication:
- Use Supabase Auth (email/password)
- On signup: create profile in public.profiles via database trigger
- Auth context with useUser() hook
- Protected routes via middleware.ts
- Role-based redirect after login:
  - super_admin → /super-admin/dashboard
  - sub_admin → /sub-admin/dashboard
  - user → /dashboard

Real-time Features:
- Booking requests page: live new request alerts
- Notifications: live unread count badge
- Slot status: live availability updates

Storage:
- Profile images: supabase storage bucket "avatars"
- NID/Passport images: supabase storage bucket "documents" (private)

=======================================================================
PAYMENT INTEGRATION
=======================================================================

Payment Methods to UI support:
1. bKash — mobile banking
2. Nagad — mobile banking
3. SSLCommerz — card/bank gateway
4. Cash — mark as paid manually by admin
5. Bank Transfer — manual verification

Payment Flow:
1. User clicks "Pay Now" on booking
2. Select payment method
3. Enter transaction ID (for bKash/Nagad manual)
4. Or redirect to SSLCommerz gateway
5. Confirm payment
6. Admin verifies → payment_status = paid
7. Notification sent to user

=======================================================================
NOTIFICATIONS SYSTEM
=======================================================================

In-app notifications for:
- Booking request submitted
- Booking approved
- Booking rejected
- Booking cancelled
- Payment received
- Payment failed
- Account blacklisted
- System announcements

Real-time via Supabase Realtime subscriptions.
Push notifications (optional): Web Push API

=======================================================================
RESPONSIVENESS
=======================================================================

All pages must be fully responsive:

Desktop (1280px+):
- Full sidebar visible
- Multi-column layouts
- Side-by-side panels

Tablet (768px - 1279px):
- Collapsible sidebar
- 2-column grids

Mobile (< 768px):
- Hidden sidebar, hamburger menu
- Single column
- Bottom navigation for user dashboard
- Touch-friendly buttons (min 44px height)
- Swipeable cards

=======================================================================
PERFORMANCE REQUIREMENTS
=======================================================================

- Use Next.js Image component for all images
- Lazy load charts and heavy components
- Pagination on all tables (20 rows/page default)
- Debounce on search inputs (300ms)
- Optimistic UI updates where possible
- Supabase query optimization with select() only needed columns
- React Query (TanStack Query) for server state caching

=======================================================================
SECURITY REQUIREMENTS
=======================================================================

- All API calls through Supabase RLS policies
- Never expose service role key on frontend
- Input sanitization on all forms
- Rate limiting on auth actions
- CSRF protection via Next.js
- Environment variables for all secrets

=======================================================================
ERROR HANDLING
=======================================================================

- Global error boundary
- Toast notifications for success/error/warning
- Form validation errors inline
- 404 page with illustration
- 500 page with retry button
- Empty state for all empty lists

=======================================================================
ADDITIONAL FEATURES TO ADD
=======================================================================

1. Dark Mode Toggle — system/manual toggle with localStorage persistence
2. Language Support — English + Bengali (bn) using next-intl
3. Printable Reports — PDF export for bookings, receipts, revenue
4. QR Code on Booking — generate QR code for each booking (react-qr-code)
5. Slot Map View — visual grid/floor plan of slots in a zone
6. Booking Receipt PDF — downloadable PDF receipt per booking
7. Admin Activity Feed — live activity feed on super admin dashboard
8. Occupancy Heatmap — zone occupancy by time/day heatmap
9. User Import — bulk user import via CSV (super admin)
10. Slot Bulk Add — add 10/20/50 slots at once to a zone

=======================================================================
FOLDER STRUCTURE
=======================================================================

/app
  /(auth)
    /login
    /register
    /forgot-password
  /(public)
    /page.tsx              ← Landing page
    /slots/page.tsx        ← Public slot browser
  /(super-admin)
    /layout.tsx
    /dashboard/page.tsx
    /admins/page.tsx
    /users/page.tsx
    /zones/page.tsx
    /slots/page.tsx
    /bookings/page.tsx
    /payments/page.tsx
    /audit-logs/page.tsx
    /reports/page.tsx
  /(sub-admin)
    /layout.tsx
    /dashboard/page.tsx
    /my-zones/page.tsx
    /requests/page.tsx
    /bookings/page.tsx
    /users/page.tsx
  /(user)
    /layout.tsx
    /dashboard/page.tsx
    /profile/page.tsx
    /vehicles/page.tsx
    /slots/page.tsx
    /bookings/page.tsx
    /payments/page.tsx
/components
  /ui              ← shadcn components
  /shared          ← shared components
  /super-admin     ← super admin specific
  /sub-admin       ← sub admin specific
  /user            ← user specific
/lib
  /supabase.ts     ← supabase client
  /utils.ts
  /hooks/
  /store/          ← zustand stores
  /types/          ← TypeScript types
/middleware.ts     ← auth + role protection

=======================================================================
TYPESCRIPT TYPES
=======================================================================

Define all TypeScript interfaces matching the database schema:

Profile, Division, District, Area, ParkingZone, ParkingSlot,
Vehicle, BookingRequest, Booking, Payment, Notification,
Review, SupportTicket, Blacklist, AuditLog, LoginHistory

All ENUM types as TypeScript union types.

=======================================================================
IMPORTANT INSTRUCTIONS
=======================================================================

1. Generate ALL pages listed above. Do not skip any.
2. All forms must have full Zod validation.
3. All tables must have pagination, search, and filter.
4. All modals must have loading states.
5. All data must come from Supabase — no mock/hardcoded data.
6. Supabase Realtime must be active on notifications and requests.
7. Role-based access: each dashboard must only show role-appropriate data.
8. Every action must show a toast: success or error.
9. Mobile responsive on every single page.
10. Use TypeScript strictly — no "any" types.
11. Production-ready code only.
12. Follow Next.js 14 App Router best practices.
13. Use server components where possible, client components where needed.
14. Loading skeletons on every data-fetching page.

=======================================================================
START BUILDING NOW. OUTPUT COMPLETE CODE FOR EVERY FILE.
=======================================================================
