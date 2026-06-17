"use client";

import { useState } from "react";
import { mockAreas, mockDistricts } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, MapPin } from "lucide-react";
import { AddAreaModal } from "@/components/super-admin/modals/add-area-modal";
import { EditAreaModal } from "@/components/super-admin/modals/edit-area-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import toast from "react-hot-toast";

interface Area {
  id: string;
  name: string;
  code: string;
  district_id: string;
}

export default function AreasPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Area | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (item: Area) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDelete = (item: Area) => {
    setSelectedItem(item);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`${selectedItem?.name} has been deleted`);
    setIsDeleting(false);
    setDeleteConfirmOpen(false);
    setSelectedItem(null);
  };

  const columns = [
    {
      key: "name",
      header: "Area Name",
      cell: (row: Area) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-600">
            <MapPin className="h-4 w-4" />
          </div>
          <span className="font-bold">{row.name}</span>
        </div>
      ),
    },
    {
      key: "district_id",
      header: "District",
      cell: (row: Area) => {
        const district = mockDistricts.find(d => d.id === row.district_id);
        return district?.name || "Unknown";
      }
    },
    { key: "code", header: "Code" },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Area) => (
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
        title="Areas"
        description="Manage specific areas and neighborhoods."
        addLabel="Add Area"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockAreas}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <AddAreaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditAreaModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} area={selectedItem} />
      <ConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete Area"
        description={`Are you sure you want to delete "${selectedItem?.name}"? All zones within this area will also be affected.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}