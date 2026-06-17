"use client";

import { useUser } from "@/lib/hooks/use-user";
import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Avatar } from "@/components/shared/avatar";
import { Input } from "@/components/shared/input";
import { SuccessMessage } from "@/components/shared";
import { User, Camera, Shield, CreditCard, Check, Mail, Phone, MapPin, Calendar, Star, Lock, Smartphone } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/shared/badge";

export function ProfileSection() {
  const { user } = useUser();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveChanges = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            My <span className="animated-gradient-text">Profile</span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm font-medium">
            Manage your personal information and account settings.
          </p>
        </div>
      </div>

      {/* Profile Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 border border-slate-600/30 shadow-xl shadow-indigo-500/10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10" />
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-500/20 rounded-full blur-[80px]" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-[80px]" />
        <CardContent className="relative p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
              <Avatar
                firstName={user?.first_name}
                lastName={user?.last_name}
                src={user?.profile_image}
                size="xl"
                className="h-28 w-28 border-4 border-slate-800 relative z-10 shadow-2xl"
              />
              <button className="absolute bottom-0 right-0 p-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 hover:scale-110 transition-all z-20">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-black text-white tracking-tight drop-shadow-sm">{user?.first_name} {user?.last_name}</h2>
              <p className="text-gray-400 font-medium flex items-center gap-2 justify-center md:justify-start">
                <Mail className="h-4 w-4" />
                {user?.email}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                  <Star className="h-3 w-3 mr-1.5 fill-indigo-400" /> Premium Member
                </Badge>
                <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-3 py-1 rounded-full font-bold shadow-sm">
                  <Check className="h-3 w-3 mr-1.5" /> Verified
                </Badge>
              </div>
            </div>
            <div className="flex flex-col items-center p-5 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 shadow-lg">
              <p className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">85%</p>
              <p className="text-xs text-gray-400 font-medium mt-1">Profile Complete</p>
              <div className="w-full mt-2 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg shadow-indigo-500/50" />
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      {/* Form Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-700/50">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center shadow-lg ring-2 ring-indigo-500/20">
                  <User className="h-6 w-6 text-indigo-300" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-white tracking-tight">Personal Information</h3>
                  <p className="text-xs text-gray-400 font-medium">Update your profile details below.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">First Name</label>
                  <div className="relative group">
                    <Input
                      defaultValue={user?.first_name}
                      className="h-12 pl-4 pr-4 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner group-hover:border-indigo-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Last Name</label>
                  <div className="relative group">
                    <Input
                      defaultValue={user?.last_name}
                      className="h-12 pl-4 pr-4 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner group-hover:border-indigo-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/70 z-10" />
                    <Input
                      defaultValue={user?.email}
                      disabled
                      className="h-12 pl-12 pr-4 bg-slate-900/50 border-2 border-slate-700/50 text-gray-400 rounded-xl"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/70 z-10" />
                    <Input
                      defaultValue={user?.phone || "+880 1XXX XXXXXX"}
                      className="h-12 pl-12 pr-4 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner group-hover:border-indigo-500/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">NID Number</label>
                  <div className="relative group">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/70 z-10" />
                    <Input
                      defaultValue={user?.nid_number || ""}
                      placeholder="Enter NID Number"
                      className="h-12 pl-12 pr-4 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner group-hover:border-indigo-500/50 placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-indigo-300/90">Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400/70 z-10" />
                    <Input
                      defaultValue={user?.address || ""}
                      placeholder="Street, Area, City"
                      className="h-12 pl-12 pr-4 bg-slate-900/80 border-2 border-slate-600 text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-inner group-hover:border-indigo-500/50 placeholder:text-gray-500"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={handleSaveChanges}
                  disabled={isSaving}
                  className="h-12 px-8 font-bold rounded-xl shadow-xl shadow-indigo-500/30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40 active:scale-95 text-white border-0"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Security Card */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-slate-700/50">
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500/40 to-teal-500/40 flex items-center justify-center shadow-lg ring-2 ring-emerald-500/20">
                  <Shield className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="font-bold text-white">Account Security</p>
                  <p className="text-xs text-gray-400">Protect your account</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border-2 border-slate-700/50 hover:border-amber-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-amber-500/40 to-orange-500/40 flex items-center justify-center shadow-sm">
                      <Lock className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">Change Password</p>
                      <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg font-bold border-2 border-slate-600 bg-transparent text-gray-300 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-orange-500/20 hover:text-amber-300 hover:border-amber-500/50 transition-all duration-300">
                    Update
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900/60 border-2 border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-indigo-500/40 to-purple-500/40 flex items-center justify-center shadow-sm">
                      <Smartphone className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-white">Two-Factor Auth</p>
                      <p className="text-xs text-gray-500">Currently disabled</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg font-bold border-2 border-slate-600 bg-transparent text-gray-300 hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-purple-500/20 hover:text-indigo-300 hover:border-indigo-500/50 transition-all duration-300">
                    Enable
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Info */}
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-600/50 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl">
            <div className="h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            <CardContent className="p-5">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-700/50">
                <Calendar className="h-5 w-5 text-purple-400" />
                <p className="text-sm font-bold text-white">Account Info</p>
              </div>
              <div className="space-y-3 pt-3">
                <div className="flex justify-between items-center py-2.5 px-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <span className="text-xs text-gray-400 font-medium">Member Since</span>
                  <span className="text-xs font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Apr 2024</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <span className="text-xs text-gray-400 font-medium">Total Bookings</span>
                  <span className="text-xs font-bold text-white">12</span>
                </div>
                <div className="flex justify-between items-center py-2.5 px-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
                  <span className="text-xs text-gray-400 font-medium">Vehicles</span>
                  <span className="text-xs font-bold text-white">2</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <SuccessMessage
        isVisible={showSuccess}
        message="Profile updated successfully!"
        onClose={() => setShowSuccess(false)}
      />
    </div>
  );
}