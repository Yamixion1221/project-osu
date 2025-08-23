"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-header py-6 text-center text-sm mt-auto"
    >
      <div className="flex justify-center gap-6 mb-4 flex-wrap">
        <Link href="/peraturan">Peraturan</Link>
        <Link href="/tos">Ketentuan Layanan</Link>
        <Link href="/privasi">Privasi</Link>
        <Link href="/dmca">Hak Cipta (DMCA)</Link>
        <Link href="/status">Status Server</Link>
        <Link href="https://github.com/">Kode Sumber</Link>
      </div>
      <p>
        dibuat dengan <span className="text-red-500">❤</span> kontributor. {new Date().getFullYear()} all rights reserved
      </p>
    </motion.footer>
  );
}
