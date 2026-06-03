"use client";

import { createService, getOrder, getServices } from "@/services/adminServices";
import { Services } from "@/types/serviceType";
import { useEffect, useState } from "react";
import { BookingWithService } from "@/types/bookingsType";
import toast from "react-hot-toast";
import { nanoid } from "nanoid";

export function useAdmin() {
  const [orders, setOrders] = useState<BookingWithService[]>([]);
  const [services, setServices] = useState<Services[]>([]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  async function addService(formService: ServiceFormType) {
    const toastId = toast.loading("Adding Content...")

    try{
      setLoading(true)

      const serviceId = `SK-${nanoid(7)}`

      const resultService = await createService({
        service_id: serviceId,
        service_type: formService.service_type,
        service_desc: formService.service_desc,
        price_service:formService.price_service,       
      },
      formService.imageFile!
    )

      const newContentState = resultService

    setServices((prev) => [...prev, ...newContentState]);
    
    toast.success("Content is adding.", {id:toastId})
    setSuccess(true);
    
    return {serviceId}

    }catch (err: any) {
    console.log("BOOKING ERROR:", err);

    const message =
      err?.message ||
      "Submit failed. Please try again.";

    setError(message);

    toast.error(message, { id: toastId });
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    async function fetchDataOrder() {
      setLoading(true);

      try {
        const [orderRes, serviceRes] = await Promise.all([getOrder(), getServices()]);
        setOrders(orderRes);
        setServices(serviceRes)
      } catch (err: any) {
        setError(err.message || "Failed fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchDataOrder();
  }, []);

  return {addService, orders,services, error, loading, success };
}
