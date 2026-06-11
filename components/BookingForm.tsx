"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema } from "@/schemas/bookingSchema";

import { BookingFormType } from "@/types/bookingFormType";

import { InputComponent } from "@/components/booking-component/InputComponent";

import { DatePickerComp } from "@/components/booking-component/DatePickerComp";

import { Services } from "@/types/serviceType";

import { useBooking } from "@/hooks/useBooking";

import { ErrorTextComponent } from "./booking-component/ErrorText";

type PropsSelectedService = {
  selectedService: Services | null;
};

export function BookingForm({ selectedService }: PropsSelectedService) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormType>({
    resolver: zodResolver(bookingSchema),

    defaultValues: {
      service_id: "",
      name: "",
      email_booking: "",
      phone_number: "",
      date: "",
      time: "",
    },
  });

  const { bookings, submitBooking, success } = useBooking();

  const selectedDate = watch("date");

  const selectedTime = watch("time");

  useEffect(() => {
    if (selectedService) {
      setValue("service_id", selectedService.service_id);
    }
  }, [selectedService, setValue]);

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success, reset]);

  const onSubmit = async (data: BookingFormType) => {
    try {
      await submitBooking(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1 className="mb-5 text-3xl font-bold">Please Make Your Order</h1>

      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <InputComponent
            id="name"
            label="Full Name"
            type="text"
            placeholder="Enter your name"
            errorMessage={errors.name?.message}
            {...register("name")}
          />

          {/* SERVICE */}
          {selectedService && (
            <>
              <InputComponent
                id="service_type"
                name="service_type"
                label="Service Types"
                type="text"
                value={selectedService.service_type}
                readOnly
              />

              <InputComponent
                id="price_service"
                name="price_service"
                label="Order Price"
                type="text"
                value={`Rp ${selectedService.price_service.toLocaleString(
                  "id-ID",
                )}`}
                readOnly
              />
            </>
          )}

          {/* EMAIL */}
          <InputComponent
            id="email_booking"
            label="Email"
            type="email"
            placeholder="Enter Your Email"
            errorMessage={errors.email_booking?.message}
            {...register("email_booking")}
          />

          {/* PHONE */}
          <InputComponent
            id="phone_number"
            label="Phone Number"
            type="text"
            placeholder="Feel free to use a dummy phone number."
            errorMessage={errors.phone_number?.message}
            {...register("phone_number")}
          />

          {/* DATE PICKER */}
          <DatePickerComp
            date={selectedDate ? new Date(selectedDate) : null}
            timeProp={selectedTime}
            bookings={bookings}
            onDateChange={(date) => {
              if (!date) return;

              const formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              setValue("date", formattedDate);
            }}
            onTimeChange={(start, end, full) => {
              setValue("time", full);
            }}
          />

          <ErrorTextComponent message={errors.date?.message} />

          <ErrorTextComponent message={errors.time?.message} />

          {/* SUBMIT */}
          <button
            type="submit"
            className="
              bg-pink-500
              hover:bg-pink-400
              cursor-pointer
              text-white
              font-semibold
              px-5
              py-3
              rounded-xl
              shadow-lg
              shadow-pink-500/30
              transition-all
              duration-300
              hover:scale-105
            "
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Make Order"}
          </button>
        </form>
      </section>
    </main>
  );
}
