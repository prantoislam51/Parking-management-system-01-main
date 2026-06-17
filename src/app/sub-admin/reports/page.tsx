"use client";

import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockRevenueData, mockBookingStatusData, mockSlotTypeData, mockZones } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Download, Calendar, TrendingUp, DollarSign, Car, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function ReportsPage() {
  const { isDemoMode } = useDemoModeStore();
  const revenueData = isDemoMode ? mockRevenueData : [];
  const statusData = isDemoMode ? mockBookingStatusData : [];
  const slotTypeData = isDemoMode ? mockSlotTypeData : [];
  const zones = isDemoMode ? mockZones.filter(z => z.sub_admin_id === "sub-admin-001") : [];

  const totalRevenue = revenueData.reduce((sum, d) => sum + d.revenue, 0);
  const avgRevenue = totalRevenue / (revenueData.length || 1);

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Reports & <span className="animated-gradient-text">Analytics</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Analyze your zone performance and revenue trends.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
            <Calendar className="h-4 w-4 mr-2" />
            This Year
          </Button>
          <Button className="h-10 rounded-xl font-bold shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{formatCurrency(totalRevenue)}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{formatCurrency(avgRevenue)}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Monthly Avg</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-purple-400">{zones.reduce((sum, z) => sum + z.total_slots, 0)}</p>
              <p className="text-[9px] font-bold text-purple-400/60 uppercase tracking-wider">Total Slots</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">+12%</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Growth</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="card-elegant">
          <CardContent className="p-5">
            <h3 className="text-lg font-black text-white mb-4">Revenue Trend</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="month" fontSize={12} fill="#94a3b8" />
                  <YAxis
                    fontSize={12}
                    fill="#94a3b8"
                    tickFormatter={(value) => `৳${value / 1000}k`}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                  <Bar dataKey="revenue" fill="url(#gradient)" radius={[4, 4, 0, 0]} />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Booking Status Distribution */}
        <Card className="card-elegant">
          <CardContent className="p-5">
            <h3 className="text-lg font-black text-white mb-4">Booking Status</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Slot Occupancy by Type */}
        <Card className="card-elegant lg:col-span-2">
          <CardContent className="p-5">
            <h3 className="text-lg font-black text-white mb-4">Slot Occupancy by Type</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={slotTypeData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="type" type="category" fontSize={12} fill="#94a3b8" width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #334155",
                      borderRadius: "8px",
                      color: "#fff"
                    }}
                  />
                  <Bar dataKey="count" fill="url(#gradient2)" radius={[0, 4, 4, 0]} barSize={24} />
                  <defs>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}