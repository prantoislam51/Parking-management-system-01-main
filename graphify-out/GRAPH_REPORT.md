# Graph Report - .  (2026-05-11)

## Corpus Check
- 129 files · ~201,707 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 388 nodes · 1307 edges · 11 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Admin UI Components|Admin UI Components]]
- [[_COMMUNITY_Core Layout & Utilities|Core Layout & Utilities]]
- [[_COMMUNITY_Auth & Dashboards|Auth & Dashboards]]
- [[_COMMUNITY_Super Admin Management|Super Admin Management]]
- [[_COMMUNITY_State Management & Types|State Management & Types]]
- [[_COMMUNITY_Booking & Payments|Booking & Payments]]
- [[_COMMUNITY_Slot Booking UI|Slot Booking UI]]
- [[_COMMUNITY_Settings Management|Settings Management]]
- [[_COMMUNITY_App Root|App Root]]
- [[_COMMUNITY_Landing Page|Landing Page]]

## God Nodes (most connected - your core abstractions)
1. `Button` - 69 edges
2. `useDemoModeStore` - 40 edges
3. `cn()` - 35 edges
4. `Badge()` - 35 edges
5. `Card` - 31 edges
6. `CardContent` - 31 edges
7. `useUser()` - 28 edges
8. `formatCurrency()` - 27 edges
9. `Input` - 25 edges
10. `Avatar()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `MyZonesPage()` --calls--> `useDemoModeStore`  [EXTRACTED]
  app/sub-admin/my-zones/page.tsx → lib/data/use-mock-data.ts
- `Modal()` --calls--> `cn()`  [EXTRACTED]
  components/shared/modal.tsx → lib/utils.ts
- `DataTable()` --calls--> `cn()`  [EXTRACTED]
  components/shared/data-table.tsx → lib/utils.ts
- `Skeleton()` --calls--> `cn()`  [EXTRACTED]
  components/shared/skeleton.tsx → lib/utils.ts
- `Badge()` --calls--> `cn()`  [EXTRACTED]
  components/shared/badge.tsx → lib/utils.ts

## Communities (11 total, 0 thin omitted)

### Community 0 - "Admin UI Components"
Cohesion: 0.07
Nodes (49): Area, mockAreas, mockDistricts, mockDivisions, District, Division, AddAdminModalProps, AddAreaModal() (+41 more)

### Community 1 - "Core Layout & Utilities"
Cohesion: 0.05
Nodes (33): mockSuperAdmin, useAuth(), useUser(), createClient(), supabase, cn(), formatDate(), getStatusColor() (+25 more)

### Community 2 - "Auth & Dashboards"
Cohesion: 0.1
Nodes (29): mockBookings, mockBookingStatusData, mockNotifications, mockRevenueData, mockSlotTypeData, mockSubAdminStats, mockUserStats, mockVehicles (+21 more)

### Community 3 - "Super Admin Management"
Cohesion: 0.09
Nodes (28): AdminUser, mockAuditLogs, mockSlots, mockSubAdmins, mockUsers, AddAdminModal(), AddUserModal(), BookingDetailModal() (+20 more)

### Community 4 - "State Management & Types"
Cohesion: 0.05
Nodes (40): AddZoneModal(), MyZonesPage(), VehiclesSection(), FilterState, ModalState, NotificationState, UIState, useFilterStore (+32 more)

### Community 5 - "Booking & Payments"
Cohesion: 0.12
Nodes (26): DownloadInvoiceButton(), DownloadInvoiceButtonProps, ManageBookingButton(), ManageBookingButtonProps, ShowQRCodeButton(), ShowQRCodeButtonProps, BookingsPage(), SubAdminDashboard() (+18 more)

### Community 6 - "Slot Booking UI"
Cohesion: 0.17
Nodes (10): PaymentForm(), PaymentFormData, PaymentFormProps, PaymentMethodType, SlotsSection(), PaymentModal(), PaymentModalProps, SuccessMessage() (+2 more)

### Community 7 - "Settings Management"
Cohesion: 0.15
Nodes (5): SettingsSection(), ToggleProps, SettingsPage(), SettingsTab, tabs

### Community 8 - "App Root"
Cohesion: 0.29
Nodes (5): inter, jetbrainsMono, metadata, plusJakarta, Providers()

### Community 9 - "Landing Page"
Cohesion: 0.29
Nodes (5): divisions, features, howItWorks, pricingPlans, stats

## Knowledge Gaps
- **113 isolated node(s):** `plusJakarta`, `inter`, `jetbrainsMono`, `metadata`, `features` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Button` connect `Admin UI Components` to `Core Layout & Utilities`, `Auth & Dashboards`, `Super Admin Management`, `State Management & Types`, `Booking & Payments`, `Slot Booking UI`, `Settings Management`, `Landing Page`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `cn()` connect `Core Layout & Utilities` to `Admin UI Components`, `Auth & Dashboards`, `Super Admin Management`, `Settings Management`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `useDemoModeStore` connect `Booking & Payments` to `Admin UI Components`, `Core Layout & Utilities`, `Auth & Dashboards`, `State Management & Types`, `Slot Booking UI`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **What connects `plusJakarta`, `inter`, `jetbrainsMono` to the rest of the system?**
  _113 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Admin UI Components` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Core Layout & Utilities` be split into smaller, more focused modules?**
  _Cohesion score 0.05 - nodes in this community are weakly interconnected._
- **Should `Auth & Dashboards` be split into smaller, more focused modules?**
  _Cohesion score 0.1 - nodes in this community are weakly interconnected._