"use client";

import { Drawer, DrawerItems } from "flowbite-react";
import { useState, useEffect } from "react";

import { BookingForm } from "@/components/BookingForm";
import { useBooking } from "@/hooks/useBooking";
import { Services } from "@/types/serviceType";

export default function ProductCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Services | null>(null);
  const { services } = useBooking();

  const [drawerPosition, setDrawerPosition] = useState<"right" | "bottom">(
    "right",
  );

  useEffect(() => {
    const handleResize = () => {
      setDrawerPosition(window.innerWidth < 1024 ? "bottom" : "right");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full bg-[#fefefe] text-gray-900 overflow-x-hidden">
      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 pb-10 space-y-8">
        {/* SECTION LABEL */}
        <div className="text-xs uppercase tracking-widest text-gray-400">
          Available Packages
        </div>

        {/* SERVICES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((b) => (
            <div
              key={b.service_id}
              onClick={() => setSelectedService(b)}
              className={`rounded-3xl overflow-hidden bg-white border border-gray-200
              shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
              ${selectedService?.service_id === b.service_id ? "ring-2 ring-cyan-400" : ""}`}
            >
              <img
                className="w-full h-44 object-cover"
                src={b.service_img}
                alt={b.service_type}
              />

              <div className="p-5 flex flex-col">
                <h5 className="text-lg font-semibold">{b.service_type}</h5>

                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {b.service_desc}
                </p>

                <div className="mt-3 text-lg font-black text-cyan-600">
                  Rp {b.price_service.toLocaleString("id-ID")}
                </div>

                <button
                  type="button"
                  className="cursor-pointer mt-3 w-full py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400
                  text-white text-sm font-semibold transition"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedService(b);
                    setIsOpen(true);
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* DRAWER */}

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position={drawerPosition}
        className="bg-linear-to-r from-[#243B55] to-[#141E30] text-white z-50 h-[60vh] rounded-t-2xl sm:h-[45vh] lg:h-full lg:w-4/12 lg:rounded-l-2xl"
      >
        <DrawerItems>
          <BookingForm selectedService={selectedService} />
        </DrawerItems>
      </Drawer>
    </div>
  );
}
