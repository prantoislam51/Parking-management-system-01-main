"use client";

import { Button } from "@/components/shared/button";
import { Settings, Pencil, XCircle, RefreshCw } from "lucide-react";
import type { BookingDetails } from "@/components/shared/booking-details-modal";
import { Modal } from "@/components/shared/modal";
import { useState } from "react";

interface ManageBookingButtonProps {
  booking: BookingDetails;
  onManage?: (action: string) => void;
}

export function ManageBookingButton({ booking, onManage }: ManageBookingButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const actions = [
    {
      id: "extend",
      label: "Extend Booking",
      description: "Add more months to your current booking",
      icon: RefreshCw,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      id: "upgrade",
      label: "Upgrade Slot",
      description: "Move to a better parking spot",
      icon: Pencil,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      id: "cancel",
      label: "Cancel Booking",
      description: "Cancel your current booking",
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  const handleAction = (actionId: string) => {
    setSelectedAction(actionId);
  };

  const confirmAction = () => {
    if (selectedAction && onManage) {
      onManage(selectedAction);
    }
    setIsOpen(false);
    setSelectedAction(null);
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="h-10 rounded-xl font-bold text-xs border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50 transition-all"
      >
        <Settings className="h-4 w-4 mr-2" />
        Manage
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Manage Booking"
        maxWidth="sm"
      >
        <div className="space-y-3 py-4">
          <div className="p-3 bg-slate-100 rounded-xl">
            <p className="text-xs text-slate-500 font-medium">Booking Code</p>
            <p className="text-lg font-black text-slate-900">{booking.booking_code}</p>
            <p className="text-xs text-slate-600 mt-1">
              {booking.vehicle.vehicle_number} • {booking.slot.unique_slot_id}
            </p>
          </div>

          <div className="space-y-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                  selectedAction === action.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className={`h-10 w-10 rounded-xl ${action.bg} flex items-center justify-center`}>
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-slate-900 text-sm">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 h-11 rounded-xl font-bold border-2 border-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={confirmAction}
            disabled={!selectedAction}
            className="flex-1 h-11 rounded-xl font-bold shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 to-purple-600 disabled:opacity-50"
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
}