import { createClient } from "@supabase/supabase-js";

// Ambil dari variabel env Next.js
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 🎯 SOLUSI UTAMA: Jika variabel env kosong (seperti saat robot build berjalan),
// kita langsung suntikkan string URL asli proyek Anda sebagai cadangan aman.
// Ini mencegah SDK Supabase memicu eror "supabaseUrl is required" secara global.
export const supabase = createClient(
  supabaseUrl || "https://nwndwmdqpnvcdcdkzgoq.supabase.co",
    supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53bmR3bWRxcG52Y2RjZGt6Z29xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwMTQzMjYsImV4cCI6MjA5MjU5MDMyNn0.rqGNpuzmQkE1s3Hld0LAkO2giJP_-exPr8y4trJRHpw"
);

// Sediakan fungsi helper untuk berjaga-jaga jika file service Anda memanggil fungsi
export function getSupabase() {
  return supabase;
}
