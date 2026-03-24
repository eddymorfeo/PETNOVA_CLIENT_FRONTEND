"use client";

import { PawPrint } from "lucide-react";
import type { MedicalRecordPetItem } from "@/types/medical-records/medical-records.types";
import { formatDate } from "./medical-records-helpers";
import { MedicalRecordsEmptyBlock } from "./medical-records-empty-block";

type MedicalRecordsPetsSidebarProps = {
  pets: MedicalRecordPetItem[];
  selectedPetId: string;
  isLoadingPets: boolean;
  onSelectPet: (petId: string) => void;
};

export function MedicalRecordsPetsSidebar({
  pets,
  selectedPetId,
  isLoadingPets,
  onSelectPet,
}: MedicalRecordsPetsSidebarProps) {
  return (
    <aside className="rounded-[1.5rem] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <PawPrint className="h-4 w-4 text-cyan-700" />
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">
          Mascotas
        </h3>
      </div>

      {isLoadingPets ? (
        <div className="space-y-3">
          <div className="h-24 rounded-xl bg-slate-100" />
          <div className="h-24 rounded-xl bg-slate-100" />
          <div className="h-24 rounded-xl bg-slate-100" />
        </div>
      ) : pets.length ? (
        <div className="space-y-3">
          {pets.map((pet) => {
            const isActive = pet.id === selectedPetId;

            return (
              <button
                key={pet.id}
                type="button"
                onClick={() => onSelectPet(pet.id)}
                className={[
                  "w-full rounded-xl border px-4 py-4 text-left transition",
                  isActive
                    ? "border-cyan-200 bg-cyan-50/70 shadow-sm"
                    : "border-slate-200 bg-white hover:bg-slate-50",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-slate-900">
                      {pet.name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {pet.speciesName || "Especie"} · {pet.breedName || "Raza"}
                    </p>
                  </div>

                  <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {pet.consultationsCount}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>{pet.consultationsCount} consultas</span>
                  <span>{formatDate(pet.lastConsultationDate)}</span>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <MedicalRecordsEmptyBlock message="No hay mascotas disponibles para mostrar." />
      )}
    </aside>
  );
}