"use client";

import { mockBookings, mockVehicles, mockSlots, mockZones, mockAreas, mockDistricts, mockPayments } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { BookingDetailsModal, type BookingDetails } from "@/components/shared/booking-details-modal";
import { DownloadInvoiceButton } from "@/components/user/booking-actions/download-invoice-button";
import { ShowQRCodeButton } from "@/components/user/booking-actions/show-qr-code-button";
import { ManageBookingButton } from "@/components/user/booking-actions/manage-booking-button";
import { Calendar, Car, ArrowRight, CheckCircle2, Clock, Receipt, TrendingUp } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { useState, useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

export function BookingsSection() {
  const { isDemoMode } = useDemoModeStore();
  const [filter, setFilter] = useState<"all" | "active" | "pending">("all");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(null);

  const filteredBookings = useMemo(() => {
    const bookings = isDemoMode ? mockBookings : [];
    if (filter === "all") return bookings;
    if (filter === "active") return bookings.filter(b => b.status === "approved");
    if (filter === "pending") return bookings.filter(b => b.status === "pending");
    return bookings;
  }, [isDemoMode, filter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return { bg: "bg-emerald-500", text: "text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500 to-teal-600" };
      case "pending": return { bg: "bg-amber-500", text: "text-amber-400", border: "border-amber-500/30", gradient: "from-amber-500 to-orange-600" };
      default: return { bg: "bg-slate-500", text: "text-slate-400", border: "border-slate-500/30", gradient: "from-slate-500 to-gray-600" };
    }
  };

  const buildBookingDetails = (booking: typeof mockBookings[0]): BookingDetails => {
    const vehicle = mockVehicles.find(v => v.id === booking.vehicle_id);
    const slot = mockSlots.find(s => s.id === booking.slot_id);
    const zone = mockZones.find(z => z.id === slot?.zone_id);
    const area = mockAreas.find(a => a.id === zone?.area_id);
    const district = mockDistricts.find(d => d.id === area?.district_id);
    const payment = mockPayments.find(p => p.booking_id === booking.id);

    return {
      id: booking.id,
      booking_code: booking.booking_code,
      status: booking.status,
      start_date: booking.start_date,
      end_date: booking.end_date,
      duration_months: booking.duration_months,
      total_amount: booking.total_amount,
      monthly_amount: booking.monthly_amount,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
      vehicle: {
        id: vehicle?.id || "",
        vehicle_number: vehicle?.vehicle_number || "N/A",
        vehicle_type: vehicle?.vehicle_type || "car",
        brand: vehicle?.brand || "N/A",
        model: vehicle?.model || "N/A",
        color: vehicle?.color || "N/A",
        license_number: vehicle?.license_number || "N/A",
      },
      slot: {
        id: slot?.id || "",
        unique_slot_id: slot?.unique_slot_id || "N/A",
        slot_number: slot?.slot_number || "N/A",
        slot_type: slot?.slot_type || "car",
        description: slot?.description || "N/A",
        price_per_month: slot?.price_per_month || 0,
      },
      zone: {
        id: zone?.id || "",
        zone_name: zone?.zone_name || "N/A",
        zone_code: zone?.zone_code || "N/A",
        address: zone?.address || "N/A",
        area: area?.name || "N/A",
        district: district?.name || "N/A",
        division: "Dhaka",
      },
      payment: {
        id: payment?.id || "",
        amount: payment?.amount || booking.total_amount,
        payment_method: payment?.payment_method || "card",
        transaction_id: payment?.transaction_id || "N/A",
        payment_status: payment?.payment_status || "paid",
        payment_date: payment?.payment_date || null,
      },
    };
  };

  const handleViewDetails = (booking: typeof mockBookings[0]) => {
    setSelectedBooking(buildBookingDetails(booking));
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Bookings</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Track and manage all your parking reservations.
          </p>
        </div>
        <div className="flex items-center gap-2 p-1.5 bg-slate-900/60 rounded-xl border border-slate-700/50">
          {[
            { key: "all" as const, label: "All", count: mockBookings.length },
            { key: "active" as const, label: "Active", count: mockBookings.filter(b => b.status === "approved").length },
            { key: "pending" as const, label: "Pending", count: mockBookings.filter(b => b.status === "pending").length },
          ].map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === key
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-gray-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {label} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="card-elegant p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-indigo-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{formatCurrency(mockBookings.reduce((sum, b) => sum + b.total_amount, 0))}</p>
              <p className="text-xs text-gray-500 font-medium">Total Spent</p>
            </div>
          </div>
        </Card>
        <Card className="card-elegant p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{mockBookings.filter(b => b.status === "approved").length}</p>
              <p className="text-xs text-gray-500 font-medium">Active Bookings</p>
            </div>
          </div>
        </Card>
        <Card className="card-elegant p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-2xl font-black text-white">{mockBookings.filter(b => b.status === "pending").length}</p>
              <p className="text-xs text-gray-500 font-medium">Pending Approval</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const vehicle = mockVehicles.find(v => v.id === booking.vehicle_id);
            const colors = getStatusColor(booking.status);

            return (
              <Card key={booking.id} className="card-elegant group hover:scale-[1.01] transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex flex-col lg:flex-row">
                    {/* Status Sidebar */}
                    <div className={`lg:w-56 p-5 flex flex-col justify-between bg-gradient-to-br ${colors.gradient}/10 border-r ${colors.border}`}>
                      <div>
                        <Badge className={`${colors.bg} text-white border-0 px-4 py-1.5 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg mb-4`}>
                          {booking.status}
                        </Badge>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Booking Code</p>
                          <p className="text-2xl font-black text-white tracking-tight">{booking.booking_code}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-2">
                        {booking.status === "approved" && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                        {booking.status === "pending" && <Clock className="h-4 w-4 text-amber-400" />}
                        <span className="text-xs font-medium text-gray-400">
                          {booking.status === "approved" ? "Active Session" :
                           booking.status === "pending" ? "Waiting Review" : "Completed"}
                        </span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-5">
                      <div className="grid md:grid-cols-3 gap-4 lg:gap-6">
                        {/* Vehicle Info */}
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors.gradient}/20 flex items-center justify-center`}>
                            <Car className={`h-5 w-5 ${colors.text}`} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vehicle</p>
                            <p className="font-bold text-sm text-white truncate">{vehicle?.vehicle_number || "N/A"}</p>
                            <p className="text-[10px] text-gray-400 font-medium truncate">{vehicle?.brand} {vehicle?.model}</p>
                          </div>
                        </div>

                        {/* Duration Info */}
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                            <Calendar className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Duration</p>
                            <p className="font-bold text-sm text-white">
                              {new Date(booking.start_date).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-gray-400 font-medium">
                              {booking.duration_months} Month{booking.duration_months > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                            <Receipt className="h-5 w-5 text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Paid</p>
                            <p className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{formatCurrency(booking.total_amount)}</p>
                            <p className="text-xs text-emerald-400 font-medium">Payment Complete</p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-3 mt-5 pt-4 border-t border-slate-700/50">
                        <DownloadInvoiceButton booking={buildBookingDetails(booking)} />
                        <ShowQRCodeButton booking={buildBookingDetails(booking)} />
                        <ManageBookingButton booking={buildBookingDetails(booking)} />
                        <Button
                          onClick={() => handleViewDetails(booking)}
                          className="h-10 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all ml-auto"
                        >
                          View Details <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="card-elegant border-dashed">
            <CardContent className="p-12 text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">No Bookings Found</h3>
              <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                You don't have any {filter !== "all" ? filter : ""} bookings at the moment.
              </p>
              <Button
                variant="outline"
                onClick={() => setFilter("all")}
                className="h-12 px-8 font-bold rounded-xl border-2 border-slate-600 text-gray-300 hover:bg-slate-700 transition-all"
              >
                Show All Bookings
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedBooking(null);
        }}
        booking={selectedBooking}
      />
    </div>
  );
}