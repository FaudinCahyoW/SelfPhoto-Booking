import {z} from "zod"

export const  bookingSchema = z.object({
    service_id: z.string(),
    name: z.string().min(3, "Name must be at least 3 characters"),
    email_booking:z.string().email("email not valid"),
    phone_number: z.string().min(10, "Number too short"),
    date: z.string(),
    time: z.string(),
})

