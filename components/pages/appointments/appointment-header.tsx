"use client";

import Link from "next/link";
import { CalendarPlus, Clock3, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppointmentHeader() {
  return (
    <section className="w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Mis citas
          </span>

          <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-slate-950">
            Gestiona las citas de tus mascotas
          </h2>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            Revisa tus próximas atenciones, consulta el historial y reserva una
            nueva cita asociada a tu cuenta y a una de tus mascotas registradas.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <PawPrint className="h-4 w-4 text-cyan-700" />
              Reserva por mascota registrada
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <Clock3 className="h-4 w-4 text-cyan-700" />
              Selección de horario disponible
            </div>
          </div>
        </div>
{/* 
        <Button
          asChild
          className="h-11 rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Link href="#reservar-cita">
            <CalendarPlus className="mr-2 h-4 w-4" />
            Reservar cita
          </Link>
        </Button> */}
      </div>
    </section>
  );
}