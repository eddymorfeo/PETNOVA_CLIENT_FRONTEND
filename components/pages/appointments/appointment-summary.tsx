"use client";

import { CalendarDays, Clock3, Dog, Stethoscope, UserRound } from "lucide-react";

type AppointmentSummaryProps = {
  clientName?: string;
  petName?: string;
  veterinarianName?: string;
  appointmentTypeName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
};

function formatDateLabel(value?: string) {
  if (!value) return "Sin seleccionar";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "Sin seleccionar";

  return date.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function AppointmentSummary({
  clientName,
  petName,
  veterinarianName,
  appointmentTypeName,
  appointmentDate,
  appointmentTime,
}: AppointmentSummaryProps) {
  return (
    <aside className="space-y-5">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">Resumen de reserva</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Antes de confirmar, revisa la información principal de la cita.
        </p>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <UserRound className="h-4 w-4 text-slate-500" />
              Cliente
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {clientName || "No disponible"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Dog className="h-4 w-4 text-slate-500" />
              Mascota
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {petName || "Selecciona una mascota"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Stethoscope className="h-4 w-4 text-slate-500" />
              Atención
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {appointmentTypeName || "Selecciona un tipo de atención"}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {veterinarianName || "Selecciona un profesional"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              Fecha
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {formatDateLabel(appointmentDate)}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm font-medium text-slate-900">
              <Clock3 className="h-4 w-4 text-slate-500" />
              Hora
            </div>
            <p className="mt-2 text-sm text-slate-600">
              {appointmentTime || "Selecciona un horario"}
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}