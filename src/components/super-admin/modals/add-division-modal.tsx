"use client";

import { useState } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { Globe, Plus } from "lucide-react";
import toast from "react-hot-toast";

interface AddDivisionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDivisionModal({ isOpen, onClose }: AddDivisionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("New Division added successfully!");
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Division"
      description="Provide the name of the new administrative division."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="division_name">Division Name</Label>
          <Input id="division_name" placeholder="e.g. Dhaka" required icon={<Globe className="h-4 w-4" />} />
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
                Add Division
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
