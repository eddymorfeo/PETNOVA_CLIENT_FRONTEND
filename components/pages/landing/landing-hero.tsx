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

export function LandingHero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-20"
    >
      <div className="section-shell relative grid gap-12 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
            <ShieldCheck className="size-4" />
            Atención veterinaria cercana, moderna y organizada
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl lg:leading-[1.05]">
            Cuidamos la salud de tu mascota con una experiencia{" "}
            <span className="text-primary">más simple, cercana y confiable</span>.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Reserva horas médicas, administra tus mascotas y revisa su historial
            clínico en una plataforma moderna pensada para clientes y familias.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-2xl px-6 shadow-md shadow-primary/20"
            >
              <Link href="/reservar-hora">
                <CalendarDays className="mr-2 size-4" />
                Agendar cita médica
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="rounded-2xl px-6">
              <Link href="/register">Crear cuenta</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border bg-white/80 p-5 soft-shadow">
              <p className="text-2xl font-bold text-primary">24/7</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Reserva disponible en línea
              </p>
            </div>

            <div className="rounded-3xl border bg-white/80 p-5 soft-shadow">
              <p className="text-2xl font-bold text-primary">Historial</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Clínico centralizado por mascota
              </p>
            </div>

            <div className="rounded-3xl border bg-white/80 p-5 soft-shadow">
              <p className="text-2xl font-bold text-primary">Email</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Recordatorios y notificaciones
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex items-center"
        >
          <Card className="glass-panel w-full rounded-[2rem] border-white/70 soft-shadow">
            <CardHeader>
              <CardTitle className="text-2xl">Tu clínica veterinaria en línea</CardTitle>
              <CardDescription className="text-sm leading-6">
                Un portal para reservar, revisar citas, administrar mascotas y
                consultar su historial clínico desde cualquier dispositivo.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
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
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border bg-white/75 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-primary/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-primary/10 p-2 transition group-hover:bg-primary/15">
                        <Icon className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">
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