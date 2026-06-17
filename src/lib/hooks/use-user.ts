"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useUserStore } from "@/lib/store";
import { useDemoModeStore } from "@/lib/data/use-mock-data";
import {
  mockSuperAdmin,
  mockSubAdmins,
  mockUsers,
} from "@/lib/data";
import type { Profile } from "@/lib/types";
import { useRouter, usePathname } from "next/navigation";

export function useUser() {
  const { user, setUser, setLoading, logout } = useUserStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isInitializing, setIsInitializing] = useState(true);
  const { isDemoMode } = useDemoModeStore();

  // Demo mode - use mock user
  useEffect(() => {
    if (isDemoMode) {
      // If a user is already set in the store, keep it
      if (!user) {
        // Otherwise, set a default mock user based on the current path
        let defaultUser: Profile = mockSuperAdmin as Profile;
        if (pathname.startsWith("/super-admin")) {
          defaultUser = mockSuperAdmin as Profile;
        } else if (pathname.startsWith("/sub-admin")) {
          defaultUser = mockSubAdmins[0] as Profile;
        } else if (pathname.startsWith("/user")) {
          defaultUser = mockUsers[0] as Profile;
        }
        setUser(defaultUser);
      }
      
      // Use a small delay to avoid synchronous state update warning
      const timer = setTimeout(() => {
        setIsInitializing(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isDemoMode, setUser, pathname, user]);

  // Real Supabase mode
  useEffect(() => {
    if (isDemoMode) return;

    const supabase = createClient();

    const getUser = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser();

        if (authUser) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", authUser.id)
            .single();

          if (profile) {
            setUser(profile as Profile);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      } finally {
        setLoading(false);
        setIsInitializing(false);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (profile) {
          setUser(profile as Profile);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isDemoMode, setUser, setLoading]);

  const signOut = () => {
    logout();
    router.push("/login");
  };

  return { user, isLoading: isInitializing, signOut };
}

export function useAuth(requiredRole?: string) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip in demo mode or if user is loaded from demo
    if (isLoading) return;

    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (user.role === "super_admin") {
        router.push("/super-admin/dashboard");
      } else if (user.role === "sub_admin") {
        router.push("/sub-admin/dashboard");
      } else {
        router.push("/user/dashboard");
      }
    }
  }, [user, isLoading, router, pathname, requiredRole]);

  return { user, isLoading };
}

export function useRealtimeSubscription(
  table: string,
  callback: (payload: unknown) => void,
  filter?: { column: string; value: string }
) {
  const { isDemoMode } = useDemoModeStore();

  useEffect(() => {
    if (isDemoMode) return; // No real-time in demo mode

    const supabase = createClient();

    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: table,
          filter: filter ? `${filter.column}=eq.${filter.value}` : undefined,
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, filter, callback, isDemoMode]);
}

// Hook to switch between demo users
export function useSwitchDemoUser() {
  const { setUser } = useUserStore();
  const router = useRouter();

  const switchToSuperAdmin = () => {
    setUser(mockSuperAdmin as Profile);
    router.push("/super-admin/dashboard");
  };

  const switchToSubAdmin = (index: number = 0) => {
    const subAdmin = mockSubAdmins[index] || mockSubAdmins[0];
    setUser(subAdmin as Profile);
    router.push("/sub-admin/dashboard");
  };

  const switchToUser = (index: number = 0) => {
    const user = mockUsers[index] || mockUsers[0];
    setUser(user as Profile);
    router.push("/user/dashboard");
  };

  return { switchToSuperAdmin, switchToSubAdmin, switchToUser };
}