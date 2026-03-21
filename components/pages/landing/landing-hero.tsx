"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const quickStats = [
  {
    value: "24/7",
    label: "Reserva disponible en línea",
  },
  {
    value: "Historial",
    label: "Clínico centralizado por mascota",
  },
  {
    value: "Email",
    label: "Confirmaciones y recordatorios",
  },
];

const portalItems = [
  {
    icon: CalendarDays,
    title: "Reserva rápida",
    description: "Agenda una atención de forma clara y sin fricción.",
  },
  {
    icon: PawPrint,
    title: "Mascotas centralizadas",
    description: "Toda la información principal de cada paciente en un solo lugar.",
  },
  {
    icon: HeartPulse,
    title: "Seguimiento clínico",
    description: "Controles, tratamientos, vacunas y observaciones relevantes.",
  },
  {
    icon: Stethoscope,
    title: "Atención organizada",
    description: "Un flujo ordenado para clientes, reservas y consultas veterinarias.",
  },
];

const trustItems = ["Reserva segura", "Confirmación por correo", "Portal para clientes"];

export function LandingHero() {
  return (
    <section id="home" className="grid gap-6 lg:gap-8">
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(135deg,rgba(240,252,255,0.96)_0%,rgba(248,250,252,0.96)_100%)] p-6 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-700 sm:text-sm">
            <ShieldCheck className="size-4" />
            Atención veterinaria cercana, moderna y organizada
          </div>

          <h1 className="mt-6 max-w-3xl text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-[4rem] lg:leading-[1.02]">
            Cuidamos la salud de tu mascota con una experiencia{" "}
            <span className="bg-[linear-gradient(135deg,#0891b2,#0f766e)] bg-clip-text text-transparent">
              más simple, cercana y confiable.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Reserva horas médicas, administra tus mascotas y revisa su historial clínico
            desde una plataforma clara, moderna y pensada para familias.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-slate-950 px-7 text-white shadow-[0_18px_34px_-18px_rgba(8,145,178,0.85)] hover:bg-slate-800"
            >
              <Link href="/appointment-guest">
                <CalendarDays className="mr-2 size-4" />
                Agendar cita médica
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-slate-200 bg-white px-7 text-slate-700 hover:bg-slate-50"
            >
              <Link href="/register">Crear cuenta</Link>
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {trustItems.map((item) => (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-medium text-slate-600"
              >
                <CheckCircle2 className="size-4 text-cyan-700" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.24)] sm:p-8"
        >
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>

          <div className="mt-5 rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#f2fbfd_0%,#ffffff_42%)] p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-700">
              Tu clínica veterinaria en línea
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Un portal diseñado para reservar, organizar y dar seguimiento.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Gestiona citas, mascotas e historial clínico desde cualquier dispositivo
              con una experiencia visual más clara y consistente.
            </p>

            <div className="mt-6 space-y-3">
              {portalItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-[1.5rem] border border-slate-200 bg-white px-4 py-4 transition hover:border-cyan-200 hover:bg-cyan-50/40"
                  >
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
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {quickStats.map((item) => (
          <div
            key={item.value}
            className="rounded-[1.5rem] border border-slate-200/80 bg-white px-5 py-5 shadow-[0_18px_44px_-34px_rgba(15,23,42,0.2)]"
          >
            <p className="text-2xl font-black tracking-tight text-slate-950">{item.value}</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
