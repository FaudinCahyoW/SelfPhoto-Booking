"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function AppHeader() {
  const pathname = usePathname();

  if (pathname.startsWith("/adminPage/")) {
    return (
      <>
        <header className="border-b bg-white"></header>
      </>
    );
  }

  return (
    <header className="w-full bg-linear-to-r from-cyan-600 to-cyan-400 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-5 py-8 relative z-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white max-w-lg leading-tight">
          Book Your Perfect
          <span className="block text-white/90">Photo Session</span>
        </h1>

        <div className="flex flex-wrap gap-3 pt-4 text-[11px] text-white/90">
          <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            ⚡ Instant Booking
          </div>

          <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            📸 Studio Quality
          </div>

          <div className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            💳 Pay on Site
          </div>
          <div className="ms-auto">
            <Link href="/adminPage/login">
              {" "}
              <button
                type="button"
                className="border p-1.5 rounded-xl bg-green-500 hover:bg-green-700 hover:border-green-700 font-semibold cursor-pointer"
              >
                Login to admin panel
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="h-5 bg-[#fefefe] rounded-t-3xl" />
    </header>
  );
}
