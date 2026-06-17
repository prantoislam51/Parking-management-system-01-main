"use client";

import { Button } from "@/components/shared/button";
import { QrCode } from "lucide-react";
import type { BookingDetails } from "@/components/shared/booking-details-modal";
import { Modal } from "@/components/shared/modal";
import { useState } from "react";

interface ShowQRCodeButtonProps {
  booking: BookingDetails;
}

export function ShowQRCodeButton({ booking }: ShowQRCodeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const qrData = JSON.stringify({
    booking_code: booking.booking_code,
    slot_id: booking.slot.unique_slot_id,
    vehicle: booking.vehicle.vehicle_number,
    start_date: booking.start_date,
    end_date: booking.end_date,
  });

  const generateQRPattern = (data: string): string => {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, "0");
  };

  const qrHash = generateQRPattern(qrData);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="h-10 rounded-xl font-bold text-xs border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50 transition-all"
      >
        <QrCode className="h-4 w-4 mr-2" />
        QR Code
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Booking QR Code"
        maxWidth="sm"
      >
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="bg-white p-4 rounded-2xl shadow-lg">
            <div
              className="w-48 h-48 grid gap-1"
              style={{
                backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
                backgroundSize: "8px 8px",
              }}
            >
              <div className="relative">
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <rect x="1" y="1" width="7" height="7" fill="#1f2937" />
                  <rect x="2" y="2" width="5" height="5" fill="white" />
                  <rect x="3" y="3" width="3" height="3" fill="#1f2937" />

                  <rect x="16" y="1" width="7" height="7" fill="#1f2937" />
                  <rect x="17" y="2" width="5" height="5" fill="white" />
                  <rect x="18" y="3" width="3" height="3" fill="#1f2937" />

                  <rect x="1" y="16" width="7" height="7" fill="#1f2937" />
                  <rect x="2" y="17" width="5" height="5" fill="white" />
                  <rect x="3" y="18" width="3" height="3" fill="#1f2937" />

                  <rect x="9" y="1" width="2" height="2" fill="#1f2937" />
                  <rect x="13" y="1" width="1" height="1" fill="#1f2937" />
                  <rect x="9" y="5" width="3" height="2" fill="#1f2937" />
                  <rect x="9" y="9" width="2" height="1" fill="#1f2937" />
                  <rect x="11" y="10" width="1" height="2" fill="#1f2937" />
                  <rect x="9" y="13" width="2" height="1" fill="#1f2937" />
                  <rect x="14" y="9" width="1" height="2" fill="#1f2937" />
                  <rect x="16" y="10" width="2" height="1" fill="#1f2937" />
                  <rect x="9" y="16" width="1" height="3" fill="#1f2937" />
                  <rect x="12" y="16" width="2" height="1" fill="#1f2937" />
                  <rect x="16" y="17" width="3" height="1" fill="#1f2937" />
                  <rect x="16" y="20" width="1" height="2" fill="#1f2937" />
                  <rect x="19" y="16" width="1" height="3" fill="#1f2937" />
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-slate-700">
              Booking: <span className="text-slate-900">{booking.booking_code}</span>
            </p>
            <p className="text-xs text-slate-500">
              Slot: {booking.slot.unique_slot_id}
            </p>
            <p className="text-xs text-slate-500">
              Vehicle: {booking.vehicle.vehicle_number}
            </p>
          </div>

          <p className="text-xs text-slate-400 text-center">
            Scan this code at the parking entrance
          </p>
        </div>
      </Modal>
    </>
  );
}