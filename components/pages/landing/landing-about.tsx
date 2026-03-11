"use client";

import {
  BellRing,
  CalendarDays,
  ClipboardList,
  PawPrint,
  ShieldCheck,
  Syringe,
} from "lucide-react";

import { LandingReveal } from "./landing-reveal";

const featureItems = [
  {
    title: "Reserva de horas médicas",
    icon: CalendarDays,
  },
  {
    title: "Portal personalizado para clientes",
    icon: PawPrint,
  },
  {
    title: "Registro y administración de mascotas",
    icon: ShieldCheck,
  },
  {
    title: "Historial clínico por mascota",
    icon: ClipboardList,
  },
  {
    title: "Notificaciones por correo",
    icon: BellRing,
  },
  {
    title: "Seguimiento de vacunas y tratamientos",
    icon: Syringe,
  },
];

export function LandingAbout() {
  return (
    <section id="about" className="section-shell py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <LandingReveal>
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Nosotros
            </p>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              Atención cercana, organizada y centrada en cada mascota.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              PETNOVA combina atención veterinaria de calidad con una experiencia
              digital moderna. Queremos que cada cliente pueda gestionar citas,
              mascotas e historial clínico con claridad y confianza.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600">
              Nuestra plataforma está pensada para mejorar la comunicación con los
              tutores y facilitar el seguimiento médico de cada paciente en el tiempo.
            </p>
          </div>
        </LandingReveal>

        <LandingReveal delay={0.08}>
          <div className="landing-card rounded-[2.25rem] p-6 lg:p-8">
            <p className="text-lg font-bold text-slate-800">
              Lo que podrás hacer desde tu portal
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Un espacio personalizado para gestionar la salud y atención de tus mascotas.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featureItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <LandingReveal key={item.title} delay={index * 0.05}>
                    <div className="landing-card landing-card-hover rounded-[1.5rem] p-5">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 items-center justify-center rounded-2xl bg-primary/10">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <p className="text-sm font-semibold leading-7 text-slate-700">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </LandingReveal>
                );
              })}
            </div>
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}