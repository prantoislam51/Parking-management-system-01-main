"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/shared/page-header";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import { Search, Plus, Filter, Download } from "lucide-react";
import { Card, CardContent } from "@/components/shared/card";

interface SectionShellProps {
  title: string;
  description: string;
  onAdd?: () => void;
  addLabel?: string;
  searchPlaceholder?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export function SectionShell({
  title,
  description,
  onAdd,
  addLabel = "Add New",
  searchPlaceholder = "Search...",
  children,
  actions,
}: SectionShellProps) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageHeader title={title} description={description} />
        <div className="flex items-center gap-3">
          {actions}
          <Button variant="outline" size="sm" className="hidden sm:flex h-11 px-5 rounded-xl border-slate-200 font-bold hover:bg-slate-50 transition-all">
            <Download className="h-4 w-4 mr-2 text-slate-400" />
            Export
          </Button>
          {onAdd && (
            <Button size="sm" onClick={onAdd} className="h-11 px-6 rounded-xl premium-gradient shadow-lg shadow-primary/20 font-black">
              <Plus className="h-4 w-4 mr-2" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/70 backdrop-blur-xl rounded-4xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-12 h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="h-14 border-slate-200 rounded-2xl px-6 font-bold hover:bg-slate-50 transition-all">
                <Filter className="h-5 w-5 mr-2 text-slate-400" />
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-inner bg-white/50">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
