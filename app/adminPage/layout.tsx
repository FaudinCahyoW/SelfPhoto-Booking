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
        <main className="flex-1 relative overflow-hidden hidden md:block">
          <div className="absolute inset-0 bg-linear-to-br from-emerald-950 via-neutral-950 to-black" />

          <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 flex flex-col justify-center h-full px-20">
            <span className="text-emerald-400 font-medium tracking-wider uppercase text-sm">
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

        <main className="w-full md:w-1/3 bg-neutral-900 border-l border-white/10 flex flex-col justify-center p-8 lg:p-12">
          <div className="w-full max-w-md mx-auto space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-neutral-400">
                Please login to your admin dashboard
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-sm backdrop-blur-xs">
              <p className="text-neutral-300 text-xs leading-relaxed mb-3">
                Use the following credentials to access the demo admin panel:
              </p>
              <div className="space-y-1.5 font-mono text-xs bg-neutral-950/60 p-3 rounded-lg border border-white/5">
                <div className="flex justify-between text-neutral-400">
                  <span>Email:</span>
                  <span className="text-white select-all">admin@test.com</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Password:</span>
                  <span className="text-white select-all">admin123</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              {children}
            </div>
          </div>
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