"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)} suppressHydrationWarning>
      <div suppressHydrationWarning>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-2" suppressHydrationWarning>
            <Link href="/" className="hover:text-foreground transition-colors">
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.map((item, index) => (
              <span key={index} className="flex items-center gap-1" suppressHydrationWarning>
                <ChevronRight className="h-4 w-4" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900" suppressHydrationWarning>{title}</h1>
        {description && (
          <p className="text-slate-500 mt-2 font-medium max-w-2xl leading-relaxed" suppressHydrationWarning>{description}</p>
        )}
      </div>
      {action && (
        <Button onClick={action.onClick} className="shrink-0 premium-gradient shadow-lg shadow-primary/20 h-12 px-6 rounded-xl font-black">
          {action.icon}
          {action.label}
        </Button>
      )}
    </div>
  );
}