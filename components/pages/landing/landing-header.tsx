"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, PawPrint, UserRound } from "lucide-react";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function LandingHeader() {
  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto mt-4 flex w-[min(1200px,calc(100%-24px))] items-center justify-between rounded-full border border-white/10 bg-slate-950/65 px-4 py-3 shadow-[0_18px_60px_-24px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.06, rotate: -4 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300 ring-1 ring-cyan-400/20"
          >
            <PawPrint className="size-5" />
          </motion.div>

          <div className="leading-tight">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-white">
              PETNOVA
            </p>
            <p className="text-[11px] text-slate-300">Clínica veterinaria</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ y: -1 }}>
              <Link
                href={item.href}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-cyan-300"
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:block"
          >
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 font-semibold text-white transition hover:bg-white/10"
            >
              <UserRound className="size-4 shrink-0" />
              <span>Iniciar sesión</span>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/appointment-guest"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-5 font-semibold text-white shadow-[0_18px_42px_-20px_rgba(6,182,212,0.8)] transition hover:bg-cyan-400"
            >
              <CalendarDays className="size-4 shrink-0" />
              <span>Reservar cita</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}