"use client";

import { motion } from "framer-motion";
import { ClipboardList, Mail, PawPrint } from "lucide-react";
import { LandingReveal } from "./landing-reveal";
import { AnimatedGroup, AnimatedItem } from "./landing-motion";

const showcaseItems = [
  {
    title: "Portal de clientes",
    description: "Accede a tus mascotas, reservas y datos importantes.",
    icon: PawPrint,
  },
  {
    title: "Historial clínico",
    description: "Consulta controles, observaciones y seguimiento.",
    icon: ClipboardList,
  },
  {
    title: "Notificaciones por correo",
    description: "Recibe confirmaciones y avisos relevantes.",
    icon: Mail,
  },
];

export function LandingAbout() {
  return (
    <section id="nosotros" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingReveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-300">
              Nosotros
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] sm:text-5xl">
              Atención cercana, organizada y centrada en cada mascota.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
              PETNOVA combina atención veterinaria de calidad con una
              experiencia digital moderna, clara y coherente con una clínica
              actual.
            </p>
          </div>
        </LandingReveal>

        <AnimatedGroup
          className="mt-16 grid gap-6 md:grid-cols-3"
          delay={0.08}
        >
          {showcaseItems.map((item) => {
            const Icon = item.icon;

            return (
              <AnimatedItem key={item.title}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 16 }}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500 text-white"
                  >
                    <Icon className="size-5" />
                  </motion.div>

                  <h3 className="mt-6 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
                    {item.description}
                  </p>
                </motion.article>
              </AnimatedItem>
            );
          })}
        </AnimatedGroup>

        <div className="mt-20 grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <LandingReveal x={-24}>
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-300">
                Enfoque PETNOVA
              </p>

              <h3 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em]">
                Mejor organización, menos fricción y más confianza.
              </h3>

              <p className="mt-5 text-base leading-8 text-slate-300">
                La plataforma fue diseñada para que el proceso completo se
                sienta más ordenado: desde reservar una hora hasta revisar la
                evolución clínica de cada mascota.
              </p>
            </div>
          </LandingReveal>

          <AnimatedGroup className="grid gap-5 sm:grid-cols-3" delay={0.08}>
            {[
              "Reservas claras",
              "Seguimiento ordenado",
              "Información centralizada",
            ].map((label) => (
              <AnimatedItem key={label}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-8 text-center text-sm font-medium text-slate-200"
                >
                  {label}
                </motion.div>
              </AnimatedItem>
            ))}
          </AnimatedGroup>
        </div>
      </div>
    </section>
  );
}