"use client";

import { useState } from "react";
import { mockBookings, mockUsers, mockSlots } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Calendar, ExternalLink, MoreHorizontal, Eye } from "lucide-react";
import { BookingDetailModal } from "@/components/super-admin/modals/booking-detail-modal";
import toast from "react-hot-toast";

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const columns = [
    {
      key: "booking_code",
      header: "Booking",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">{row.booking_code}</p>
            <p className="text-xs text-muted-foreground">{new Date(row.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      ),
    },
    {
      key: "user_id",
      header: "Customer",
      cell: (row: any) => {
        const customer = mockUsers.find(u => u.id === row.user_id);
        return customer ? `${customer.first_name} ${customer.last_name}` : "Unknown";
      }
    },
    {
      key: "duration",
      header: "Duration",
      cell: (row: any) => `${row.duration_months} Months`,
    },
    {
      key: "total_amount",
      header: "Amount",
      cell: (row: any) => `৳${row.total_amount}`,
    },
    {
      key: "status",
      header: "Status",
      cell: (row: any) => {
        const variants: any = {
          approved: "success",
          pending: "warning",
          completed: "info",
          cancelled: "danger"
        };
        return <Badge variant={variants[row.status]}>{row.status}</Badge>;
      }
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-primary"
            onClick={() => {
              setSelectedBooking(row);
              setIsDetailModalOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SectionShell
        title="Bookings"
        description="Track and manage all parking slot reservations."
        searchPlaceholder="Search by booking code..."
      >
        <DataTable
          data={mockBookings}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <BookingDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        booking={selectedBooking} 
      />
    </>
  );
}
