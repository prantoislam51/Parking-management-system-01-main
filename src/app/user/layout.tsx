"use client";

import Link from "next/link";
import { useUser } from "@/lib/hooks/use-user";
import { useState } from "react";
import { Avatar } from "@/components/shared/avatar";
import {
  Car,
  Bell,
  Menu,
  Search,
  Home,
  Calendar,
  Car as CarIcon,
  MapPin,
  CreditCard,
  Settings,
  MessageSquare,
  LogOut,
  X
} from "lucide-react";
import { UserSidebar } from "@/components/user/user-sidebar";
import { MobileSidebar } from "@/components/user/mobile-sidebar";
import { BottomNav } from "@/components/user/bottom-nav";
import { usePathname } from "next/navigation";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: "/user/dashboard", icon: Home, label: "Home" },
    { href: "/user/slots", icon: MapPin, label: "Slots" },
    { href: "/user/bookings", icon: Calendar, label: "Bookings" },
    { href: "/user/vehicles", icon: CarIcon, label: "Vehicles" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white selection:bg-indigo-500/20 selection:text-indigo-400">
      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50 shadow-lg shadow-slate-900/50">
        <div className="h-full px-4 flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/user/dashboard" className="flex items-center gap-2 group">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-black tracking-tight hidden sm:block text-white">Park<span className="animated-gradient-text">BD</span></span>
            </Link>
          </div>

          {/* Mobile Bottom Nav */}
          <div className="flex items-center gap-1 md:hidden bg-slate-800/80 rounded-xl p-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg transition-all ${pathname === item.href ? "bg-indigo-500 text-white" : "text-gray-400 hover:text-white hover:bg-slate-700"}`}
              >
                <item.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="flex-1 max-w-xs mx-4 hidden md:block">
            <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all group">
              <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input type="text" placeholder="Search slots, vehicles..." className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-500 text-white" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-slate-800 text-gray-400 relative group transition-all">
              <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 border-2 border-slate-900 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-slate-700 mx-1 hidden sm:block"></div>
            <Link href="/user/profile" className="flex items-center gap-2 group">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-bold text-white line-clamp-1">{user?.first_name} {user?.last_name}</p>
                 <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider">Premium User</p>
               </div>
               <div className="relative">
                 <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                 <Avatar firstName={user?.first_name} lastName={user?.last_name} src={user?.profile_image} size="sm" className="h-9 w-9 border-2 border-slate-700 relative z-10" />
               </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex max-w-[1600px] mx-auto relative">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <UserSidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-slate-900 border-r border-slate-700 p-4 animate-in slide-in-from-left">
              <div className="flex items-center justify-between mb-6">
                <Link href="/user/dashboard" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-black text-white">Park<span className="animated-gradient-text">BD</span></span>
                </Link>
                <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-lg hover:bg-slate-800 text-gray-400">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {[
                  { href: "/user/dashboard", icon: Home, label: "Dashboard" },
                  { href: "/user/slots", icon: MapPin, label: "Find Slots" },
                  { href: "/user/bookings", icon: Calendar, label: "My Bookings" },
                  { href: "/user/vehicles", icon: CarIcon, label: "My Vehicles" },
                  { href: "/user/payments", icon: CreditCard, label: "Payments" },
                  { href: "/user/notifications", icon: Bell, label: "Notifications" },
                  { href: "/user/profile", icon: Settings, label: "Profile" },
                  { href: "/user/settings", icon: Settings, label: "Settings" },
                  { href: "/user/tickets", icon: MessageSquare, label: "Support" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${pathname === item.href ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" : "text-gray-400 hover:bg-slate-800 hover:text-white"}`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
              <div className="mt-6 pt-6 border-t border-slate-700">
                <Link href="/login" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:bg-slate-800 hover:text-rose-400 transition-all">
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Sign Out</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-64px)]">{children}</main>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}