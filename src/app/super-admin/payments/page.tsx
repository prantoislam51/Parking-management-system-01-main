"use client";

import { useState } from "react";
import { mockPayments, mockUsers } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { CreditCard, CheckCircle2, XCircle, MoreVertical, Eye } from "lucide-react";
import { PaymentDetailModal } from "@/components/super-admin/modals/payment-detail-modal";
import toast from "react-hot-toast";

export default function PaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const columns = [
    {
      key: "transaction_id",
      header: "Transaction ID",
      cell: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="font-mono text-sm font-bold">{row.transaction_id || "N/A"}</span>
        </div>
      ),
    },
    {
      key: "user_id",
      header: "User",
      cell: (row: any) => {
        const user = mockUsers.find(u => u.id === row.user_id);
        return user ? `${user.first_name} ${user.last_name}` : "Unknown";
      }
    },
    {
      key: "amount",
      header: "Amount",
      cell: (row: any) => `৳${row.amount}`,
    },
    {
      key: "payment_method",
      header: "Method",
      cell: (row: any) => (
        <Badge variant="outline" className="uppercase font-bold text-[10px]">
          {row.payment_method}
        </Badge>
      ),
    },
    {
      key: "payment_status",
      header: "Status",
      cell: (row: any) => (
        <Badge variant={row.payment_status === 'paid' ? 'success' : 'warning'}>
          {row.payment_status}
        </Badge>
      ),
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
              setSelectedPayment(row);
              setIsDetailModalOpen(true);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          {row.payment_status !== 'paid' ? (
            <Button size="sm" className="h-8 bg-emerald-600 hover:bg-emerald-700">
              Verify
            </Button>
          ) : (
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold px-2">
              <CheckCircle2 className="h-4 w-4" />
              Verified
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <SectionShell
        title="Payments"
        description="Verify and track all financial transactions."
        searchPlaceholder="Search by transaction ID..."
      >
        <DataTable
          data={mockPayments}
          columns={columns}
          keyExtractor={(row) => row.id}
        />
      </SectionShell>
      <PaymentDetailModal 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
        payment={selectedPayment} 
      />
    </>
  );
}
