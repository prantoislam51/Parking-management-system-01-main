"use client";

import { Modal } from "@/components/shared/modal";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { 
  User, Calendar, Hash, 
  CheckCircle2, AlertCircle,
  Receipt
} from "lucide-react";
import { mockUsers, mockBookings, mockSubAdmins } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

interface Payment {
  id: string;
  user_id: string;
  booking_id: string;
  amount: number;
  payment_status: 'paid' | 'pending' | 'failed';
  payment_method: string;
  transaction_id: string;
  payment_date?: string;
  created_at: string;
  verified_by?: string;
  verified_at?: string;
}

interface PaymentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  payment: Payment | null;
}

export function PaymentDetailModal({ isOpen, onClose, payment }: PaymentDetailModalProps) {
  if (!payment) return null;

  const user = mockUsers.find(u => u.id === payment.user_id);
  const booking = mockBookings.find(b => b.id === payment.booking_id);
  const verifier = mockSubAdmins.find(a => a.id === payment.verified_by);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      description={`Viewing details for Transaction ID: ${payment.transaction_id || "N/A"}`}
      maxWidth="lg"
    >
      <div className="space-y-8">
        {/* Payment Summary Header */}
        <div className="flex items-center justify-between p-6 rounded-4xl bg-slate-900 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] -mr-10 -mt-10" />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Total Paid</p>
            <p className="text-4xl font-black tracking-tight">{formatCurrency(payment.amount)}</p>
          </div>
          <div className="relative z-10 text-right">
            <Badge variant={payment.payment_status === 'paid' ? 'success' : 'warning'} className="font-black uppercase text-[10px] px-4 py-1.5 rounded-full border-white/10">
              {payment.payment_status}
            </Badge>
            <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{payment.payment_method} Transfer</p>
          </div>
        </div>

        {/* Detailed Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 shrink-0">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Customer</p>
                <p className="font-bold text-slate-900">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                <Receipt className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Booking Reference</p>
                <p className="font-bold text-slate-900">{booking?.booking_code || "N/A"}</p>
                <p className="text-xs text-slate-500">Plan: {booking?.duration_months} Months</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Payment Date</p>
                <p className="font-bold text-slate-900">{payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "Pending Verification"}</p>
                <p className="text-xs text-slate-500">Submitted at: {new Date(payment.created_at).toLocaleTimeString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <Hash className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Transaction ID</p>
                <p className="font-mono font-bold text-slate-900">{payment.transaction_id || "NOT_PROVIDED"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className={`p-6 rounded-4xl border-2 flex items-center justify-between ${
          payment.payment_status === 'paid' 
            ? 'bg-emerald-50 border-emerald-100' 
            : 'bg-amber-50 border-amber-100'
        }`}>
          <div className="flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
              payment.payment_status === 'paid' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'
            }`}>
              {payment.payment_status === 'paid' ? <CheckCircle2 className="h-6 w-6" /> : <AlertCircle className="h-6 w-6" />}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">
                {payment.payment_status === 'paid' ? 'Verified Transaction' : 'Awaiting Verification'}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {payment.payment_status === 'paid' 
                  ? `Verified by ${verifier?.first_name || "Admin"} on ${new Date(payment.verified_at).toLocaleDateString()}` 
                  : 'This transaction requires manual verification by a sub-admin.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={onClose} className="rounded-xl font-bold h-12 px-6">
            Close
          </Button>
          {payment.payment_status !== 'paid' && (
            <Button className="premium-gradient shadow-lg shadow-primary/20 rounded-xl font-black h-12 px-10">
              Verify Now
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
