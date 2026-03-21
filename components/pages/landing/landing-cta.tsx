"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2.25rem] border border-cyan-200/50 bg-[linear-gradient(135deg,#082f49_0%,#0f172a_38%,#155e75_100%)] px-6 py-8 text-white shadow-[0_28px_70px_-36px_rgba(8,145,178,0.55)] sm:px-8 sm:py-10 lg:px-10 lg:py-12"
      >
        <div className="absolute -right-12 top-0 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-100 sm:text-sm">
              <ShieldCheck className="size-4" />
              Reserva online para clientes y nuevos tutores
            </div>

            <h3 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              ¿Necesitas agendar una consulta para tu mascota?
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/80">
              Reserva fácilmente una atención con nuestros veterinarios y recibe la
              confirmación directa en tu correo electrónico.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-white px-8 text-base font-semibold text-slate-950 hover:bg-slate-100"
          >
            <Link href="/appointment-guest">
              <CalendarDays className="mr-2 size-4" />
              Agendar cita
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
