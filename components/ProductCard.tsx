"use client";

import { Card, Drawer, DrawerItems } from "flowbite-react";
import { useState } from "react";
import { BookingForm } from "@/components/BookingForm";
import { useBooking } from "@/hooks/useBooking";
import { Services } from "@/types/serviceType";

export default function ProductCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Services | null>(null)
  const { services } = useBooking();
  return (
    <>
      <div className="mx-aut grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((b) => (
          <Card key={b.service_id} className="rounded-2xl w-96 flex flex-col items-center justify-between px-6">
            <section className="flex justify-center items-center">
              <img
                src={b.service_img}
                alt="Ini Gambar"
                className="w-48 aspectt-2/3 object-cover items-center justify-center"
              />
            </section>
            <section>
              <a href="#">
                <h5 className="text-xl text-heading font-semibold tracking-tight">{b.service_type}</h5>
              </a>
              <p>{b.service_desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-extrabold text-heading">
                  Rp {b.price_service.toLocaleString("id-ID")}
                </span>
                <button
                  type="button"
                  className="rounded cursor-pointer active:bg-green-500 hover:bg-green-500 bg-blue-500 ml-5 inline-flex items-centertext-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-3 py-2 focus:outline-none"
                  onClick={() => {
                    setSelectedService(b)
                    setIsOpen(true)}}
                >
                  Pesan Sekarang
                </button>
              </div>
            </section>
          </Card>
        ))}
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        className="rounded-lg w-4/12 "
      >
        <DrawerItems>
          <BookingForm selectedService={selectedService}/>
        </DrawerItems>
      </Drawer>
    </>
  );
}
