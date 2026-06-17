"use client";

import Link from "next/link";
import { Button } from "@/components/shared/button";
import { Card, CardContent } from "@/components/shared/card";
import { Badge } from "@/components/shared/badge";
import {
  MapPin,
  Clock,
  CreditCard,
  Users,
  BarChart3,
  Smartphone,
  Car,
  Bike,
  Truck,
  Bus,
  ChevronRight,
  Zap,
  CheckCircle2,
  Mail,
  Phone,
  Building2,
  MapPinned,
  Smile,
  ArrowRight,
  ParkingCircle,
  Shield,
  Wifi,
  Battery,
  Gauge,
  Star,
  TrendingUp,
} from "lucide-react";
import { useState, useEffect } from "react";

const features = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Real-time Slot Availability",
    description: "Check live parking slot availability across all zones in Bangladesh instantly.",
    color: "primary",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
  },
  {
    icon: <CreditCard className="h-6 w-6" />,
    title: "Online Booking & Payment",
    description: "Book slots and pay securely through bKash, Nagad, or bank transfer.",
    color: "secondary",
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Multi-zone Management",
    description: "Manage multiple parking zones from a single dashboard with ease.",
    color: "accent",
    bg: "bg-rose-500/10",
    text: "text-rose-600",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Role-based Access Control",
    description: "Hierarchical access for Super Admin, Sub Admin, and regular users.",
    color: "info",
    bg: "bg-indigo-500/10",
    text: "text-indigo-600",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Analytics & Reports",
    description: "Comprehensive analytics with exportable reports for better decision-making.",
    color: "warning",
    bg: "bg-amber-500/10",
    text: "text-amber-600",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile-friendly",
    description: "Fully responsive design that works perfectly on all devices.",
    color: "success",
    bg: "bg-cyan-500/10",
    text: "text-cyan-600",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Register Account",
    description: "Create your account with basic information and verify your phone number.",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    step: "02",
    title: "Find a Slot",
    description: "Browse available parking slots by location, type, and price.",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    step: "03",
    title: "Book & Pay",
    description: "Select your slot, choose duration, and complete payment securely.",
    gradient: "from-rose-500 to-pink-600",
  },
  {
    step: "04",
    title: "Park Your Vehicle",
    description: "Use your booking QR code to access the parking slot instantly.",
    gradient: "from-amber-500 to-orange-600",
  },
];

const pricingPlans = [
  {
    type: "Car",
    icon: <Car className="h-8 w-8" />,
    price: "3,000",
    period: "/month",
    features: ["Covered parking", "24/7 access", "Security camera", "CCTV monitoring"],
    popular: false,
    color: "text-blue-600",
    border: "hover:border-blue-500/50",
  },
  {
    type: "Bike",
    icon: <Bike className="h-8 w-8" />,
    price: "500",
    period: "/month",
    features: ["Dedicated bike parking", "Locking facility", "24/7 access", "Secure area"],
    popular: true,
    color: "text-primary",
    border: "border-primary shadow-primary/20 shadow-xl scale-105 z-10",
  },
  {
    type: "Truck",
    icon: <Truck className="h-8 w-8" />,
    price: "8,000",
    period: "/month",
    features: ["Large space", "Loading area", "24/7 access", "Security guard"],
    popular: false,
    color: "text-rose-600",
    border: "hover:border-rose-500/50",
  },
  {
    type: "Bus",
    icon: <Bus className="h-8 w-8" />,
    price: "15,000",
    period: "/month",
    features: ["Dedicated bus lane", "Wide space", "24/7 access", "Security guard"],
    popular: false,
    color: "text-amber-600",
    border: "hover:border-amber-500/50",
  },
];

const stats = [
  { value: "1000+", label: "Parking Slots", trend: { value: 12, isPositive: true } },
  { value: "50+", label: "Active Zones", trend: { value: 8, isPositive: true } },
  { value: "10+", label: "Districts", trend: { value: 5, isPositive: true } },
  { value: "500+", label: "Happy Users", trend: { value: 15, isPositive: true } },
];

const divisions = [
  { name: "Dhaka", zones: 15, color: "bg-blue-500" },
  { name: "Chittagong", zones: 12, color: "bg-emerald-500" },
  { name: "Sylhet", zones: 8, color: "bg-rose-500" },
  { name: "Khulna", zones: 6, color: "bg-amber-500" },
  { name: "Barisal", zones: 5, color: "bg-indigo-500" },
  { name: "Rangpur", zones: 4, color: "bg-cyan-500" },
];


export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Mouse Glow Effect */}
      {mounted && (
        <div 
          className="mouse-glow hidden lg:block"
          style={{ 
            left: mousePosition.x, 
            top: mousePosition.y 
          }}
        />
      )}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800" suppressHydrationWarning>
        <div className="container mx-auto px-4" suppressHydrationWarning>
          <div className="flex h-16 items-center justify-between" suppressHydrationWarning>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-indigo-500/25" suppressHydrationWarning>
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Park<span className="animated-gradient-text">BD</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8" suppressHydrationWarning>
              {["Features", "How It Works", "Coverage", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                  className="text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3" suppressHydrationWarning>
              <Link href="/login">
                <Button variant="ghost" className="text-slate-300 hover:bg-slate-800 hover:text-white">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]" />

        <div className="absolute inset-0 hero-grid opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <Badge className="px-5 py-2.5 text-sm bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-indigo-500/30 text-indigo-300 backdrop-blur-sm shadow-lg shadow-indigo-500/10">
                <Zap className="h-4 w-4 mr-2 fill-indigo-400" />
                Bangladesh&apos;s Premier Parking Solution
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                Smart Parking for a{" "}
                <span className="animated-gradient-text">
                  Faster Nation
                </span>
              </h1>
              <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
                Find, Book, and Manage Parking Slots Across Bangladesh in Seconds. Join the revolution of smart mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 shadow-2xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300 bg-gradient-to-r from-indigo-500 to-purple-600">
                    Book a Slot Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 border-2 border-slate-600 text-gray-300 hover:bg-slate-800/50 hover:border-indigo-500/50 hover:text-white transition-all duration-300 backdrop-blur-sm">
                    Manage Your Zone
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-6 border-t border-slate-700">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-4 border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg ring-2 ring-slate-800"
                    >
                      U{i}
                    </div>
                  ))}
                  <div className="h-12 w-12 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center text-xs font-bold text-gray-400 ring-2 ring-slate-800">
                    +500
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg text-white">500+ Active Users</p>
                  <p className="text-sm text-gray-400">Trusted by commuters nationwide</p>
                </div>
              </div>
            </div>

            {/* 3D Car Showcase */}
            <div className="relative group car-showcase">
              <div className="relative z-10 car-3d animate-car-float">
                {/* Main car display card */}
                <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/80 to-slate-800/90 backdrop-blur-xl rounded-[3rem] p-10 border border-slate-600/50 shadow-2xl shadow-indigo-500/10">
                  {/* Car Illustration */}
                  <div className="relative">
                    {/* Car body */}
                    <div className="relative mx-auto w-full max-w-md">
                      {/* Top part of car */}
                      <div className="bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-700 rounded-t-[3rem] h-24 mx-4 relative shadow-lg">
                        {/* Windows */}
                        <div className="absolute inset-x-8 top-3 bottom-8 bg-slate-900/60 rounded-xl flex items-center justify-center gap-2">
                          <div className="w-20 h-8 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg" />
                          <div className="w-16 h-8 bg-gradient-to-b from-slate-800 to-slate-900 rounded-lg" />
                        </div>
                        {/* Roof lights */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-2 bg-indigo-400/30 rounded-full blur-sm" />
                      </div>

                      {/* Body of car */}
                      <div className="bg-gradient-to-b from-indigo-600 via-indigo-500 to-indigo-800 h-16 mx-2 relative shadow-xl">
                        {/* Side windows */}
                        <div className="absolute top-2 left-4 right-4 h-10 bg-slate-900/50 rounded-lg" />
                        {/* Door lines */}
                        <div className="absolute top-0 bottom-0 w-px bg-indigo-400/30 left-1/3" />
                        <div className="absolute top-0 bottom-0 w-px bg-indigo-400/30 left-2/3" />
                      </div>

                      {/* Bottom part */}
                      <div className="bg-gradient-to-b from-slate-800 to-slate-900 h-8 mx-0 relative rounded-b-xl">
                        {/* Wheels */}
                        <div className="absolute -bottom-2 left-8 w-14 h-14 bg-slate-700 rounded-full border-4 border-slate-600 shadow-lg">
                          <div className="absolute inset-2 bg-slate-800 rounded-full border-2 border-slate-500" />
                        </div>
                        <div className="absolute -bottom-2 right-8 w-14 h-14 bg-slate-700 rounded-full border-4 border-slate-600 shadow-lg">
                          <div className="absolute inset-2 bg-slate-800 rounded-full border-2 border-slate-500" />
                        </div>
                        {/* Headlights */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-white rounded-l-lg car-headlight" />
                        {/* Taillights */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-6 bg-red-500 rounded-r-lg car-taillight" />
                      </div>
                    </div>

                    {/* Car details badges */}
                    <div className="flex justify-center gap-6 mt-8">
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-600">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        <span className="text-xs font-medium text-gray-300">Secure</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-600">
                        <Wifi className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-medium text-gray-300">Smart</span>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 rounded-full border border-slate-600">
                        <Battery className="h-4 w-4 text-amber-400" />
                        <span className="text-xs font-medium text-gray-300">Eco</span>
                      </div>
                    </div>
                  </div>

                  {/* Live stats */}
                  <div className="mt-8 pt-6 border-t border-slate-700">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-widest">Live Availability</p>
                        <p className="text-3xl font-bold text-white mt-1">247 <span className="text-lg font-normal text-gray-400">Slots</span></p>
                      </div>
                      <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-2 rounded-full font-bold text-sm">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        LIVE
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Occupancy Rate</span>
                        <span className="font-bold text-indigo-400">67%</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                          style={{ width: "67%" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effects */}
                <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-500/30 rounded-full blur-[100px] animate-pulse" />
              </div>

              {/* Floating stats cards around car */}
              <div className="absolute -left-8 top-1/4 glass-card p-4 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-500/20 rounded-xl">
                    <ParkingCircle className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Available</p>
                    <p className="text-lg font-bold text-white">183</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 bottom-1/3 glass-card p-4 rounded-2xl border border-slate-700/50 hover:border-purple-500/50 hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/20 rounded-xl">
                    <Gauge className="h-5 w-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Avg. Time</p>
                    <p className="text-lg font-bold text-white">2min</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-y border-slate-700 relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px]" />

        {/* Animated gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className={`relative group p-6 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                index === 0
                  ? 'bg-gradient-to-b from-blue-600/20 to-slate-800/80 border border-blue-500/20 hover:border-blue-400/40'
                  : index === 1
                  ? 'bg-gradient-to-b from-emerald-600/20 to-slate-800/80 border border-emerald-500/20 hover:border-emerald-400/40'
                  : index === 2
                  ? 'bg-gradient-to-b from-rose-600/20 to-slate-800/80 border border-rose-500/20 hover:border-rose-400/40'
                  : 'bg-gradient-to-b from-amber-600/20 to-slate-800/80 border border-amber-500/20 hover:border-amber-400/40'
              }`}>
                {/* Glow effect */}
                <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  index === 0 ? 'bg-blue-500 blur-md' : index === 1 ? 'bg-emerald-500 blur-md' : index === 2 ? 'bg-rose-500 blur-md' : 'bg-amber-500 blur-md'
                }`} />

                <div className="flex items-start justify-between relative">
                  <div className="space-y-3">
                    <p className={`text-sm font-semibold uppercase tracking-wider ${
                      index === 0 ? 'text-blue-400' : index === 1 ? 'text-emerald-400' : index === 2 ? 'text-rose-400' : 'text-amber-400'
                    }`}>{stat.label}</p>
                    <p className="text-4xl font-extrabold text-white">{stat.value}</p>
                    {stat.trend && (
                      <div className="flex items-center gap-2">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                          stat.trend.isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          <TrendingUp className={`h-3 w-3 ${!stat.trend.isPositive ? 'rotate-180' : ''}`} />
                          {stat.trend.value}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl transition-all duration-500 group-hover:scale-110 ${
                    index === 0
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                      : index === 1
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                      : index === 2
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30'
                      : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30'
                  }`}>
                    {[<Car className="h-6 w-6 text-white" />, <Building2 className="h-6 w-6 text-white" />, <MapPinned className="h-6 w-6 text-white" />, <Smile className="h-6 w-6 text-white" />][index]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Background orbs */}
        <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">Powerful Core</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Everything You Need for <span className="text-white">Smart Parking</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Our platform provides comprehensive tools for managing and using parking facilities across Bangladesh.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-3 ${
                  index === 0
                    ? 'bg-gradient-to-b from-blue-600/15 to-slate-800/80 border border-blue-500/20 hover:border-blue-400/40'
                    : index === 1
                    ? 'bg-gradient-to-b from-emerald-600/15 to-slate-800/80 border border-emerald-500/20 hover:border-emerald-400/40'
                    : index === 2
                    ? 'bg-gradient-to-b from-rose-600/15 to-slate-800/80 border border-rose-500/20 hover:border-rose-400/40'
                    : index === 3
                    ? 'bg-gradient-to-b from-indigo-600/15 to-slate-800/80 border border-indigo-500/20 hover:border-indigo-400/40'
                    : index === 4
                    ? 'bg-gradient-to-b from-amber-600/15 to-slate-800/80 border border-amber-500/20 hover:border-amber-400/40'
                    : 'bg-gradient-to-b from-cyan-600/15 to-slate-800/80 border border-cyan-500/20 hover:border-cyan-400/40'
                }`}>
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                    index === 0 ? 'bg-blue-500 blur-md' : index === 1 ? 'bg-emerald-500 blur-md' : index === 2 ? 'bg-rose-500 blur-md' : index === 3 ? 'bg-indigo-500 blur-md' : index === 4 ? 'bg-amber-500 blur-md' : 'bg-cyan-500 blur-md'
                  }`} />

                  {/* Icon */}
                  <div className={`h-16 w-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                    index === 0
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                      : index === 1
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                      : index === 2
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30'
                      : index === 3
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
                      : index === 4
                      ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30'
                      : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                  }`}>
                    {feature.icon}
                  </div>

                  <div className="space-y-3 relative z-10">
                    <h3 className={`text-xl font-bold transition-colors ${
                      index === 0 ? 'text-blue-400 group-hover:text-blue-300' :
                      index === 1 ? 'text-emerald-400 group-hover:text-emerald-300' :
                      index === 2 ? 'text-rose-400 group-hover:text-rose-300' :
                      index === 3 ? 'text-indigo-400 group-hover:text-indigo-300' :
                      index === 4 ? 'text-amber-400 group-hover:text-amber-300' :
                      'text-cyan-400 group-hover:text-cyan-300'
                    }`}>{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                  </div>

                  <div className={`pt-4 border-t border-slate-700 flex items-center text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 ${
                    index === 0 ? 'text-blue-400' : index === 1 ? 'text-emerald-400' : index === 2 ? 'text-rose-400' : index === 3 ? 'text-indigo-400' : index === 4 ? 'text-amber-400' : 'text-cyan-400'
                  }`}>
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 relative">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-sm">Seamless Process</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Simple Steps to <span className="text-emerald-400">Get Started</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Join our platform in minutes and start your stress-free parking journey.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative group">
                {/* Card with gradient based on index */}
                <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-3 ${
                  index === 0
                    ? 'bg-gradient-to-b from-blue-600/20 to-slate-800/80 border border-blue-500/20 hover:border-blue-400/40'
                    : index === 1
                    ? 'bg-gradient-to-b from-emerald-600/20 to-slate-800/80 border border-emerald-500/20 hover:border-emerald-400/40'
                    : index === 2
                    ? 'bg-gradient-to-b from-rose-600/20 to-slate-800/80 border border-rose-500/20 hover:border-rose-400/40'
                    : 'bg-gradient-to-b from-amber-600/20 to-slate-800/80 border border-amber-500/20 hover:border-amber-400/40'
                }`}>
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                    index === 0 ? 'bg-blue-500 blur-md' : index === 1 ? 'bg-emerald-500 blur-md' : index === 2 ? 'bg-rose-500 blur-md' : 'bg-amber-500 blur-md'
                  }`} />

                  {/* Step number with gradient */}
                  <div className={`text-8xl font-black bg-clip-text text-transparent bg-linear-to-br ${step.gradient} opacity-15 mb-6 group-hover:opacity-30 transition-all duration-500 group-hover:scale-110`}>
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    index === 0
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                      : index === 1
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                      : index === 2
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30'
                      : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30'
                  }`}>
                    {index === 0 ? <Users className="h-7 w-7 text-white" /> :
                     index === 1 ? <MapPin className="h-7 w-7 text-white" /> :
                     index === 2 ? <CreditCard className="h-7 w-7 text-white" /> :
                     <Car className="h-7 w-7 text-white" />}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors">{step.description}</p>

                  {/* Progress bar */}
                  <div className={`h-1.5 w-16 rounded-full bg-linear-to-r ${step.gradient}`} />
                </div>

                {/* Arrow connector */}
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                      index === 0
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : index === 1
                        ? 'bg-emerald-500/20 border border-emerald-500/30'
                        : 'bg-rose-500/20 border border-rose-500/30'
                    }`}>
                      <ArrowRight className={`h-5 w-5 ${
                        index === 0 ? 'text-blue-400' : index === 1 ? 'text-emerald-400' : 'text-rose-400'
                      }`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section id="coverage" className="py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border border-rose-500/30 backdrop-blur-sm">Nationwide Network</Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Present Across <span className="text-rose-400">Bangladesh</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Expanding rapidly to provide secure parking in every corner of the country.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {divisions.map((division, index) => (
              <div key={index} className="relative group">
                {/* Card */}
                <div className={`relative p-6 rounded-3xl flex items-center justify-between transition-all duration-500 hover:-translate-y-3 ${
                  index === 0
                    ? 'bg-gradient-to-b from-blue-600/15 to-slate-800/80 border border-blue-500/20 hover:border-blue-400/40'
                    : index === 1
                    ? 'bg-gradient-to-b from-emerald-600/15 to-slate-800/80 border border-emerald-500/20 hover:border-emerald-400/40'
                    : index === 2
                    ? 'bg-gradient-to-b from-rose-600/15 to-slate-800/80 border border-rose-500/20 hover:border-rose-400/40'
                    : index === 3
                    ? 'bg-gradient-to-b from-amber-600/15 to-slate-800/80 border border-amber-500/20 hover:border-amber-400/40'
                    : index === 4
                    ? 'bg-gradient-to-b from-indigo-600/15 to-slate-800/80 border border-indigo-500/20 hover:border-indigo-400/40'
                    : 'bg-gradient-to-b from-cyan-600/15 to-slate-800/80 border border-cyan-500/20 hover:border-cyan-400/40'
                }`}>
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                    index === 0 ? 'bg-blue-500 blur-md' : index === 1 ? 'bg-emerald-500 blur-md' : index === 2 ? 'bg-rose-500 blur-md' : index === 3 ? 'bg-amber-500 blur-md' : index === 4 ? 'bg-indigo-500 blur-md' : 'bg-cyan-500 blur-md'
                  }`} />

                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                      index === 0
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30'
                        : index === 1
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30'
                        : index === 2
                        ? 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg shadow-rose-500/30'
                        : index === 3
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30'
                        : index === 4
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30'
                        : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                    }`}>
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{division.name}</h3>
                      <p className="text-sm text-gray-400 font-medium">{division.zones} active zones</p>
                    </div>
                  </div>
                  <div className={`h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 ${
                    index === 0
                      ? 'bg-blue-500/20'
                      : index === 1
                      ? 'bg-emerald-500/20'
                      : index === 2
                      ? 'bg-rose-500/20'
                      : index === 3
                      ? 'bg-amber-500/20'
                      : index === 4
                      ? 'bg-indigo-500/20'
                      : 'bg-cyan-500/20'
                  }`}>
                    <ArrowRight className={`h-5 w-5 ${
                      index === 0 ? 'text-blue-400' : index === 1 ? 'text-emerald-400' : index === 2 ? 'text-rose-400' : index === 3 ? 'text-amber-400' : index === 4 ? 'text-indigo-400' : 'text-cyan-400'
                    }`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-slate-800/50 relative">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm">Fair Pricing</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Choose the Right <span className="text-white">Plan</span> for You
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg">
              Affordable and transparent pricing for all vehicle types.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? 'scale-105 z-10' : ''}`}
              >
                {/* 3D Card Effect */}
                <div
                  className={`relative p-8 pt-16 rounded-3xl transition-all duration-500 preserve-3d group-hover:rotate-x-2 group-hover:-translate-y-4 ${
                    plan.popular
                      ? 'bg-gradient-to-b from-indigo-600 via-purple-600 to-indigo-800 border-2 border-purple-400/30 shadow-xl shadow-purple-500/20'
                      : index === 0
                      ? 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-600/30 group-hover:border-blue-400/40'
                      : index === 2
                      ? 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-600/30 group-hover:border-rose-400/40'
                      : 'bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-600/30 group-hover:border-amber-400/40'
                  }`}
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 rounded-3xl transition-opacity duration-500 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100'
                      : index === 0
                      ? 'bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100'
                      : index === 2
                      ? 'bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100'
                  }" />

                  {/* Subtle glow effect behind - reduced intensity */}
                  <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                    plan.popular ? 'bg-purple-500 blur-lg' : index === 0 ? 'bg-blue-500 blur-lg' : index === 2 ? 'bg-rose-500 blur-lg' : 'bg-amber-500 blur-lg'
                  }`} />

                  {plan.popular && (
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2 rounded-full shadow-lg shadow-orange-500/50 flex items-center gap-2 whitespace-nowrap">
                        <Star className="h-3 w-3 fill-white" />
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Icon with glow */}
                  <div className={`relative mb-8`}>
                    <div className={`h-20 w-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${
                      plan.popular
                        ? 'bg-gradient-to-br from-purple-400 to-pink-500 shadow-lg shadow-purple-500/50'
                        : index === 0
                        ? 'bg-gradient-to-br from-blue-400 to-cyan-500 shadow-lg shadow-blue-500/50'
                        : index === 2
                        ? 'bg-gradient-to-br from-rose-400 to-red-500 shadow-lg shadow-rose-500/50'
                        : 'bg-gradient-to-br from-amber-400 to-yellow-500 shadow-lg shadow-amber-500/50'
                    }`}>
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 text-center drop-shadow-sm">{plan.type}</h3>

                  <div className="flex items-baseline justify-center gap-1 mb-8">
                    <span className="text-5xl font-black tracking-tight text-white">
                      ৳{plan.price}
                    </span>
                    <span className="text-gray-400 font-medium">{plan.period}</span>
                  </div>

                  {/* Features with hover effect */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
                        <div className={`mr-3 rounded-full p-1 ${
                          plan.popular
                            ? 'bg-purple-500/50 text-purple-200'
                            : index === 0
                            ? 'bg-blue-500/50 text-blue-200'
                            : index === 2
                            ? 'bg-rose-500/50 text-rose-200'
                            : 'bg-amber-500/50 text-amber-200'
                        }`}>
                          <CheckCircle2 className="h-3 w-3" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Button with 3D effect */}
                  <button className={`w-full h-14 rounded-2xl font-bold text-lg transition-all duration-300 preserve-3d group-hover:translate-y-[-4px] ${
                    plan.popular
                      ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50'
                      : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-white/40'
                  }`}>
                    Select {plan.type}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Background orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-sm">User Testimonials</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 tracking-tight">Trusted by <span className="text-amber-400">Thousands</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Arifur Rahman", role: "Daily Commuter", quote: "ParkBD has completely changed my morning routine. I no longer worry about finding a spot in Motijheel." },
              { name: "Sarah Islam", role: "Business Owner", quote: "Managing my building&apos;s parking has never been easier. The sub-admin dashboard is a lifesaver." },
              { name: "Tanvir Ahmed", role: "App User", quote: "The real-time availability feature is incredibly accurate. Best utility app in Bangladesh!" }
            ].map((t, i) => (
              <div key={i} className="relative group">
                {/* Card */}
                <div className={`relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-3 ${
                  i === 0
                    ? 'bg-gradient-to-b from-amber-600/15 to-slate-800/80 border border-amber-500/20 hover:border-amber-400/40'
                    : i === 1
                    ? 'bg-gradient-to-b from-orange-600/15 to-slate-800/80 border border-orange-500/20 hover:border-orange-400/40'
                    : 'bg-gradient-to-b from-yellow-600/15 to-slate-800/80 border border-yellow-500/20 hover:border-yellow-400/40'
                }`}>
                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                    i === 0 ? 'bg-amber-500 blur-md' : i === 1 ? 'bg-orange-500 blur-md' : 'bg-yellow-500 blur-md'
                  }`} />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`h-5 w-5 ${
                        i === 0 ? 'text-amber-400' : i === 1 ? 'text-orange-400' : 'text-yellow-400'
                      } fill-current`} />
                    ))}
                  </div>

                  <p className="text-lg font-medium text-gray-300 italic mb-8 relative z-10">&quot;{t.quote}&quot;</p>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`h-14 w-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl ${
                      i === 0
                        ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30'
                        : i === 1
                        ? 'bg-gradient-to-br from-orange-500 to-red-600 shadow-lg shadow-orange-500/30'
                        : 'bg-gradient-to-br from-yellow-500 to-amber-600 shadow-lg shadow-yellow-500/30'
                    }`}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg">{t.name}</p>
                      <p className="text-sm text-gray-400 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-20 overflow-hidden relative">
        {/* Gradient line at top */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

        {/* Glow effects */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center transition-transform group-hover:rotate-12 shadow-lg shadow-indigo-500/25">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight">
                  Park<span className="animated-gradient-text">BD</span>
                </span>
              </Link>
              <p className="text-slate-400 leading-relaxed font-medium">
                Pioneering smart parking solutions for a sustainable and faster Bangladesh.
              </p>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500 hover:text-white transition-all duration-300">
                    <span className="text-xs font-bold uppercase">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-4">
                {["Features", "How It Works", "Coverage", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-slate-400 hover:text-indigo-400 transition-colors font-medium hover:translate-x-1 inline-block">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-400 font-medium hover:text-indigo-400 transition-colors">
                  <Mail className="h-5 w-5 text-indigo-400" />
                  info@parkbd.com
                </li>
                <li className="flex items-center gap-3 text-slate-400 font-medium hover:text-indigo-400 transition-colors">
                  <Phone className="h-5 w-5 text-indigo-400" />
                  +880 1XXX XXXXXX
                </li>
                <li className="flex items-center gap-3 text-slate-400 font-medium hover:text-indigo-400 transition-colors">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  Dhaka, Bangladesh
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-slate-400 mb-6 font-medium">Subscribe for updates and news.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder:text-slate-500"
                />
                <Button className="rounded-xl px-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-slate-800 pt-12">
            <p className="text-slate-400 text-sm font-medium">© 2026 ParkBD. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Terms of Service</Link>
              <Link href="#" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Cookies Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}