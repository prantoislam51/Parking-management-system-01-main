"use client";

import { useState, useMemo } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { Select } from "@/components/shared/select";
import { MapPin, Globe, Map, Hash, Plus } from "lucide-react";
import { mockDivisions, mockDistricts } from "@/lib/data";
import toast from "react-hot-toast";

interface AddAreaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAreaModal({ isOpen, onClose }: AddAreaModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const filteredDistricts = useMemo(() => {
    if (!selectedDivision) return [];
    return mockDistricts.filter(d => d.division_id === selectedDivision);
  }, [selectedDivision]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("New Area added successfully!");
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Area"
      description="Select division and district first, then provide area details."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="division">Select Division</Label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select
              id="division"
              required
              className="pl-10"
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
              }}
            >
              <option value="">Select Division</option>
              {mockDivisions.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">Select District</Label>
          <div className="relative">
            <Map className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
            <Select
              id="district"
              required
              className="pl-10"
              disabled={!selectedDivision}
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {filteredDistricts.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area_name">Area Name</Label>
          <Input id="area_name" placeholder="e.g. Uttara Sector 4" required icon={<MapPin className="h-4 w-4" />} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="zip_code">ZIP Code</Label>
            <Input id="zip_code" placeholder="1230" required icon={<Hash className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location_details">Full Location Details</Label>
            <Input id="location_details" placeholder="Near North Tower" required icon={<MapPin className="h-4 w-4" />} />
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
                Adding...
              </div>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Area
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
