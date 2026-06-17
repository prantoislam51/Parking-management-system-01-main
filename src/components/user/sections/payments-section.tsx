"use client";

import { mockPayments } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { CreditCard, Wallet, Plus, Receipt, CheckCircle2, Clock, TrendingUp, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { formatCurrency } from "@/lib/utils";
import { useState } from "react";

export function PaymentsSection() {
  const { isDemoMode } = useDemoModeStore();
  const payments = isDemoMode ? mockPayments : [];
  const [activeTab, setActiveTab] = useState<"all" | "paid" | "unpaid">("all");

  const filteredPayments = payments.filter(p => {
    if (activeTab === "all") return true;
    if (activeTab === "paid") return p.payment_status === "paid";
    if (activeTab === "unpaid") return p.payment_status === "unpaid";
    return true;
  });

  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = payments.filter(p => p.payment_status === "paid").reduce((sum, p) => sum + p.amount, 0);
  const totalUnpaid = payments.filter(p => p.payment_status === "unpaid").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Payments</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            View your billing history and manage payments.
          </p>
        </div>
        <Button className="h-12 px-6 font-bold rounded-xl shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all active:scale-95 text-white border-0">
          <Plus className="h-5 w-5 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="card-elegant p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 flex items-center justify-center shadow-lg">
              <TrendingUp className="h-6 w-6 text-indigo-400" />
            </div>
            <div>
              <p className="text-3xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">{formatCurrency(totalSpent)}</p>
              <p className="text-xs text-gray-500 font-medium">Total Spent</p>
            </div>
          </div>
        </Card>
        <Card className="card-elegant p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/30 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-400">{formatCurrency(totalPaid)}</p>
              <p className="text-xs text-gray-500 font-medium">Paid</p>
            </div>
          </div>
        </Card>
        <Card className="card-elegant p-5">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center shadow-lg">
              <Clock className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">{formatCurrency(totalUnpaid)}</p>
              <p className="text-xs text-gray-500 font-medium">Pending</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Transactions Table */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tabs */}
          <Card className="card-elegant overflow-hidden">
            <div className="flex items-center gap-1 p-1.5 m-4 mb-0 bg-slate-900/60 rounded-xl w-fit">
              {[
                { key: "all" as const, label: "All" },
                { key: "paid" as const, label: "Paid" },
                { key: "unpaid" as const, label: "Unpaid" },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                    activeTab === key
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            <CardContent className="p-0">
              {filteredPayments.length > 0 ? (
                <div className="divide-y divide-slate-700/50">
                  {filteredPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 hover:bg-slate-800/50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${
                          payment.payment_status === "paid" ? "bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-400" : "bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-400"
                        }`}>
                          <Receipt className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{payment.transaction_id || "Pending"}</p>
                          <p className="text-xs text-gray-500 font-medium">Ref: {payment.booking_id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className="bg-slate-800 border border-slate-700 text-gray-300 text-[10px] font-bold uppercase rounded-lg px-2 py-1">
                          {payment.payment_method}
                        </Badge>
                        <p className="font-black text-white min-w-[80px] text-right">{formatCurrency(payment.amount)}</p>
                        {payment.payment_status === "paid" ? (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full px-3 py-1">PAID</Badge>
                        ) : (
                          <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-bold rounded-full px-3 py-1">UNPAID</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500 font-medium">No transactions found.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Wallet Card */}
          <Card className="overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-xl shadow-indigo-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-white/80">Wallet Balance</p>
                </div>
                <CreditCard className="h-6 w-6 text-white/60" />
              </div>
              <p className="text-4xl font-black text-white mb-6">৳0.00</p>
              <Button className="w-full h-12 rounded-xl font-bold bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all border-0">
                <Plus className="h-5 w-5 mr-2" />
                Add Money
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="card-elegant">
            <CardContent className="p-5">
              <h3 className="font-bold text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs text-gray-400 font-medium">Income</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">৳0.00</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <ArrowDownLeft className="h-4 w-4 text-rose-400" />
                    <span className="text-xs text-gray-400 font-medium">Expenses</span>
                  </div>
                  <span className="text-xs font-bold text-rose-400">{formatCurrency(totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <div className="flex items-center gap-2">
                    <Receipt className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs text-gray-400 font-medium">Transactions</span>
                  </div>
                  <span className="text-xs font-bold text-white">{payments.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Saved Methods */}
          <Card className="card-elegant">
            <CardContent className="p-5">
              <h3 className="font-bold text-white mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 border border-pink-500/30">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-pink-500/30 flex items-center justify-center text-pink-400 font-bold text-sm">bK</div>
                    <span className="font-bold text-sm text-white">bKash</span>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold rounded-full">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">Ng</div>
                    <span className="font-bold text-sm text-white">Nagad</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-indigo-400 font-bold hover:bg-indigo-500/10">
                    Add
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}