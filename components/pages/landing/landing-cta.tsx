"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";

export function LandingCta() {
  return (
    <section className="section-shell py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="cta-gradient overflow-hidden rounded-[2.5rem] px-8 py-10 text-white shadow-2xl shadow-cyan-200/40 lg:px-12 lg:py-12"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-3xl">
            <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              ¿Necesitas agendar una consulta para tu mascota?
            </h3>
            <p className="mt-4 text-base leading-8 text-white/90">
              Reserva fácilmente una consulta con nuestros veterinarios y recibe
              confirmación directa en tu correo.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-white/70 bg-white/10 px-8 py-6 text-base text-white hover:bg-white/20 hover:text-white"
          >
            <Link href="/reservar-hora">Agendar cita</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}