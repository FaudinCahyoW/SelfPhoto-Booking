"use client";

import { Card, Drawer, DrawerItems } from "flowbite-react";
import { useState, useEffect } from "react";
import { BookingForm } from "@/components/BookingForm";
import { useBooking } from "@/hooks/useBooking";
import { Services } from "@/types/serviceType";

export default function ProductCard() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const { services } = useBooking();

  const [drawerPosition, setDrawerPosition] = useState<
    "right" | "bottom" | "top" | "left"
  >("right");

  useEffect(() => {
    const handleResize = () => {
      setDrawerPosition(window.innerWidth < 1024 ? "bottom" : "right");
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="mx-aut grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((b) => (
          <Card
            key={b.service_id}
            className="bg-linear-to-r from-[#243B55] to-[#141E30] px-8 py-8 text-whit rounded-2xl w-full max-w-sm flex flex-col items-center justify-between"
          >
            <section className="flex justify-center items-center">
              <img
                src={b.service_img}
                alt={b.service_type}
                className="w-48 aspectt-2/3 object-cover items-center justify-center"
              />
            </section>
            <section className="mt-3 sm:mt-2 md:mt-3">
              <a href="#">
                <h5 className="text-xl text-heading font-semibold tracking-tight text-white">
                  {b.service_type}
                </h5>
              </a>
              <p className="text-gray-300">{b.service_desc}</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-base sm:text-xl font-extrabold text-heading text-violet-200">
                  Rp {b.price_service.toLocaleString("id-ID")}
                </span>
                <button
                  type="button"
                  className="w-24 sm:w-24 text-sm rounded cursor-pointer active:bg-green-500 bg-pink-500 hover:bg-pink-400 bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium  rounded-base px-3 py-2 focus:outline-none"
                  onClick={() => {
                    setSelectedService(b);
                    setIsOpen(true);
                  }}
                >
                  Pesan
                </button>
              </div>
            </section>
          </Card>
        ))}
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position={drawerPosition}
        className="bg-linear-to-r from-[#243B55] to-[#141E30] text-white z-50 
             /* 1. MOBILE: Muncul di bawah, tinggi 60% */
             h-[60vh] rounded-t-2xl 
             /* 2. TABLET (sm: 640px ke atas): Tetap di bawah, tinggi 45% */
             sm:h-[45vh] 
             /* 3. DESKTOP (lg: 1024px ke atas): Pindah ke kanan, tinggi penuh */
             lg:h-full lg:w-4/12 lg:rounded-t-none lg:rounded-l-2xl"
      >
        <DrawerItems>
          <BookingForm selectedService={selectedService} />
        </DrawerItems>
      </Drawer>
    </>
  );
}
