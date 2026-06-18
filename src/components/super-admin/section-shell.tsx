"use client";

import React, { useState } from "react";
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
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {title.split(' ')[0]} <span className="animated-gradient-text">{title.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {actions}
          <Button variant="outline" size="sm" className="hidden sm:flex h-11 px-5 rounded-xl border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-indigo-500 font-bold transition-all">
            <Download className="h-4 w-4 mr-2 text-gray-400" />
            Export
          </Button>
          {onAdd && (
            <Button size="sm" onClick={onAdd} className="h-11 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30 font-black">
              <Plus className="h-4 w-4 mr-2" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none bg-slate-800/60 border border-slate-600/30 backdrop-blur-xl rounded-2xl overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-12 h-12 bg-slate-800/50 border-slate-700 rounded-xl focus:bg-slate-800 focus:ring-4 focus:ring-indigo-500/20 transition-all font-medium text-white placeholder:text-gray-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="h-12 border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-indigo-500 rounded-xl px-6 font-bold transition-all">
                <Filter className="h-5 w-5 mr-2 text-gray-400" />
                Filters
              </Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700/50 bg-slate-800/30">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
