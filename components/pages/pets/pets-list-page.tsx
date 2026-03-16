"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, Plus } from "lucide-react";
import Swal from "sweetalert2";

import { fetchMyPets, deletePet } from "@/api/pets/pets.api";
import { Button } from "@/components/ui/button";
import type { PetItem } from "@/types/pets/pet.types";
import { PetEmptyState } from "./pet-empty-state";
import { createPetColumns } from "./data-table/columns";
import { DataTable } from "./data-table/data-table";

export function PetsListPage() {
  const router = useRouter();

  const [pets, setPets] = useState<PetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [deletingPetId, setDeletingPetId] = useState<string | null>(null);

  useEffect(() => {
    const loadPets = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const data = await fetchMyPets();
        setPets(data);
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error.message
            : "Ocurrió un error al cargar tus mascotas.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadPets();
  }, []);

  const handleDelete = useCallback(
    async (petId: string, petName: string) => {
      const result = await Swal.fire({
        title: "¿Eliminar mascota?",
        text: `Se desactivará a ${petName}.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
        focusCancel: true,
        buttonsStyling: false,
        customClass: {
          popup: "rounded-[1.5rem]",
          title: "text-slate-950 text-xl font-semibold",
          htmlContainer: "text-slate-600 text-sm",
          actions: "gap-3",
          confirmButton:
            "inline-flex h-11 items-center justify-center rounded-2xl bg-rose-600 px-5 text-sm font-medium text-white hover:bg-rose-700",
          cancelButton:
            "inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50",
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      try {
        setDeletingPetId(petId);

        await deletePet(petId);

        setPets((currentPets) => currentPets.filter((pet) => pet.id !== petId));

        await Swal.fire({
          title: "Mascota eliminada",
          text: `${petName} fue desactivada correctamente.`,
          icon: "success",
          timer: 1800,
          showConfirmButton: false,
          customClass: {
            popup: "rounded-[1.5rem]",
            title: "text-slate-950 text-xl font-semibold",
            htmlContainer: "text-slate-600 text-sm",
          },
        });

        router.refresh();
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "No fue posible eliminar la mascota.";

        await Swal.fire({
          title: "No se pudo eliminar",
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Entendido",
          buttonsStyling: false,
          customClass: {
            popup: "rounded-[1.5rem]",
            title: "text-slate-950 text-xl font-semibold",
            htmlContainer: "text-slate-600 text-sm",
            confirmButton:
              "inline-flex h-11 items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800",
          },
        });
      } finally {
        setDeletingPetId(null);
      }
    },
    [router],
  );

  const columns = useMemo(
    () =>
      createPetColumns({
        deletingPetId,
        onDelete: handleDelete,
      }),
    [deletingPetId, handleDelete],
  );

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="mx-auto w-full max-w-7xl space-y-5">
          <div className="h-36 w-full rounded-[1.75rem] border border-slate-200 bg-white shadow-sm" />
          <div className="h-[28rem] w-full rounded-[1.75rem] border border-slate-200 bg-white shadow-sm" />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="w-full">
        <div className="mx-auto w-full max-w-7xl">
          <section className="w-full rounded-[1.75rem] border border-rose-200 bg-rose-50 p-6 shadow-sm">
            <div className="flex items-start gap-3 text-rose-600">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <h2 className="text-lg font-semibold">
                  No fue posible cargar tus mascotas
                </h2>
                <p className="mt-2 text-sm leading-6">{loadError}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!pets.length) {
    return <PetEmptyState />;
  }

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        <section className="w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
          </div>
        </section>

        <section className="w-full rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-slate-950">
              Mascotas registradas
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Gestiona la información de tus mascotas desde una sola vista.
            </p>
          </div>

          <DataTable
            columns={columns}
            data={pets}
            filterKey="name"
            filterPlaceholder="Buscar por nombre..."
          />
        </section>
      </div>
    </div>
  );
}