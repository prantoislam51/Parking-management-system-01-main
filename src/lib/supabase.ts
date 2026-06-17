import { createBrowserClient, createServerClient, isBrowser } from "@supabase/ssr";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

export function createClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

export function createClientForServer(cookies: {
  get: (key: string) => string | undefined;
  set: (key: string, value: string, options: unknown) => void;
  delete: (key: string, options: unknown) => void;
}) {
  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(key: string) {
        return cookies.get(key);
      },
      set(key: string, value: string, options: unknown) {
        cookies.set(key, value, options);
      },
      remove(key: string, options: unknown) {
        cookies.delete(key, options);
      },
    },
  });
}

export const supabase = createClient();