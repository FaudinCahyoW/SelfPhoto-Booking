"use client"

import { useDeleteBooking } from "@/hooks/useDeleteBooking"

type TokenProps = {
  secret_token: string;
};


export default function CancelButton({ secret_token}: TokenProps){
    const {deleteBooking, loading} = useDeleteBooking()

    return (
        <button
      onClick={() => deleteBooking(secret_token)}
      className="w-full bg-red-500 text-white py-4 rounded-2xl cursor-pointer hover:bg-red-950"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </button>
    )
}