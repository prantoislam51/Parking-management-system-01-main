"use client";

import { useState } from "react";
import { mockZones, mockAreas, mockSubAdmins } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Building2, MapPin } from "lucide-react";
import { CreateZoneModal } from "@/components/super-admin/modals/create-zone-modal";
import { EditZoneModal } from "@/components/super-admin/modals/edit-zone-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import toast from "react-hot-toast";

interface Zone {
  id: string;
  zone_name: string;
  zone_code: string;
  area_id: string;
  sub_admin_id: string;
  total_slots: number;
  is_active: boolean;
}

export default function ZonesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Zone | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (item: Zone) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDelete = (item: Zone) => {
    setSelectedItem(item);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`${selectedItem?.zone_name} has been deleted`);
    setIsDeleting(false);
    setDeleteConfirmOpen(false);
    setSelectedItem(null);
  };

  const columns = [
    {
      key: "zone_name",
      header: "Zone Name",
      cell: (row: Zone) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">{row.zone_name}</p>
            <p className="text-xs text-muted-foreground">{row.zone_code}</p>
          </div>
        </div>
      ),
    },
    {
      key: "area_id",
      header: "Location",
      cell: (row: Zone) => {
        const area = mockAreas.find(a => a.id === row.area_id);
        return (
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-xs">{area?.name || "Unknown"}</span>
          </div>
        );
      }
    },
    {
      key: "sub_admin_id",
      header: "Manager",
      cell: (row: Zone) => {
        const admin = mockSubAdmins.find(a => a.id === row.sub_admin_id);
        return admin ? `${admin.first_name} ${admin.last_name}` : "Unassigned";
      }
    },
    { key: "total_slots", header: "Total Slots" },
    {
      key: "is_active",
      header: "Status",
      cell: (row: Zone) => (
        <Badge variant={row.is_active ? "success" : "secondary"}>
          {row.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Zone) => (
        <div className="flex items-center gap-2">
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
        title="Parking Zones"
        description="Manage all parking facilities across different areas."
        addLabel="Create Zone"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockZones}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <CreateZoneModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditZoneModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} zone={selectedItem} />
      <ConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete Zone"
        description={`Are you sure you want to delete "${selectedItem?.zone_name}"? All slots within this zone will also be affected.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}