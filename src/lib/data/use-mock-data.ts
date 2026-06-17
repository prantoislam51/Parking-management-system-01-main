import { create } from "zustand";

// Toggle for demo mode - set to true when no database is connected
interface DemoModeState {
  isDemoMode: boolean;
  setDemoMode: (value: boolean) => void;
}

export const useDemoModeStore = create<DemoModeState>((set) => ({
  isDemoMode: true, // Default to demo mode
  setDemoMode: (value) => set({ isDemoMode: value }),
}));

// Check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && key && url !== "https://placeholder.supabase.co");
}