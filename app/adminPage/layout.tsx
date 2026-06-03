"use client";

import { SideBarComp } from "@/components/admin-component/SideBarComp";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/adminPage/login")) {
    return (
      <div className="flex h-screen bg-neutral-950">
        <main className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-neutral-950 to-black" />

          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col justify-center h-full px-20">
            <span className="text-emerald-400 font-medium tracking-wider uppercase">
              Booking System
            </span>

            <h1 className="mt-4 text-5xl font-bold text-white leading-tight">
              Manage bookings
              <br />
              with confidence.
            </h1>

            <p className="mt-6 max-w-xl text-gray-400 text-lg">
              A modern dashboard for managing customer bookings, schedules, and
              services in one place.
            </p>
          </div>
        </main>

        <main className="w-1/3 bg-neutral-900 border-l border-white/10 items-center justify-center p-8">
          <h1 className="text-center mt-4 text-5xl font-bold text-white leading-tight">
            Welcome
          </h1>
          <p className="mt-6 max-w-xl text-gray-400 text-md text-center">
              PLEASE LOGIN TO ADMIN DASHBOARD
            </p>
          {children}
        </main>
      </div>
    );
  }
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <SideBarComp />

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
