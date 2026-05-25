import { deleteBookingByBookingId } from "@/services/userServices";
import { useState } from "react";

export function useDeleteBooking() {
  const [loading, setLoading] = useState(false);

  const deleteBooking = async (booking_id: string) => {
    setLoading(true);
    try {
      await deleteBookingByBookingId(booking_id);
    } finally {
      setLoading(false);
    }
  };

  return { deleteBooking, loading };
}
