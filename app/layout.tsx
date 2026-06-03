import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppHeader from "@/components/AppHeader";

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
        <AppHeader />
        <main className="w-full">{children}</main>

        <Toaster position="top-right" />
      </body>
    </html>
  );
}
