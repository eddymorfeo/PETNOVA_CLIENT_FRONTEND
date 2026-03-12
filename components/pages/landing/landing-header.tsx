"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Menu, PawPrint, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";

const navigationItems = [
  { label: "Inicio", href: "#home" },
  { label: "Servicios", href: "#services" },
  { label: "Nosotros", href: "#about" },
  { label: "Contacto", href: "#contact" },
];

export function LandingHeader() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-white/60 bg-white/75 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/65"
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="group flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-100 via-white to-emerald-50 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <PawPrint className="size-5 text-cyan-700" />
          </div>

          <div>
            <p className="text-lg font-black tracking-[0.16em] text-slate-900">
              PETNOVA
            </p>
            <p className="text-xs font-medium text-slate-500">
              Clínica veterinaria
            </p>
          </div>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 p-1.5 shadow-sm md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-full border-slate-200 bg-white/85 px-5 text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Link href="/login">
              <UserRound className="mr-2 size-4" />
              Iniciar sesión
            </Link>
          </Button>

          <Button
            asChild
            className="h-11 rounded-full bg-slate-950 px-6 text-white shadow-lg shadow-cyan-200/50 transition hover:bg-slate-800"
          >
            <Link href="/appointment-guest">
              <CalendarDays className="mr-2 size-4" />
              Reservar cita
            </Link>
          </Button>
        </div>

        <Button
          type="button"
          variant="outline"
          size="icon"
          className="size-11 rounded-full border-slate-200 bg-white/85 shadow-sm md:hidden"
        >
          <Menu className="size-5 text-slate-700" />
        </Button>
      </div>
    </motion.header>
  );
}