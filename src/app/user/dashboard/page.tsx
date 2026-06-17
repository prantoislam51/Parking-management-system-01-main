"use client";

import { useState } from "react";
import { useUser, useSwitchDemoUser } from "@/lib/hooks/use-user";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockUserStats,
  mockBookings,
  mockVehicles,
} from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Car, Calendar, Bell, MapPin, Plus, ArrowRight, Star, Wallet, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

export default function UserDashboard() {
  const { user } = useUser();
  const { isDemoMode } = useDemoModeStore();
  const { switchToSuperAdmin, switchToSubAdmin, switchToUser } = useSwitchDemoUser();
  const [isLoading] = useState(false);

  const stats = isDemoMode ? mockUserStats : { activeBookings: 0, totalVehicles: 0, pendingRequests: 0, notifications: 0 };
  const recentBookings = isDemoMode ? mockBookings : [];
  const vehicles = isDemoMode ? mockVehicles : [];

  const activeBooking = recentBookings.find((b) => b.status === "approved");

  return (
    <div className="space-y-6 pb-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Welcome back, <span className="animated-gradient-text">{user?.first_name || "User"}</span>!
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Your parking command center is ready.
          </p>
        </div>
        {isDemoMode && (
          <div className="flex items-center gap-1 p-1 bg-slate-800/50 rounded-lg border border-slate-700">
            <Button variant="ghost" size="sm" onClick={switchToSuperAdmin} className="rounded-md text-xs text-gray-400 hover:text-white hover:bg-slate-700">
              Admin
            </Button>
            <Button variant="ghost" size="sm" onClick={() => switchToSubAdmin(0)} className="rounded-md text-xs text-gray-400 hover:text-white hover:bg-slate-700">
              Staff
            </Button>
            <Button variant="secondary" size="sm" onClick={() => switchToUser(0)} className="rounded-md text-xs px-3 bg-indigo-500 text-white hover:bg-indigo-600">
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
                    <Star className="h-2.5 w-2.5 mr-1 fill-indigo-400" /> Verified
                  </Badge>
                  <p className="text-[9px] text-gray-500 bg-slate-800/50 px-2 py-0.5 rounded-full">
                    Joined {new Date(user?.created_at || "2024-01-01").toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/user/vehicles">
                <Button className="h-9 rounded-lg text-xs font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  Register Vehicle
                </Button>
              </Link>
              <Link href="/user/slots">
                <Button variant="outline" className="h-9 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-indigo-500">
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  Explore Slots
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
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{stats.activeBookings}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Active Bookings</p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10 group hover:-translate-y-1 transition-transform">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{stats.totalVehicles}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Registered</p>
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
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30 group-hover:scale-105 transition-transform">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-rose-400">{stats.notifications}</p>
              <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">New Updates</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-black tracking-tight flex items-center gap-2 text-white">
            <span className="h-5 w-1 bg-indigo-500 rounded-full"></span>
            Explore ParkBD
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <Link href="/user/slots" className="group">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-indigo-500/10 hover:border-indigo-500/30 transition-all text-center">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                  <MapPin className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xs text-white">Find a Slot</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">Book parking</p>
              </div>
            </Link>
            <Link href="/user/bookings" className="group">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all text-center">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xs text-white">My Bookings</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">View reservations</p>
              </div>
            </Link>
            <Link href="/user/vehicles" className="group">
              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all text-center">
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 mx-auto mb-2">
                  <Car className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-xs text-white">My Vehicles</h3>
                <p className="text-[9px] text-gray-500 mt-0.5">Manage fleet</p>
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

          {activeBooking ? (
            <div className="p-4 rounded-xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-600/30">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-white">Active Session</span>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-[9px] px-2 py-0.5 font-bold rounded-full">LIVE</Badge>
              </div>
              <div className="p-3 bg-slate-800/50 rounded-lg flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  <Car className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider">Selected Slot</p>
                  <p className="text-sm font-black text-white">{activeBooking.slot_id?.slice(-3)}</p>
                  <p className="text-[9px] text-indigo-400 font-mono">{vehicles[0]?.vehicle_number}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[8px] text-gray-500 uppercase font-bold tracking-tighter">Amount Paid</p>
                  <p className="text-sm font-black text-indigo-400">{formatCurrency(activeBooking.total_amount)}</p>
                </div>
                <Link href="/user/bookings">
                  <Button variant="ghost" className="text-xs text-indigo-400 hover:text-indigo-300 p-1 h-7">
                    Manage <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-slate-800/30 border border-dashed border-slate-700">
              <div className="text-center space-y-2">
                <div className="h-10 w-10 rounded-full bg-slate-700/50 flex items-center justify-center mx-auto opacity-50">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <p className="text-xs font-bold text-gray-400">No active sessions</p>
                <p className="text-[9px] text-gray-500">Ready to park? Browse available slots.</p>
                <Link href="/user/slots">
                  <Button className="mt-2 h-8 rounded-lg text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600">
                    Book Now
                  </Button>
                </Link>
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
                Smart Tip
              </h4>
              <p className="text-[10px] text-gray-400 leading-relaxed">
                Book at least 2 hours in advance during peak times to guarantee your spot and get exclusive rates!
              </p>
            </div>
            <div className="absolute -bottom-2 -right-2 opacity-10">
              <Car className="h-16 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}