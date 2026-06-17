"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useUser } from "@/lib/hooks/use-user";
import { useState, useEffect, useRef } from "react";
import { Avatar } from "@/components/shared/avatar";
import {
  LayoutDashboard,
  Users,
  UserCog,
  MapPin,
  Building2,
  Car,
  Calendar,
  CreditCard,
  ShieldAlert,
  FileText,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/types";
import { useHasHydrated } from "@/lib/hooks/use-has-hydrated";

const navigation = [
  { name: "Dashboard", href: "/super-admin/dashboard", icon: LayoutDashboard, color: "text-emerald-400" },
  { name: "Admins", href: "/super-admin/admins", icon: UserCog, color: "text-blue-400" },
  { name: "Users", href: "/super-admin/users", icon: Users, color: "text-cyan-400" },
  { name: "Divisions", href: "/super-admin/divisions", icon: MapPin, color: "text-pink-400" },
  { name: "Districts", href: "/super-admin/districts", icon: Building2, color: "text-purple-400" },
  { name: "Areas", href: "/super-admin/areas", icon: MapPin, color: "text-rose-400" },
  { name: "Zones", href: "/super-admin/zones", icon: Building2, color: "text-orange-400" },
  { name: "Slots", href: "/super-admin/slots", icon: Car, color: "text-amber-400" },
  { name: "Bookings", href: "/super-admin/bookings", icon: Calendar, color: "text-teal-400" },
  { name: "Payments", href: "/super-admin/payments", icon: CreditCard, color: "text-green-400" },
  { name: "Blacklist", href: "/super-admin/blacklist", icon: ShieldAlert, color: "text-red-400" },
  { name: "Audit Logs", href: "/super-admin/audit-logs", icon: FileText, color: "text-indigo-400" },
  { name: "Reports", href: "/super-admin/reports", icon: BarChart3, color: "text-violet-400" },
  { name: "Notifications", href: "/super-admin/notifications", icon: Bell, color: "text-yellow-400" },
  { name: "Settings", href: "/super-admin/settings", icon: Settings, color: "text-slate-400" },
];

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, signOut } = useUser();
  const hasHydrated = useHasHydrated();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        if (!user?.id) return;

        const supabase = createClient();
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (error) {
          console.error("Failed to fetch notifications:", error.message);
          return;
        }

        if (data) {
          setNotifications(data as Notification[]);
          setUnreadCount(data.filter((n: Notification) => !n.is_read).length);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    if (user?.id) {
      fetchNotifications();
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100" suppressHydrationWarning>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-[280px] bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white shadow-2xl shadow-slate-900/50 transform transition-all duration-300 ease-out lg:translate-x-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Gradient Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500" />

        {/* Logo Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50 shrink-0">
          <Link href="/super-admin/dashboard" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all duration-300 group-hover:scale-110">
              <Car className="h-5 w-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">ParkBD</span>
              <p className="text-[10px] text-slate-500 -mt-1">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-200"
          >
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>

        {/* Navigation Section Label */}
        <div className="px-6 pt-4 pb-2 shrink-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-semibold">Main Menu</p>
        </div>

        {/* Navigation Items */}
        <nav className="px-3 space-y-1 overflow-y-auto flex-1 min-h-0 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out",
                  isActive
                    ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-white border border-emerald-500/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-emerald-400 to-cyan-500 rounded-full" />
                )}

                <div className={cn(
                  "p-2 rounded-lg bg-slate-800/50 group-hover:bg-slate-700/50 transition-all duration-300 group-hover:scale-110",
                  isActive && "bg-slate-700/50"
                )}>
                  <item.icon className={cn("h-4 w-4 transition-all duration-300", item.color, isActive ? "text-emerald-400" : "group-hover:text-white")} />
                </div>

                <span className={cn(
                  "transition-all duration-300",
                  isActive ? "text-white font-semibold" : ""
                )}>
                  {item.name}
                </span>

                {/* Hover Glow Effect */}
                <div className={cn(
                  "absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none",
                  isActive && "opacity-100"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* User Card at Bottom - Fixed Position */}
        <div className="shrink-0 p-4 border-t border-slate-700/50 bg-gradient-to-t from-slate-900 via-slate-900 to-transparent mt-auto">
          <div className="bg-slate-800/50 rounded-xl p-3 backdrop-blur-sm border border-slate-700/30">
            <div className="flex items-center gap-3 mb-3">
              <Avatar
                firstName={hasHydrated ? user?.first_name : undefined}
                lastName={hasHydrated ? user?.last_name : undefined}
                src={hasHydrated ? user?.profile_image : undefined}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {hasHydrated ? `${user?.first_name} ${user?.last_name}` : "Loading..."}
                </p>
                <p className="text-xs text-slate-400 truncate capitalize">
                  {hasHydrated ? user?.role?.replace("_", " ") : ""}
                </p>
              </div>
            </div>
            <button
              onClick={signOut}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-400 hover:from-red-500/30 hover:to-rose-500/30 hover:text-red-300 transition-all duration-300 text-sm font-medium border border-red-500/20 hover:border-red-500/40"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-[280px]">
        {/* Top Navbar - Fixed */}
        <header className={cn(
          "sticky top-0 z-30 backdrop-blur-xl transition-all duration-300",
          isScrolled ? "bg-white/80 shadow-sm border-b border-slate-200/50" : "bg-white/60 border-b border-transparent"
        )}>
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200 active:scale-95"
              >
                <Menu className="h-5 w-5 text-slate-600" />
              </button>

              {/* Search Bar - Enhanced */}
              <div className="hidden md:flex items-center gap-3 bg-slate-100/80 hover:bg-slate-100 rounded-2xl px-4 py-2.5 w-80 transition-all duration-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:shadow-lg focus-within:shadow-emerald-500/10 border border-transparent focus-within:border-emerald-500/30">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="bg-transparent border-none outline-none text-sm w-full text-slate-700 placeholder:text-slate-400"
                />
                <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium text-slate-400 bg-slate-200/50 rounded-lg">
                  <span>⌘</span><span>K</span>
                </kbd>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Notifications - Enhanced */}
              <button className="relative p-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200 active:scale-95 group">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Bell className="h-5 w-5 text-slate-600 relative z-10" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-gradient-to-br from-red-500 to-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Quick Actions */}
              <button className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-95">
                <Sparkles className="h-4 w-4" />
                Quick Add
              </button>

              {/* Profile Menu - Enhanced */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-xl hover:bg-slate-100 transition-all duration-300",
                    profileOpen && "bg-slate-100"
                  )}
                >
                  <div className="relative">
                    <Avatar
                      firstName={hasHydrated ? user?.first_name : undefined}
                      lastName={hasHydrated ? user?.last_name : undefined}
                      src={hasHydrated ? user?.profile_image : undefined}
                      size="sm"
                    />
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-slate-800">
                      {hasHydrated ? `${user?.first_name} ${user?.last_name}` : "Loading..."}
                    </p>
                    <p className="text-xs text-slate-500">
                      {hasHydrated ? user?.role?.replace("_", " ") : "Loading..."}
                    </p>
                  </div>
                  <ChevronDown className={cn(
                    "h-4 w-4 text-slate-400 hidden md:block transition-transform duration-300",
                    profileOpen && "rotate-180"
                  )} />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/50 shadow-2xl shadow-slate-200/50 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <Avatar
                          firstName={hasHydrated ? user?.first_name : undefined}
                          lastName={hasHydrated ? user?.last_name : undefined}
                          src={hasHydrated ? user?.profile_image : undefined}
                          size="md"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {hasHydrated ? `${user?.first_name} ${user?.last_name}` : "Loading..."}
                          </p>
                          <p className="text-xs text-slate-500">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      <Link
                        href="/super-admin/settings"
                        className="flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-all duration-200"
                      >
                        <div className="p-1.5 rounded-lg bg-blue-500/10">
                          <Settings className="h-4 w-4 text-blue-500" />
                        </div>
                        Settings
                      </Link>
                      <button
                        onClick={signOut}
                        className="flex items-center gap-3 w-full px-4 py-2.5 mx-2 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-all duration-200"
                      >
                        <div className="p-1.5 rounded-lg bg-red-500/10">
                          <LogOut className="h-4 w-4 text-red-500" />
                        </div>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content - Enhanced Background */}
        <main className="p-4 lg:p-8">
          <div className="rounded-3xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-xl shadow-slate-200/50 p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
