"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Pencil,
  PawPrint,
  Plus,
  ShieldCheck,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { deletePet } from "@/api/pets/pets.api";
import { Button } from "@/components/ui/button";
import type { PetItem } from "@/types/pets/pet.types";

function formatSex(value?: string | null) {
  if (value === "MALE") return "Macho";
  if (value === "FEMALE") return "Hembra";
  return "No informado";
}

function formatSterilized(value?: boolean | null) {
  if (value === true) return "Sí";
  if (value === false) return "No";
  return "No informado";
}

function formatBirthDate(value?: string | null) {
  if (!value) return "No informada";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "No informada";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function PetsListTable({ pets }: { pets: PetItem[] }) {
  const router = useRouter();
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState("");

  const handleDelete = async (petId: string, petName: string) => {
    const confirmed = window.confirm(
      `¿Deseas eliminar a ${petName}? Esta acción desactivará la mascota.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setSubmitError("");
      setDeletingPetId(petId);

      await deletePet(petId);

      router.refresh();
      router.push("/home/pets");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No fue posible eliminar la mascota.",
      );
    } finally {
      setDeletingPetId(null);
    }
  };

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Mis mascotas
          </span>
          <h2 className="mt-4 text-[28px] font-semibold tracking-tight text-slate-950">
            Listado de mascotas registradas
          </h2>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Revisa la información principal de cada mascota y gestiona sus datos.
          </p>
        </div>

        <Button
          asChild
          className="h-11 rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800"
        >
          <Link href="/home/pets/new">
            <Plus className="mr-2 h-4 w-4" />
            Registrar mascota
          </Link>
        </Button>
      </section>

      {submitError && (
        <section className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
          {submitError}
        </section>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-4">
            {pets.map((pet) => (
              <article
                key={pet.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-slate-300 hover:bg-slate-50"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
                      <PawPrint className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-slate-950">
                        {pet.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Sexo: {formatSex(pet.sex)}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${
                      pet.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {pet.isActive ? "Activa" : "Inactiva"}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Color
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {pet.color || "No informado"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Microchip
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {pet.microchip || "No registrado"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Esterilización
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {formatSterilized(pet.isSterilized)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Fecha de nacimiento
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {formatBirthDate(pet.birthDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Alergias
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {pet.allergies || "No registradas"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-white p-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Observaciones
                    </p>
                    <p className="mt-2 text-sm font-medium text-slate-900">
                      {pet.notes || "Sin observaciones"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-200 pt-4">
                  <Button
                    asChild
                    variant="outline"
                    className="h-10 rounded-xl border-slate-200"
                  >
                    <Link href={`/home/pets/${pet.id}/edit`}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar
                    </Link>
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDelete(pet.id, pet.name)}
                    disabled={deletingPetId === pet.id}
                    className="h-10 rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {deletingPetId === pet.id ? "Eliminando..." : "Eliminar"}
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <ShieldCheck className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Resumen
                </h3>
                <p className="text-sm text-slate-500">
                  Información rápida del módulo.
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  Total registradas
                </p>
                <p className="mt-2 text-2xl font-semibold text-cyan-700">
                  {pets.length}
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
      </div>
    </div>
  );
}