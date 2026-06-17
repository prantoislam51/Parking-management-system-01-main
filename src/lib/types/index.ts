export type UserRole = "super_admin" | "sub_admin" | "user";
export type UserType = "driver" | "owner";
export type VehicleType = "car" | "bike" | "truck" | "bus";
export type SlotType = "car" | "bike" | "truck" | "bus";
export type SlotStatus = "available" | "pending" | "booked" | "occupied" | "cancelled" | "maintenance";
export type BookingStatus = "pending" | "approved" | "rejected" | "cancelled" | "completed" | "expired";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";
export type PaymentMethod = "bkash" | "nagad" | "bank" | "cash" | "stripe" | "sslcommerz";
export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type NotificationType = "booking" | "payment" | "approval" | "rejection" | "cancellation" | "system";
export type AuditAction = "insert" | "update" | "delete" | "login" | "logout" | "password_reset" | "approval" | "rejection";

export interface Profile {
  id: string;
  unique_id: string;
  role: UserRole;
  parent_admin_id: string | null;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone: string;
  address?: string;
  profession?: string;
  user_type?: UserType;
  nid_number?: string;
  passport_number?: string;
  profile_image?: string;
  emergency_contact?: string;
  is_active: boolean;
  is_blacklisted: boolean;
  password_reset_required: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
}

export interface Division {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

export interface District {
  id: string;
  division_id: string;
  name: string;
  code: string;
  created_at: string;
  division?: Division;
}

export interface Area {
  id: string;
  district_id: string;
  name: string;
  code: string;
  created_at: string;
  district?: District;
}

export interface ParkingZone {
  id: string;
  area_id: string;
  sub_admin_id: string;
  zone_name: string;
  zone_code: string;
  address: string;
  latitude?: number;
  longitude?: number;
  total_slots: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  area?: Area;
  sub_admin?: Profile;
}

export interface ParkingSlot {
  id: string;
  zone_id: string;
  slot_number: string;
  unique_slot_id: string;
  slot_type: SlotType;
  status: SlotStatus;
  price_per_month: number;
  description?: string;
  created_at: string;
  updated_at: string;
  zone?: ParkingZone;
}

export interface Vehicle {
  id: string;
  user_id: string;
  vehicle_type: VehicleType;
  vehicle_number: string;
  license_number: string;
  brand?: string;
  model?: string;
  color?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
  user?: Profile;
}

export interface BookingRequest {
  id: string;
  user_id: string;
  slot_id: string;
  vehicle_id: string;
  start_date: string;
  duration_months: number;
  total_amount: number;
  status: BookingStatus;
  rejection_reason?: string;
  requested_at: string;
  processed_at?: string;
  created_at: string;
  updated_at: string;
  user?: Profile;
  slot?: ParkingSlot;
  vehicle?: Vehicle;
}

export interface Booking {
  id: string;
  booking_code: string;
  user_id: string;
  slot_id: string;
  vehicle_id: string;
  start_date: string;
  end_date: string;
  duration_months: number;
  total_amount: number;
  monthly_amount: number;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
  user?: Profile;
  slot?: ParkingSlot;
  vehicle?: Vehicle;
}

export interface Payment {
  id: string;
  booking_id: string;
  user_id: string;
  amount: number;
  payment_method: PaymentMethod;
  transaction_id?: string;
  payment_status: PaymentStatus;
  payment_date?: string;
  verified_by?: string;
  verified_at?: string;
  created_at: string;
  updated_at: string;
  booking?: Booking;
  user?: Profile;
  verifier?: Profile;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
  user?: Profile;
}

export interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  status: TicketStatus;
  priority?: string;
  assigned_to?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
  user?: Profile;
  assignee?: Profile;
}

export interface Review {
  id: string;
  user_id: string;
  booking_id: string;
  rating: number;
  comment?: string;
  is_approved: boolean;
  created_at: string;
  user?: Profile;
  booking?: Booking;
}

export interface Blacklist {
  id: string;
  user_id: string;
  reason: string;
  blacklisted_by: string;
  created_at: string;
  user?: Profile;
  blacklister?: Profile;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: AuditAction;
  table_name: string;
  record_id?: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  user?: Profile;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}