"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import { mockSuperAdmin, mockSubAdmins, mockUsers } from "@/lib/data";
import { useUserStore } from "@/lib/store";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Car, Eye, EyeOff, Mail, Lock, Users, Zap, ShieldCheck, CheckCircle2 } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { isDemoMode, setDemoMode } = useDemoModeStore();
  const { setUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleDemoLogin = (role: "super_admin" | "sub_admin" | "user", index: number = 0) => {
    setDemoMode(true);
    if (role === "super_admin") {
      setUser(mockSuperAdmin as never);
      router.push("/super-admin/dashboard");
    } else if (role === "sub_admin") {
      const subAdmin = mockSubAdmins[index] || mockSubAdmins[0];
      setUser(subAdmin as never);
      router.push("/sub-admin/dashboard");
    } else {
      const user = mockUsers[index] || mockUsers[0];
      setUser(user as never);
      router.push("/user/dashboard");
    }
    toast.success("Demo mode activated!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        toast.success("Login successful!");

        const profileRole = (profile as unknown as { role: string })?.role;
        if (profileRole === "super_admin") {
          router.push("/super-admin/dashboard");
        } else if (profileRole === "sub_admin") {
          router.push("/sub-admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Background orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />

      {/* Mouse Glow Effect */}
      <div
        className="mouse-glow hidden lg:block"
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />

      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-b from-slate-800/80 to-slate-900/80 relative overflow-hidden border-r border-slate-700">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-8 text-white space-y-6">
          <div className="animate-float">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/30">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-black tracking-tighter">
              Welcome to Park<span className="animated-gradient-text">BD</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-sm font-medium">
              Join thousands of users managing parking slots across Bangladesh with our state-of-the-art platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <p className="text-2xl font-black mb-1">1000+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Parking Slots</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <p className="text-2xl font-black mb-1">50+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Active Zones</p>
            </div>
          </div>

          <div className="space-y-2 w-full max-w-xs">
            {[
              { feature: "Real-time slot tracking", color: "from-blue-500 to-cyan-500" },
              { feature: "Secure digital payments", color: "from-emerald-500 to-teal-500" },
              { feature: "24/7 Premium support", color: "from-purple-500 to-pink-500" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 group">
                <div className={`h-6 w-6 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-105 transition-all`}>
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-400">{item.feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold tracking-widest uppercase">
            <ShieldCheck className="h-3 w-3 text-indigo-400" />
            Secured by enterprise encryption
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-6 relative z-10">
        {/* Form background orbs */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-[60px]" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px]" />

        <div className="w-full max-w-lg">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <Car className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              Park<span className="animated-gradient-text">BD</span>
            </span>
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <div className="relative rounded-2xl p-5 bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-slate-800/60 border border-slate-600/30 shadow-xl shadow-indigo-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
              <CardHeader className="text-center pb-4 border-b border-slate-700/50 relative z-10">
                <CardTitle className="text-2xl font-black tracking-tight text-white">Welcome Back</CardTitle>
                <p className="text-xs text-gray-400">
                  Enter your credentials to access your dashboard
                </p>
              </CardHeader>
              <CardContent className="relative z-10 space-y-4">
                {/* Demo Login Buttons */}
                <div className="p-3 rounded-xl bg-slate-800/30 border border-slate-600/30">
                  <p className="text-[10px] font-bold mb-3 text-center uppercase tracking-wider text-gray-500">Quick Access</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { role: "super_admin", label: "Super", gradient: "from-indigo-500 to-purple-600" },
                      { role: "sub_admin", label: "Admin", gradient: "from-blue-500 to-cyan-500" },
                      { role: "user", label: "User", gradient: "from-emerald-500 to-teal-500" }
                    ].map((btn) => (
                      <button
                        key={btn.role}
                        onClick={() => handleDemoLogin(btn.role as any)}
                        className="flex flex-col items-center gap-1.5 group p-2 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${btn.gradient} text-white flex items-center justify-center shadow-md transition-transform group-hover:scale-105 group-hover:rotate-3`}>
                          <Users className="h-4 w-4" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{btn.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-wider font-bold text-gray-500">
                    <span className="bg-slate-900/80 px-3">Or Secure Login</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Email Address</label>
                    <Input
                      type="email"
                      placeholder="name@example.com"
                      icon={<Mail className="h-3.5 w-3.5 text-indigo-400" />}
                      className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center ml-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Password</label>
                      <Link
                        href="/forgot-password"
                        className="text-[10px] font-bold text-indigo-400 hover:underline"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        icon={<Lock className="h-3.5 w-3.5 text-indigo-400" />}
                        className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full h-11 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Access Dashboard"}
                  </Button>
                </form>

                <div className="text-center pt-1">
                  <p className="text-gray-500 text-xs font-medium">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-indigo-400 hover:underline font-bold">
                      Create One Now
                    </Link>
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}