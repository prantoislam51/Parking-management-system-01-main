"use client";

import { useState } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { Select } from "@/components/shared/select";
import { Globe, Map, Plus } from "lucide-react";
import { mockDivisions } from "@/lib/data";
import toast from "react-hot-toast";

interface AddDistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDistrictModal({ isOpen, onClose }: AddDistrictModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("New District added successfully!");
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New District"
      description="Select a division and provide the district name."
      maxWidth="md"
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
              onChange={(e) => setSelectedDivision(e.target.value)}
            >
              <option value="">Select Division</option>
              {mockDivisions.map((d) => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district_name">District Name</Label>
          <Input id="district_name" placeholder="e.g. Gazipur" required icon={<Map className="h-4 w-4" />} />
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
                Add District
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
