"use client";

import { useUser } from "@/lib/hooks/use-user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Label } from "@/components/shared/label";
import { Avatar } from "@/components/shared/avatar";
import { User, Mail, Phone, MapPin, Shield, Bell, Save, AlertTriangle, Star } from "lucide-react";

export default function SettingsPage() {
  const { user } = useUser();

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          <span className="animated-gradient-text">Settings</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm font-medium">
          Manage your account preferences and profile information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <Card className="card-elegant">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <CardTitle className="text-lg font-black text-white flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-400" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-5">
              <div className="flex items-center gap-6 pb-6 border-b border-slate-700/50">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full blur-md opacity-50"></div>
                  <Avatar
                    firstName={user?.first_name || "A"}
                    lastName={user?.last_name || "D"}
                    size="xl"
                    className="border-4 border-slate-700 relative z-10"
                  />
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="h-9 rounded-lg text-xs font-bold border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                    Change Photo
                  </Button>
                  <p className="text-[10px] text-gray-500">JPG, GIF or PNG. Max size 2MB.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</Label>
                  <Input
                    id="first_name"
                    defaultValue={user?.first_name}
                    icon={<User className="h-4 w-4" />}
                    className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</Label>
                  <Input
                    id="last_name"
                    defaultValue={user?.last_name}
                    icon={<User className="h-4 w-4" />}
                    className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email}
                  icon={<Mail className="h-4 w-4" />}
                  disabled
                  className="h-12 rounded-xl bg-slate-800/30 border-slate-700/50 text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone Number</Label>
                <Input
                  id="phone"
                  defaultValue={user?.phone}
                  icon={<Phone className="h-4 w-4" />}
                  className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Address</Label>
                <Input
                  id="address"
                  defaultValue={user?.address}
                  icon={<MapPin className="h-4 w-4" />}
                  className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-700/50">
                <Button className="h-11 rounded-xl font-bold shadow-lg shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="card-elegant">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <CardTitle className="text-lg font-black text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-400" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Password</Label>
                <Input
                  id="current_password"
                  type="password"
                  icon={<Shield className="h-4 w-4" />}
                  className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">New Password</Label>
                  <Input
                    id="new_password"
                    type="password"
                    icon={<Shield className="h-4 w-4" />}
                    className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Confirm New Password</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    icon={<Shield className="h-4 w-4" />}
                    className="h-12 rounded-xl bg-slate-800/50 border-slate-700/50 text-white focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t border-slate-700/50">
                <Button variant="outline" className="h-11 rounded-xl font-bold border-2 border-slate-600 text-gray-300 hover:bg-slate-700 hover:border-indigo-500/50">
                  <Shield className="h-4 w-4 mr-2" />
                  Update Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card className="card-elegant">
            <CardHeader className="border-b border-slate-700/50 pb-4">
              <CardTitle className="text-lg font-black text-white flex items-center gap-2">
                <Bell className="h-5 w-5 text-amber-400" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-5">
              {[
                { label: "Email Notifications", desc: "Receive updates via email", enabled: true },
                { label: "Push Notifications", desc: "Receive alerts on your device", enabled: true },
                { label: "Booking Requests", desc: "New request alerts", enabled: false },
                { label: "Payment Alerts", desc: "Successful payment alerts", enabled: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-700/50">
                  <div>
                    <p className="text-sm font-bold text-white">{item.label}</p>
                    <p className="text-[10px] text-gray-500">{item.desc}</p>
                  </div>
                  <div className={`h-5 w-9 rounded-full relative cursor-pointer ${item.enabled ? "bg-emerald-500" : "bg-slate-600"}`}>
                    <div className={`absolute top-1 h-3 w-3 rounded-full bg-white transition-all ${item.enabled ? "right-1" : "left-1"}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="card-elegant border-rose-500/20 bg-rose-500/5">
            <CardHeader className="border-b border-rose-500/20 pb-4">
              <CardTitle className="text-lg font-black text-rose-400 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <p className="text-xs text-gray-400 mb-4">Once you deactivate your account, there is no going back. Please be certain.</p>
              <Button variant="outline" className="w-full h-11 rounded-xl font-bold border-2 border-rose-500/30 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/50">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}