import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kehadiran Siswa Online",
  description: "Aplikasi absensi siswa modern dengan database Google Sheets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${geist.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-sky-50 to-blue-50 min-h-screen`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}