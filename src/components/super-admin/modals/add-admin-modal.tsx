"use client";

import { useState } from "react";
import { Modal } from "@/components/shared/modal";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Button } from "@/components/shared/button";
import { UserCog, Mail, Phone, MapPin, User } from "lucide-react";
import toast from "react-hot-toast";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddAdminModal({ isOpen, onClose }: AddAdminModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Sub Admin invited successfully!");
      onClose();
    }, 1500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Invite New Sub Admin"
      description="Fill in the details below to invite a new administrator to manage parking zones."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input id="first_name" placeholder="John" required icon={<User className="h-4 w-4" />} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name">Last Name</Label>
            <Input id="last_name" placeholder="Doe" required icon={<User className="h-4 w-4" />} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" placeholder="john@example.com" required icon={<Mail className="h-4 w-4" />} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="+880 1XXX XXXXXX" required icon={<Phone className="h-4 w-4" />} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" placeholder="123 Street, Dhaka, Bangladesh" required icon={<MapPin className="h-4 w-4" />} />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="premium-gradient shadow-lg shadow-primary/20 min-w-[120px]">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Inviting...
              </div>
            ) : (
              <>
                <UserCog className="h-4 w-4 mr-2" />
                Invite Admin
              </>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
