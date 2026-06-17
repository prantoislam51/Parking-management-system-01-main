"use client";

import { useState } from "react";
import { mockDistricts, mockDivisions } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Building2 } from "lucide-react";
import { AddDistrictModal } from "@/components/super-admin/modals/add-district-modal";
import { EditDistrictModal } from "@/components/super-admin/modals/edit-district-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import toast from "react-hot-toast";

interface District {
  id: string;
  name: string;
  code: string;
  division_id: string;
}

export default function DistrictsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<District | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (item: District) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDelete = (item: District) => {
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
      header: "District Name",
      cell: (row: District) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="font-bold">{row.name}</span>
        </div>
      ),
    },
    {
      key: "division_id",
      header: "Division",
      cell: (row: District) => {
        const division = mockDivisions.find(d => d.id === row.division_id);
        return division?.name || "Unknown";
      }
    },
    { key: "code", header: "Code" },
    {
      key: "actions",
      header: "Actions",
      cell: (row: District) => (
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
        title="Districts"
        description="Manage districts within divisions."
        addLabel="Add District"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockDistricts}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <AddDistrictModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditDistrictModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} district={selectedItem} />
      <ConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete District"
        description={`Are you sure you want to delete "${selectedItem?.name}"? All areas within this district will also be affected.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}