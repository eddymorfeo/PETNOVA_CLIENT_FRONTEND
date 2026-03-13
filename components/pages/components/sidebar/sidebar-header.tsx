"use client";

import Link from "next/link";
import { PawPrint } from "lucide-react";

export function ClientSidebarHeader() {
  return (
    <div className="space-y-4">
      <Link
        href="/home"
        className="flex items-center gap-3 rounded-2xl px-2 py-2 transition hover:bg-slate-50"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
          <PawPrint className="h-4.5 w-4.5" />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold tracking-[0.14em] text-slate-950">
            PETNOVA
          </p>
          <p className="truncate text-xs text-slate-500">
            Portal del cliente
          </p>
        </div>
      </Link>

      <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-cyan-50 to-white p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Tu espacio veterinario
        </p>
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Citas, mascotas e historial clínico en un solo lugar.
        </p>
      </div>
    </div>
  );
}