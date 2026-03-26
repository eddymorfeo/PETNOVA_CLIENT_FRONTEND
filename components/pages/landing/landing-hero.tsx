"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, ShieldCheck } from "lucide-react";
import { LandingReveal } from "./landing-reveal";
import { AnimatedGroup, AnimatedItem } from "./landing-motion";

const featureCards = [
  {
    title: "Reserva rápida",
    description: "Agenda una atención veterinaria en pocos pasos.",
  },
  {
    title: "Portal cliente",
    description: "Accede a mascotas, historial y reservas desde un solo lugar.",
  },
  {
    title: "Seguimiento clínico",
    description: "Mantén controles, vacunas y observaciones bien organizadas.",
  },
];

const trustItems = [
  "Reserva segura",
  "Confirmación por correo",
  "Seguimiento clínico",
];

export function LandingHero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[980px] overflow-hidden bg-slate-950"
    >
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          backgroundImage:
            "linear-gradient(rgba(2,6,23,0.76), rgba(2,6,23,0.76)), radial-gradient(circle at left, rgba(6,182,212,0.18), transparent 26%), radial-gradient(circle at right, rgba(59,130,246,0.18), transparent 24%), linear-gradient(115deg, #08101d 0%, #0b1627 42%, #08101d 100%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-25" />

      <div className="relative mx-auto flex min-h-[980px] w-full max-w-7xl flex-col justify-center px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <AnimatedGroup>
            <AnimatedItem>
              <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                Atención veterinaria moderna y organizada
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Cuidamos la salud de tu mascota con una experiencia más clara,
                ágil y profesional.
              </h1>
            </AnimatedItem>

            <AnimatedItem>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Reserva atenciones, organiza tus mascotas y consulta su
                historial clínico desde una plataforma diseñada para tutores
                que buscan orden, confianza y una mejor experiencia digital.
              </p>
            </AnimatedItem>

            <AnimatedItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/appointment-guest"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-6 font-semibold text-white shadow-[0_18px_42px_-18px_rgba(6,182,212,0.9)] transition hover:bg-cyan-400"
                  >
                    <CalendarDays className="size-4 shrink-0" />
                    <span>Reservar cita</span>
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/register"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 font-semibold text-white transition hover:bg-white/10"
                  >
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>Crear cuenta</span>
                  </Link>
                </motion.div>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {trustItems.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ x: 2 }}
                    className="inline-flex items-center gap-2 text-sm text-slate-300"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-cyan-300" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </AnimatedItem>
          </AnimatedGroup>

          <LandingReveal delay={0.15} x={30}>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-[520px]"
            >
              <div className="absolute -inset-8 rounded-[40px] bg-cyan-500/10 blur-3xl" />

              <div className="relative rounded-[34px] border border-white/10 bg-white/5 p-5 shadow-[0_30px_90px_-24px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                <div className="mb-4 flex items-center gap-2 px-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>

                <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-300">
                    Tu clínica veterinaria en línea
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] text-white">
                    Un portal diseñado para reservar, organizar y dar
                    seguimiento.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Una experiencia digital pensada para que la gestión de
                    reservas y mascotas se sienta simple, consistente y moderna.
                  </p>

                  <AnimatedGroup className="mt-6 space-y-3" delay={0.1}>
                    {featureCards.map((item) => (
                      <AnimatedItem key={item.title}>
                        <motion.div
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="rounded-[20px] border border-white/10 bg-white/5 p-4"
                        >
                          <h3 className="text-sm font-bold text-white sm:text-base">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-slate-300">
                            {item.description}
                          </p>
                        </motion.div>
                      </AnimatedItem>
                    ))}
                  </AnimatedGroup>
                </div>
              </div>
            </motion.div>
          </LandingReveal>
        </div>

        <AnimatedGroup className="mt-16 grid gap-4 sm:grid-cols-3" delay={0.1}>
          {[
            { title: "24/7", subtitle: "Reserva online disponible" },
            { title: "Portal", subtitle: "Acceso para clientes" },
            { title: "Historial", subtitle: "Seguimiento por mascota" },
          ].map((item) => (
            <AnimatedItem key={item.title}>
              <motion.div
                whileHover={{ y: -4, scale: 1.015 }}
                className="rounded-[24px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-md"
              >
                <p className="text-3xl font-black tracking-[-0.04em] text-white">
                  {item.title}
                </p>
                <p className="mt-2 text-sm text-slate-300">{item.subtitle}</p>
              </motion.div>
            </AnimatedItem>
          ))}
        </AnimatedGroup>
      </div>
    </section>
  );
}