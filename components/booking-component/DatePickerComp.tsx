"use client";

import { useBooking } from "@/hooks/useBooking";
import { Bookings } from "@/types/bookingsType";
import { useMemo, useState } from "react";
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
  const { timeSlots } = useBooking();
  const [isOpen, setIsOpen] = useState(false); 
  const [activeShift, setActiveShift] = useState<"morning" | "afternoon" | "night">("morning");

  // 1. Logika Cek Booking per Tanggal (Dinamis mendeteksi tanggal aktif)
  const bookedSlotsSimulasi = useMemo(() => {
    return bookings
      .filter((booking) => new Date(booking.date).toDateString() === date?.toDateString())
      .map((booking) => booking.time);
  }, [date, bookings]);

  // 2. Format Waktu ke AM/PM
  const convertTime = (timeConvert: string) => {
    if (!timeConvert) return "";
    return new Date(`1970-01-01T${timeConvert}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // 3. Filter Jam Berdasarkan Shift (Tanpa Scroll, Langsung Dihampar Semua)
  const filteredSlots = timeSlots.filter((slot) => {
    const hour = parseInt(slot.start_time.split(":")[0]);
    if (activeShift === "morning") return hour < 12;
    if (activeShift === "afternoon") return hour >= 12 && hour < 17;
    return hour >= 17;
  });

  return (
    <div className="mb-7">
      <label className="block mb-2.5 text-sm font-medium text-white">
        Select Booking Schedule
      </label>

      <div className="flex gap-3 items-center">
        {/* DATE PICKER */}
        <div className="relative">
          <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10" />
          <DatePicker
            selected={date}
            onChange={(d: Date | null) => {
              onDateChange(d);
              onTimeChange("", "", ""); // Reset jam jika tanggal diganti
            }}
            minDate={new Date()}
            placeholderText="Choose Schedule"
            dateFormat="dd MMM yyyy"
            className="w-48 pl-10 pr-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all"
          />
        </div>

        {/* TOMBOL PEMICU MODAL JAM */}
        <button
          type="button"
          disabled={!date}
          onClick={() => setIsOpen(true)}
          className="w-44 px-3 py-2 rounded-xl text-left border border-white/20 bg-white/10 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex justify-between items-center text-sm"
        >
          <span className="truncate">{timeProp ? timeProp : "Select Time"}</span>
          <span className="text-xs text-gray-400">▼</span>
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 animate-in fade-in duration-200">
          
          {/* KOTAK MODAL UTAMA */}
          <div className="w-full max-w-sm bg-[#1a233a] border border-white/10 rounded-2xl p-5 shadow-2xl transform animate-in zoom-in-95 duration-200">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white font-semibold text-sm">Select Time Slot</h3>
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-white text-xs bg-red-500 p-1 rounded-xl cursor-pointer hover:bg-red-700"
              >
                Closed
              </button>
            </div>

            {/* TAB SHIFT TABLE (Morning, Afternoon, Night) */}
            <div className="flex bg-black/20 p-1 rounded-xl justify-between mb-4 border border-white/5">
              {(["morning", "afternoon", "night"] as const).map((shift) => (
                <button
                  key={shift}
                  type="button"
                  onClick={() => setActiveShift(shift)}
                  className={`flex-1 text-center py-2 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                    activeShift === shift ? "bg-white text-slate-900" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {shift}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              {filteredSlots.map((slot, i) => {
                const displayValue = `${convertTime(slot.start_time)} - ${convertTime(slot.end_time)}`;
                const isBooked = bookedSlotsSimulasi.includes(displayValue);
                const isSelected = timeProp === displayValue;

                return (
                  <button
                    key={i}
                    type="button"
                    disabled={isBooked}
                    onClick={() => {
                      onTimeChange(slot.start_time, slot.end_time, displayValue);
                      setIsOpen(false); 
                    }}
                    className={`w-full py-2.5 text-center text-xs cursor-pointer rounded-xl border transition-all ${
                      isBooked
                        ? "text-gray-600 line-through opacity-30 border-transparent bg-black/10 cursor-not-allowed"
                        : isSelected
                        ? "bg-pink-500/20 text-pink-400 font-bold border-pink-500/40"
                        : "text-gray-200 border-white/5 hover:bg-white/5"
                    }`}
                  >
                    {isBooked ? `⛔ [Full] ${displayValue}` : displayValue}
                  </button>
                );
              })}

              {/* Jika data jam kosong pada shift tertentu */}
              {filteredSlots.length === 0 && (
                <div className="text-gray-500 text-xs text-center py-6">
                  No time slots available for this session.
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}