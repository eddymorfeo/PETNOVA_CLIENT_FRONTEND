"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] border border-cyan-200/40 bg-[linear-gradient(135deg,#082f49_0%,#0f172a_35%,#155e75_100%)] px-8 py-10 text-white shadow-[0_30px_80px_-35px_rgba(8,145,178,0.55)] lg:px-12 lg:py-12"
        >
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-emerald-300/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <h3 className="text-3xl font-black tracking-tight sm:text-4xl">
                ¿Necesitas agendar una consulta para tu mascota?
              </h3>
              <p className="mt-4 text-base leading-8 text-white/85">
                Reserva fácilmente una consulta con nuestros veterinarios y recibe
                confirmación directa en tu correo.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/50 bg-white/10 px-8 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white"
            >
              <Link href="/appointment-guest">Agendar cita</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}