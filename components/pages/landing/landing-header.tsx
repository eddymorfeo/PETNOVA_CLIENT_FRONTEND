"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, PawPrint, UserRound } from "lucide-react";

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
      className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl"
    >
      <div className="section-shell flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
            <PawPrint className="size-5 text-primary" />
          </div>

          <div>
            <p className="text-lg font-extrabold tracking-tight">PETNOVA</p>
            <p className="text-xs text-muted-foreground">Clínica veterinaria</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-slate-600 transition hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-white/60 bg-white/80 px-5 shadow-sm"
          >
            <Link href="/login">
              <UserRound className="mr-2 size-4" />
              Iniciar sesión
            </Link>
          </Button>

          <Button
            asChild
            className="rounded-full bg-primary px-6 text-primary-foreground shadow-lg shadow-cyan-200/60"
          >
            <Link href="/appointment-guest">
              <CalendarDays className="mr-2 size-4" />
              Reservar cita
            </Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}