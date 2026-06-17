"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockUsers } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { UserPlus, Mail, Phone, Search, ArrowRight } from "lucide-react";
import { Profile } from "@/lib/types";

export default function UsersPage() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");

  const users = isDemoMode
    ? mockUsers.filter(u => u.parent_admin_id === "sub-admin-001")
    : [];

  const filteredUsers = searchQuery
    ? users.filter(u =>
        u.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Users</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Manage users registered under your administration.
          </p>
        </div>
        <Button className="h-10 rounded-xl font-bold shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
          <UserPlus className="h-4 w-4 mr-2" />
          Register User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{users.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total Users</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{users.filter(u => u.is_active).length}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Active</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-rose-400">{users.filter(u => !u.is_active).length}</p>
              <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">Inactive</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 group">
        <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search by name, email or username..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-500 text-white"
        />
      </div>

      {/* Users Grid */}
      {filteredUsers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="card-elegant group hover:scale-[1.02] transition-all duration-300">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                    <Avatar
                      firstName={user.first_name}
                      lastName={user.last_name}
                      size="lg"
                      className="border-2 border-slate-700 relative z-10"
                    />
                  </div>
                  <Badge className={`${user.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-500/20 text-gray-400"} border-0 text-xs font-bold`}>
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>

                <h3 className="text-lg font-black text-white mb-1">{user.first_name} {user.last_name}</h3>
                <p className="text-xs text-gray-400 font-mono mb-4">@{user.username}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <Mail className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-300 truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Phone className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-300">{user.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                  <Badge variant="outline" className="capitalize text-xs font-bold border-slate-600 text-gray-300">
                    {user.user_type}
                  </Badge>
                  <Button variant="outline" size="sm" className="h-8 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                    View Details <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="card-elegant border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
              <UserPlus className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">No Users Found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              No users match your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}