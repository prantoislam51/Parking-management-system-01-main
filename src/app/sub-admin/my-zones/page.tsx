"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockZones } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Building2, MapPin, Plus, ArrowRight, TrendingUp } from "lucide-react";
import { ParkingZone } from "@/lib/types";
import { AddZoneModal } from "@/components/sub-admin/modals/add-zone-modal";

export default function MyZonesPage() {
  const { isDemoMode } = useDemoModeStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const zones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Zones</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Manage and monitor your assigned parking zones.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="h-10 rounded-xl font-bold shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Zone
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{zones.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total Zones</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{zones.reduce((sum, z) => sum + z.total_slots, 0)}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Total Slots</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-purple-400">87%</p>
              <p className="text-[9px] font-bold text-purple-400/60 uppercase tracking-wider">Avg. Utilization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Zones Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((zone) => (
          <Card key={zone.id} className="card-elegant group hover:scale-[1.02] transition-all duration-300">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-indigo-400" />
                </div>
                <Badge className={`${zone.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-gray-400"} border-0 text-xs font-bold`}>
                  {zone.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
              <h3 className="text-lg font-black text-white mb-1">{zone.zone_name}</h3>
              <p className="text-xs text-gray-500 font-medium mb-3">{zone.zone_code}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <MapPin className="h-3 w-3" />
                <span className="truncate">{zone.address}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Slots</p>
                  <p className="text-sm font-black text-white">{zone.total_slots}</p>
                </div>
                <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                  View Details <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}