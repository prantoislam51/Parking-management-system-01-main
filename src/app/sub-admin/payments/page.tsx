"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockPayments, mockBookings, mockSlots, mockZones, mockUsers } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { CreditCard, Filter, Eye, CheckCircle, Search, DollarSign, TrendingUp, Clock } from "lucide-react";
import { Payment } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function PaymentsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");

  const myZones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];
  const myZoneIds = myZones.map(z => z.id);
  const mySlots = isDemoMode ? mockSlots.filter(s => myZoneIds.includes(s.zone_id)) : [];
  const mySlotIds = mySlots.map(s => s.id);
  const myBookings = isDemoMode ? mockBookings.filter(b => mySlotIds.includes(b.slot_id)) : [];
  const myBookingIds = myBookings.map(b => b.id);
  const payments = isDemoMode
    ? mockPayments.filter(p => myBookingIds.includes(p.booking_id))
    : [];

  const filteredPayments = searchQuery
    ? payments.filter(p => {
        const user = mockUsers.find(u => u.id === p.user_id);
        return (
          p.transaction_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user?.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
      })
    : payments;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid": return { bg: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500 to-teal-600" };
      case "unpaid": return { bg: "bg-amber-500/20 text-amber-400", border: "border-amber-500/30", gradient: "from-amber-500 to-orange-600" };
      case "failed": return { bg: "bg-rose-500/20 text-rose-400", border: "border-rose-500/30", gradient: "from-rose-500 to-pink-600" };
      case "refunded": return { bg: "bg-purple-500/20 text-purple-400", border: "border-purple-500/30", gradient: "from-purple-500 to-indigo-600" };
      default: return { bg: "bg-slate-500/20 text-gray-400", border: "border-slate-500/30", gradient: "from-slate-500 to-gray-600" };
    }
  };

  const totalPaid = payments.filter(p => p.payment_status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalUnpaid = payments.filter(p => p.payment_status === "unpaid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Payment <span className="animated-gradient-text">History</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Track and verify payments for your parking zones.
          </p>
        </div>
        <Button variant="outline" className="h-10 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
          <Filter className="h-4 w-4 mr-2" />
          Filter Payments
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{payments.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{formatCurrency(totalPaid)}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Received</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{formatCurrency(totalUnpaid)}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-purple-400">+12%</p>
              <p className="text-[9px] font-bold text-purple-400/60 uppercase tracking-wider">Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 group">
        <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search by transaction ID, user name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-500 text-white"
        />
      </div>

      {/* Payments List */}
      {filteredPayments.length > 0 ? (
        <div className="space-y-4">
          {filteredPayments.map((payment) => {
            const user = mockUsers.find(u => u.id === payment.user_id);
            const colors = getStatusColor(payment.payment_status);

            return (
              <Card key={payment.id} className="card-elegant group hover:scale-[1.01] transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Transaction ID Badge */}
                    <div className={`lg:w-56 p-4 rounded-xl bg-gradient-to-br ${colors.bg.replace("text-", "").replace("/20", "/10")} border ${colors.border}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-current" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase">Transaction</p>
                          <p className="text-sm font-black text-white font-mono">{payment.transaction_id || "PENDING"}</p>
                        </div>
                      </div>
                      <Badge className={`${colors.bg} border-0 font-bold text-xs`}>
                        {payment.payment_status.toUpperCase()}
                      </Badge>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 lg:w-48">
                      <Avatar firstName={user?.first_name || ""} lastName={user?.last_name || ""} size="md" className="border-2 border-slate-700" />
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="flex-1 grid grid-cols-3 gap-3">
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount</p>
                        <p className="text-lg font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Method</p>
                        <p className="text-sm font-bold text-white capitalize">{payment.payment_method}</p>
                      </div>
                      <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</p>
                        <p className="text-sm font-bold text-white">{payment.payment_date || "Not paid"}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {payment.payment_status === "unpaid" && (
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-emerald-400 border-2 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500/50">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-gray-400 border-2 border-slate-600 hover:bg-slate-700 hover:border-indigo-500/50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="card-elegant border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">No Payments Found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              No payments match your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}