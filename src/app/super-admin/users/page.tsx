"use client";

import { useState } from "react";
import { mockUsers } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/shared/button";
import { Edit, Trash2, Ban } from "lucide-react";
import { AddUserModal } from "@/components/super-admin/modals/add-user-modal";
import { EditUserModal } from "@/components/super-admin/modals/edit-user-modal";
import { ConfirmModal } from "@/components/shared/confirm-modal";
import toast from "react-hot-toast";

interface RegularUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  user_type: "driver" | "owner";
  is_blacklisted: boolean;
}

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [banConfirmOpen, setBanConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<RegularUser | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleEdit = (user: RegularUser) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleDelete = (user: RegularUser) => {
    setSelectedUser(user);
    setDeleteConfirmOpen(true);
  };

  const handleBan = (user: RegularUser) => {
    setSelectedUser(user);
    setBanConfirmOpen(true);
  };

  const confirmDelete = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`${selectedUser?.first_name} ${selectedUser?.last_name} has been deleted`);
    setIsProcessing(false);
    setDeleteConfirmOpen(false);
    setSelectedUser(null);
  };

  const confirmBan = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`${selectedUser?.first_name} ${selectedUser?.last_name} has been ${selectedUser?.is_blacklisted ? "unbanned" : "blacklisted"}`);
    setIsProcessing(false);
    setBanConfirmOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      key: "name",
      header: "User",
      cell: (row: unknown) => {
        const user = row as RegularUser;
        return (
          <div className="flex items-center gap-3">
            <Avatar firstName={user.first_name} lastName={user.last_name} size="sm" />
            <div>
              <p className="font-bold">{user.first_name} {user.last_name}</p>
              <p className="text-xs text-muted-foreground">{user.user_type === 'owner' ? 'Zone Owner' : 'Driver'}</p>
            </div>
          </div>
        );
      },
    },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    {
      key: "is_blacklisted",
      header: "Trust Score",
      cell: (row: unknown) => {
        const user = row as RegularUser;
        return (
          <Badge variant={user.is_blacklisted ? "danger" : "success"}>
            {user.is_blacklisted ? "Blacklisted" : "Verified"}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      cell: (row: unknown) => {
        const user = row as RegularUser;
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50 hover:text-blue-500" onClick={() => handleEdit(user)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-600 hover:bg-amber-50 hover:text-amber-700" onClick={() => handleBan(user)}>
              <Ban className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-red-50 hover:text-red-500" onClick={() => handleDelete(user)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <SectionShell
        title="Users"
        description="View and manage drivers and parking zone owners."
        addLabel="Add User"
        onAdd={() => setIsModalOpen(true)}
      >
        <DataTable
          data={mockUsers}
          columns={columns}
          keyExtractor={(row) => (row as RegularUser).id}
        />
      </SectionShell>
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <EditUserModal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)} user={selectedUser} />
      <ConfirmModal
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${selectedUser?.first_name} ${selectedUser?.last_name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        isLoading={isProcessing}
      />
      <ConfirmModal
        open={banConfirmOpen}
        onOpenChange={setBanConfirmOpen}
        onConfirm={confirmBan}
        title={selectedUser?.is_blacklisted ? "Unban User" : "Blacklist User"}
        description={`Are you sure you want to ${selectedUser?.is_blacklisted ? "unban" : "blacklist"} ${selectedUser?.first_name} ${selectedUser?.last_name}?`}
        confirmText={selectedUser?.is_blacklisted ? "Unban" : "Blacklist"}
        cancelText="Cancel"
        variant="danger"
        isLoading={isProcessing}
      />
    </>
  );
}