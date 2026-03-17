"use client";

import {
  CalendarCheck2,
  ClipboardList,
  PawPrint,
  UserRound,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Datos del tutor",
    description: "Ingresa la información de contacto principal para la reserva.",
    icon: UserRound,
  },
  {
    title: "Datos de la mascota",
    description: "Completa los datos básicos del paciente que será atendido.",
    icon: PawPrint,
  },
  {
    title: "Motivo y horario",
    description: "Selecciona atención, profesional, fecha y bloque disponible.",
    icon: ClipboardList,
  },
  {
    title: "Confirmación",
    description: "Revisa el detalle y confirma la reserva final.",
    icon: CalendarCheck2,
  },
];

export function AppointmentGuestSteps() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.04 }}
      className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.04)]"
    >
      <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-5 py-5 lg:px-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cyan-700">
          Proceso
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          ¿Cómo funciona la reserva?
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Un flujo simple para reservar una atención veterinaria desde la landing.
        </p>
      </div>

      <div className="grid gap-3 p-5 md:grid-cols-2 lg:p-6">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: 0.08 + index * 0.04,
              }}
              className="group rounded-[1.25rem] border border-slate-200 bg-slate-50/70 p-4 transition hover:bg-white hover:shadow-sm"
            >
              <div className="flex items-start gap-3.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                  <Icon className="h-4.5 w-4.5" />
                </div>

                <div className="min-w-0">
                  <div className="mb-1.5 flex items-center gap-2">
                    <span className="text-[11px] font-bold tracking-[0.18em] text-cyan-700">
                      0{index + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-900">
                      {step.title}
                    </p>
                  </div>

                  <p className="text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}