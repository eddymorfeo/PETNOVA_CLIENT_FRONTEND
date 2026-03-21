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
    <section
      id="services"
      className="rounded-[2rem] border border-slate-200/80 bg-white/80 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)]"
    >
      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <LandingReveal>
          <div className="border-b border-slate-200 p-6 sm:p-8 lg:sticky lg:top-24 lg:border-b-0 lg:border-r lg:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-sm">
              Servicios
            </p>

            <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Cuidado integral para cada etapa de tu mascota.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              Una propuesta clara y moderna para el cuidado preventivo, clínico y de
              seguimiento, alineada con la experiencia del módulo de reservas.
            </p>
          </div>
        </LandingReveal>

        <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:p-10">
          {serviceItems.map((service, index) => {
            const Icon = service.icon;

            return (
              <LandingReveal key={service.title} delay={index * 0.06}>
                <div className="group h-full rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fcfd_100%)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-[0_18px_40px_-30px_rgba(8,145,178,0.32)] sm:p-6">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-50 ring-1 ring-cyan-100 transition group-hover:bg-cyan-100">
                    <Icon className="size-6 text-cyan-700" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                    {service.description}
                  </p>
                </div>
              </LandingReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
