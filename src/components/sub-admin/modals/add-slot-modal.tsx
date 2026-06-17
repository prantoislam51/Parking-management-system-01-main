"use client";

import { useState } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { Select } from "@/components/shared/select";
import { Car, Building2, Hash, CreditCard, Plus, FileText } from "lucide-react";
import { mockZones } from "@/lib/data";
import { useUser } from "@/lib/hooks/use-user";
import toast from "react-hot-toast";

interface AddSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSlotModal({ isOpen, onClose }: AddSlotModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Parking Slot added successfully!");
      onClose();
    }, 1500);
  };

  // Filter zones that belong to the current sub-admin
  const myZones = mockZones.filter(z => z.sub_admin_id === "sub-admin-001"); // For demo, using hardcoded ID as in the pages

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Parking Slot"
      description="Create a new parking slot within one of your managed zones."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="zone">Select Zone</Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select id="zone" required className="pl-10">
              <option value="">Select a Zone</option>
              {myZones.map((z) => (
                <option key={z.id} value={z.id}>{z.zone_name} ({z.zone_code})</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="slot_number">Slot Number</Label>
            <Input id="slot_number" placeholder="e.g. A-101" required icon={<Hash className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slot_type">Slot Type</Label>
            <div className="relative">
              <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select id="slot_type" required className="pl-10">
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
            <Input id="price" type="number" placeholder="3000" required icon={<CreditCard className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Initial Status</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select id="status" required className="pl-10">
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Input id="description" placeholder="e.g. Near the entrance, CCTV covered" icon={<FileText className="h-4 w-4" />} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="premium-gradient shadow-lg shadow-primary/20 min-w-[120px]">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding...
              </div>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Slot
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
