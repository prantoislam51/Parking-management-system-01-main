"use client";

import { useState } from "react";
import { useUser, useSwitchDemoUser } from "@/lib/hooks/use-user";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockSubAdminStats,
  mockBookings,
  mockZones,
} from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Building2, Car, Calendar, Bell, MapPin, Plus, ArrowRight, Star, CreditCard, Users, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function SubAdminDashboard() {
  const { user } = useUser();
  const { isDemoMode } = useDemoModeStore();
  const { switchToSuperAdmin, switchToSubAdmin, switchToUser } = useSwitchDemoUser();

  const stats = isDemoMode ? mockSubAdminStats : { myZones: 0, activeSlots: 0, pendingRequests: 0, activeBookings: 0, monthlyRevenue: 0, myUsers: 0 };
  const zones = isDemoMode ? mockZones : [];
  const bookings = isDemoMode ? mockBookings : [];

  const pendingBookings = bookings.filter(b => b.status === "pending");
  const approvedBookings = bookings.filter(b => b.status === "approved");

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome back, <span className="animated-gradient-text">{user?.first_name || "Admin"}</span>!
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Your zone management command center is ready.
          </p>
        </div>
        {isDemoMode && (
          <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg border border-slate-700">
            <Button variant="ghost" size="sm" onClick={switchToSuperAdmin} className="rounded-md text-xs text-gray-400 hover:text-white hover:bg-slate-700">
              Admin
            </Button>
            <Button variant="secondary" size="sm" onClick={() => switchToSubAdmin(0)} className="rounded-md text-xs px-3 bg-indigo-500 text-white hover:bg-indigo-600">
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
                    <Star className="h-2.5 w-2.5 mr-1 fill-indigo-400" /> Zone Manager
                  </Badge>
                  <p className="text-[9px] text-gray-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                    Joined {new Date(user?.created_at || "2024-01-01").toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/sub-admin/zones">
                <Button className="h-9 rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Add Zone
                </Button>
              </Link>
              <Link href="/sub-admin/slots">
                <Button variant="outline" className="h-9 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-indigo-500">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  Manage Slots
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{stats.myZones}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">My Zones</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{stats.activeSlots}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Active Slots</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{stats.pendingRequests}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">Pending</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10 group hover:-translate-y-1 transition-transform">
          <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
            <CreditCard className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xl font-black text-rose-400">{formatCurrency(stats.monthlyRevenue)}</p>
            <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">Revenue</p>
          </div>
        </div>
      </div>

      {/* Additional Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-purple-400">{stats.activeBookings}</p>
              <p className="text-[9px] font-bold text-purple-400/60 uppercase tracking-wider">Active Bookings</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/30 group-hover:scale-105 transition-transform">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-cyan-400">{stats.myUsers}</p>
              <p className="text-[9px] font-bold text-cyan-400/60 uppercase tracking-wider">My Users</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-indigo-400">+12%</p>
              <p className="text-[9px] font-bold text-indigo-400/60 uppercase tracking-wider">Growth</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-600/5 border border-pink-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 group-hover:scale-105 transition-transform">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-pink-400">3</p>
              <p className="text-[9px] font-bold text-pink-400/60 uppercase tracking-wider">Alerts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
            <span className="h-5 w-1 bg-indigo-500 rounded-full"></span>
            Zone Management
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/sub-admin/zones" className="group">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all text-center">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                  <Building2 className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xs text-white">My Zones</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">Manage zones</p>
              </div>
            </Link>
            <Link href="/sub-admin/slots" className="group">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-center">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xs text-white">Slots</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">View all slots</p>
              </div>
            </Link>
            <Link href="/sub-admin/requests" className="group">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all text-center">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xs text-white">Requests</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">Pending approvals</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Sidebar content */}
        <div className="space-y-4">
          <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
            <span className="h-5 w-1 bg-purple-500 rounded-full"></span>
            Status Feed
          </h3>

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
                  <p className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Total Value</p>
                  <p className="text-sm font-black text-indigo-400">
                    {formatCurrency(pendingBookings.reduce((sum, b) => sum + b.total_amount, 0))}
                  </p>
                </div>
                <Link href="/sub-admin/requests">
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

          {/* Recent Zone Performance */}
          {zones.length > 0 && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30">
              <h4 className="font-bold flex items-center gap-2 text-xs text-white mb-3">
                <div className="h-5 w-5 rounded-md bg-emerald-500/20 flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                </div>
                Zone Performance
              </h4>
              <div className="space-y-2">
                {zones.slice(0, 3).map((zone, idx) => (
                  <div key={zone.id} className="flex items-center justify-between p-2 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-md flex items-center justify-center text-[10px] font-bold ${
                        idx === 0 ? "bg-amber-500 text-white" : idx === 1 ? "bg-slate-400 text-white" : "bg-orange-700 text-white"
                      }`}>
                        {idx + 1}
                      </div>
                      <span className="text-xs font-medium text-white">{zone.zone_name}</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold">{Math.floor(Math.random() * 30 + 70)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tip card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <h4 className="font-bold flex items-center gap-2 text-xs text-white">
                <div className="h-5 w-5 rounded-md bg-purple-500/20 flex items-center justify-center">
                  <Bell className="h-3 w-3 text-purple-400" />
                </div>
                Management Tip
              </h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Regularly update slot availability and respond to booking requests within 2 hours to maintain high user satisfaction!
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

function CheckCircle2({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}