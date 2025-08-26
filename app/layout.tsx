"use client"
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="bg-body text-white flex flex-col min-h-screen">
        <SessionProvider>
          <Header />
          <main className="flex-1 relative z-0">{children}</main>
          <BackToTop />
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
