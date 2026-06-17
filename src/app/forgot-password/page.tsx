"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/shared/button";
import { Input } from "@/components/shared/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shared/card";
import { Car, Mail, ArrowLeft, CheckCircle, ShieldQuestion } from "lucide-react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setIsSubmitted(true);
      toast.success("Password reset email sent!");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send reset email";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background relative overflow-hidden">
      {/* Mouse Glow Effect */}
      <div 
        className="mouse-glow hidden lg:block"
        style={{ 
          left: mousePosition.x, 
          top: mousePosition.y 
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-12 font-bold transition-colors group"
        >
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </div>
          Back to login
        </Link>

        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-xl">
            <Car className="h-7 w-7 text-white" />
          </div>
          <span className="text-3xl font-black tracking-tighter">
            Park<span className="text-primary">BD</span>
          </span>
        </div>

        <Card className="glass-card border-none shadow-2xl p-4">
          <CardHeader className="text-center pb-8 space-y-3">
            <div className="h-20 w-20 rounded-[2rem] bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <ShieldQuestion className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tight">Recover Access</CardTitle>
            <p className="text-muted-foreground font-medium">
              {isSubmitted
                ? "Recovery link has been dispatched"
                : "Enter your email to reset your secure password"}
            </p>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center space-y-8 py-4">
                <div className="p-8 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 text-emerald-700">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                    <CheckCircle className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-bold text-lg mb-2">Email Sent!</p>
                  <p className="text-sm font-medium opacity-80 leading-relaxed">
                    We've sent a recovery link to <br/>
                    <strong className="text-emerald-900">{email}</strong>
                  </p>
                </div>
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full h-14 rounded-2xl font-black border-muted-foreground/20">
                    Return to Login
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1 text-muted-foreground">Registered Email</label>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    icon={<Mail className="h-4 w-4 text-primary" />}
                    className="h-14 rounded-2xl bg-white border-muted-foreground/10 focus:border-primary/50 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full h-16 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={isLoading}>
                  {isLoading ? "Processing..." : "Dispatch Reset Link"}
                </Button>

                <p className="text-center text-xs font-bold text-muted-foreground/60 leading-relaxed px-4">
                  For your security, recovery links are valid for 24 hours. Contact support if you face any issues.
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}