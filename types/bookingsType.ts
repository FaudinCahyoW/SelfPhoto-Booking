export type Bookings = {
    booking_id: string
    service_id: string
    name: string
    email_booking:string
    phone_number: string
    secret_token: string
    date: string,
    time: string,
    status: string
    created_at: string
    updated_at: string
}

export type BookingWithService = Bookings & {
    services_tb: {
        service_img:string
        service_desc:string
        service_type:string
        price_service: number
        start_time:string,
        end_time:string
    }
}