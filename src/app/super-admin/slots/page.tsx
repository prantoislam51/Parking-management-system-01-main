"use client";

import { useState } from "react";
import { mockSlots, mockZones } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Car, Bike, Truck, Eye } from "lucide-react";
import { SlotDetailModal } from "@/components/super-admin/modals/slot-detail-modal";
import { EditSlotModal } from "@/components/super-admin/modals/edit-slot-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import toast from "react-hot-toast";

interface Slot {
  id: string;
  slot_number: string;
  unique_slot_id: string;
  zone_id: string;
  slot_type: "car" | "bike" | "truck" | "bus";
  status: "available" | "pending" | "booked" | "occupied" | "cancelled" | "maintenance";
  price_per_month: number;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export default function SlotsPage() {
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'car': return <Car className="h-4 w-4" />;
      case 'bike': return <Bike className="h-4 w-4" />;
      case 'truck': return <Truck className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  const handleEdit = (slot: Slot) => {
    setSelectedSlot(slot);
    setEditModalOpen(true);
  };

  const handleDelete = (slot: Slot) => {
    setSelectedSlot(slot);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Slot ${selectedSlot?.slot_number} has been deleted`);
    setIsDeleting(false);
    setDeleteConfirmOpen(false);
    setSelectedSlot(null);
  };

  const columns = [
    {
      key: "slot_number",
      header: "Slot Info",
      cell: (row: Slot) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            {getIcon(row.slot_type)}
          </div>
          <div>
            <p className="font-bold">{row.slot_number}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{row.unique_slot_id}</p>
          </div>
        </div>
      ),
    },
    {
      key: "zone_id",
      header: "Zone",
      cell: (row: Slot) => {
        const zone = mockZones.find(z => z.id === row.zone_id);
        return zone?.zone_name || "Unknown";
      }
    },
    {
      key: "slot_type",
      header: "Type",
      cell: (row: Slot) => (
        <Badge variant="outline" className="capitalize">
          {row.slot_type}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      cell: (row: Slot) => (
        <Badge variant={row.status === 'available' ? 'success' : row.status === 'booked' ? 'warning' : 'danger'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "price_per_month",
      header: "Rate",
      cell: (row: Slot) => `৳${row.price_per_month}/mo`,
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Slot) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-primary hover:bg-primary/10"
            onClick={() => {
              setSelectedSlot(row);
              setIsDetailModalOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-500" onClick={() => handleEdit(row)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-500" onClick={() => handleDelete(row)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <SectionShell
        title="Parking Slots"
        description="Manage individual parking spaces and their availability."
        addLabel="Add Slots"
        onAdd={() => toast.success("Add slots modal")}
      >
        <DataTable
          data={mockSlots}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <SlotDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        slot={selectedSlot}
      />
      <EditSlotModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} slot={selectedSlot} />
      <ConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete Slot"
        description={`Are you sure you want to delete slot "${selectedSlot?.slot_number}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}