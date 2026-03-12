"use client";

import {
  CalendarDays,
  HeartPulse,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { LandingReveal } from "./landing-reveal";

const serviceItems = [
  {
    title: "Consultas médicas",
    description:
      "Atención veterinaria integral para controles, diagnóstico y chequeos generales.",
    icon: Stethoscope,
  },
  {
    title: "Vacunas y desparasitación",
    description:
      "Programa preventivo para mantener al día la protección y el bienestar de tu mascota.",
    icon: ShieldCheck,
  },
  {
    title: "Control y tratamientos",
    description:
      "Seguimiento clínico, indicaciones médicas y acompañamiento posterior a la atención.",
    icon: HeartPulse,
  },
  {
    title: "Agenda de horas",
    description:
      "Reserva online con una experiencia clara, rápida y pensada para clientes nuevos o registrados.",
    icon: CalendarDays,
  },
];

export function LandingServices() {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:px-8">
        <LandingReveal>
          <div className="max-w-xl lg:sticky lg:top-28">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-700">
              Conversemos
            </p>

            <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Servicios para el cuidado integral de tu mascota.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Descubre todo lo que ofrecemos para el cuidado preventivo y clínico
              de tus mascotas, con una experiencia moderna y cercana.
            </p>
          </div>
        </LandingReveal>

        <div className="grid gap-5 md:grid-cols-2">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;

            return (
              <LandingReveal key={service.title} delay={index * 0.07}>
                <div className="group h-full rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_20px_60px_-32px_rgba(15,23,42,0.25)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_24px_70px_-30px_rgba(8,145,178,0.22)]">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-50 to-emerald-50 ring-1 ring-cyan-100">
                      <Icon className="size-6 text-cyan-700" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              </LandingReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}