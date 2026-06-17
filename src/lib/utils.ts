import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "BDT"): string {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("en-BD", options || defaultOptions);
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTime(date: string | Date): string {
  return new Date(date).toLocaleTimeString("en-BD", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function generateBookingCode(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "PK";
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    available: "bg-green-500",
    pending: "bg-yellow-500",
    booked: "bg-blue-500",
    occupied: "bg-orange-500",
    cancelled: "bg-red-500",
    maintenance: "bg-gray-500",
    approved: "bg-green-500",
    rejected: "bg-red-500",
    completed: "bg-blue-500",
    expired: "bg-gray-500",
    unpaid: "bg-yellow-500",
    paid: "bg-green-500",
    failed: "bg-red-500",
    refunded: "bg-purple-500",
    open: "bg-yellow-500",
    in_progress: "bg-blue-500",
    resolved: "bg-green-500",
    closed: "bg-gray-500",
  };
  return colors[status] || "bg-gray-500";
}

export function getRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    super_admin: "Super Admin",
    sub_admin: "Sub Admin",
    user: "User",
    driver: "Driver",
    owner: "Owner",
  };
  return labels[role] || role;
}

export function getVehicleTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    car: "car",
    bike: "bike",
    truck: "truck",
    bus: "bus",
  };
  return icons[type] || "car";
}

export function calculateEndDate(startDate: string, durationMonths: number): string {
  const start = new Date(startDate);
  start.setMonth(start.getMonth() + durationMonths);
  return start.toISOString().split("T")[0];
}

export function isDateInRange(date: string, startDate: string, endDate: string): boolean {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return d >= start && d <= end;
}

export function getDaysDifference(date1: string, date2: string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;
  return phoneRegex.test(phone);
}

export function validateNID(nid: string): boolean {
  const nidRegex = /^\d{10,17}$/;
  return nidRegex.test(nid);
}

export function validateVehicleNumber(number: string): boolean {
  const vehicleRegex = /^[A-Z]{2}-\d{4}|[A-Z]{3}-\d{4}|[A-Z]{2}\d{4}$/;
  return vehicleRegex.test(number);
}

export function sortByDate<T extends { created_at: string }>(items: T[], order: "asc" | "desc" = "desc"): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}

export function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((acc, item) => {
    const groupKey = String(item[key]);
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {} as Record<string, T[]>);
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function formatNumber(num: number): string {
  if (num >= 10000000) {
    return (num / 10000000).toFixed(1) + "Cr";
  }
  if (num >= 100000) {
    return (num / 100000).toFixed(1) + "L";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}