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
  const { bookings, submitBooking } = useBooking();

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

    await submitBooking({
      service_id: selectedService.service_id,
      name: form.name,
      email_booking: form.email_booking,
      phone_number: form.phone_number,
      date: form.date?.toISOString() || "",
      time: form.time,
    });
  };

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
        <form action="post" onSubmit={handleSubmit}>
          <InputComponent
            id="name"
            name="name"
            label="Nama Lengkap"
            type="text"
            placeholder="Masukkan Nama Lengkap Anda"
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
            onChange={handleChange}
          />
          <InputComponent
            id="phone_number"
            name="phone_number"
            label="Nomor WhatsApp"
            type="number"
            placeholder="Masukkan Nomor WA Anda"
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
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-500"
          >
            Buat Pesanan
          </button>
        </form>
      </section>
    </main>
  );
}
