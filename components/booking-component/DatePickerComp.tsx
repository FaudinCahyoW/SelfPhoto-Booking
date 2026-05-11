"use client";
import { Bookings } from "@/types/bookingsType";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { HiCalendar } from "react-icons/hi";

type TimeSlot = { start_time: string; end_time: string; };

type Props = {
  date: Date | null;
  timeProp: string;
  bookings: Bookings[];
  onDateChange: (date: Date | null) => void;
  onTimeChange: (start: string, end: string, full: string) => void;
};

const timeSlots: TimeSlot[] = [
  { start_time: "08:00", end_time: "09:00" },
  { start_time: "09:00", end_time: "10:00" },
  { start_time: "10:00", end_time: "11:00" },
  { start_time: "12:00", end_time: "13:00" },
];

export function DatePickerComp({ date, timeProp, bookings, onDateChange, onTimeChange }: Props) {
  
  const formatDateLocal = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const bookedSlots = date 
    ? bookings
        .filter((booking) => booking.date === formatDateLocal(date))
        .map((booking) => booking.time)
    : [];

  const isDateAvailable = (checkDate: Date) => {
    const formatted = formatDateLocal(checkDate);
    const bookingsInDate = bookings.filter((booking) => booking.date === formatted);
    return bookingsInDate.length < timeSlots.length;
  };

  return (
    <div className="mb-7">
      <label className="block mb-2.5 text-sm font-medium">Pilih Jadwal Pemesanan</label>
      <div className="flex gap-3">
        <div className="relative w-full flex gap-3 items-center">
          <div className="relative">
            <HiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 z-10" />
            <DatePicker
              selected={date}
              onChange={onDateChange}
              filterDate={isDateAvailable}
              minDate={new Date()} // Prevent booking in the past
              placeholderText="Pilih tanggal"
              dateFormat="dd MMM yyyy"
              className="w-48 border rounded-lg pl-10 pr-3 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <select
            value={timeProp || ""}
            onChange={(e) => {
              const value = e.target.value
              const [start, end] = value.split(" - ");
              onTimeChange(start, end, value);
            }}
            className="border text-black rounded-lg px-3 py-2 cursor-pointer outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>Pilih Jam</option>
            {timeSlots.map((slot, i) => {
              const value = `${slot.start_time} - ${slot.end_time}`;
              const isBooked = bookedSlots.includes(value);
              return (
                <option key={i} value={value} disabled={isBooked}>
                  {value} {isBooked ? "(Penuh)" : ""}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </div>
  );
}
