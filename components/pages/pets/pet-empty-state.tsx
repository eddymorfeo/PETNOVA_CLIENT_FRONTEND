import Link from "next/link";
import { PawPrint, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PetEmptyState() {
  return (
    <section className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
        <PawPrint className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-slate-950">
        Aún no tienes mascotas registradas
      </h3>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500">
        Registra tu primera mascota para comenzar a gestionar su ficha clínica,
        citas médicas, vacunas y recordatorios desde el portal.
      </p>

      <Button
        asChild
        className="mt-6 h-11 rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800"
      >
        <Link href="/home/pets/new">
          <Plus className="mr-2 h-4 w-4" />
          Registrar mascota
        </Link>
      </Button>
    </section>
  );
}