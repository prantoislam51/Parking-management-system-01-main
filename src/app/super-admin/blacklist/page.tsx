"use client";

import { mockUsers } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { ShieldAlert, UserMinus, RotateCcw } from "lucide-react";
import toast from "react-hot-toast";

export default function BlacklistPage() {
  const blacklistedUsers = mockUsers.filter(u => u.is_blacklisted);

  const columns = [
    {
      key: "name",
      header: "User",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">{row.first_name} {row.last_name}</p>
            <p className="text-xs text-muted-foreground">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: "phone", header: "Phone" },
    {
      key: "reason",
      header: "Reason",
      cell: () => "Payment fraud / Rule violation"
    },
    {
      key: "actions",
      header: "Actions",
      cell: () => (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 border-destructive/20 text-destructive hover:bg-destructive/10">
            <UserMinus className="h-4 w-4 mr-1" />
            Ban Permanently
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-primary">
            <RotateCcw className="h-4 w-4 mr-1" />
            Reactivate
          </Button>
        </div>
      ),
    },
  ];

  return (
    <SectionShell
      title="Blacklist"
      description="Manage restricted users who have violated system policies."
      addLabel="Blacklist User"
      onAdd={() => toast.error("Select a user to blacklist")}
    >
      <DataTable
        data={blacklistedUsers}
        columns={columns}
        keyExtractor={(row) => row.id}
        emptyMessage="Clean sheet! No users are currently blacklisted."
      />
    </SectionShell>
  );
}
