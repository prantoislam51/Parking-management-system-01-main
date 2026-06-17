"use client";

import { useState } from "react";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockUsers } from "@/lib/data";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Ticket, Filter, MessageSquare, Eye, Search, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { SupportTicket } from "@/lib/types";
import { FormattedDate } from "@/components/shared/formatted-date";

const mockTickets: SupportTicket[] = [
  {
    id: "tick-001",
    user_id: "user-001",
    subject: "Unable to pay via bKash",
    message: "I am trying to pay for my booking but the bKash option is not working.",
    status: "open",
    priority: "high",
    created_at: "2024-05-09T10:00:00Z",
    updated_at: "2024-05-09T10:00:00Z",
  },
  {
    id: "tick-002",
    user_id: "user-002",
    subject: "Slot is occupied by another car",
    message: "I arrived at my booked slot A-001 but there is already another car parked there.",
    status: "in_progress",
    priority: "urgent",
    created_at: "2024-05-08T15:30:00Z",
    updated_at: "2024-05-08T16:00:00Z",
  },
  {
    id: "tick-003",
    user_id: "user-003",
    subject: "Booking cancellation request",
    message: "I want to cancel my booking for next month.",
    status: "resolved",
    priority: "medium",
    created_at: "2024-05-07T09:00:00Z",
    updated_at: "2024-05-07T14:00:00Z",
  },
];

export default function TicketsPage() {
  const { isDemoMode } = useDemoModeStore();
  const [searchQuery, setSearchQuery] = useState("");
  const tickets = isDemoMode ? mockTickets : [];

  const filteredTickets = searchQuery
    ? tickets.filter(t =>
        t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.message.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tickets;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return { bg: "bg-rose-500/20 text-rose-400", border: "border-rose-500/30", gradient: "from-rose-500 to-pink-600" };
      case "in_progress": return { bg: "bg-amber-500/20 text-amber-400", border: "border-amber-500/30", gradient: "from-amber-500 to-orange-600" };
      case "resolved": return { bg: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/30", gradient: "from-emerald-500 to-teal-600" };
      case "closed": return { bg: "bg-slate-500/20 text-gray-400", border: "border-slate-500/30", gradient: "from-slate-500 to-gray-600" };
      default: return { bg: "bg-slate-500/20 text-gray-400", border: "border-slate-500/30", gradient: "from-slate-500 to-gray-600" };
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "text-rose-400 bg-rose-500/20";
      case "high": return "text-amber-400 bg-amber-500/20";
      case "medium": return "text-blue-400 bg-blue-500/20";
      case "low": return "text-gray-400 bg-slate-500/20";
      default: return "text-gray-400 bg-slate-500/20";
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Support <span className="animated-gradient-text">Tickets</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Manage and respond to support requests from your users.
          </p>
        </div>
        <Button variant="outline" className="h-10 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
          <Filter className="h-4 w-4 mr-2" />
          Filter Tickets
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-blue-400">{tickets.length}</p>
              <p className="text-[9px] font-bold text-blue-400/60 uppercase tracking-wider">Total</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-rose-500/10 to-rose-600/5 border border-rose-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-rose-500 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-rose-400">{tickets.filter(t => t.status === "open").length}</p>
              <p className="text-[9px] font-bold text-rose-400/60 uppercase tracking-wider">Open</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-amber-400">{tickets.filter(t => t.status === "in_progress").length}</p>
              <p className="text-[9px] font-bold text-amber-400/60 uppercase tracking-wider">In Progress</p>
            </div>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-emerald-400">{tickets.filter(t => t.status === "resolved").length}</p>
              <p className="text-[9px] font-bold text-emerald-400/60 uppercase tracking-wider">Resolved</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-800/50 border border-slate-700/50 rounded-xl px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-500/20 group">
        <Search className="h-4 w-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
        <input
          type="text"
          placeholder="Search by subject or message..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-transparent border-none outline-none text-xs w-full font-medium placeholder:text-gray-500 text-white"
        />
      </div>

      {/* Tickets List */}
      {filteredTickets.length > 0 ? (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => {
            const user = mockUsers.find(u => u.id === ticket.user_id);
            const colors = getStatusColor(ticket.status);

            return (
              <Card key={ticket.id} className="card-elegant group hover:scale-[1.01] transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                    {/* Ticket Icon & Status */}
                    <div className={`lg:w-48 p-4 rounded-xl bg-gradient-to-br ${colors.bg.replace("text-", "").replace("/20", "/10")} border ${colors.border}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center">
                          <Ticket className="h-5 w-5 text-current" />
                        </div>
                        <div>
                          <Badge className={`${colors.bg} border-0 font-bold text-xs`}>
                            {ticket.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.toUpperCase()}
                      </span>
                    </div>

                    {/* Ticket Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-black text-white mb-1">{ticket.subject}</h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{ticket.message}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <FormattedDate date={ticket.created_at} />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 lg:w-40">
                      <Avatar firstName={user?.first_name || ""} lastName={user?.last_name || ""} size="md" className="border-2 border-slate-700" />
                      <div className="min-w-0">
                        <p className="font-bold text-white truncate">{user?.first_name} {user?.last_name}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-blue-400 border-2 border-blue-500/30 hover:bg-blue-500/10 hover:border-blue-500/50">
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl text-gray-400 border-2 border-slate-600 hover:bg-slate-700 hover:border-indigo-500/50">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="card-elegant border-dashed">
          <CardContent className="p-12 text-center">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 flex items-center justify-center mx-auto mb-6">
              <Ticket className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-black text-white mb-2">No Tickets Found</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
              No tickets match your search criteria.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}