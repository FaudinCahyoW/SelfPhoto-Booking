"use client";
import { useEffect, useState } from "react";
import {
  createBooking,
  getDataServices,
  getDataBookings,
} from "@/services/userServices";
import { Bookings, BookingWithService } from "@/types/bookingsType";
import { Services } from "@/types/serviceType";
import { nanoid } from "nanoid";
import emailjs from "@emailjs/browser";
import { BookingFormType } from "@/types/bookingFormType";
import toast from "react-hot-toast";

export function useBooking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [services, setServices] = useState<Services[]>([]);
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [detailBookings, setDetailBookings] = useState<BookingWithService[]>([])
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
      booking_detail_link: `https://detailed-order//${orderData.booking_id}//${orderData.secret_token}`, // NOTE: nanti diubah pake link yg udh dibuat
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
    const toastId = toast.loading('Sedang memproses booking...')
    try {
      setLoading(true);

      const bookingId = `BK-${nanoid(7)}`;
      const secretToken = `ST-${nanoid(15)}`;

      console.log("DEBUG TIME:", formData.time);

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
      await orderConfirmation({
        ...result,
        time: formData.time
      });

      //Notifikasi Sukses
      toast.success('Booking Berhasil, Silahkan Cek Email Kamu.', {id:toastId})

      setSuccess(true);
      return {
        bookingId,
        secretToken,
      };
    } catch (err: any) {
      console.log(err);
      const message = err.message || "Gagal membuat booking"
      setError(message);

      toast.error(message, {id:toastId})
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [bookingRes, serviceRes] = await Promise.all([
          getDataBookings(),
          getDataServices(),
        ]);
        setBookings(bookingRes);
        setServices(serviceRes);
        setDetailBookings(bookingRes)
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
    bookings,
    services,
    detailBookings,
    loading,
    error,
    success,
  };
}
