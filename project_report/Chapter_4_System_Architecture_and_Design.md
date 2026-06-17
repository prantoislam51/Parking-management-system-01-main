# CHAPTER 4: SYSTEM ARCHITECTURE AND DESIGN

## 4.1 Layered System Architecture
ParkPro utilizes a modern, decoupled, three-tier client-server architecture to ensure high performance, security, and scalability. The layers are structured as follows:

```
+-------------------------------------------------------------------+
|                           Presentation Layer                      |
|      (Next.js 14 Web UI - Landing Page, Dashboards, Mobile Nav)   |
+------------------------------------+------------------------------+
                                     |
                                HTTPS / WSS
                                     |
+------------------------------------v------------------------------+
|                         Backend-as-a-Service                      |
|                  (Supabase Auth, Storage, Edge Functions)         |
+------------------------------------+------------------------------+
                                     |
                             Internal Connection
                                     |
+------------------------------------v------------------------------+
|                           Database Layer                          |
|         (Supabase PostgreSQL - Tables, Triggers, RLS, Functions)  |
+-------------------------------------------------------------------+
```

1. **Presentation Layer (Frontend):** Built using Next.js 14 (App Router) combined with TypeScript, Tailwind CSS, and Framer Motion. This layer handles user interactions, input forms, data visualization (charts), and renders dashboards tailored to each user role. It runs in the user's web browser.
2. **Backend-as-a-Service (BaaS) Layer:** Managed by Supabase. It acts as an intermediary handling user authentication, session persistence, secure file uploads (profile avatars, NID verification papers), and real-time subscription channels over WebSockets.
3. **Database Layer (Backend):** Driven by PostgreSQL. It stores the normalized relational data tables and executes all critical business rules (using trigger functions and PL/pgSQL procedures) and security filters (using Row Level Security policies).

## 4.2 Frontend Routing and Middleware Structure
The frontend layout reflects Next.js 14 App Router conventions. It organizes pages into logical group folders:

* **`(auth)` Route Group:** Contains `/login`, `/register`, and `/forgot-password`. These routes do not require an active session and are accessible by the public.
* **`(public)` Route Group:** Contains the main landing page (`/`) and a public slot browser (`/public/slots`). This allows unregistered visitors to browse available slots across districts, encouraging registrations.
* **`(user)` Route Group:** Houses `/dashboard`, `/profile`, `/vehicles`, `/slots`, `/bookings`, `/payments`, and `/tickets` under `/dashboard/...`. Access is restricted to accounts with the `user` role.
* **`(sub-admin)` Route Group:** Located under `/sub-admin/...`. Contains pages for zone slot management, incoming request approvals, zone payments, support tickets, and reports. restricted to users with the `sub_admin` role.
* **`(super-admin)` Route Group:** Located under `/super-admin/...`. Houses pages for sub-admin creation, user management, geographical configuration, system-wide slot/zone administration, global payments, audit log viewing, and system settings. restricted to users with the `super_admin` role.

### The Role of Middleware (`middleware.ts`)
To prevent unauthorized users from manually typing URLs to access admin pages, a Next.js `middleware.ts` file acts as a gatekeeper. When a page request is initiated, the middleware intercepts it and:
1. Contacts Supabase Auth to retrieve the user's current session.
2. If no session exists, it redirects the user to the `/login` page.
3. If a session exists, it fetches the user's role from their database profile.
4. If a user tries to access `/super-admin/...` but their role is `sub_admin` or `user`, it blocks access and redirects them to their respective dashboard, ensuring strict role isolation.

## 4.3 Client-Side State Management (Zustand)
While Supabase holds the master data state on the cloud, the client needs a fast, lightweight state manager to handle transient UI states. ParkPro uses **Zustand** stores for:

* **Auth Store (`useAuthStore`):** Caches the active user profile, email, username, and role, making it instantly accessible across components without triggering repeated API calls.
* **UI Store (`useUIStore`):** Manages the state of the collapsible sidebar, active breadcrumbs, and selected dark/light mode themes.
* **Cart/Booking Store (`useBookingStore`):** Caches the temporary details of the parking slot currently being booked as the user navigates through the multi-step checkout form.

Zustand is chosen over Redux because of its simplicity and lack of boilerplate code, and over React Context because it prevents unnecessary re-renders of sibling components.

## 4.4 Data Synchronization and Real-time Flow
Real-time sync is crucial for a smart parking application. If a parking slot becomes booked or occupied, the UI of all active users browsing that zone must reflect the change immediately to avoid booking conflicts.

ParkPro implements this using **Supabase Realtime Subscriptions**:
1. When the user opens `/dashboard/slots` or `/sub-admin/requests`, the client establishes a persistent WebSocket connection to Supabase.
2. The client subscribes to changes in specific tables:
   ```typescript
   const channel = supabase
     .channel('schema-db-changes')
     .on(
       'postgres_changes',
       { event: '*', schema: 'public', table: 'parking_slots' },
       (payload) => {
         // Update the local slot status state instantly
         updateSlotState(payload.new);
       }
     )
     .subscribe();
   ```
3. When a Sub Admin clicks "Approve", the `booking_requests` table is updated. The database trigger automatically changes the slot status to `booked`.
4. Supabase detects this change at the database log level and broadcasts it via WebSockets to all subscribed clients.
5. Within milliseconds, the slot status changes to "Booked" (with a blue badge) on the screens of all active drivers, preventing duplicate booking attempts.

## 4.5 Component Design and Reusability
The frontend code is designed with a strict emphasis on reusable atomic components located in the `/components/shared` folder:

1. **`StatsCard`:** Displays key metrics (e.g., total revenue, occupied slots) with an icon, numeric value, trend indicator (arrow up/down), and background color variants (navy, green, orange, red).
2. **`DataTable`:** A high-performance wrapper around TanStack Table v8 that provides built-in pagination, search debouncing (300ms), sorting headers, and column filters.
3. **`ConfirmModal`:** A modal component used to confirm high-risk actions (e.g., deleting a vehicle, cancelling a booking, or blacklisting a user) with a loading spinner.
4. **`UserAvatar`:** Renders a user's profile picture from Supabase Storage with an automatic fallback showing their first and last initials if the image is missing.
5. **`SlotCard`:** Renders slot details including the slot number, type icon, price, and status badge, with a call-to-action button based on availability.
