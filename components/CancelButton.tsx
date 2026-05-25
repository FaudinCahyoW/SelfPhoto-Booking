"use client";

import { useDeleteBooking } from "@/hooks/useDeleteBooking";

type TokenProps = {
  id: string;
};

export default function CancelButton({ id }: TokenProps) {
  const { deleteBooking, loading } = useDeleteBooking();

  return (
    <button
      onClick={() => deleteBooking(id)}
      className="w-full bg-red-500 text-white py-4 rounded-2xl cursor-pointer hover:bg-red-950"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}