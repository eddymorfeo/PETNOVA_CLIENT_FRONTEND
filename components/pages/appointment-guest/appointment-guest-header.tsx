"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, PawPrint } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AppointmentGuestHeader() {
  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/60 bg-white/75 backdrop-blur-xl"
    >
      <div className="section-shell flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
            <PawPrint className="size-5 text-primary" />
          </div>

          <div>
            <p className="text-lg font-extrabold tracking-tight">PETNOVA</p>
            <p className="text-xs text-muted-foreground">Reserva de cita</p>
          </div>
        </div>

        <Button asChild variant="outline" className="rounded-full bg-white/80">
          <Link href="/">
            <ArrowLeft className="mr-2 size-4" />
            Volver al inicio
          </Link>
        </Button>
      </div>

      <div className="section-shell pb-8 pt-6">
        <div className="max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <CalendarDays className="size-4" />
            Agenda tu atención veterinaria en línea
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
            Reserva una cita para tu mascota de forma rápida y clara
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Completa la información del tutor, mascota y horario disponible. Luego
            podrás confirmar tu reserva y recibir la notificación por correo.
          </p>
        </div>
      </div>
    </motion.header>
  );
}