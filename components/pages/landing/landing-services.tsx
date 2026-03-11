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
    <section id="services" className="section-shell py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <LandingReveal>
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Conversemos
            </p>
            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
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
                <div className="landing-card landing-card-hover h-full rounded-[2rem] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{service.title}</h3>
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