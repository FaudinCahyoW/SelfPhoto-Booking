import { deleteBookingByToken } from "@/services/userServices";
import { useState } from "react";

export function useDeleteBooking(){
    const [loading, setLoading] = useState(false)

    const deleteBooking = async (secret_token: string) => {
        setLoading(true)
        try{
            await deleteBookingByToken(secret_token)
        }finally{
            setLoading(false)
        }
    }

    return {deleteBooking, loading}
}