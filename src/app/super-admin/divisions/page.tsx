"use client";

import { useState } from "react";
import { mockDivisions } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Map } from "lucide-react";
import { AddDivisionModal } from "@/components/super-admin/modals/add-division-modal";
import { EditDivisionModal } from "@/components/super-admin/modals/edit-division-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import toast from "react-hot-toast";

interface Division {
  id: string;
  name: string;
  code: string;
  created_at: string;
}

export default function DivisionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Division | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (item: Division) => {
    setSelectedItem(item);
    setEditModalOpen(true);
  };

  const handleDelete = (item: Division) => {
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
      header: "Division Name",
      cell: (row: Division) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            <Map className="h-4 w-4" />
          </div>
          <span className="font-bold">{row.name}</span>
        </div>
      ),
    },
    { key: "code", header: "Code" },
    {
      key: "created_at",
      header: "Created At",
      cell: (row: Division) => new Date(row.created_at).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: Division) => (
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
        title="Divisions"
        description="Manage the highest level of geographical organization."
        addLabel="Add Division"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockDivisions}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <AddDivisionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditDivisionModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} division={selectedItem} />
      <ConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete Division"
        description={`Are you sure you want to delete "${selectedItem?.name}"? This will also affect all districts and areas within it.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isDeleting}
      />
    </>
  );
}