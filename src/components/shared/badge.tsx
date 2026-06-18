import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    secondary: "bg-slate-700/50 text-gray-400 border-slate-600/50",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    danger: "bg-red-500/20 text-red-400 border-red-500/30",
    outline: "border border-slate-600 text-gray-300",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-colors",
        variants[variant],
        className
      )}
      suppressHydrationWarning
      {...props}
    />
  );
}

export { Badge };
