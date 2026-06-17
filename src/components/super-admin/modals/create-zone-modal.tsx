"use client";

import { useState } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { Select } from "@/components/shared/select";
import { Building2, MapPin, User, Hash, Navigation, Plus } from "lucide-react";
import { mockAreas, mockSubAdmins } from "@/lib/data";
import toast from "react-hot-toast";

interface CreateZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateZoneModal({ isOpen, onClose }: CreateZoneModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Parking Zone created successfully!");
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Parking Zone"
      description="Set up a new parking facility by providing the necessary details."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zone_name">Zone Name</Label>
            <Input id="zone_name" placeholder="e.g. Uttara Center Point" required icon={<Building2 className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zone_code">Zone Code</Label>
            <Input id="zone_code" placeholder="e.g. UC-001" required icon={<Hash className="h-4 w-4" />} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="area">Select Area</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select id="area" required className="pl-10">
                <option value="">Select Area</option>
                {mockAreas.map((a) => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin">Assign Sub Admin</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
              <Select id="admin" required className="pl-10">
                <option value="">Select Admin</option>
                {mockSubAdmins.map((admin) => (
                  <option key={admin.id} value={admin.id}>{admin.first_name} {admin.last_name}</option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Full Address</Label>
          <Input id="address" placeholder="Sector 4, Uttara, Dhaka" required icon={<MapPin className="h-4 w-4" />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input id="latitude" type="number" step="any" placeholder="23.8..." required icon={<Navigation className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input id="longitude" type="number" step="any" placeholder="90.3..." required icon={<Navigation className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slots">Total Slots</Label>
            <Input id="slots" type="number" placeholder="50" required icon={<Hash className="h-4 w-4" />} />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="premium-gradient shadow-lg shadow-primary/20 min-w-[120px]">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating...
              </div>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Create Zone
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
