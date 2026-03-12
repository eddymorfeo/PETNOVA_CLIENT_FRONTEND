"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Info,
  ShieldCheck,
  Mail,
} from "lucide-react";

function SummaryCard({
  icon: Icon,
  title,
  description,
  accent = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        accent
          ? "rounded-[1.5rem] border border-cyan-100 bg-cyan-50/80 p-4"
          : "rounded-[1.5rem] border border-slate-200 bg-white p-4"
      }
    >
      <div className="flex items-start gap-3">
        <div
          className={
            accent
              ? "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 ring-1 ring-cyan-100"
              : "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-cyan-700 ring-1 ring-slate-200"
          }
        >
          <Icon className="h-4.5 w-4.5" />
        </div>

        <div>
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="mt-1 text-sm leading-7 text-slate-600">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function AppointmentGuestSummary() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
      className="lg:sticky lg:top-24"
    >
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-200 bg-gradient-to-r from-white to-slate-50 px-6 py-6 lg:px-7">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan-700">
            Resumen
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            Tu reserva
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Revisa información importante antes de confirmar el agendamiento.
          </p>
        </div>

        <div className="space-y-4 p-6 lg:p-7">
          <SummaryCard
            icon={CalendarDays}
            title="Consulta médica"
            description="Selecciona el tipo de atención, profesional y horario disponible."
            accent
          />

          <SummaryCard
            icon={Clock3}
            title="Duración estimada"
            description="30 a 45 minutos por atención, dependiendo del motivo de consulta."
          />

          <SummaryCard
            icon={Mail}
            title="Confirmación por correo"
            description="Te enviaremos el detalle una vez completada correctamente la reserva."
          />

          <div className="rounded-[1.5rem] border border-dashed border-cyan-200 bg-cyan-50/60 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 ring-1 ring-cyan-100">
                <Info className="h-4.5 w-4.5" />
              </div>

              <p className="text-sm leading-7 text-slate-700">
                Este panel se conecta a la disponibilidad del sistema, considerando
                horarios del profesional, bloqueos y citas ya existentes.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-cyan-700 ring-1 ring-slate-200">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>

              <div>
                <p className="font-semibold text-slate-900">Reserva protegida</p>
                <p className="mt-1 text-sm leading-7 text-slate-600">
                  El horario seleccionado se valida nuevamente antes de confirmar la cita.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CircleCheck className="h-4 w-4 text-cyan-700" />
                Reserva disponible para clientes con o sin cuenta.
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CircleCheck className="h-4 w-4 text-cyan-700" />
                Disponibilidad sujeta al profesional y la fecha elegida.
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <CircleCheck className="h-4 w-4 text-cyan-700" />
                Experiencia visual alineada con la identidad de PETNOVA.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}