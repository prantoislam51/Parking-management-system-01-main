"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Calendar,
  Car,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  QrCode,
  ArrowRight,
  User,
  Phone,
  Mail,
  Hash,
  Building,
  Timer,
} from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { formatCurrency } from "@/lib/utils";

export interface BookingDetails {
  id: string;
  booking_code: string;
  status: "pending" | "approved" | "completed" | "cancelled";
  start_date: string;
  end_date: string;
  duration_months: number;
  total_amount: number;
  monthly_amount: number;
  created_at: string;
  updated_at: string;
  vehicle: {
    id: string;
    vehicle_number: string;
    vehicle_type: string;
    brand: string;
    model: string;
    color: string;
    license_number: string;
  };
  slot: {
    id: string;
    unique_slot_id: string;
    slot_number: string;
    slot_type: string;
    description: string;
    price_per_month: number;
  };
  zone: {
    id: string;
    zone_name: string;
    zone_code: string;
    address: string;
    area: string;
    district: string;
    division: string;
  };
  payment: {
    id: string;
    amount: number;
    payment_method: string;
    transaction_id: string;
    payment_status: string;
    payment_date: string | null;
  };
}

interface BookingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingDetails | null;
}

export function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
  if (!booking) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "approved":
        return {
          bg: "bg-emerald-500",
          gradient: "from-emerald-500 to-teal-600",
          text: "text-emerald-400",
          border: "border-emerald-500/30",
          icon: <CheckCircle2 className="h-5 w-5" />,
          label: "Active Booking",
        };
      case "pending":
        return {
          bg: "bg-amber-500",
          gradient: "from-amber-500 to-orange-600",
          text: "text-amber-400",
          border: "border-amber-500/30",
          icon: <Clock className="h-5 w-5" />,
          label: "Pending Approval",
        };
      case "completed":
        return {
          bg: "bg-indigo-500",
          gradient: "from-indigo-500 to-purple-600",
          text: "text-indigo-400",
          border: "border-indigo-500/30",
          icon: <CheckCircle2 className="h-5 w-5" />,
          label: "Completed",
        };
      case "cancelled":
        return {
          bg: "bg-rose-500",
          gradient: "from-rose-500 to-red-600",
          text: "text-rose-400",
          border: "border-rose-500/30",
          icon: <AlertCircle className="h-5 w-5" />,
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-slate-500",
          gradient: "from-slate-500 to-gray-600",
          text: "text-slate-400",
          border: "border-slate-500/30",
          icon: <Clock className="h-5 w-5" />,
          label: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig(booking.status);

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "card":
        return <CreditCard className="h-5 w-5" />;
      case "bkash":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 8h1a4 4 0 110 8h-1v2h1a3 3 0 100-6h-1v2h1v-2h-1V8zM5 9h2a3 3 0 110 6H5V9zm0-4h2a4 4 0 110 8H5V5z" />
          </svg>
        );
      case "nagad":
        return (
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
          </svg>
        );
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getSlotTypeIcon = (type: string) => {
    switch (type) {
      case "bike":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="5" cy="18" r="3" />
            <circle cx="19" cy="18" r="3" />
            <path d="M12 18V6l-4 4M12 6l4 4" />
          </svg>
        );
      case "truck":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="3" width="15" height="13" rx="2" />
            <path d="M16 8h4l3 4v4h-7V8z" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
        );
      case "bus":
        return (
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="15" rx="2" />
            <path d="M3 9h18M7 21h10M9 6v6M15 6v6" />
          </svg>
        );
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-2xl shadow-slate-950/50 overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className={`relative h-28 bg-gradient-to-br ${statusConfig.gradient} flex-shrink-0`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <FileText className="h-10 w-10 text-white" />
                </div>
              </div>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {/* Status Banner */}
              <div className={`flex items-center justify-between p-4 rounded-2xl ${statusConfig.bg}/10 border ${statusConfig.border}`}>
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${statusConfig.bg} flex items-center justify-center`}>
                    {statusConfig.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{statusConfig.label}</p>
                    <p className="text-xs text-slate-400">Booking ID: {booking.booking_code}</p>
                  </div>
                </div>
                <Badge className={`${statusConfig.bg} text-white border-0 px-4 py-1.5 font-bold text-xs uppercase tracking-wider rounded-full`}>
                  {booking.status}
                </Badge>
              </div>

              {/* Booking Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {/* Booking Code */}
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Hash className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Booking Code</span>
                  </div>
                  <p className="text-lg font-black text-white">{booking.booking_code}</p>
                </div>

                {/* Duration */}
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Timer className="h-4 w-4 text-purple-400" />
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Duration</span>
                  </div>
                  <p className="text-lg font-black text-white">{booking.duration_months} Month{booking.duration_months > 1 ? "s" : ""}</p>
                </div>

                {/* Start Date */}
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Start Date</span>
                  </div>
                  <p className="text-sm font-bold text-white">{formatDate(booking.start_date)}</p>
                </div>

                {/* End Date */}
                <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-amber-400" />
                    <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">End Date</span>
                  </div>
                  <p className="text-sm font-bold text-white">{formatDate(booking.end_date)}</p>
                </div>
              </div>

              {/* Vehicle Info */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/30 flex items-center justify-center">
                    <Car className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Vehicle Information</p>
                    <p className="text-xs text-slate-400">Registered vehicle details</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Vehicle Number</p>
                    <p className="text-sm font-bold text-white">{booking.vehicle.vehicle_number}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Type</p>
                    <p className="text-sm font-bold text-white capitalize">{booking.vehicle.vehicle_type}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Brand & Model</p>
                    <p className="text-sm font-bold text-white">{booking.vehicle.brand} {booking.vehicle.model}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Color</p>
                    <p className="text-sm font-bold text-white">{booking.vehicle.color}</p>
                  </div>
                </div>
              </div>

              {/* Zone & Slot Info */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/30 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Parking Location</p>
                    <p className="text-xs text-slate-400">Zone and slot details</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Zone Name</p>
                    <p className="text-sm font-bold text-white">{booking.zone.zone_name}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Slot ID</p>
                    <p className="text-sm font-bold text-white">{booking.slot.unique_slot_id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Slot Type</p>
                    <p className="text-sm font-bold text-white capitalize flex items-center gap-2">
                      {getSlotTypeIcon(booking.slot.slot_type)}
                      {booking.slot.slot_type}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Address</p>
                    <p className="text-sm text-slate-300">{booking.zone.address}</p>
                    <p className="text-xs text-slate-500">{booking.zone.area}, {booking.zone.district}, {booking.zone.division}</p>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/30 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Payment Details</p>
                    <p className="text-xs text-slate-400">Transaction and billing information</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Amount</p>
                    <p className="text-2xl font-black text-emerald-400">{formatCurrency(booking.total_amount)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Monthly Rent</p>
                    <p className="text-lg font-bold text-white">{formatCurrency(booking.monthly_amount)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Payment Method</p>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{getPaymentMethodIcon(booking.payment.payment_method)}</span>
                      <p className="text-sm font-bold text-white capitalize">{booking.payment.payment_method}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Transaction ID</p>
                    <p className="text-sm font-bold text-white">{booking.payment.transaction_id || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Payment Status</p>
                    <Badge className={`${booking.payment.payment_status === "paid" ? "bg-emerald-500" : "bg-amber-500"} text-white border-0 text-[10px] font-bold capitalize`}>
                      {booking.payment.payment_status}
                    </Badge>
                  </div>
                  {booking.payment.payment_date && (
                    <div>
                      <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Payment Date</p>
                      <p className="text-sm font-bold text-white">{formatDate(booking.payment.payment_date)}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Fixed Footer */}
            <div className="p-6 pt-0 flex-shrink-0 bg-slate-900/95">
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-2xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-all">
                  <FileText className="h-4 w-4 mr-2" /> Download Invoice
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-2xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700 transition-all">
                  <QrCode className="h-4 w-4 mr-2" /> Show QR Code
                </Button>
                <Button className="flex-1 h-12 rounded-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-lg shadow-indigo-500/30 transition-all">
                  Manage Booking <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}