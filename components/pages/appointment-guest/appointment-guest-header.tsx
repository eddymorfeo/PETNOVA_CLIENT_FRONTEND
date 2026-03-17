"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  PawPrint,
  ShieldCheck,
  Clock3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function AppointmentGuestHeader() {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl"
    >
      <div className="mx-auto w-full max-w-[1240px] px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
              <PawPrint className="h-5 w-5" />
            </div>

            <div>
              <p className="text-base font-extrabold tracking-tight text-slate-950">
                PETNOVA
              </p>
              <p className="text-xs text-slate-500">Reserva de cita</p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-4 text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-gradient-to-r from-cyan-50/70 via-white to-sky-50/70 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
          <div className="px-6 py-8 lg:px-8 lg:py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-700 shadow-sm">
              <CalendarDays className="h-3.5 w-3.5" />
              Agenda tu atención veterinaria en línea
            </div>

            <h1 className="mt-4 max-w-3xl text-[2.15rem] font-bold tracking-tight text-slate-950 sm:text-[2.5rem] lg:text-[3.1rem] lg:leading-[1.06]">
              Reserva una cita para tu mascota de forma simple y clara
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-[15px]">
              Completa la información del tutor, la mascota y el horario disponible.
              Luego podrás confirmar la reserva y recibir la notificación por correo.
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-cyan-700" />
                Reserva segura
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-slate-700 ring-1 ring-slate-200 shadow-sm">
                <Clock3 className="h-4 w-4 text-cyan-700" />
                Confirmación por correo
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}