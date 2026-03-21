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
    description: "Agenda atenciones desde una experiencia rápida y clara.",
    icon: CalendarDays,
  },
  {
    title: "Portal personalizado para clientes",
    description: "Accede a tus mascotas, reservas e información relevante.",
    icon: PawPrint,
  },
  {
    title: "Registro y administración de mascotas",
    description: "Mantén centralizados los datos de cada paciente.",
    icon: ShieldCheck,
  },
  {
    title: "Historial clínico por mascota",
    description: "Consulta controles, observaciones y seguimiento médico.",
    icon: ClipboardList,
  },
  {
    title: "Notificaciones por correo",
    description: "Recibe confirmaciones y avisos importantes de cada atención.",
    icon: BellRing,
  },
  {
    title: "Seguimiento de vacunas y tratamientos",
    description: "Visualiza procesos preventivos y clínicos de forma ordenada.",
    icon: Syringe,
  },
];

export function LandingAbout() {
  return (
    <section id="about" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
      <LandingReveal>
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-sm">
            Nosotros
          </p>

          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Atención cercana, organizada y centrada en cada mascota.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            PETNOVA combina atención veterinaria de calidad con una experiencia digital
            más clara. Queremos que cada cliente gestione citas, mascotas e historial
            clínico con confianza y orden.
          </p>

          <p className="mt-4 text-base leading-8 text-slate-600">
            La plataforma está pensada para mejorar la comunicación con los tutores y
            facilitar el seguimiento médico en cada etapa del cuidado veterinario.
          </p>
        </div>
      </LandingReveal>

      <LandingReveal delay={0.08}>
        <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#f3fbfd_0%,#ffffff_40%)] p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-sm">
            Lo que podrás hacer desde tu portal
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            Un espacio personalizado para gestionar la salud, reservas y atención de
            tus mascotas desde cualquier dispositivo.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {featureItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <LandingReveal key={item.title} delay={index * 0.05}>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 transition hover:border-cyan-200 hover:bg-cyan-50/40">
                    <div className="flex items-start gap-3">
                      <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 ring-1 ring-cyan-100">
                        <Icon className="size-5 text-cyan-700" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </LandingReveal>
              );
            })}
          </div>
        </div>
      </LandingReveal>
    </section>
  );
}
