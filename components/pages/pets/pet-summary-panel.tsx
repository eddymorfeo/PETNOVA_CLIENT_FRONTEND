"use client";

import { CalendarDays, ShieldCheck, Stethoscope } from "lucide-react";

import type { PetItem } from "@/types/pets/pet.types";

export function PetSummaryPanel({ pets }: { pets: PetItem[] }) {
  const activePetsCount = pets.filter((pet) => pet.isActive).length;

  return (
    <aside className="space-y-5">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
            <ShieldCheck className="h-4.5 w-4.5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-950">Resumen</h3>
            <p className="text-sm text-slate-500">Información rápida del módulo.</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Total registradas
            </p>
            <p className="mt-2 text-2xl font-semibold text-cyan-700">{pets.length}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Activas
            </p>
            <p className="mt-2 text-2xl font-semibold text-emerald-700">
              {activePetsCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <CalendarDays className="h-4 w-4 text-slate-500" />
              Próximas citas
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Aquí luego podrás relacionar mascotas con citas agendadas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
              <Stethoscope className="h-4 w-4 text-slate-500" />
              Ficha clínica
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Este listado servirá como punto de entrada a la ficha clínica de cada mascota.
            </p>
          </div>
        </div>
      </section>
    </aside>
  );
}