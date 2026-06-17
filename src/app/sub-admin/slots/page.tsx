"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockSlots, mockZones } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Car, Filter, Plus, Eye, Edit, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { ParkingSlot } from "@/lib/types";
import { AddSlotModal } from "@/components/sub-admin/modals/add-slot-modal";
import { EditSlotModal } from "@/components/sub-admin/modals/edit-slot-modal";
import { ViewSlotModal } from "@/components/sub-admin/modals/view-slot-modal";

export default function SlotsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);

  const handleEdit = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setIsEditModalOpen(true);
  };

  const handleView = (slot: ParkingSlot) => {
    setSelectedSlot(slot);
    setIsViewModalOpen(true);
  };

  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  const slots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return { bg: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/30" };
      case "booked": return { bg: "bg-amber-500/20 text-amber-400", border: "border-amber-500/30" };
      case "occupied": return { bg: "bg-rose-500/20 text-rose-400", border: "border-rose-500/30" };
      default: return { bg: "bg-slate-500/20 text-gray-400", border: "border-slate-500/30" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Parking <span className="animated-gradient-text">Slots</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Manage availability and pricing for your parking slots.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)} className="h-10 rounded-xl font-bold shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
            <Plus className="h-4 w-4 mr-2" />
            Add Slot
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{slots.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total Slots</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{slots.filter(s => s.status === "available").length}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Available</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{slots.filter(s => s.status === "booked").length}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Booked</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-rose-400">{slots.filter(s => s.status === "occupied").length}</p>
              <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">Occupied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slots Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {slots.map((slot) => {
          const zone = myZones.find(z => z.id === slot.zone_id);
          const colors = getStatusColor(slot.status);
          return (
            <Card key={slot.id} className="card-elegant group hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <Car className="h-5 w-5 text-indigo-400" />
                  </div>
                  <Badge className={`${colors.bg} border ${colors.border} text-xs font-bold`}>
                    {slot.status.charAt(0).toUpperCase() + slot.status.slice(1)}
                  </Badge>
                </div>
                <h3 className="text-lg font-black text-white mb-1">{slot.slot_number}</h3>
                <p className="text-xs text-gray-500 font-mono mb-3">{slot.unique_slot_id}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Zone</span>
                    <span className="text-gray-300 font-medium">{zone?.zone_name || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Type</span>
                    <span className="text-gray-300 font-medium capitalize">{slot.slot_type}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Price</span>
                    <span className="text-indigo-400 font-bold">{formatCurrency(slot.price_per_month)}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-4 border-t border-slate-700/50">
                  <Button variant="outline" size="sm" onClick={() => handleView(slot)} className="flex-1 h-8 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(slot)} className="flex-1 h-8 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AddSlotModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <EditSlotModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} slot={selectedSlot} />
      <ViewSlotModal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} slot={selectedSlot} />
    </div>
  );
}