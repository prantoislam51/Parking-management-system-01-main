"use client";

import { mockNotifications } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Bell, Calendar, CreditCard, Info, CheckCircle2, Trash2, Eye, ChevronRight } from "lucide-react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { useState } from "react";

export function NotificationsSection() {
  const { isDemoMode } = useDemoModeStore();
  const notifications = isDemoMode ? mockNotifications : [];
  const [localNotifications, setLocalNotifications] = useState(notifications);
  const [showUnread, setShowUnread] = useState(false);

  const filteredNotifications = showUnread
    ? localNotifications.filter(n => !n.is_read)
    : localNotifications;

  const markAsRead = (id: string) => {
    setLocalNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setLocalNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  };

  const deleteNotification = (id: string) => {
    setLocalNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = localNotifications.filter(n => !n.is_read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "booking": return <Calendar className="h-6 w-6" />;
      case "payment": return <CreditCard className="h-6 w-6" />;
      default: return <Info className="h-6 w-6" />;
    }
  };

  const getNotificationColors = (type: string) => {
    switch (type) {
      case "booking": return { bg: "from-blue-500/20 to-indigo-500/20", text: "text-blue-400", border: "border-blue-500/30", gradient: "from-blue-500 to-indigo-600" };
      case "payment": return { bg: "from-emerald-500/20 to-teal-500/20", text: "text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500 to-teal-600" };
      default: return { bg: "from-purple-500/20 to-pink-500/20", text: "text-purple-400", border: "border-purple-500/30", gradient: "from-purple-500 to-pink-600" };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            <span className="animated-gradient-text">Notifications</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowUnread(!showUnread)}
            className="h-10 rounded-xl font-bold text-xs border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50 transition-all"
          >
            <Eye className="h-4 w-4 mr-2" />
            {showUnread ? "Show All" : "Unread Only"}
          </Button>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              onClick={markAllAsRead}
              className="h-10 rounded-xl font-bold text-xs border-2 border-slate-600 text-gray-300 hover:bg-slate-700 transition-all"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notif) => {
            const colors = getNotificationColors(notif.type);
            return (
              <Card
                key={notif.id}
                className={`card-elegant transition-all duration-300 ${
                  notif.is_read ? "opacity-70" : "border-indigo-500/50 shadow-lg shadow-indigo-500/10"
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex gap-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0 shadow-lg`}>
                      <span className={colors.text}>{getNotificationIcon(notif.type)}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {!notif.is_read && (
                              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/50 animate-pulse" />
                            )}
                            <h3 className={`font-bold text-sm ${notif.is_read ? "text-gray-400" : "text-white"}`}>
                              {notif.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-400 font-medium leading-relaxed">{notif.message}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                            {new Date(notif.created_at).toLocaleDateString()}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notif.id)}
                            className="h-8 w-8 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {!notif.is_read && (
                        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-700/50">
                          <Button
                            size="sm"
                            onClick={() => markAsRead(notif.id)}
                            className="h-9 rounded-lg font-bold text-xs bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all border-0"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" />
                            Mark as Read
                          </Button>
                          <Button variant="ghost" size="sm" className="h-9 rounded-lg font-bold text-xs text-gray-400 hover:text-white transition-all">
                            View Details <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="card-elegant border-dashed">
            <CardContent className="p-12 text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
                <Bell className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                {showUnread ? "No Unread Notifications" : "All Caught Up!"}
              </h3>
              <p className="text-sm text-gray-500 font-medium max-w-sm mx-auto">
                {showUnread ? "You have no unread notifications." : "No notifications to show at the moment."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}