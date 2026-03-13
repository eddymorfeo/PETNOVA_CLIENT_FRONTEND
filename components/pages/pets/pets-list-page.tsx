"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";

import { fetchMyPets } from "@/api/pets/pets.api";
import type { PetItem } from "@/types/pets/pet.types";
import { PetEmptyState } from "./pet-empty-state";
import { PetsListTable } from "./pets-list-table";

export function PetsListPage() {
  const [pets, setPets] = useState<PetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

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

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="h-36 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm" />
        <div className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
          <div className="space-y-4 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="h-28 rounded-2xl bg-slate-100" />
            <div className="h-28 rounded-2xl bg-slate-100" />
            <div className="h-28 rounded-2xl bg-slate-100" />
          </div>
          <div className="space-y-5">
            <div className="h-56 rounded-[1.75rem] border border-slate-200 bg-white shadow-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <section className="rounded-[1.75rem] border border-rose-200 bg-rose-50 p-6 shadow-sm">
        <div className="flex items-start gap-3 text-rose-600">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <h2 className="text-lg font-semibold">No fue posible cargar tus mascotas</h2>
            <p className="mt-2 text-sm leading-6">{loadError}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!pets.length) {
    return <PetEmptyState />;
  }

  return <PetsListTable pets={pets} />;
}