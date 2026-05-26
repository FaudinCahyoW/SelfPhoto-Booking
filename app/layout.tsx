import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Booking Photo Studio",
  description: "Web application for booking photo studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} w-full`}
    >
      <body className="w-full m-0 p-0 bg-[#fefefe] overflow-x-hidden">
        <header className="w-full bg-linear-to-r from-cyan-600 to-cyan-400 relative overflow-hidden">
          {/* glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto px-5 py-8 relative z-10">
            {/* title */}
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white max-w-lg leading-tight">
              Book Your Perfect
              <span className="block text-white/90">Photo Session</span>
            </h1>
            {/* features */}
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
            </div>
          </div>

          <div className="h-5 bg-[#fefefe] rounded-t-3xl" />
        </header>

        {/* PAGE */}
        <main className="w-full">{children}</main>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
