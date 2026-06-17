"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/lib/hooks/use-user";
import { useState } from "react";
import { Avatar } from "@/components/shared/avatar";
import {
  Car,
  Building2,
  Calendar,
  Users,
  CreditCard,
  Bell,
  Ticket,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHasHydrated } from "@/lib/hooks/use-has-hydrated";

const navigation = [
  { name: "Dashboard", href: "/sub-admin/dashboard", icon: LayoutDashboard },
  { name: "My Zones", href: "/sub-admin/my-zones", icon: Building2 },
  { name: "Slots", href: "/sub-admin/slots", icon: Car },
  { name: "Requests", href: "/sub-admin/requests", icon: Calendar },
  { name: "Bookings", href: "/sub-admin/bookings", icon: Calendar },
  { name: "Users", href: "/sub-admin/users", icon: Users },
  { name: "Payments", href: "/sub-admin/payments", icon: CreditCard },
  { name: "Tickets", href: "/sub-admin/tickets", icon: Ticket },
  { name: "Reports", href: "/sub-admin/reports", icon: BarChart3 },
  { name: "Notifications", href: "/sub-admin/notifications", icon: Bell },
  { name: "Settings", href: "/sub-admin/settings", icon: Settings },
];

export default function SubAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useUser();
  const hasHydrated = useHasHydrated();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white selection:bg-indigo-500/20 selection:text-indigo-400">
      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex fixed top-0 left-0 z-50 h-screen w-[280px] bg-slate-900/95 backdrop-blur-xl border-r border-slate-700/50 flex-col"
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
          <Link href="/sub-admin/dashboard" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">Park<span className="animated-gradient-text">BD</span></span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "text-gray-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
          <Link href="/login" onClick={signOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-rose-400 transition-all">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen w-72 bg-slate-900 border-r border-slate-700/50 transform transition-transform duration-300 lg:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
          <Link href="/sub-admin/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black text-white">Park<span className="animated-gradient-text">BD</span></span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-slate-800 text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "text-gray-400 hover:bg-slate-800 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-700/50">
          <Link href="/login" onClick={signOut} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-rose-400 transition-all">
            <LogOut className="h-5 w-5" />
            Sign Out
          </Link>
        </div>
      </aside>

      <div className="lg:pl-[280px]">
        {/* Header */}
        <header className="sticky top-0 z-30 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-slate-900/50">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors">
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/sub-admin/dashboard" className="flex items-center gap-2 lg:hidden group">
                <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Car className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tight text-white">Park<span className="animated-gradient-text">BD</span></span>
              </Link>
              <div className="hidden lg:flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all group">
                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none text-xs w-64 font-medium placeholder:text-gray-500 text-white" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-slate-800 text-gray-400 relative group transition-all">
                <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 border-2 border-slate-900 rounded-full"></span>
              </button>
              <div className="h-6 w-px bg-slate-700 mx-1 hidden sm:block"></div>
              <div className="relative">
                <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800 transition-colors">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-white">
                      {hasHydrated ? `${user?.first_name} ${user?.last_name}` : "Loading..."}
                    </p>
                    <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Zone Manager</p>
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <Avatar
                      firstName={hasHydrated ? user?.first_name : undefined}
                      lastName={hasHydrated ? user?.last_name : undefined}
                      src={hasHydrated ? user?.profile_image : undefined}
                      size="sm"
                      className="h-9 w-9 border-2 border-slate-700 relative z-10"
                    />
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900/95 backdrop-blur-xl rounded-xl border border-slate-700/50 shadow-xl py-1 z-50">
                    <Link href="/sub-admin/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-slate-800 hover:text-white transition-all" onClick={() => setProfileOpen(false)}>
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <div className="border-t border-slate-700/50 my-1"></div>
                    <button onClick={() => { signOut(); setProfileOpen(false); }} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-rose-400 hover:bg-slate-800 transition-all">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6 min-h-[calc(100vh-64px)] relative z-10">{children}</main>
      </div>
    </div>
  );
}