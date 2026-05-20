import { createClient } from "@supabase/supabase-js";

// Menggunakan fungsi getSupabase agar inisialisasi tertunda sampai fungsi dipanggil
export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fallback string kosong jika variabel belum siap saat build
  return createClient(
    supabaseUrl || "https://supabase.co", 
    supabaseAnonKey || "placeholder-key"
  );
}
