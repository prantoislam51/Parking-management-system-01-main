"use client";

import { mockNotifications } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Bell, Check, Calendar, CreditCard, ShieldAlert, MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

export default function NotificationsPage() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="h-5 w-5" />;
      case 'payment': return <CreditCard className="h-5 w-5" />;
      case 'system': return <ShieldAlert className="h-5 w-5" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-500/10 text-blue-600';
      case 'payment': return 'bg-emerald-500/10 text-emerald-600';
      case 'system': return 'bg-amber-500/10 text-amber-600';
      default: return 'bg-primary/10 text-primary';
    }
  };

  return (
    <SectionShell
      title="System Notifications"
      description="Stay updated with the latest activities across the parking network."
      actions={
        <Button variant="outline" size="sm" onClick={() => toast.success("All marked as read")}>
          <Check className="h-4 w-4 mr-2" />
          Mark all as read
        </Button>
      }
    >
      <div className="space-y-4">
        {mockNotifications.map((notif) => (
          <Card key={notif.id} className={cn(
            "border-none shadow-sm transition-all hover:translate-x-1",
            notif.is_read ? "opacity-60" : "bg-primary/5"
          )}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${getColor(notif.type)}`}>
                  {getIcon(notif.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold">{notif.title}</p>
                    {!notif.is_read && <div className="h-2 w-2 rounded-full bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{notif.message}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1 uppercase font-bold tracking-widest">
                    {new Date(notif.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}

// Helper to avoid import error since cn is used
import { cn } from "@/lib/utils";
