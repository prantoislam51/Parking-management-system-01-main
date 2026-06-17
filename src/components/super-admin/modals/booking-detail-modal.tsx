"use client";

import { Modal } from "@/components/shared/modal";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { 
  Calendar, User, Car, Building2, 
  MapPin, CreditCard, Clock, Info,
  ShieldCheck, ArrowRight
} from "lucide-react";
import { 
  mockSlots, mockZones, mockUsers, 
  mockSubAdmins, mockVehicles 
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface BookingDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: any;
}

export function BookingDetailModal({ isOpen, onClose, booking }: BookingDetailModalProps) {
  if (!booking) return null;

  const user = mockUsers.find(u => u.id === booking.user_id);
  const slot = mockSlots.find(s => s.id === booking.slot_id);
  const vehicle = mockVehicles.find(v => v.id === booking.vehicle_id);
  const zone = mockZones.find(z => z.id === slot?.zone_id);
  const admin = mockSubAdmins.find(a => a.id === zone?.sub_admin_id);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'pending': return 'warning';
      case 'completed': return 'secondary';
      case 'cancelled': return 'danger';
      default: return 'default';
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Booking Details"
      description={`Viewing complete information for ${booking.booking_code}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Status Header */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shadow-sm">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Booking Status</p>
              <Badge variant={getStatusVariant(booking.status)} className="mt-1 font-black uppercase text-[10px] px-3">
                {booking.status}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Amount</p>
            <p className="text-xl font-black text-slate-900">{formatCurrency(booking.total_amount)}</p>
          </div>
        </div>

        {/* Info Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-3.5 w-3.5 text-primary" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Customer Info</h4>
              </div>
              <p className="text-sm font-bold text-slate-900">{user?.first_name} {user?.last_name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
              <p className="text-xs text-slate-500">{user?.phone}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <Car className="h-3.5 w-3.5 text-emerald-600" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Vehicle Info</h4>
              </div>
              <p className="text-sm font-bold text-slate-900">{vehicle?.brand} {vehicle?.model}</p>
              <p className="text-xs text-slate-500 font-mono">{vehicle?.vehicle_number}</p>
              <Badge variant="outline" className="mt-1 text-[10px] font-black uppercase py-0">{vehicle?.vehicle_type}</Badge>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="h-3.5 w-3.5 text-amber-600" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Parking Slot</h4>
              </div>
              <p className="text-sm font-bold text-slate-900">{slot?.unique_slot_id}</p>
              <p className="text-xs text-slate-500">{zone?.zone_name}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5">
                <MapPin className="h-3 w-3" />
                <span>{zone?.address}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" />
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Managed By</h4>
              </div>
              <p className="text-sm font-bold text-slate-900">{admin ? `${admin.first_name} ${admin.last_name}` : "Unassigned"}</p>
              <p className="text-xs text-slate-500">Sub Admin ID: {admin?.id || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Timeline/Duration */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" />
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Booking Timeline</h4>
            </div>
            <p className="text-xs font-black text-primary">{booking.duration_months} Months Duration</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Start Date</p>
              <p className="text-sm font-black text-slate-700">{new Date(booking.start_date).toLocaleDateString()}</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-300" />
            <div className="flex-1 text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">End Date</p>
              <p className="text-sm font-black text-slate-700">{new Date(booking.end_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl font-bold">
            Close
          </Button>
          {booking.status === 'pending' && (
            <Button className="premium-gradient shadow-lg shadow-primary/20 rounded-xl font-black px-8">
              Review Request
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
