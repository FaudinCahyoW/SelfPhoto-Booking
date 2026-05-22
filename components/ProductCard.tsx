"use client";

import { Drawer, DrawerItems } from "flowbite-react";
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
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((b) => (
          <div
            key={b.service_id}
            className=" overflow-hidden rounded-3xl bg-card/60 border border-white/30 shadow-xl transition hover:scale-[1.02] flex flex-col h-full "
          >
            {/* Image */}
            <img
              className="w-full h-56 object-cover"
              src={b.service_img}
              alt={b.service_type}
            />

            {/* Content */}
            <div className="p-6 text-black flex flex-col flex-1">
              <h5 className="mb-3 text-2xl font-semibold tracking-tight">
                {b.service_type}
              </h5>

              {/* Description */}
              <p className="mb-6 text-zinc-700 line-clamp-3">
                {b.service_desc}
              </p>

              {/* Bottom section */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-extrabold">
                  Rp {b.price_service.toLocaleString("id-ID")}
                </span>

                <button
                  type="button"
                  className="bg-orange-500 hover:bg-orange-400 cursor-pointer text-white font-semibold rounded-xl px-5 py-2.5 shadow-lg"
                  onClick={() => {
                    setSelectedService(b);
                    setIsOpen(true);
                  }}
                >
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position={drawerPosition}
        className="bg-linear-to-r from-[#243B55] to-[#141E30] text-white z-50 h-[60vh] rounded-t-2xl sm:h-[45vh] lg:h-full lg:w-4/12 lg:rounded-t-none lg:rounded-l-2xl"
      >
        <DrawerItems>
          <BookingForm selectedService={selectedService} />
        </DrawerItems>
      </Drawer>
    </>
  );
}
