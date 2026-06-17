"use client";

import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent" | "info" | "warning";
  className?: string;
}

const variantStyles = {
  default: "card-elegant",
  primary: "card-elegant border-l-[3px] border-l-primary",
  secondary: "card-elegant border-l-[3px] border-l-secondary",
  accent: "card-elegant border-l-[3px] border-l-accent",
  info: "card-elegant border-l-[3px] border-l-blue-500",
  warning: "card-elegant border-l-[3px] border-l-orange-500",
};

const iconStyles = {
  default: "bg-gradient-to-br from-muted to-muted/80 text-muted-foreground",
  primary: "bg-gradient-to-br from-primary/20 to-primary/10 text-primary",
  secondary: "bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary",
  accent: "bg-gradient-to-br from-accent/20 to-accent/10 text-accent",
  info: "bg-gradient-to-br from-blue-500/20 to-blue-500/10 text-blue-500",
  warning: "bg-gradient-to-br from-orange-500/20 to-orange-500/10 text-orange-500",
};

export function StatsCard({
  title,
  value,
  icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 group hover:-translate-y-2 hover:shadow-xl",
        variantStyles[variant],
        className
      )}
      suppressHydrationWarning
    >
      <div className="flex items-start justify-between" suppressHydrationWarning>
        <div className="space-y-3" suppressHydrationWarning>
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground" suppressHydrationWarning>{title}</p>
          <p className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent group-hover:scale-105 transition-transform origin-left" suppressHydrationWarning>
            {value}
          </p>
        </div>
        {icon && (
          <div className={cn(
            "p-4 rounded-2xl transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-lg",
            iconStyles[variant]
          )} suppressHydrationWarning>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-6 flex items-center gap-2" suppressHydrationWarning>
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm",
            trend.isPositive ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20" : "bg-rose-500/10 text-rose-600 border border-rose-500/20"
          )} suppressHydrationWarning>
            {trend.isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {Math.abs(trend.value)}%
          </div>
          <span className="text-xs text-muted-foreground font-medium">vs last month</span>
        </div>
      )}
    </div>
  );
}