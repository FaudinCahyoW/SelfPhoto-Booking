"use client";

import { useBooking } from "@/hooks/useBooking";
import { Bookings } from "@/types/bookingsType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiCalendar } from "react-icons/hi";

type Props = {
  date: Date | null;
  timeProp: string;
  bookings: Bookings[];
  onDateChange: (date: Date | null) => void;
  onTimeChange: (start: string, end: string, full: string) => void;
};

export function DatePickerComp({
  date,
  timeProp,
  bookings,
  onDateChange,
  onTimeChange,
}: Props) {

  const { services } = useBooking();

  const bookedSlotsSimulasi = bookings.filter((booking) => {
    const bookingDate = new Date(booking.date).toDateString()

    const selectedDate = date?.toDateString()

    return bookingDate === selectedDate
  }).map((booking) => booking.time);

  return (
    <div className="mb-7">
      <label className="block mb-2.5 text-sm font-medium">
        Pilih Jadwal Pemesanan
      </label>

      <div className="flex gap-3 items-center">
        {/* DATE PICKER */}
        <div className="relative">
          <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10" />
          <DatePicker
            selected={date}
            onChange={(d: Date | null) => {
              onDateChange(d);
              onTimeChange("", "", ""); 
            }}
            minDate={new Date()}
            placeholderText="Choose Schedule"
            dateFormat="dd MMM yyyy"
            className="w-48 pl-10 pr-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all "
          />
        </div>

        {/* TIME SELECT */}
        <select
          value={timeProp || ""}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) return;
            const [start, end] = value.split(" - ");
            onTimeChange(start, end, value);
          }}
          className="rounded-lg w-44 px-3 py-2 border border-white/20 text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all "
        >
          <option value="" disabled>
            Select Time
          </option>
          
          {services.map((slot, i) => {
            // Menggabungkan data dari tabel service: "09:00 - 10:00"
            const displayValue = `${slot.start_time} - ${slot.end_time}`;

            // Pengecekan apakah jam ini ada di dalam list simulasi booked
            const isBooked = bookedSlotsSimulasi.includes(displayValue);
            
            return (
              <option
                key={i}
                value={displayValue}
                disabled={isBooked} // Mengunci elemen dropdown agar tidak bisa diklik
                className="bg-pink-500 hover:bg-pink-400"
              >
                {/* Modifikasi teks opsi secara ekstrem agar perubahan langsung terlihat */}
                {isBooked ? `⛔ [Full] ${displayValue}` : displayValue}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
