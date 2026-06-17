"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockBookings, mockSlots, mockZones, mockUsers, mockVehicles } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Calendar, Check, X, Eye, Clock, AlertCircle } from "lucide-react";
import { Booking } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function RequestsPage() {
  const { isDemoMode } = useDemoModeStore();

  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  const mySlots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];
  const mySlotIds = mySlots.map(s => s.id);
  const requests = isDemoMode
    ? mockBookings.filter(b => mySlotIds.includes(b.slot_id) && b.status === "pending")
    : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Booking <span className="animated-gradient-text">Requests</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Review and approve pending booking requests for your zones.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{requests.length}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">24</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Approved Today</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-indigo-400">{formatCurrency(requests.reduce((sum, r) => sum + r.total_amount, 0))}</p>
              <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-wider">Value Pending</p>
            </div>
          </div>
        </div>
      </div>

      {/* Requests List */}
      {requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((request) => {
            const user = mockUsers.find(u => u.id === request.user_id);
            const vehicle = mockVehicles.find(v => v.id === request.vehicle_id);
            const slot = mockSlots.find(s => s.id === request.slot_id);
            const zone = mockZones.find(z => z.id === slot?.zone_id);
            return (
              <Card key={request.id} className="card-elegant group hover:scale-[1.01] transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar firstName={user?.first_name || ""} lastName={user?.last_name || ""} size="md" className="border-2 border-slate-700" />
                      <div>
                        <p className="font-bold text-white">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-gray-400">{user?.email}</p>
                      </div>
                    </div>

                    <div className="flex-1 grid md:grid-cols-4 gap-4 lg:pl-8">
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
                        <p className="text-sm font-black text-white">{request.duration_months} Month{request.duration_months > 1 ? "s" : ""}</p>
                        <p className="text-[10px] text-gray-400">{request.start_date}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total</p>
                        <p className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {formatCurrency(request.total_amount)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 lg:pl-4">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-emerald-400 border-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-rose-400 border-2 border-rose-500/30 hover:bg-rose-500/10 hover:border-rose-500/50">
                        <X className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-gray-400 border-2 border-slate-600 hover:bg-slate-700 hover:border-indigo-500/50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="card-elegant border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">All Caught Up!</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              No pending requests at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}