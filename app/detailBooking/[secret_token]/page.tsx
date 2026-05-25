import CancelButton from "@/components/CancelButton";
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
        <h1 className="text-2xl font-bold">Booking Not Found</h1>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-2">
      <Card className="w-full max-w-3xl rounded-3xl border-0 bg-white shadow-2xl">

        {/* Header */}
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
            Your Booking Details
          </p>
        </div>

        {/* Content */}
        <div className="space-y-3 px-4 py-4 text-gray-800">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">Customer Name</p>
              <h2 className="mt-1 text-lg font-semibold">{detail.name}</h2>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">Email</p>
              <h2 className="mt-1 text-lg font-semibold break-all">
                {detail.email_booking}
              </h2>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">Booking Date</p>
              <h2 className="mt-1 text-lg font-semibold">
                {detail.date
                  ? new Date(detail.date).toLocaleDateString("en", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Tanggal tidak tersedia"}
              </h2>
            </div>

            <div className="rounded-2xl bg-gray-100 p-4">
              <p className="text-sm text-gray-500">Time Booking</p>
              <h2 className="mt-1 text-lg font-semibold">{detail.time}</h2>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between rounded-2xl bg-purple-100 px-6 py-5">
            <div>
              <p className="text-sm text-purple-700">Total Price</p>
              <h2 className="text-2xl font-bold text-purple-900">
                Rp {detail.services_tb.price_service.toLocaleString("id-ID")}
              </h2>
            </div>

            <span className="rounded-xl bg-amber-200 px-3 py-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
              Pending Payment
            </span>
          </div>

          {/* BUTTON FIXED */}
          <CancelButton id={detail.booking_id} />

        </div>
      </Card>
    </section>
  );
}