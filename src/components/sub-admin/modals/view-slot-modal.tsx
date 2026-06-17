"use client";

import { Modal } from "@/components/shared/modal";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Car, Building2, MapPin, CreditCard, User, Phone, Mail, Calendar, Info } from "lucide-react";
import { mockZones, mockBookings, mockUsers } from "@/lib/data";
import { ParkingSlot } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface ViewSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: ParkingSlot | null;
}

export function ViewSlotModal({ isOpen, onClose, slot }: ViewSlotModalProps) {
  if (!slot) return null;

  const zone = mockZones.find(z => z.id === slot.zone_id);
  
  // Find booking for this slot if occupied/booked
  const booking = (slot.status === "booked" || slot.status === "occupied" || slot.status === "pending") 
    ? mockBookings.find(b => b.slot_id === slot.id)
    : null;
    
  const user = booking ? mockUsers.find(u => u.id === booking.user_id) : null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Parking Slot Details"
      description={`Viewing information for slot ${slot.slot_number}`}
      maxWidth="lg"
    >
      <div className="space-y-6">
        {/* Slot Info Section */}
        <div className="bg-muted/30 p-4 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <Info className="h-4 w-4 text-primary" />
              Slot Information
            </h4>
            <Badge variant={
              slot.status === "available" ? "success" : 
              slot.status === "booked" ? "warning" : 
              slot.status === "occupied" ? "danger" : "secondary"
            }>
              {slot.status.toUpperCase()}
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Slot Number</p>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="font-bold">{slot.slot_number}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Slot Type</p>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span className="font-bold capitalize">{slot.slot_type}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Price/Month</p>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <span className="font-bold">{formatCurrency(slot.price_per_month)}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-medium">Zone</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-bold truncate">{zone?.zone_name || "N/A"}</span>
              </div>
            </div>
          </div>
          
          {slot.description && (
            <div className="pt-2 border-t border-muted">
              <p className="text-xs text-muted-foreground font-medium mb-1">Description</p>
              <p className="text-sm">{slot.description}</p>
            </div>
          )}
        </div>

        {/* User/Occupant Info Section (Only if not available) */}
        {slot.status !== "available" && user ? (
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 space-y-4">
            <h4 className="text-sm font-bold flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              Occupant Information
            </h4>
            
            <div className="flex items-center gap-4 pb-4 border-b border-primary/10">
              <Avatar firstName={user.first_name} lastName={user.last_name} size="lg" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold">{user.first_name} {user.last_name}</p>
                  <Badge variant="outline" className="text-[10px] h-4">
                    {user.user_type?.toUpperCase() || "USER"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">@{user.username}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                  <Mail className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Email</p>
                  <p className="text-xs font-bold">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Phone</p>
                  <p className="text-xs font-bold">{user.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Booking Period</p>
                  <p className="text-xs font-bold">{booking?.start_date} to {booking?.end_date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center border shadow-sm">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-medium">Profession</p>
                  <p className="text-xs font-bold">{user.profession || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : slot.status !== "available" && !user ? (
          <div className="bg-warning/5 p-4 rounded-xl border border-warning/10 text-center">
            <p className="text-sm text-warning font-medium">No active booking record found for this slot.</p>
          </div>
        ) : null}

        <div className="flex justify-end pt-2">
          <Button onClick={onClose} className="min-w-[100px]">Close</Button>
        </div>
      </div>
    </Modal>
  );
}
