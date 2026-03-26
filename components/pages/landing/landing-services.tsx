"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { LandingReveal } from "./landing-reveal";
import { AnimatedGroup, AnimatedItem } from "./landing-motion";

const topFeatures = [
  {
    icon: Stethoscope,
    title: "Consultas médicas",
    description:
      "Atención veterinaria para chequeos, evaluaciones clínicas y controles generales.",
  },
  {
    icon: ShieldCheck,
    title: "Vacunas y desparasitación",
    description:
      "Control preventivo para proteger la salud y el bienestar continuo de tu mascota.",
  },
  {
    icon: HeartPulse,
    title: "Control y tratamientos",
    description:
      "Seguimiento médico, indicaciones clínicas y acompañamiento posterior a la atención.",
  },
  {
    icon: CalendarDays,
    title: "Agenda de horas",
    description:
      "Reserva online con una experiencia simple, rápida y alineada a una clínica moderna.",
  },
];

export function LandingServices() {
  return (
    <section id="servicios" className="bg-white py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <LandingReveal>
          <div className="mx-auto max-w-3xl text-center">

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Cuidado integral para cada etapa de tu mascota.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
              Un enfoque clínico y preventivo respaldado por una experiencia
              digital moderna, ordenada y fácil de usar para cada tutor.
            </p>
          </div>
        </LandingReveal>

        <AnimatedGroup
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.08}
        >
          {topFeatures.map((feature) => {
            const Icon = feature.icon;

            return (
              <AnimatedItem key={feature.title}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 320, damping: 16 }}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 text-white shadow-[0_20px_40px_-20px_rgba(6,182,212,0.6)]"
                  >
                    <Icon className="size-6" />
                  </motion.div>

                  <h3 className="mt-6 text-lg font-bold text-slate-950">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </motion.article>
              </AnimatedItem>
            );
          })}
        </AnimatedGroup>

        <div className="mt-24 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <LandingReveal x={-24}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative mx-auto w-full max-w-[680px]"
            >
              <div className="absolute inset-x-8 bottom-0 h-6 rounded-full bg-slate-200 blur-xl" />
              <div className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_28px_80px_-38px_rgba(15,23,42,0.24)]">
                <div className="rounded-[22px] bg-[linear-gradient(180deg,#f8fafc_0%,#eef6ff_100%)] p-8">
                  <div className="mx-auto max-w-sm rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mx-auto h-2 w-20 rounded-full bg-slate-100" />
                    <div className="mt-6 space-y-3">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="h-12 rounded-2xl bg-cyan-50"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="h-12 rounded-2xl bg-slate-100"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="h-12 rounded-2xl bg-slate-100"
                      />
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.45 }}
                      className="mt-6 h-12 rounded-full bg-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </LandingReveal>

          <LandingReveal x={24} delay={0.08}>
            <div className="max-w-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-600">
                Experiencia digital
              </p>

              <h3 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em] text-slate-950">
                Reserva y gestiona todo de forma simple.
              </h3>

              <p className="mt-5 text-base leading-8 text-slate-600">
                PETNOVA está pensada para que la reserva de horas, la gestión de
                mascotas y el acceso al historial clínico se sientan claros,
                rápidos y profesionales.
              </p>

              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-8 h-1 rounded-full bg-cyan-500"
              />
            </div>
          </LandingReveal>
        </div>

        <div className="mt-24 grid overflow-hidden rounded-[36px] lg:grid-cols-2">
          <LandingReveal className="h-full" x={-24}>
            <motion.div whileHover={{ scale: 1.01 }} className="h-full min-h-[360px] bg-[linear-gradient(135deg,#dbeafe_0%,#ecfeff_100%)] p-8">
              <div className="grid h-full place-items-center rounded-[28px] border border-white/70 bg-white/40 backdrop-blur">
                <AnimatedGroup className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <AnimatedItem key={index}>
                      <motion.div
                        whileHover={{ y: -4, rotate: 1 }}
                        className="h-24 w-24 rounded-[22px] bg-white shadow-sm"
                      />
                    </AnimatedItem>
                  ))}
                </AnimatedGroup>
              </div>
            </motion.div>
          </LandingReveal>

          <LandingReveal delay={0.08} className="h-full" x={24}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="flex h-full min-h-[360px] flex-col justify-center bg-cyan-500 px-8 py-10 text-white sm:px-10 lg:px-12"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-100">
                Plataforma preparada
              </p>

              <h3 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em]">
                Clara, moderna y diseñada para clínicas veterinarias.
              </h3>

              <p className="mt-5 max-w-xl text-base leading-8 text-cyan-50">
                Una interfaz pensada para mejorar la experiencia del tutor desde
                la reserva hasta el seguimiento posterior a la atención.
              </p>

              <AnimatedGroup className="mt-8 space-y-3 text-sm sm:text-base">
                {[
                  "Reserva online sin fricción",
                  "Información ordenada por mascota",
                  "Confirmaciones y seguimiento clínico",
                ].map((item) => (
                  <AnimatedItem key={item}>
                    <motion.div whileHover={{ x: 3 }}>• {item}</motion.div>
                  </AnimatedItem>
                ))}
              </AnimatedGroup>
            </motion.div>
          </LandingReveal>
        </div>
      </div>
    </section>
  );
}