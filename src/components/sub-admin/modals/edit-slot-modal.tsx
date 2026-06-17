"use client";

import { useState, useEffect } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { Select } from "@/components/shared/select";
import { Car, Building2, Hash, CreditCard, Save, FileText } from "lucide-react";
import { mockZones } from "@/lib/data";
import { ParkingSlot } from "@/lib/types";
import toast from "react-hot-toast";

interface EditSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: ParkingSlot | null;
}

export function EditSlotModal({ isOpen, onClose, slot }: EditSlotModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slot_number: "",
    slot_type: "",
    price_per_month: 0,
    status: "",
    zone_id: "",
    description: "",
  });

  useEffect(() => {
    if (slot) {
      setFormData({
        slot_number: slot.slot_number,
        slot_type: slot.slot_type,
        price_per_month: slot.price_per_month,
        status: slot.status,
        zone_id: slot.zone_id,
        description: slot.description || "",
      });
    }
  }, [slot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Parking Slot updated successfully!");
      onClose();
    }, 1500);
  };

  if (!slot) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Parking Slot"
      description={`Updating information for slot ${slot.slot_number}`}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="zone">Zone</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select 
              id="zone" 
              required 
              className="pl-10"
              value={formData.zone_id}
              onChange={(e) => setFormData({ ...formData, zone_id: e.target.value })}
            >
              {mockZones.map((z) => (
                <option key={z.id} value={z.id}>{z.zone_name} ({z.zone_code})</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slot_number">Slot Number</Label>
            <Input 
              id="slot_number" 
              placeholder="e.g. A-101" 
              required 
              icon={<Hash className="h-4 w-4" />}
              value={formData.slot_number}
              onChange={(e) => setFormData({ ...formData, slot_number: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slot_type">Slot Type</Label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select 
                id="slot_type" 
                required 
                className="pl-10"
                value={formData.slot_type}
                onChange={(e) => setFormData({ ...formData, slot_type: e.target.value })}
              >
                <option value="car">Car</option>
                <option value="bike">Bike</option>
                <option value="truck">Truck</option>
                <option value="bus">Bus</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="price">Price per Month (BDT)</Label>
            <Input 
              id="price" 
              type="number" 
              placeholder="3000" 
              required 
              icon={<CreditCard className="h-4 w-4" />}
              value={formData.price_per_month}
              onChange={(e) => setFormData({ ...formData, price_per_month: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select 
                id="status" 
                required 
                className="pl-10"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input 
            id="description" 
            placeholder="e.g. Near the entrance, CCTV covered" 
            icon={<FileText className="h-4 w-4" />}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="premium-gradient shadow-lg shadow-primary/20 min-w-[120px]">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </div>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
