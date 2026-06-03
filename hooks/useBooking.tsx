"use client";
import { useEffect, useState } from "react";
import {
  createBooking,
  getDataServices,
  getDataBookings,
  getDataTimeSlot
} from "@/services/userServices";
import { Bookings, BookingWithService } from "@/types/bookingsType";
import { Services } from "@/types/serviceType";
import { nanoid } from "nanoid";
import emailjs from "@emailjs/browser";
import { BookingFormType } from "@/types/bookingFormType";
import toast from "react-hot-toast";
import { TimeSlot } from "@/types/timeType";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Services[]>([]);
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [success, setSuccess] = useState(false);

  async function orderConfirmation(orderData: BookingWithService) {
    const formattedDate = new Date(orderData.date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const templateParams = {
      image_service: orderData.services_tb.service_img,
      customer_name: orderData.name,
      customer_email: orderData.email_booking,
      order_id: orderData.booking_id,
      service_name: orderData.services_tb.service_type,
      booking_date: formattedDate,
      booking_time: orderData.time,
      booking_detail_link: `${process.env.NEXT_PUBLIC_BASE_URL}/detailBooking/${orderData.secret_token}`, 
      order_total: `Rp ${orderData.services_tb.price_service.toLocaleString("id-ID")}`,
    };

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      templateParams,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    );
  }

  async function submitBooking(formData: BookingFormType) {
  const toastId = toast.loading("Creating your booking...");

  try {
    setLoading(true);

    if (
      !formData.name?.trim() ||
      !formData.email_booking?.trim() ||
      !formData.phone_number?.trim() ||
      !formData.date ||
      !formData.time?.trim()
    ) {
      throw new Error(
        "Please complete all required fields."
      );
    }

    const bookingId = `BK-${nanoid(7)}`;
    const secretToken = `ST-${nanoid(15)}`;

    const result = await createBooking({
      booking_id: bookingId,
      service_id: formData.service_id,
      name: formData.name,
      email_booking: formData.email_booking,
      phone_number: formData.phone_number,
      secret_token: secretToken,
      date: formData.date,
      time: formData.time,
      status: "pending",
    });

    const newBookingState = result;

    setBookings((prev) => [...prev, newBookingState]);

    await orderConfirmation({
      ...result,
      time: formData.time,
    });

    toast.success(
      "Booking Success, Please Check your Email.",
      { id: toastId }
    );

    setSuccess(true);

    return {
      bookingId,
      secretToken,
    };

  } catch (err: any) {
    console.log("BOOKING ERROR:", err);

    const message =
      err?.message ||
      "Booking failed. Please try again.";

    setError(message);

    toast.error(message, { id: toastId });

  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [bookingRes, serviceRes, timeRes] = await Promise.all([
          getDataBookings(),
          getDataServices(),
          getDataTimeSlot()
        ]);
        setBookings(bookingRes);
        setServices(serviceRes);
        setTimeSlots(timeRes)
      } catch (err: any) {
        setError(err.message || "Failed fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return {
    orderConfirmation,
    submitBooking,
    timeSlots,
    bookings,
    services,
    loading,
    error,
    success,
  };
}
