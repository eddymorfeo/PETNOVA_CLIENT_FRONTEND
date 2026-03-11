"use client";

import { CalendarCheck2, ClipboardList, PawPrint, UserRound } from "lucide-react";
import { LandingReveal } from "@/components/pages/landing/landing-reveal";

const steps = [
  {
    title: "Datos del tutor",
    description: "Ingresa la información de contacto principal.",
    icon: UserRound,
  },
  {
    title: "Datos de la mascota",
    description: "Selecciona o registra la mascota que asistirá.",
    icon: PawPrint,
  },
  {
    title: "Motivo y horario",
    description: "Indica el tipo de atención y el bloque disponible.",
    icon: ClipboardList,
  },
  {
    title: "Confirmación",
    description: "Revisa la información antes de reservar.",
    icon: CalendarCheck2,
  },
];

export function AppointmentGuestSteps() {
  return (
    <LandingReveal>
      <div className="landing-card rounded-[2rem] p-6 lg:p-7">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Proceso
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-800">
          ¿Cómo funciona la reserva?
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="landing-card rounded-[1.5rem] p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-bold text-primary">
                        0{index + 1}
                      </span>
                      <p className="font-semibold text-slate-800">{step.title}</p>
                    </div>
                    <p className="text-sm leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LandingReveal>
  );
}