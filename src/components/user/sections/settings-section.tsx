"use client";

import { Card, CardContent } from "@/components/shared/card";
import { Button } from "@/components/shared/button";
import { Bell, Shield, Moon, Lock, Check } from "lucide-react";
import { useState } from "react";

interface ToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

function Toggle({ enabled, onToggle }: ToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${enabled ? 'bg-indigo-500' : 'bg-slate-600'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${enabled ? 'right-1' : 'left-1'}`} />
    </button>
  );
}

export function SettingsSection() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsNotifications: false,
    publicProfile: false,
    showVehicleNumber: true,
    darkMode: true,
    compactView: false,
    twoFactorAuth: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          <span className="animated-gradient-text">Settings</span>
        </h1>
        <p className="text-gray-400 mt-1 text-sm font-medium">
          Customize your experience and manage preferences.
        </p>
      </div>

      <div className="max-w-3xl space-y-5">
        {/* Notifications */}
        <Card className="bg-slate-800/40 border-slate-700/50 rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-11 w-11 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Bell className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-black text-white">Notifications</h3>
                <p className="text-xs text-gray-500 font-medium">Choose what updates you receive.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'pushNotifications' as const, label: 'Push Notifications' },
                { key: 'emailAlerts' as const, label: 'Email Alerts' },
                { key: 'smsNotifications' as const, label: 'SMS Notifications' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                  <span className="font-medium text-gray-300">{label}</span>
                  <Toggle enabled={settings[key]} onToggle={() => toggleSetting(key)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card className="bg-slate-800/40 border-slate-700/50 rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-11 w-11 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-black text-white">Privacy & Security</h3>
                <p className="text-xs text-gray-500 font-medium">Control your data visibility.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'publicProfile' as const, label: 'Public Profile' },
                { key: 'showVehicleNumber' as const, label: 'Show Vehicle Number' },
                { key: 'twoFactorAuth' as const, label: 'Two-Factor Authentication' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                  <span className="font-medium text-gray-300">{label}</span>
                  <Toggle enabled={settings[key]} onToggle={() => toggleSetting(key)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Display */}
        <Card className="bg-slate-800/40 border-slate-700/50 rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-11 w-11 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <Moon className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-black text-white">Display Settings</h3>
                <p className="text-xs text-gray-500 font-medium">Customize how the dashboard looks.</p>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'darkMode' as const, label: 'Dark Mode' },
                { key: 'compactView' as const, label: 'Compact View' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between py-3 border-b border-slate-700/50 last:border-0">
                  <span className="font-medium text-gray-300">{label}</span>
                  <Toggle enabled={settings[key]} onToggle={() => toggleSetting(key)} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="bg-slate-800/40 border-rose-500/20 rounded-2xl overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-center gap-4 mb-5">
              <div className="h-11 w-11 rounded-xl bg-rose-500/20 flex items-center justify-center">
                <Lock className="h-5 w-5 text-rose-400" />
              </div>
              <div>
                <h3 className="font-black text-white">Danger Zone</h3>
                <p className="text-xs text-gray-500 font-medium">Irreversible account actions.</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-gray-300">Delete Account</p>
                <p className="text-xs text-gray-500">Permanently remove your account and data.</p>
              </div>
              <Button variant="outline" className="h-10 rounded-lg font-bold text-rose-400 border-rose-500/30 hover:bg-rose-500/10">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button className="h-12 rounded-xl px-8 font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
            <Check className="h-4 w-4 mr-2" />
            Save All Changes
          </Button>
        </div>
      </div>
    </div>
  );
}