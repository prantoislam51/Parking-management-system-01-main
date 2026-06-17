export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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
export type ReviewStatus = "pending" | "approved" | "hidden";
export type AuditAction = "insert" | "update" | "delete" | "login" | "logout" | "password_reset" | "approval" | "rejection";

export interface Tables {
  profiles: {
    Row: {
      id: string;
      unique_id: string;
      role: UserRole;
      parent_admin_id: string | null;
      first_name: string;
      last_name: string;
      username: string;
      email: string;
      phone: string;
      address: string | null;
      profession: string | null;
      user_type: UserType | null;
      nid_number: string | null;
      passport_number: string | null;
      profile_image: string | null;
      emergency_contact: string | null;
      is_active: boolean;
      is_blacklisted: boolean;
      password_reset_required: boolean;
      created_at: string;
      updated_at: string;
      deleted_at: string | null;
    };
    Insert: Omit<Tables["profiles"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["profiles"]["Row"]>;
  };
  divisions: {
    Row: {
      id: string;
      name: string;
      code: string;
      created_at: string;
    };
    Insert: Omit<Tables["divisions"]["Row"], "created_at">;
    Update: Partial<Tables["divisions"]["Row"]>;
  };
  districts: {
    Row: {
      id: string;
      division_id: string;
      name: string;
      code: string;
      created_at: string;
    };
    Insert: Omit<Tables["districts"]["Row"], "created_at">;
    Update: Partial<Tables["districts"]["Row"]>;
  };
  areas: {
    Row: {
      id: string;
      district_id: string;
      name: string;
      code: string;
      created_at: string;
    };
    Insert: Omit<Tables["areas"]["Row"], "created_at">;
    Update: Partial<Tables["areas"]["Row"]>;
  };
  parking_zones: {
    Row: {
      id: string;
      area_id: string;
      sub_admin_id: string;
      zone_name: string;
      zone_code: string;
      address: string;
      latitude: number | null;
      longitude: number | null;
      total_slots: number;
      is_active: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables["parking_zones"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["parking_zones"]["Row"]>;
  };
  parking_slots: {
    Row: {
      id: string;
      zone_id: string;
      slot_number: string;
      unique_slot_id: string;
      slot_type: SlotType;
      status: SlotStatus;
      price_per_month: number;
      description: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables["parking_slots"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["parking_slots"]["Row"]>;
  };
  vehicles: {
    Row: {
      id: string;
      user_id: string;
      vehicle_type: VehicleType;
      vehicle_number: string;
      license_number: string;
      brand: string | null;
      model: string | null;
      color: string | null;
      is_verified: boolean;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables["vehicles"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["vehicles"]["Row"]>;
  };
  booking_requests: {
    Row: {
      id: string;
      user_id: string;
      slot_id: string;
      vehicle_id: string;
      start_date: string;
      duration_months: number;
      total_amount: number;
      status: BookingStatus;
      rejection_reason: string | null;
      requested_at: string;
      processed_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables["booking_requests"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["booking_requests"]["Row"]>;
  };
  bookings: {
    Row: {
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
    };
    Insert: Omit<Tables["bookings"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["bookings"]["Row"]>;
  };
  payments: {
    Row: {
      id: string;
      booking_id: string;
      user_id: string;
      amount: number;
      payment_method: PaymentMethod;
      transaction_id: string | null;
      payment_status: PaymentStatus;
      payment_date: string | null;
      verified_by: string | null;
      verified_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables["payments"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["payments"]["Row"]>;
  };
  notifications: {
    Row: {
      id: string;
      user_id: string;
      type: NotificationType;
      title: string;
      message: string;
      is_read: boolean;
      created_at: string;
    };
    Insert: Omit<Tables["notifications"]["Row"], "created_at">;
    Update: Partial<Tables["notifications"]["Row"]>;
  };
  support_tickets: {
    Row: {
      id: string;
      user_id: string;
      subject: string;
      message: string;
      status: TicketStatus;
      priority: string | null;
      assigned_to: string | null;
      resolved_at: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: Omit<Tables["support_tickets"]["Row"], "created_at" | "updated_at">;
    Update: Partial<Tables["support_tickets"]["Row"]>;
  };
  reviews: {
    Row: {
      id: string;
      user_id: string;
      booking_id: string;
      rating: number;
      comment: string | null;
      is_approved: boolean;
      created_at: string;
    };
    Insert: Omit<Tables["reviews"]["Row"], "created_at">;
    Update: Partial<Tables["reviews"]["Row"]>;
  };
  blacklists: {
    Row: {
      id: string;
      user_id: string;
      reason: string;
      blacklisted_by: string;
      created_at: string;
    };
    Insert: Omit<Tables["blacklists"]["Row"], "created_at">;
    Update: Partial<Tables["blacklists"]["Row"]>;
  };
  audit_logs: {
    Row: {
      id: string;
      user_id: string;
      action: AuditAction;
      table_name: string;
      record_id: string | null;
      old_values: Json | null;
      new_values: Json | null;
      ip_address: string | null;
      user_agent: string | null;
      created_at: string;
    };
    Insert: Omit<Tables["audit_logs"]["Row"], "created_at">;
    Update: Partial<Tables["audit_logs"]["Row"]>;
  };
}

export type Database = {
  public: {
    Tables: Tables;
    Views: {};
    Functions: {};
    Enums: {
      user_role: UserRole;
      user_type: UserType;
      vehicle_type: VehicleType;
      slot_type: SlotType;
      slot_status: SlotStatus;
      booking_status: BookingStatus;
      payment_status: PaymentStatus;
      payment_method: PaymentMethod;
      ticket_status: TicketStatus;
      notification_type: NotificationType;
      review_status: ReviewStatus;
      audit_action: AuditAction;
    };
  };
};