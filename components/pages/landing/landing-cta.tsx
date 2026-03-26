"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { LandingReveal } from "./landing-reveal";

export function LandingCta() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingReveal>
          <motion.div
            whileHover={{ y: -3, scale: 1.005 }}
            className="overflow-hidden rounded-[38px] bg-[linear-gradient(135deg,#0f172a_0%,#082f49_45%,#0891b2_100%)] px-8 py-12 text-white shadow-[0_28px_80px_-36px_rgba(15,23,42,0.55)] sm:px-10 lg:px-12"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-100">
                  Reserva online para clientes y nuevos tutores
                </p>

                <h3 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
                  ¿Necesitas agendar una consulta para tu mascota?
                </h3>

                <p className="mt-5 text-base leading-8 text-cyan-50">
                  Reserva fácilmente una atención con nuestros veterinarios y
                  recibe la confirmación directamente en tu correo electrónico.
                </p>
              </div>

              <motion.div whileHover={{ y: -2, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/appointment-guest"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  <CalendarDays className="size-4 shrink-0" />
                  <span>Agendar cita</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </LandingReveal>
      </div>
    </section>
  );
}