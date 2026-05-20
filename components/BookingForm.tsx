"use client";
import { useEffect, useState } from "react";
import { InputComponent } from "@/components/booking-component/InputComponent";
import { DatePickerComp } from "@/components/booking-component/DatePickerComp";
import { Services } from "@/types/serviceType";
import { useBooking } from "@/hooks/useBooking";

type PropsSelectedService = {
  selectedService: Services | null;
};

export function BookingForm({ selectedService }: PropsSelectedService) {
  // Ambil state 'success' bawaan dari hook useBooking Anda
  const { bookings, submitBooking, success } = useBooking();

  const [form, setForm] = useState({
    service_id: "",
    name: "",
    email_booking: "",
    phone_number: "",
    date: null as Date | null,
    time: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setForm((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleTimeChange = (start: string, end: string, full: string) => {
    setForm((prev) => ({
      ...prev,
      time: full,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) return;

    // Format tanggal lokal (YYYY-MM-DD) untuk backend Anda
    const year = form.date?.getFullYear();
    const month = String((form.date?.getMonth() || 0) + 1).padStart(2, "0");
    const day = String(form.date?.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    // Jalankan submit ke hook (Toast loading & success otomatis terpicu dari dalam hook)
    await submitBooking({
      service_id: selectedService.service_id,
      name: form.name,
      email_booking: form.email_booking,
      phone_number: form.phone_number,
      date: formattedDate,
      time: form.time,
    });
  };

  useEffect(() => {
    if (success && selectedService) {
      setForm({
        service_id: selectedService.service_id,
        name: "",
        email_booking: "",
        phone_number: "",
        date: null,
        time: "",
      });
    }
  }, [success, selectedService]);

  useEffect(() => {
    if (selectedService) {
      setForm((prev) => ({
        ...prev,
        service_id: selectedService.service_id,
      }));
    }
  }, [selectedService]);

  return (
    <main>
      <h1 className="mb-5">Silahkan Buat Pesananmu</h1>
      <section>
        <form onSubmit={handleSubmit}>
          <InputComponent
            id="name"
            name="name"
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap Anda"
            value={form.name} 
            onChange={handleChange}
          />
          {selectedService && (
            <>
              <InputComponent
                id="service_type"
                name="service_type"
                label="Jenis Pesanan"
                type="text"
                value={selectedService?.service_type || ""}
                readonly
              />
              <InputComponent
                id="price_service"
                name="price_service"
                label="Harga Pemesanan"
                type="text"
                value={`Rp ${selectedService?.price_service.toLocaleString("id-ID") || ""}`}
                readonly
              />
            </>
          )}
          <InputComponent
            id="email_booking"
            name="email_booking"
            label="Email"
            type="email"
            placeholder="Masukkan Email Anda"
            value={form.email_booking}
            onChange={handleChange}
          />
          <InputComponent
            id="phone_number"
            name="phone_number"
            label="Nomor WhatsApp"
            type="number"
            placeholder="Masukkan Nomor WA Anda"
            value={form.phone_number} 
            onChange={handleChange}
          />
          <DatePickerComp
            date={form.date}
            timeProp={form.time}
            bookings={bookings}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-400 cursor-pointer text-white font-semibold px-5 py-3 rounded-xl shadow-lg shadow-pink-500/30 transition-all duration-300 hover:scale-105"
          >
            Buat Pesanan
          </button>
        </form>
      </section>
    </main>
  );
}
