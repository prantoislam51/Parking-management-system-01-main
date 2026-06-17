"use client";

import { useState } from "react";
import { useUser, useSwitchDemoUser } from "@/lib/hooks/use-user";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockSuperAdminStats,
  mockRevenueData,
  mockBookingStatusData,
  mockBookings,
  mockUsers,
} from "@/lib/data";
import { PageHeader } from "@/components/shared/page-header";
import { StatsCard } from "@/components/shared/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { DataTable } from "@/components/shared/data-table";
import {
  Users,
  UserCog,
  Building2,
  Car,
  Calendar,
  CreditCard,
  ShieldAlert,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { formatCurrency } from "@/lib/utils";

export default function SuperAdminDashboard() {
  const { user } = useUser();
  const { isDemoMode } = useDemoModeStore();
  const { switchToSuperAdmin, switchToSubAdmin, switchToUser } = useSwitchDemoUser();
  const [isLoading] = useState(false);

  // Use mock data in demo mode
  const stats = isDemoMode ? mockSuperAdminStats : { totalUsers: 0, totalAdmins: 0, totalZones: 0, totalSlots: 0, activeBookings: 0, totalRevenue: 0, pendingRequests: 0, blacklistedUsers: 0 };
  const revenueData = isDemoMode ? mockRevenueData : [];
  const bookingStatusData = isDemoMode ? mockBookingStatusData : [];
  const recentBookings = isDemoMode ? mockBookings : [];
  const recentUsers = isDemoMode ? mockUsers : [];

  const bookingColumns = [
    {
      key: "booking_code",
      header: "Booking Code",
      cell: (row: unknown) => (
        <span className="font-mono text-sm">{(row as { booking_code: string }).booking_code}</span>
      ),
    },
    {
      key: "user_id",
      header: "User",
      cell: (row: unknown) => {
        const userId = (row as { user_id: string }).user_id;
        const mockUser = mockUsers.find((u) => u.id === userId);
        return mockUser ? `${mockUser.first_name} ${mockUser.last_name}` : "N/A";
      },
    },
    {
      key: "slot_id",
      header: "Slot",
      cell: (row: unknown) => {
        const slotId = (row as { slot_id: string }).slot_id;
        const mockSlot = isDemoMode ? mockBookings.find((_, i) => i === mockBookings.indexOf(row as never)) : null;
        return slotId ? `Slot ${slotId.slice(-3)}` : "N/A";
      },
    },
    {
      key: "status",
      header: "Status",
      cell: (row: unknown) => {
        const status = (row as { status: string }).status;
        const variants: Record<string, "default" | "success" | "warning" | "danger" | "secondary"> = {
          pending: "warning",
          approved: "success",
          rejected: "danger",
          cancelled: "danger",
          completed: "secondary",
        };
        return <Badge variant={variants[status] || "default"}>{status}</Badge>;
      },
    },
  ];

  const userColumns = [
    {
      key: "first_name",
      header: "Name",
      cell: (row: unknown) => {
        const profile = row as { first_name: string; last_name: string };
        return `${profile.first_name} ${profile.last_name}`;
      },
    },
    {
      key: "email",
      header: "Email",
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "created_at",
      header: "Joined",
      cell: (row: unknown) => new Date((row as { created_at: string }).created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader
          title={`Welcome back, ${user?.first_name || "Admin"}!`}
          description="Here's an overview of your parking management system."
        />
        {isDemoMode && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={switchToSuperAdmin}>
              Super Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => switchToSubAdmin(0)}>
              Sub Admin
            </Button>
            <Button variant="outline" size="sm" onClick={() => switchToUser(0)}>
              User
            </Button>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<Users className="h-5 w-5" />}
          trend={{ value: 12, isPositive: true }}
          variant="primary"
        />
        <StatsCard
          title="Sub Admins"
          value={stats.totalAdmins}
          icon={<UserCog className="h-5 w-5" />}
          variant="info"
        />
        <StatsCard
          title="Total Zones"
          value={stats.totalZones}
          icon={<Building2 className="h-5 w-5" />}
          trend={{ value: 5, isPositive: true }}
          variant="accent"
        />
        <StatsCard
          title="Total Slots"
          value={stats.totalSlots}
          icon={<Car className="h-5 w-5" />}
          trend={{ value: 8, isPositive: true }}
          variant="secondary"
        />
        <StatsCard
          title="Active Bookings"
          value={stats.activeBookings}
          icon={<Calendar className="h-5 w-5" />}
          variant="info"
        />
        <StatsCard
          title="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon={<CreditCard className="h-5 w-5" />}
          trend={{ value: 15, isPositive: true }}
          variant="primary"
        />
        <StatsCard
          title="Pending Requests"
          value={stats.pendingRequests}
          icon={<Calendar className="h-5 w-5" />}
          variant="warning"
        />
        <StatsCard
          title="Blacklisted"
          value={stats.blacklistedUsers}
          icon={<ShieldAlert className="h-5 w-5" />}
          variant="default"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/super-admin/admins">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add Sub Admin
          </Button>
        </Link>
        <Link href="/super-admin/zones">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add Zone
          </Button>
        </Link>
        <Link href="/super-admin/slots">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4" />
            Add Slots
          </Button>
        </Link>
        <Link href="/super-admin/reports">
          <Button variant="outline" size="sm">
            <ArrowRight className="h-4 w-4" />
            View Reports
          </Button>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [formatCurrency(value), "Revenue"]}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#0F4C81" strokeWidth={2} dot={{ fill: "#0F4C81" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={bookingStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {bookingStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {bookingStatusData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Link href="/super-admin/bookings">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTable
              data={recentBookings}
              columns={bookingColumns}
              keyExtractor={(row) => (row as { id: string }).id}
              isLoading={isLoading}
              pageSize={5}
              emptyMessage="No recent bookings"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Registrations</CardTitle>
            <Link href="/super-admin/users">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <DataTable
              data={recentUsers}
              columns={userColumns}
              keyExtractor={(row) => (row as { id: string }).id}
              isLoading={isLoading}
              pageSize={5}
              emptyMessage="No recent registrations"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}