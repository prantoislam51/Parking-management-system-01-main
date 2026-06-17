"use client";

import { useHasHydrated } from "@/lib/hooks/use-has-hydrated";

interface FormattedDateProps {
  date: string | Date;
  options?: Intl.DateTimeFormatOptions;
}

export function FormattedDate({ date, options }: FormattedDateProps) {
  const hasHydrated = useHasHydrated();
  const dateObj = typeof date === "string" ? new Date(date) : date;

  if (!hasHydrated) {
    // Return a placeholder or the ISO string during SSR to avoid mismatch
    // ISO string is stable across server and client
    return <span className="invisible">{dateObj.toISOString()}</span>;
  }

  return <span>{dateObj.toLocaleDateString(undefined, options)}</span>;
}
