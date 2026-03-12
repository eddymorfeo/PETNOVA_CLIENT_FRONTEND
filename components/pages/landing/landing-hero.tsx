"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarDays,
  HeartPulse,
  PawPrint,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    label: "Recordatorios y notificaciones",
  },
];

const portalItems = [
  {
    icon: CalendarDays,
    title: "Reserva rápida",
    description: "Con o sin cuenta de cliente",
  },
  {
    icon: PawPrint,
    title: "Mascotas centralizadas",
    description: "Toda la información en un solo lugar",
  },
  {
    icon: HeartPulse,
    title: "Seguimiento clínico",
    description: "Atenciones, tratamientos, vacunas y controles",
  },
  {
    icon: Stethoscope,
    title: "Atención organizada",
    description: "Flujo claro para cada consulta veterinaria",
  },
];

export function LandingHero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(circle_at_left_top,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_right_top,rgba(16,185,129,0.12),transparent_24%)]" />

      <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-200 bg-white/90 px-4 py-2 text-sm font-semibold text-cyan-800 shadow-sm backdrop-blur">
            <ShieldCheck className="size-4" />
            Atención veterinaria cercana, moderna y organizada
          </div>

          <h1 className="max-w-3xl text-balance text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl lg:leading-[1.02]">
            Cuidamos la salud de tu mascota con una experiencia{" "}
            <span className="bg-[linear-gradient(135deg,#0891b2,#0f766e)] bg-clip-text text-transparent">
              más simple, cercana y confiable
            </span>
            .
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-slate-600 sm:text-lg">
            Reserva horas médicas, administra tus mascotas y revisa su historial
            clínico en una plataforma moderna pensada para clientes y familias.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-slate-950 px-7 text-white shadow-lg shadow-cyan-200/50 hover:bg-slate-800"
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
              className="h-12 rounded-full border-slate-200 bg-white/90 px-7 text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <Link href="/register">Crear cuenta</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {quickStats.map((item) => (
              <div
                key={item.value}
                className="rounded-[1.75rem] border border-white/70 bg-white/80 p-5 shadow-[0_18px_50px_-24px_rgba(15,23,42,0.28)] backdrop-blur"
              >
                <p className="text-2xl font-black text-slate-900">{item.value}</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex items-center"
        >
          <Card className="relative w-full overflow-hidden rounded-[2rem] border-white/70 bg-white/85 shadow-[0_30px_90px_-35px_rgba(8,145,178,0.45)] backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_65%)]" />

            <CardHeader className="relative pb-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
              </div>

              <CardTitle className="text-2xl font-black text-slate-900">
                Tu clínica veterinaria en línea
              </CardTitle>

              <CardDescription className="max-w-lg text-sm leading-7 text-slate-600">
                Un portal para reservar, revisar citas, administrar mascotas y
                consultar su historial clínico desde cualquier dispositivo.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {portalItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-[1.5rem] border border-slate-200/80 bg-white/80 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50/60"
                  >
                    <div className="flex items-start gap-3">
                      <div className="rounded-2xl bg-cyan-50 p-2.5 transition group-hover:bg-cyan-100">
                        <Icon className="size-5 text-cyan-700" />
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}