import { createClient } from "@supabase/supabase-js";

// Menggunakan fungsi getSupabase agar inisialisasi tertunda sampai fungsi dipanggil
export function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Fallback string kosong jika variabel belum siap saat build
  return createClient(
    supabaseUrl || "https://nwndwmdqpnvcdcdkzgoq.supabase.co", 
    supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bmR3bWRxcG52Y2RjZGt6Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTQzMjYsImV4cCI6MjA5MjU5MDMyNn0.rqGNpuzmQkE1s3Hld0LAkO2giJP_-exPr8y4trJRHpw"
  );
}
