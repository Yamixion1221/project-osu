"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react"; // <-- Tambahkan ini

export default function Header() {
  const [openTurnamen, setOpenTurnamen] = useState(false);
  const [openTim, setOpenTim] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex justify-between items-center px-6 py-4 bg-black relative z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="Portal osu!" width={50} height={50} />
      </div>

      {/* Menu */}
      <nav className="flex items-center gap-6">
        <Link href="/">Home</Link>
        <Link href="/berita">Berita</Link>

        {/* Turnamen Dropdown */}
        <div className="relative">
          <button onClick={() => setOpenTurnamen(!openTurnamen)} className="hover:text-blue-400">
            Turnamen
          </button>
          {openTurnamen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 top-full mt-1 bg-gray-900 p-2 rounded shadow-lg"
            >
              <Link href="/turnamen/lokal" className="flex items-center gap-2 px-3 py-1 hover:text-blue-400">
                <Image src="/icons/lokal.png" alt="Lokal" width={20} height={20} /> Lokal
              </Link>
              <Link href="/turnamen/dunia" className="flex items-center gap-2 px-3 py-1 hover:text-blue-400">
                <Image src="/icons/dunia.png" alt="Dunia" width={20} height={20} /> Dunia
              </Link>
            </motion.div>
          )}
        </div>

        {/* Tim Dropdown */}
        <div className="relative">
          <button onClick={() => setOpenTim(!openTim)} className="hover:text-blue-400">
            Tim
          </button>
          {openTim && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 top-full mt-1 bg-gray-900 p-2 rounded shadow-lg"
            >
              <Link href="/tim/standard" className="flex items-center gap-2 px-3 py-1 hover:text-blue-400">
                <Image src="/icons/standard.png" alt="Standard" width={20} height={20} /> Standard
              </Link>
              <Link href="/tim/ctb" className="flex items-center gap-2 px-3 py-1 hover:text-blue-400">
                <Image src="/icons/ctb.png" alt="Catch the Beat" width={20} height={20} /> Catch the Beat
              </Link>
              <Link href="/tim/taiko" className="flex items-center gap-2 px-3 py-1 hover:text-blue-400">
                <Image src="/icons/taiko.png" alt="Taiko" width={20} height={20} /> Taiko
              </Link>
              <Link href="/tim/mania" className="flex items-center gap-2 px-3 py-1 hover:text-blue-400">
                <Image src="/icons/mania.png" alt="Mania" width={20} height={20} /> Mania
              </Link>
            </motion.div>
          )}
        </div>

        {/* Login Dropdown */}
        <div className="relative ml-6">
          <button
            onClick={() => setOpenLogin(!openLogin)}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded"
          >
            Login
          </button>
          {openLogin && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 top-full mt-2 bg-gray-900 rounded shadow-lg w-40 overflow-hidden"
            >
              {/* osu! login */}
              <button
                onClick={() => signIn("osu")}
                className="flex items-center gap-2 w-full px-3 py-2 bg-pink-500 hover:bg-pink-600"
              >
                <Image src="/icons/osu-logo.svg" alt="osu!" width={20} height={20} /> osu!
              </button>

              {/* Google login */}
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 w-full px-3 py-2 bg-red-500 hover:bg-red-600"
              >
                <Image src="/icons/google-logo.svg" alt="Google" width={20} height={20} /> Google
              </button>
            </motion.div>
          )}
        </div>
      </nav>
    </motion.header>
  );
}
