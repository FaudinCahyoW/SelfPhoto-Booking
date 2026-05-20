// Ubah impor ke getSupabase fungsi helper baru
import { getSupabase } from "@/lib/supabase"; 
import type { Bookings, BookingWithService } from "../types/bookingsType";

// =========================
// CREATE BOOKING
// =========================
export async function createBooking(
  payload: Omit<Bookings, "created_at" | "updated_at">
): Promise<BookingWithService> {
  // Panggil client di dalam fungsi
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("bookings_tb")
    .insert(payload)
    .select("*, services_tb(*)")
    .single();

  if (error) {
    // unique constraint error
    if (error.message.includes("unique_booking_slot")) {
      throw new Error(
        "Jam sudah dibooking orang lain, silahkan pilih waktu lain"
      );
    }
    throw new Error(`Create booking failed: ${error.message}`);
  }

  return data as BookingWithService;
}

// =========================
// GET BOOKINGS
// =========================
export async function getDataBookings() {
  // Panggil client di dalam fungsi
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("bookings_tb")
    .select("*, services_tb(*)");

  if (error) throw new Error(error.message);

  return data;
}

// =========================
// GET SERVICES
// =========================
export async function getDataServices() {
  // Panggil client di dalam fungsi
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("services_tb")
    .select();

  if (error) throw new Error(error.message);

  return data;
}

// =========================
// GET BOOKING BY TOKEN
// =========================
export async function getBookingByToken(
  secret_token: string
): Promise<BookingWithService> {
  // Panggil client di dalam fungsi
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("bookings_tb")
    .select("*, services_tb(*)")
    .eq("secret_token", secret_token)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as BookingWithService;
}
