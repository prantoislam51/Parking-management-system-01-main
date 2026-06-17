"use client";

import { Button } from "@/components/shared/button";
import { FileText, Download } from "lucide-react";
import type { BookingDetails } from "@/components/shared/booking-details-modal";
import { formatCurrency } from "@/lib/utils";

interface DownloadInvoiceButtonProps {
  booking: BookingDetails;
}

export function DownloadInvoiceButton({ booking }: DownloadInvoiceButtonProps) {
  const handleDownload = () => {
    const invoiceContent = `
INVOICE
=======
Booking Code: ${booking.booking_code}
Status: ${booking.status.toUpperCase()}

VEHICLE
-------
Number: ${booking.vehicle.vehicle_number}
Type: ${booking.vehicle.vehicle_type}
Brand: ${booking.vehicle.brand} ${booking.vehicle.model}
Color: ${booking.vehicle.color}
License: ${booking.vehicle.license_number}

PARKING DETAILS
---------------
Slot: ${booking.slot.unique_slot_id}
Type: ${booking.slot.slot_type}
Description: ${booking.slot.description}

LOCATION
--------
Zone: ${booking.zone.zone_name} (${booking.zone.zone_code})
Area: ${booking.zone.area}, ${booking.zone.district}
Address: ${booking.zone.address}

BOOKING PERIOD
--------------
Start Date: ${new Date(booking.start_date).toLocaleDateString()}
End Date: ${new Date(booking.end_date).toLocaleDateString()}
Duration: ${booking.duration_months} month(s)

PAYMENT DETAILS
---------------
Monthly Amount: ${formatCurrency(booking.monthly_amount)}
Total Amount: ${formatCurrency(booking.total_amount)}
Payment Status: ${booking.payment.payment_status.toUpperCase()}
Transaction ID: ${booking.payment.transaction_id}
Payment Method: ${booking.payment.payment_method}

Date: ${new Date().toLocaleDateString()}
    `.trim();

    const blob = new Blob([invoiceContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${booking.booking_code}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      className="h-10 rounded-xl font-bold text-xs border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50 transition-all"
    >
      <FileText className="h-4 w-4 mr-2" />
      <Download className="h-4 w-4 mr-2" />
      Invoice
    </Button>
  );
}