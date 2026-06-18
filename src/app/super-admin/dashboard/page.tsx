"use client";

import { useState } from "react";
import { useUser, useSwitchDemoUser } from "@/lib/hooks/use-user";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockSuperAdminStats,
  mockRevenueData,
  mockBookingStatusData,
  mockBookings,
  mockUsers,
  mockNotifications,
} from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import {
  Users,
  UserCog,
  Building2,
  Car,
  Calendar,
  CreditCard,
  ShieldAlert,
  Plus,
  ArrowRight,
  Star,
  TrendingUp,
  Bell,
  CheckCircle2,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SuperAdminDashboard() {
  const { user } = useUser();
  const { isDemoMode } = useDemoModeStore();
  const { switchToSuperAdmin, switchToSubAdmin, switchToUser } = useSwitchDemoUser();
  const [isLoading] = useState(false);

  const stats = isDemoMode ? mockSuperAdminStats : { totalUsers: 0, totalAdmins: 0, totalZones: 0, totalSlots: 0, activeBookings: 0, totalRevenue: 0, pendingRequests: 0, blacklistedUsers: 0 };
  const revenueData = isDemoMode ? mockRevenueData : [];
  const recentBookings = isDemoMode ? mockBookings : [];
  const recentUsers = isDemoMode ? mockUsers : [];

  const pendingBookings = recentBookings.filter((b) => b.status === "pending");

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome back, <span className="animated-gradient-text">{user?.first_name || "Admin"}</span>!
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Your parking management command center is ready.
          </p>
        </div>
        {isDemoMode && (
          <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg border border-slate-700">
            <Button variant="secondary" size="sm" onClick={switchToSuperAdmin} className="rounded-md text-xs px-3 bg-indigo-500 text-white hover:bg-indigo-600">
              Admin
            </Button>
            <Button variant="ghost" size="sm" onClick={() => switchToSubAdmin(0)} className="rounded-md text-xs text-gray-400 hover:text-white hover:bg-slate-700">
              Staff
            </Button>
            <Button variant="ghost" size="sm" onClick={() => switchToUser(0)} className="rounded-md text-xs text-gray-400 hover:text-white hover:bg-slate-700">
              User
            </Button>
          </div>
        )}
      </div>

      {/* Hero Section - Compact */}
      <div className="relative group overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-slate-800/60 border border-slate-600/30 shadow-xl shadow-indigo-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur-md opacity-50"></div>
                <Avatar
                  firstName={user?.first_name}
                  lastName={user?.last_name}
                  src={user?.profile_image}
                  size="lg"
                  className="h-14 w-14 text-xl border-2 border-slate-700 relative z-10"
                />
              </div>
              <div className="space-y-0.5">
                <h2 className="text-lg font-black text-white tracking-tight">{user?.first_name} {user?.last_name}</h2>
                <p className="text-xs text-gray-400 font-medium">{user?.email}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <Badge className="bg-indigo-500/20 text-indigo-400 border-indigo-500/30 text-[9px] px-2 py-0.5 rounded-full font-bold">
                    <Star className="h-2.5 w-2.5 mr-1 fill-indigo-400" /> Super Admin
                  </Badge>
                  <p className="text-[9px] text-gray-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                    Joined {new Date(user?.created_at || "2024-01-01").toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/super-admin/admins">
                <Button className="h-9 rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Admin
                </Button>
              </Link>
              <Link href="/super-admin/zones">
                <Button variant="outline" className="h-9 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-indigo-500">
                  <Building2 className="h-3.5 w-3.5 mr-1.5" />
                  Manage Zones
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Stats Grid - First Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{stats.totalUsers}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total Users</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <UserCog className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-indigo-400">{stats.totalAdmins}</p>
              <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-wider">Sub Admins</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{stats.totalZones}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Active Zones</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-purple-400">{stats.totalSlots}</p>
              <p className="text-[9px] font-bold text-purple-400/60 uppercase tracking-wider">Total Slots</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Second Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-cyan-400">{stats.activeBookings}</p>
              <p className="text-[9px] font-bold text-cyan-400/60 uppercase tracking-wider">Active Bookings</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-rose-400">{formatCurrency(stats.totalRevenue)}</p>
              <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">Total Revenue</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{stats.pendingRequests}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-red-400">{stats.blacklistedUsers}</p>
              <p className="text-[9px] font-bold text-red-400/60 uppercase tracking-wider">Blacklisted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Actions & Revenue Chart */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
              <span className="h-5 w-1 bg-indigo-500 rounded-full"></span>
              Quick Actions
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <Link href="/super-admin/admins" className="group">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all text-center">
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                    <UserCog className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-xs text-white">Manage Admins</h3>
                  <p className="text-[9px] text-gray-500 mt-0.5">Add/Remove</p>
                </div>
              </Link>
              <Link href="/super-admin/zones" className="group">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-center">
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-xs text-white">Zones & Areas</h3>
                  <p className="text-[9px] text-gray-500 mt-0.5">Organize</p>
                </div>
              </Link>
              <Link href="/super-admin/reports" className="group">
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all text-center">
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-xs text-white">Reports</h3>
                  <p className="text-[9px] text-gray-500 mt-0.5">Analytics</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30">
            <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white mb-4">
              <span className="h-5 w-1 bg-emerald-500 rounded-full"></span>
              Monthly Revenue
            </h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="month" stroke="rgba(148, 163, 184, 0.7)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(148, 163, 184, 0.7)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `৳${value / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "12px",
                      backdropFilter: "blur(10px)",
                    }}
                    labelStyle={{ color: "#e2e8f0" }}
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={3}
                    dot={{ fill: "#22c55e", strokeWidth: 0, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column: Status Feed */}
        <div className="space-y-6">
          <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
            <span className="h-5 w-1 bg-purple-500 rounded-full"></span>
            Status Feed
          </h3>

          {/* Pending Requests */}
          {pendingBookings.length > 0 ? (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-white">Pending Approvals</span>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px] px-2 py-0.5 font-bold rounded-full">{pendingBookings.length} NEW</Badge>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Awaiting Review</p>
                  <p className="text-sm font-black text-white">{pendingBookings.length} Booking{pendingBookings.length > 1 ? "s" : ""}</p>
                  <p className="text-[9px] text-amber-400 font-mono">Needs attention</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Estimated Value</p>
                  <p className="text-sm font-black text-indigo-400">
                    {formatCurrency(pendingBookings.reduce((sum, b) => sum + b.total_amount, 0))}
                  </p>
                </div>
                <Link href="/super-admin/bookings">
                  <Button variant="ghost" className="text-xs text-indigo-400 hover:text-indigo-300 p-1 h-7">
                    Review <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700">
              <div className="text-center space-y-2">
                <div className="h-10 w-10 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto opacity-50">
                  <CheckCircle2 className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs font-bold text-gray-400">All caught up!</p>
                <p className="text-[9px] text-gray-500">No pending requests to review.</p>
              </div>
            </div>
          )}

          {/* Recent Users */}
          {recentUsers.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30">
              <h4 className="font-bold flex items-center gap-2 text-xs text-white mb-3">
                <div className="h-5 w-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
                  <Users className="h-3 w-3 text-emerald-400" />
                </div>
                Recent Registrations
              </h4>
              <div className="space-y-2">
                {recentUsers.slice(0, 3).map((u, idx) => (
                  <div key={u.id} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Avatar firstName={u.first_name} lastName={u.last_name} size="sm" />
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-white">{u.first_name} {u.last_name}</span>
                        <span className="text-[8px] text-gray-500">{u.email}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/super-admin/users" className="block mt-3">
                <Button variant="ghost" size="sm" className="w-full text-xs text-indigo-400 hover:text-indigo-300">
                  View All <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          )}

          {/* Management Tip */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h4 className="font-bold flex items-center gap-2 text-xs text-white">
                <div className="h-5 w-5 rounded-md bg-purple-500/20 flex items-center justify-center">
                  <Bell className="h-3 w-3 text-purple-400" />
                </div>
                Management Tip
              </h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Regularly audit user activities and monitor zone occupancy to ensure optimal parking management and revenue growth!
              </p>
            </div>
            <div className="absolute -bottom-2 -right-2 opacity-10">
              <Building2 className="h-16 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
