"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { X, Car, LogOut } from "lucide-react";
import { navigation, NavItem } from "./user-sidebar";
import { useUser } from "@/lib/hooks/use-user";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();
  const { signOut } = useUser();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300" 
          onClick={onClose} 
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 z-[70] h-screen w-[300px] bg-white border-r border-slate-200 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) lg:hidden flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-100 bg-white sticky top-0 z-10">
          <Link href="/user/dashboard" onClick={onClose} className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg premium-gradient flex items-center justify-center shadow-lg shadow-primary/20">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">Park<span className="text-primary">BD</span></span>
          </Link>
          <button 
            onClick={onClose} 
            className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 p-6 overflow-y-auto bg-slate-50/30">
          <nav className="space-y-2">
            {navigation.map((item: NavItem) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all group",
                    isActive 
                      ? "bg-primary text-white shadow-xl shadow-primary/20" 
                      : "text-slate-500 hover:bg-white hover:text-slate-900 border border-transparent hover:border-slate-200/50 hover:shadow-sm"
                  )}
                >
                  <item.icon className={cn("h-6 w-6 transition-transform group-hover:scale-110", isActive ? "text-white" : "text-slate-400")} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <button 
            onClick={() => {
              signOut();
              onClose();
            }} 
            className="flex items-center gap-4 w-full px-5 py-4 rounded-2xl text-sm font-bold text-rose-500 hover:bg-rose-50 transition-all border border-transparent hover:border-rose-100"
          >
            <div className="h-10 w-10 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <LogOut className="h-5 w-5" />
            </div>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
