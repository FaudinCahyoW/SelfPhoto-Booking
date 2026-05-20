export const dynamic = "force-dynamic";

import { getBookingByToken } from "@/services/userServices";
import { Card } from "flowbite-react";

type DetailProps = {
  params: Promise<{
    secret_token: string;
  }>;
};

export default async function DetailBooking({
  params,
}: DetailProps) {
  const { secret_token } = await params;

  const detail = await getBookingByToken(secret_token);

  if (!detail) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Booking tidak ditemukan
        </h1>
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

            <span className="text-sm opacity-80">
              Confirmed
            </span>
          </div>

          <h1 className="mt-6 text-3xl font-bold">
            {detail.services_tb.service_type}
          </h1>

          <p className="mt-2 text-sm text-white/80">
            Detail booking layanan kamu
          </p>
        </div>
      </Card>
    </section>
  );
}