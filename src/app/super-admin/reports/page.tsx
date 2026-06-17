"use client";

import { mockRevenueData, mockSuperAdminStats } from "@/lib/data";
import { SectionShell } from "@/components/super-admin/section-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { BarChart3, TrendingUp, Download, PieChart as PieIcon, LineChart as LineIcon } from "lucide-react";
import { Button } from "@/components/shared/button";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

export default function ReportsPage() {
  return (
    <SectionShell
      title="Analytical Reports"
      description="Deep dive into system performance, revenue, and usage statistics."
      actions={
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Full PDF Report
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { label: "Annual Revenue", value: "৳2,450,000", trend: "+15%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-500/10" },
          { label: "Avg. Monthly", value: "৳204,166", trend: "+8%", icon: BarChart3, color: "text-primary", bg: "bg-primary/10" },
          { label: "User Growth", value: "156", trend: "+12%", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-500/10" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-background/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <span className={`text-xs font-bold ${stat.color}`}>{stat.trend}</span>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-black mt-1">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineIcon className="h-5 w-5 text-primary" />
              Revenue Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `৳${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieIcon className="h-5 w-5 text-emerald-600" />
              Zone Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockRevenueData.slice(-6)}>
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionShell>
  );
}
