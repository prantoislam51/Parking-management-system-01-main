"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockNotifications } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Badge } from "@/components/shared/badge";
import { Bell, Check, Trash2, Calendar, CreditCard, AlertTriangle, Search, CheckCircle2 } from "lucide-react";
import { FormattedDate } from "@/components/shared/formatted-date";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const notifications = isDemoMode ? mockNotifications : [];

  const filteredNotifications = notifications.filter(n => {
    if (filter === "unread") return !n.is_read;
    if (filter === "read") return n.is_read;
    return true;
  }).filter(n =>
    searchQuery
      ? n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  const getIcon = (type: string) => {
    switch (type) {
      case "booking": return <Calendar className="h-5 w-5 text-blue-400" />;
      case "payment": return <CreditCard className="h-5 w-5 text-emerald-400" />;
      case "system": return <AlertTriangle className="h-5 w-5 text-amber-400" />;
      default: return <Bell className="h-5 w-5 text-indigo-400" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "booking": return "bg-blue-500/20";
      case "payment": return "bg-emerald-500/20";
      case "system": return "bg-amber-500/20";
      default: return "bg-indigo-500/20";
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            <span className="animated-gradient-text">Notifications</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Stay updated with the latest activities and alerts.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-10 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
          <Button variant="outline" className="h-10 rounded-xl font-bold border-2 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear all
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{notifications.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-rose-400">{unreadCount}</p>
              <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">Unread</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{notifications.length - unreadCount}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Read</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-slate-900/60 rounded-xl border border-slate-700/50 w-fit">
        {[
          { key: "all" as const, label: "All" },
          { key: "unread" as const, label: "Unread" },
          { key: "read" as const, label: "Read" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              filter === key
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "text-gray-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 group">
        <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-500 text-white"
        />
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-4">
          {filteredNotifications.map((notif) => (
            <Card
              key={notif.id}
              className={cn(
                "card-elegant transition-all duration-300 hover:scale-[1.01]",
                !notif.is_read && "border-indigo-500/30 bg-indigo-500/5"
              )}
            >
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center shrink-0", getIconBg(notif.type))}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="font-bold text-white truncate">{notif.title}</h4>
                      {!notif.is_read && (
                        <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">{notif.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        <FormattedDate date={notif.created_at} />
                      </span>
                      <div className="flex items-center gap-2">
                        {!notif.is_read && (
                          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10">
                            <Check className="mr-1 h-3 w-3" /> Mark read
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10">
                          <Trash2 className="mr-1 h-3 w-3" /> Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="card-elegant border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
              <Bell className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">No Notifications Found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              {filter === "unread" ? "You've read all your notifications!" : "No notifications match your criteria."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}