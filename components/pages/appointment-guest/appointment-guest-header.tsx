"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, PawPrint, ShieldCheck, Clock3 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AppointmentGuestHeader() {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="border-b border-slate-200/80 bg-white/95 backdrop-blur-xl"
    >
      <div className="mx-auto  px-4 py-4 ">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
              <PawPrint className="h-5 w-5" />
            </div>

            <div>
              <p className="text-lg font-extrabold tracking-tight text-slate-950">
                PETNOVA
              </p>
              <p className="text-sm text-slate-500">Reserva de cita</p>
            </div>
          </div>

          <Button
            asChild
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-5 text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
        </div>

        <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-r from-cyan-50 via-white to-sky-50 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="px-6 py-10 lg:px-10 lg:py-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-medium text-cyan-700 shadow-sm">
              <CalendarDays className="h-4 w-4" />
              Agenda tu atención veterinaria en línea
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Reserva una cita para tu mascota de forma rápida y clara
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Completa la información del tutor, la mascota y el horario disponible.
              Luego podrás confirmar tu reserva y recibir la notificación por correo.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-cyan-700" />
                Reserva segura
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 shadow-sm">
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