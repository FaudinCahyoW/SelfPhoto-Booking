"use client";
import { useBooking } from "@/hooks/useBooking";
import { Card } from "flowbite-react";

export default function DetailBooking() {
  const { detailBookings } = useBooking();
  return (
    <section>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      {detailBookings.map((b) => (
          <Card key={b.secret_token} className="w-full max-w-xl rounded-2xl text-white shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="ms-auto text-sm text-gray-500 font-medium">
                  {b.booking_id}
                </span>
              </div>

              <h2 className="text-center mt-3 text-2xl font-bold text-gray-900">
                {b.services_tb.service_type}
              </h2>
            </div>

            {/* Detail */}
            <div className="p-6 space-y-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Nama Pemesan</span>

                <span className="text-gray-900">{b.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Email Pemesan</span>

                <span className="text-gray-900">{b.email_booking}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Tanggal Pesanan</span>

                <span className="font-medium text-gray-800">{b.date}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Waktu Pesanan</span>

                <span className="font-medium text-gray-800">{b.time}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Status</span>

                <span className="flex items-center p-1 text-xs rounded-3xl bg-green-400 text-white">
                  Confirmed
                </span>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between">
              <span className="text-gray-500">Harga</span>

              <span className="font-semibold text-gray-900">
                {`Rp ${b.services_tb.price_service.toLocaleString("id-ID")}`}
              </span>
            </div>

            {/* Footer */}
            <div className="p-6">
              <button className="w-full cursor-pointer rounded-xl bg-red-500 py-3 font-medium text-white transition hover:bg-red-600">
                Cancel Booking
              </button>
            </div>
          </Card>
      ))}
        </div>
    </section>
  );
}
