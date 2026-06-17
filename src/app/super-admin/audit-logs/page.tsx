"use client";

import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { FileText, Clock, User } from "lucide-react";

// Mock audit logs
const mockAuditLogs = [
  { id: "1", action: "USER_LOGIN", user: "Admin Super", target: "System", details: "Successful login from IP 192.168.1.1", timestamp: new Date().toISOString() },
  { id: "2", action: "ZONE_CREATED", user: "Admin Super", target: "Zone GN-001", details: "Created new parking zone in Gulshan", timestamp: new Date(Date.now() - 3600000).toISOString() },
  { id: "3", action: "PAYMENT_VERIFIED", user: "Rahim Ahmed", target: "Pay-001", details: "Verified payment for Booking PK-A1B2C3D4", timestamp: new Date(Date.now() - 7200000).toISOString() },
  { id: "4", action: "USER_BLACKLISTED", user: "Admin Super", target: "Kamal Hasan", details: "Multiple rule violations", timestamp: new Date(Date.now() - 86400000).toISOString() },
];

export default function AuditLogsPage() {
  const columns = [
    {
      key: "action",
      header: "Action",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            <FileText className="h-4 w-4" />
          </div>
          <Badge variant="outline" className="font-mono">{row.action}</Badge>
        </div>
      ),
    },
    {
      key: "user",
      header: "Performed By",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          <User className="h-3 w-3 text-muted-foreground" />
          <span className="text-sm font-medium">{row.user}</span>
        </div>
      )
    },
    { key: "details", header: "Details", className: "max-w-xs truncate" },
    {
      key: "timestamp",
      header: "Time",
      cell: (row: any) => (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {new Date(row.timestamp).toLocaleString()}
        </div>
      )
    },
  ];

  return (
    <SectionShell
      title="Audit Logs"
      description="Track every administrative action and system event for transparency."
      searchPlaceholder="Filter by action or user..."
    >
      <DataTable
        data={mockAuditLogs}
        columns={columns}
        keyExtractor={(row) => row.id}
      />
    </SectionShell>
  );
}
