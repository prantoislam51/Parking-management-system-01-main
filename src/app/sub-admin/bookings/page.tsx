"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockBookings, mockSlots, mockZones, mockUsers, mockVehicles } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Calendar, Eye, Search } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function BookingsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});

  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  const mySlots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];
  const mySlotIds = mySlots.map(s => s.id);

  let bookings = isDemoMode
    ? mockBookings.filter(b => mySlotIds.includes(b.slot_id))
    : [];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    bookings = bookings.filter(b => {
      const user = mockUsers.find(u => u.id === b.user_id);
      return (
        b.booking_code.toLowerCase().includes(query) ||
        user?.first_name.toLowerCase().includes(query) ||
        user?.last_name.toLowerCase().includes(query) ||
        user?.email.toLowerCase().includes(query)
      );
    });
  }

  if (filters.status) {
    bookings = bookings.filter(b => b.status === filters.status);
  }
  if (filters.zone) {
    bookings = bookings.filter(b => {
      const slot = mockSlots.find(s => s.id === b.slot_id);
      return slot?.zone_id === filters.zone;
    });
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return { bg: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/30" };
      case "pending": return { bg: "bg-amber-500/20 text-amber-400", border: "border-amber-500/30" };
      case "completed": return { bg: "bg-blue-500/20 text-blue-400", border: "border-blue-500/30" };
      case "rejected": return { bg: "bg-rose-500/20 text-rose-400", border: "border-rose-500/30" };
      default: return { bg: "bg-slate-500/20 text-gray-400", border: "border-slate-500/30" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            All <span className="animated-gradient-text">Bookings</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            View and manage all parking bookings in your zones.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{bookings.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{bookings.filter(b => b.status === "approved").length}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Active</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{bookings.filter(b => b.status === "pending").length}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-purple-400">{bookings.filter(b => b.status === "completed").length}</p>
              <p className="text-[9px] font-bold text-purple-400/60 uppercase tracking-wider">Completed</p>
            </div>
          </div>
        </div>
              </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 group">
          <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by code, user name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-500 text-white"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filters.status || "all"}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="h-10 px-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={filters.zone || "all"}
            onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
            className="h-10 px-3 rounded-xl bg-slate-800/50 border border-slate-700/50 text-white text-xs font-medium focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">All Zones</option>
            {myZones.map(z => (
              <option key={z.id} value={z.id}>{z.zone_name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bookings List */}
      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map((booking) => {
            const user = mockUsers.find(u => u.id === booking.user_id);
            const vehicle = mockVehicles.find(v => v.id === booking.vehicle_id);
            const slot = mockSlots.find(s => s.id === booking.slot_id);
            const zone = mockZones.find(z => z.id === slot?.zone_id);
            const colors = getStatusColor(booking.status);

            return (
              <Card key={booking.id} className="card-elegant group hover:scale-[1.01] transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Booking Code Badge */}
                    <div className={`lg:w-40 p-4 rounded-xl bg-gradient-to-br ${colors.bg.replace("text-", "").replace("/20", "/10")} border ${colors.border}`}>
                      <Badge className={`${colors.bg} border-0 font-bold text-xs mb-2`}>
                        {booking.status.toUpperCase()}
                      </Badge>
                      <p className="text-lg font-black text-white">{booking.booking_code}</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 lg:w-48">
                      <Avatar firstName={user?.first_name || ""} lastName={user?.last_name || ""} size="md" className="border-2 border-slate-700" />
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.phone}</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Vehicle</p>
                        <p className="text-sm font-black text-white">{vehicle?.vehicle_number || "N/A"}</p>
                        <p className="text-[10px] text-gray-400 capitalize">{vehicle?.brand} {vehicle?.model}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Slot</p>
                        <p className="text-sm font-black text-white">{slot?.slot_number || "N/A"}</p>
                        <p className="text-[10px] text-indigo-400">{zone?.zone_name || "N/A"}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Duration</p>
                        <p className="text-sm font-black text-white">{booking.duration_months} Month{booking.duration_months > 1 ? "s" : ""}</p>
                        <p className="text-[10px] text-gray-400">{booking.start_date}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total</p>
                        <p className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {formatCurrency(booking.total_amount)}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <Button variant="outline" className="h-10 rounded-xl text-xs font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="card-elegant border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">No Bookings Found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              No bookings match your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}