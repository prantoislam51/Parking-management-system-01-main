"use client";

import { Modal } from "@/components/shared/modal";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { 
  Car, Bike, Truck, MapPin, Building2, User, 
  Globe, Map, Calendar, Info, ShieldCheck, 
  CircleDot
} from "lucide-react";
import { 
  mockZones, mockAreas, mockDistricts, 
  mockDivisions, mockSubAdmins 
} from "@/lib/data";

interface SlotDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: {
    id: string;
    zone_id: string;
    slot_number: string;
    unique_slot_id: string;
    slot_type: 'car' | 'bike' | 'truck' | 'bus';
    status: 'available' | 'pending' | 'booked' | 'occupied' | 'cancelled' | 'maintenance';
    price_per_month: number;
    description?: string;
  } | null;
}

export function SlotDetailModal({ isOpen, onClose, slot }: SlotDetailModalProps) {
  if (!slot) return null;

  const zone = mockZones.find(z => z.id === slot.zone_id);
  const area = mockAreas.find(a => a.id === zone?.area_id);
  const district = mockDistricts.find(d => d.id === area?.district_id);
  const division = mockDivisions.find(d => d.id === district?.division_id);
  const admin = mockSubAdmins.find(a => a.id === zone?.sub_admin_id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-500';
      case 'booked': return 'bg-amber-500';
      case 'occupied': return 'bg-rose-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Slot Details"
      description={`Viewing information for ${slot.unique_slot_id}`}
      maxWidth="lg"
    >
      <div className="space-y-8">
        {/* Status Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg ${getStatusColor(slot.status)}`}>
              {slot.slot_type === 'car' ? <Car /> : slot.slot_type === 'bike' ? <Bike /> : <Truck />}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">Current Status</p>
              <p className="text-xl font-black text-slate-900 capitalize">{slot.status}</p>
            </div>
          </div>
          <Badge variant={slot.status === 'available' ? 'success' : 'warning'} className="px-4 py-1.5 rounded-full text-xs font-black uppercase">
            {slot.status === 'available' ? 'Ready to Book' : 'Not Available'}
          </Badge>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parking Zone</p>
                <p className="font-bold text-slate-900">{zone?.zone_name || "N/A"}</p>
                <p className="text-xs text-slate-500">{zone?.zone_code}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Area & Location</p>
                <p className="font-bold text-slate-900">{area?.name || "N/A"}</p>
                <p className="text-xs text-slate-500">{zone?.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assigned Admin</p>
                <p className="font-bold text-slate-900">{admin ? `${admin.first_name} ${admin.last_name}` : "Unassigned"}</p>
                <p className="text-xs text-slate-500">@{admin?.username}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Division</p>
                <p className="font-bold text-slate-900">{division?.name || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                <Map className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">District</p>
                <p className="font-bold text-slate-900">{district?.name || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <Info className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pricing & Type</p>
                <p className="font-bold text-slate-900">৳{slot.price_per_month}/mo</p>
                <p className="text-xs text-slate-500 capitalize">{slot.slot_type} Slot</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100/50">
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            <h4 className="text-sm font-black uppercase tracking-tight text-indigo-900">Security & Access</h4>
          </div>
          <p className="text-sm text-indigo-700/80 leading-relaxed font-medium">
            {slot.description || "No additional security details provided for this slot. All slots are monitored by 24/7 CCTV surveillance within the zone."}
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} className="premium-gradient shadow-lg shadow-primary/20 min-w-[120px]">
            Close Details
          </Button>
        </div>
      </div>
    </Modal>
  );
}
