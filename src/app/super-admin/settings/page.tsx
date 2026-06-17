"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Shield, User, Bell, Globe, Lock, Save, ChevronRight, Check } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";

type SettingsTab = "general" | "profile" | "security" | "notifications" | "permissions";

const tabs = [
  { id: "general" as const, label: "General Settings", icon: Globe },
  { id: "profile" as const, label: "Profile Information", icon: User },
  { id: "security" as const, label: "Security & Passwords", icon: Lock },
  { id: "notifications" as const, label: "Notification Rules", icon: Bell },
  { id: "permissions" as const, label: "System Permissions", icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-slate-500 mt-1">Manage your account and platform preferences</p>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Settings Navigation Sidebar */}
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden h-fit">
          <CardContent className="p-4">
            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 group",
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-slate-800 border border-emerald-500/30"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    activeTab === tab.id
                      ? "bg-emerald-500/20 text-emerald-600"
                      : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"
                  )}>
                    <tab.icon className="h-4 w-4" />
                  </div>
                  <span className={cn(
                    "flex-1 text-left",
                    activeTab === tab.id && "font-semibold"
                  )}>
                    {tab.label}
                  </span>
                  {activeTab === tab.id && (
                    <Check className="h-4 w-4 text-emerald-500" />
                  )}
                  <ChevronRight className={cn(
                    "h-4 w-4 text-slate-300 transition-transform duration-300",
                    "group-hover:translate-x-1",
                    activeTab === tab.id && "opacity-0"
                  )} />
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings Content */}
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
          <CardContent className="p-6 lg:p-8">
            {activeTab === "general" && <GeneralSettings />}
            {activeTab === "profile" && <ProfileSettings />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationSettings />}
            {activeTab === "permissions" && <PermissionsSettings />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 rounded-lg bg-blue-500/10">
          <Globe className="h-5 w-5 text-blue-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">General Settings</h2>
          <p className="text-sm text-slate-500">Platform configuration and basic settings</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Platform Name</label>
            <Input defaultValue="ParkBD" className="h-12 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Support Email</label>
            <Input defaultValue="support@parkbd.com" className="h-12 rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Maintenance Mode</label>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors">
            <div className="h-12 w-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Shield className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">System Maintenance Mode</p>
              <p className="text-xs text-slate-500">Only admins will be able to access the dashboard.</p>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:border-amber-500 hover:text-amber-600 hover:bg-amber-50">
              Enable
            </Button>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={() => toast.success("Settings saved successfully")}
            className="h-12 px-8 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/25 transition-all duration-300"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 rounded-lg bg-emerald-500/10">
          <User className="h-5 w-5 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Profile Information</h2>
          <p className="text-sm text-slate-500">Update your personal details</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
            <Input defaultValue="Super" className="h-12 rounded-xl border-slate-200" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
            <Input defaultValue="Admin" className="h-12 rounded-xl border-slate-200" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
          <Input defaultValue="admin@parkbd.com" type="email" className="h-12 rounded-xl border-slate-200" />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
          <Input defaultValue="+880 1700-000000" className="h-12 rounded-xl border-slate-200" />
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={() => toast.success("Profile updated successfully")}
            className="h-12 px-8 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/25"
          >
            <Save className="h-4 w-4 mr-2" />
            Update Profile
          </Button>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 rounded-lg bg-red-500/10">
          <Lock className="h-5 w-5 text-red-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Security & Passwords</h2>
          <p className="text-sm text-slate-500">Manage your account security</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Current Password</label>
          <Input type="password" placeholder="Enter current password" className="h-12 rounded-xl border-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">New Password</label>
            <Input type="password" placeholder="Enter new password" className="h-12 rounded-xl border-slate-200" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Confirm Password</label>
            <Input type="password" placeholder="Confirm new password" className="h-12 rounded-xl border-slate-200" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100">
          <p className="text-sm font-medium text-slate-700 mb-2">Password Requirements:</p>
          <ul className="text-xs text-slate-500 space-y-1">
            <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> At least 8 characters</li>
            <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Include uppercase and lowercase</li>
            <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Include at least one number</li>
            <li className="flex items-center gap-2"><Check className="h-3 w-3 text-emerald-500" /> Include special character</li>
          </ul>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            onClick={() => toast.success("Password changed successfully")}
            className="h-12 px-8 rounded-xl font-bold bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 shadow-lg shadow-red-500/25"
          >
            <Lock className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
}

function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Bell className="h-5 w-5 text-amber-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Notification Rules</h2>
          <p className="text-sm text-slate-500">Configure how you receive notifications</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { key: "email" as const, label: "Email Notifications", desc: "Receive updates via email" },
          { key: "push" as const, label: "Push Notifications", desc: "Browser push notifications" },
          { key: "sms" as const, label: "SMS Notifications", desc: "Text message alerts" },
          { key: "marketing" as const, label: "Marketing Emails", desc: "News and promotional content" },
        ].map((item) => (
          <div
            key={item.key}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-slate-800">{item.label}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={cn(
                "relative w-12 h-7 rounded-full transition-all duration-300",
                settings[item.key] ? "bg-gradient-to-r from-emerald-500 to-cyan-500" : "bg-slate-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300",
                settings[item.key] ? "left-6" : "left-1"
              )} />
            </button>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <Button
          onClick={() => toast.success("Notification settings saved")}
          className="h-12 px-8 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/25"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Preferences
        </Button>
      </div>
    </div>
  );
}

function PermissionsSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
        <div className="p-2 rounded-lg bg-violet-500/10">
          <Shield className="h-5 w-5 text-violet-500" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">System Permissions</h2>
          <p className="text-sm text-slate-500">Manage user roles and access control</p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          { role: "Super Admin", level: "Full Access", color: "violet" },
          { role: "Sub Admin", level: "Limited Access", color: "blue" },
          { role: "Operator", level: "Operational Access", color: "emerald" },
          { role: "User", level: "Basic Access", color: "slate" },
        ].map((perm, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center",
                perm.color === "violet" && "bg-violet-500/10 text-violet-500",
                perm.color === "blue" && "bg-blue-500/10 text-blue-500",
                perm.color === "emerald" && "bg-emerald-500/10 text-emerald-500",
                perm.color === "slate" && "bg-slate-500/10 text-slate-500",
              )}>
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">{perm.role}</p>
                <p className="text-xs text-slate-500">{perm.level}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-slate-600">
              Manage
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}