"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  Car,
  MapPin,
  Calendar,
  CreditCard,
  Bell,
  Star,
  Ticket,
  Settings,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { useUser } from "@/lib/hooks/use-user";

export type NavItem = {
  name: string;
  href: string;
  icon: LucideIcon;
};

export const navigation: NavItem[] = [
  { name: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  { name: "Profile", href: "/user/profile", icon: User },
  { name: "My Vehicles", href: "/user/vehicles", icon: Car },
  { name: "Browse Slots", href: "/user/slots", icon: MapPin },
  { name: "My Bookings", href: "/user/bookings", icon: Calendar },
  { name: "Payments", href: "/user/payments", icon: CreditCard },
  { name: "Notifications", href: "/user/notifications", icon: Bell },
  { name: "Reviews", href: "/user/reviews", icon: Star },
  { name: "Support", href: "/user/tickets", icon: Ticket },
  { name: "Settings", href: "/user/settings", icon: Settings },
];

export function UserSidebar() {
  const pathname = usePathname();
  const { signOut } = useUser();

  const mainMenu = navigation.slice(0, 6);
  const supportMenu = navigation.slice(6);

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-[calc(100vh-64px)] sticky top-16 border-r border-slate-700/50 p-4 space-y-6 bg-slate-900/50 backdrop-blur-sm">
      <div className="flex-1">
        <div className="space-y-6">
          <div>
            <p className="px-3 text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-3">Main Menu</p>
            <nav className="space-y-1">
              {mainMenu.map((item: NavItem) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                      isActive
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                        : "text-gray-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-4 w-5 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-gray-500")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="px-3 text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-3">Support & Settings</p>
            <nav className="space-y-1">
              {supportMenu.map((item: NavItem) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group relative",
                      isActive
                        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                        : "text-gray-400 hover:bg-slate-800 hover:text-white"
                    )}
                  >
                    <item.icon className={cn("h-4 w-5 transition-transform group-hover:scale-110", isActive ? "text-indigo-400" : "text-gray-500")} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-700/50">
        <button
          onClick={signOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-slate-800 hover:text-rose-400 transition-all group"
        >
          <div className="h-7 w-7 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-rose-500/20 group-hover:text-rose-400 transition-colors">
            <LogOut className="h-4 w-4" />
          </div>
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}