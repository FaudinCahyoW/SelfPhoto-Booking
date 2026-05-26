"use client";

import { useDeleteBooking } from "@/hooks/useDeleteBooking";
import { useState } from "react";
import {toast} from "react-hot-toast"

type TokenProps = {
  id: string;
  children : React.ReactNode; //Wadah untuk menaruh seluruh konten card data booking
};

export default function CancelButton({ id, children }: TokenProps) {
  const { deleteBooking, loading } = useDeleteBooking();
  const [isCancelled, setIsCancelled] = useState(false)

  const handleCancel = async () => {
    const confirmation = window.confirm("Do you want to cancel this booking?")
    if (!confirmation) return

    try {
        await deleteBooking(id)
        toast.success("Booking is cancelled")
        
        setIsCancelled(true) 
    } catch (error) {
        toast.error("Failed to cancel booking")
    }
  }

  if (isCancelled){
    return(
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 text-2xl font-bold">
          ✓
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Cancel Success</h2>
        <p className="text-gray-600 max-w-sm">
          You cancelled this booking, thank you.
        </p>
      </div>
    )
  }
    
  return (
    <>
      {children}

      <button
        onClick={handleCancel}
        disabled={loading}
        className="w-full mt-4 bg-red-500 text-white py-4 rounded-2xl cursor-pointer hover:bg-red-600 disabled:bg-gray-400 transition-colors font-medium"
      >
        {loading ? "Cancelling..." : "Cancel Booking"}
      </button>
    </>
  );
}