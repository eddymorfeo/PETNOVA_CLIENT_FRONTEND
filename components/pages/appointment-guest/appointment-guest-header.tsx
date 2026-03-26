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
      </div>
    </motion.header>
  );
}