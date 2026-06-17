"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigation, NavItem } from "./user-sidebar";

export function BottomNav() {
  const pathname = usePathname();

  // Show first 5 items on bottom nav
  const bottomNavItems = navigation.slice(0, 5);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-2xl border-t border-slate-700/50 h-16 flex items-center justify-around z-50 px-1 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.3)]">
      {bottomNavItems.map((item: NavItem) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 p-2 rounded-xl transition-all relative",
              isActive ? "text-indigo-400" : "text-gray-500 hover:text-gray-300"
            )}
          >
            {/* Active indicator */}
            {isActive && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-indigo-500 rounded-full" />
            )}
            <item.icon className={cn("h-5 w-5 transition-transform", isActive ? "stroke-[2.5] scale-110" : "stroke-[2]")} />
            <span className={cn("text-[9px] font-bold uppercase tracking-wider transition-all", isActive ? "opacity-100" : "opacity-60")}>
              {item.name.split(' ').pop()}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}