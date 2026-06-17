"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import { 
  Car, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  CheckCircle2,
  Building2,
  Gamepad2 as SteeringWheel
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Identity", icon: User, description: "Who are you?" },
  { id: 2, title: "Credentials", icon: Mail, description: "Secure access" },
  { id: 3, title: "Verification", icon: ShieldCheck, description: "Final details" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    userType: "driver" as "driver" | "owner",
    address: "",
    nidNumber: "",
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      return (
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.phone.trim() !== ""
      );
    }
    if (step === 2) {
      return (
        formData.username.trim() !== "" &&
        formData.password.length >= 6 &&
        formData.password === formData.confirmPassword
      );
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert(
          {
            id: authData.user.id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            username: formData.username,
            email: formData.email,
            phone: formData.phone,
            address: formData.address || null,
            nid_number: formData.nidNumber || null,
            user_type: formData.userType,
            role: "user",
          } as never
        );

        if (profileError) {
          throw profileError;
        }

        toast.success("Registration successful! Please check your email to verify.");
        router.push("/login");
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed";
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
              Join Park<span className="animated-gradient-text">BD</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-sm font-medium">
              Start your journey today. Find the perfect slot or manage your own parking zone with ease.
            </p>
          </div>

          <div className="space-y-3 w-full max-w-xs">
            {[
              { feature: "Real-time slot tracking", color: "from-blue-500 to-cyan-500" },
              { feature: "Secure digital payments", color: "from-emerald-500 to-teal-500" },
              { feature: "24/7 Premium support", color: "from-purple-500 to-pink-500" },
              { feature: "Verified parking zones", color: "from-amber-500 to-orange-500" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-105 transition-all`}>
                  <CheckCircle2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-300">{item.feature}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gray-500 text-xs font-bold tracking-widest uppercase">
            <ShieldCheck className="h-3 w-3 text-indigo-400" />
            Trusted by 500+ users
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

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8 px-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative group">
                <div
                  className={cn(
                    "flex items-center justify-center h-10 w-10 rounded-xl transition-all duration-300 z-10",
                    currentStep >= step.id
                      ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                      : "bg-slate-700 text-gray-400"
                  )}
                >
                  <step.icon className="h-4 w-4" />
                </div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-wider",
                    currentStep >= step.id ? "text-indigo-400" : "text-gray-500"
                  )}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "hidden sm:block absolute top-5 left-[calc(100%+0.25rem)] w-[calc(200%-3rem)] h-0.5 rounded-full",
                      currentStep > step.id ? "bg-gradient-to-r from-indigo-500 to-purple-600" : "bg-slate-600"
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          <Card className="border-none shadow-none bg-transparent">
            <div className="relative rounded-2xl p-5 bg-gradient-to-br from-slate-800/60 via-slate-900/80 to-slate-800/60 border border-slate-600/30 shadow-xl shadow-indigo-500/10 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5" />
              <CardHeader className="text-center pb-4 border-b border-slate-700/50 relative z-10">
                <CardTitle className="text-2xl font-black tracking-tight text-white">
                  {currentStep === 1 && "Start Your Profile"}
                  {currentStep === 2 && "Secure Your Account"}
                  {currentStep === 3 && "Almost There!"}
                </CardTitle>
                <p className="text-xs text-gray-400">
                  Please fill in the details below to proceed
                </p>
              </CardHeader>
              <CardContent className="relative z-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {currentStep === 1 && (
                    <div className="space-y-4 animate-in slide-in-from-right duration-500">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">First Name</label>
                          <Input
                            placeholder="John"
                            icon={<User className="h-3.5 w-3.5 text-indigo-400" />}
                            className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Last Name</label>
                          <Input
                            placeholder="Doe"
                            className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Email Address</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
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
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="01XXXXXXXXX"
                          icon={<Phone className="h-3.5 w-3.5 text-indigo-400" />}
                          className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-4 animate-in slide-in-from-right duration-500">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Choose Username</label>
                        <Input
                          placeholder="johndoe_123"
                          icon={<User className="h-3.5 w-3.5 text-indigo-400" />}
                          className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                          value={formData.username}
                          onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Password</label>
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
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Confirm Password</label>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          icon={<Lock className="h-3.5 w-3.5 text-indigo-400" />}
                          className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                          value={formData.confirmPassword}
                          onChange={(e) =>
                            setFormData({ ...formData, confirmPassword: e.target.value })
                          }
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Who are you?</label>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { id: 'driver', label: 'Driver', icon: SteeringWheel, desc: 'I want to park', gradient: 'from-blue-500 to-cyan-500' },
                            { id: 'owner', label: 'Zone Owner', icon: Building2, desc: 'I have slots', gradient: 'from-purple-500 to-pink-500' }
                          ].map((type) => (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, userType: type.id as any })}
                              className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-300",
                                formData.userType === type.id
                                  ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                                  : "border-slate-600 bg-slate-800/50 hover:border-indigo-500/50"
                              )}
                            >
                              <div className={cn(
                                "h-9 w-9 rounded-lg flex items-center justify-center transition-transform",
                                formData.userType === type.id ? `bg-gradient-to-br ${type.gradient} text-white rotate-3` : "bg-slate-700 text-gray-400"
                              )}>
                                <type.icon className="h-4 w-4" />
                              </div>
                              <div className="text-center">
                                <p className="text-xs font-bold uppercase tracking-wider text-white">{type.label}</p>
                                <p className="text-[9px] font-medium text-gray-500">{type.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-4 animate-in slide-in-from-right duration-500">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">Physical Address</label>
                        <Input
                          placeholder="House #, Road #, Area, City"
                          icon={<MapPin className="h-3.5 w-3.5 text-indigo-400" />}
                          className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider ml-1 text-gray-400">NID Number</label>
                        <Input
                          placeholder="Enter 10 or 13 digit NID"
                          icon={<FileText className="h-3.5 w-3.5 text-indigo-400" />}
                          className="h-11 rounded-xl bg-slate-800/50 border-slate-600/50 text-white placeholder:text-gray-500 text-sm"
                          value={formData.nidNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, nidNumber: e.target.value })
                          }
                        />
                      </div>
                      <div className="p-3 bg-slate-800/30 rounded-xl border border-indigo-500/20 flex items-start gap-3">
                        <div className="h-7 w-7 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <p className="text-[10px] font-medium text-gray-400 leading-tight">
                          By clicking "Create Account", you agree to our <span className="text-indigo-400 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-indigo-400 cursor-pointer hover:underline">Privacy Policy</span>.
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 pt-3">
                    {currentStep > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="h-11 flex-1 rounded-xl font-bold text-sm border-slate-600 text-gray-300 hover:bg-slate-800 hover:border-indigo-500"
                      >
                        <ChevronLeft className="mr-1.5 h-4 w-4" />
                        Back
                      </Button>
                    )}
                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="h-11 flex-1 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                      >
                        Continue
                        <ChevronRight className="ml-1.5 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="h-11 flex-1 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating..." : "Create Account"}
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-gray-500 text-xs font-medium">
                    Already have an account?{" "}
                    <Link href="/login" className="text-indigo-400 hover:underline font-bold">
                      Sign In Here
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