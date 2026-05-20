export const dynamic = "force-dynamic";

import { getBookingByToken } from "@/services/userServices";
import { Card } from "flowbite-react";

type DetailProps = {
  params: Promise<{
    secret_token: string;
  }>;
};

export default async function DetailBooking({ params }: DetailProps) {
  const { secret_token } = await params;

  const detail = await getBookingByToken(secret_token);

  if (!detail) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Booking tidak ditemukan</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-2">
      <Card className="w-full max-w-3xl rounded-3xl border-0 bg-white shadow-2xl">
        <div className="rounded-t-3xl bg-linear-to-r from-fuchsia-700 to-purple-700 px-8 py-8 text-white">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              Booking ID #{detail.booking_id}
            </span>

            <span className="text-sm opacity-80">Confirmed</span>
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            {detail.services_tb.service_type}
          </h1>

          <p className="mt-2 text-sm text-white/80">
            Detail booking layanan kamu
          </p>
          {/* BODY */}
          <div className="mt-6 grid gap-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-gray-500 text-xs">Nama</p>
                <p className="font-semibold text-gray-900">{detail.name}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-gray-500 text-xs">Email</p>
                <p className="font-semibold text-gray-900 break-all">
                  {detail.email_booking}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-gray-500 text-xs">No HP</p>
                <p className="font-semibold text-gray-900">
                  {detail.phone_number}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-gray-500 text-xs">Tanggal</p>
                <p className="font-semibold text-gray-900">{detail.date}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 col-span-2">
                <p className="text-gray-500 text-xs">Jam</p>
                <p className="font-semibold text-gray-900">{detail.time}</p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4 col-span-2">
                <p className="text-gray-500 text-xs">Harga</p>
                <p className="font-semibold text-purple-700">
                  Rp {detail.services_tb.price_service.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}
