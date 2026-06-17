"use client";

import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Ticket, Plus, MessageSquare, Phone, Mail, HelpCircle, ArrowRight, Clock, Send } from "lucide-react";
import { useState } from "react";

export function SupportSection() {
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({ subject: "", message: "" });

  const handleSubmitTicket = () => {
    setShowTicketForm(false);
    setTicketData({ subject: "", message: "" });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Support <span className="animated-gradient-text">& Help</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Get help with your bookings, payments, or account issues.
          </p>
        </div>
        <Button
          onClick={() => setShowTicketForm(true)}
          className="h-12 px-6 font-bold rounded-xl shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all active:scale-95 text-white border-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create Ticket
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: "Booking Guide", icon: Ticket, color: { bg: "from-blue-500/20 to-indigo-500/20", text: "text-blue-400" } },
          { title: "Payment Help", icon: HelpCircle, color: { bg: "from-emerald-500/20 to-teal-500/20", text: "text-emerald-400" } },
          { title: "Security", icon: HelpCircle, color: { bg: "from-amber-500/20 to-orange-500/20", text: "text-amber-400" } },
          { title: "Locations", icon: HelpCircle, color: { bg: "from-rose-500/20 to-pink-500/20", text: "text-rose-400" } },
        ].map((item, idx) => (
          <button
            key={idx}
            className="card-elegant p-4 text-center group hover:scale-[1.02] transition-all duration-300"
          >
            <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${item.color.bg} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon className={`h-6 w-6 ${item.color.text}`} />
            </div>
            <p className="font-bold text-sm text-white">{item.title}</p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Tickets */}
        <div className="lg:col-span-2 space-y-5">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <span className="h-5 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></span>
            Your Tickets
          </h3>

          {/* Ticket Form */}
          {showTicketForm && (
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center">
                      <Ticket className="h-6 w-6 text-indigo-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">New Support Ticket</h3>
                      <p className="text-xs text-gray-500 font-medium">Describe your issue below.</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowTicketForm(false)}
                    className="text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg"
                  >
                    Cancel
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90 block mb-2">Subject</label>
                    <input
                      type="text"
                      value={ticketData.subject}
                      onChange={e => setTicketData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Enter ticket subject"
                      className="w-full h-12 px-4 rounded-xl bg-slate-900/80 border-2 border-slate-600 text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90 block mb-2">Message</label>
                    <textarea
                      value={ticketData.message}
                      onChange={e => setTicketData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Describe your issue in detail..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border-2 border-slate-600 text-white text-sm font-medium focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none transition-all"
                    />
                  </div>
                  <Button
                    onClick={handleSubmitTicket}
                    className="h-12 rounded-xl font-bold px-8 shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all border-0"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit Ticket
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Ticket List */}
          <Card className="card-elegant">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white border-0 px-4 py-1.5 font-bold text-xs uppercase tracking-wider rounded-full">
                    PENDING
                  </Button>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">#TK-89012</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>2 hours ago</span>
                </div>
              </div>
              <h3 className="font-black text-white mb-2">Issue with RFID entry at Gulshan North</h3>
              <p className="text-sm text-gray-400 font-medium line-clamp-2 mb-4">
                My vehicle was not recognized at the gate even though I have an active booking. I had to pay manually to enter.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-700/50">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MessageSquare className="h-4 w-4" />
                  <span>1 Reply</span>
                </div>
                <Button variant="outline" size="sm" className="h-9 rounded-lg font-bold text-xs border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50 transition-all ml-auto">
                  View Chat <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Card */}
        <Card className="overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border-0 shadow-xl shadow-indigo-500/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-black text-white mb-2">Contact Us</h3>
            <p className="text-sm text-white/70 font-medium mb-6">Our support team is available 24/7 to assist you.</p>

            <div className="space-y-4">
              <a href="tel:+8801234567890" className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Call us</p>
                  <p className="font-bold text-white">+880 1234 567 890</p>
                </div>
              </a>

              <a href="mailto:support@parkbd.com" className="flex items-center gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Email us</p>
                  <p className="font-bold text-white">support@parkbd.com</p>
                </div>
              </a>
            </div>

            <Button variant="secondary" className="w-full h-12 rounded-xl font-bold mt-6 bg-white text-indigo-600 hover:bg-white/90 transition-all border-0">
              Start Live Chat
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}