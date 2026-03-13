"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, PawPrint, Save } from "lucide-react";

import {
  fetchBreedOptions,
  fetchPetById,
  fetchSpeciesOptions,
  updatePet,
} from "@/api/pets/pets.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type {
  BreedOption,
  PetSex,
  SpeciesOption,
} from "@/types/pets/pet.types";

export function PetEditForm({ petId }: { petId: string }) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [speciesId, setSpeciesId] = useState("");
  const [breedId, setBreedId] = useState("");
  const [sex, setSex] = useState<PetSex>("UNKNOWN");
  const [birthDate, setBirthDate] = useState("");
  const [color, setColor] = useState("");
  const [microchip, setMicrochip] = useState("");
  const [isSterilized, setIsSterilized] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [notes, setNotes] = useState("");

  const [species, setSpecies] = useState<SpeciesOption[]>([]);
  const [breeds, setBreeds] = useState<BreedOption[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setSubmitError("");

        const [pet, speciesData, breedsData] = await Promise.all([
          fetchPetById(petId),
          fetchSpeciesOptions(),
          fetchBreedOptions(),
        ]);

        setName(pet.name ?? "");
        setSpeciesId(pet.speciesId ?? "");
        setBreedId(pet.breedId ?? "");
        setSex((pet.sex as PetSex) ?? "UNKNOWN");
        setBirthDate(pet.birthDate ?? "");
        setColor(pet.color ?? "");
        setMicrochip(pet.microchip ?? "");
        setIsSterilized(Boolean(pet.isSterilized));
        setAllergies(pet.allergies ?? "");
        setNotes(pet.notes ?? "");

        setSpecies(speciesData);
        setBreeds(breedsData);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar la mascota.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [petId]);

  const filteredBreeds = useMemo(() => {
    if (!speciesId) return breeds;
    return breeds.filter((breed) => breed.speciesId === speciesId);
  }, [breeds, speciesId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    if (!name.trim()) {
      setSubmitError("Debes ingresar el nombre de la mascota.");
      return;
    }

    if (!sex || sex === "UNKNOWN") {
      setSubmitError("Debes seleccionar el sexo de la mascota.");
      return;
    }

    if (!speciesId) {
      setSubmitError("Debes seleccionar la especie de la mascota.");
      return;
    }

    if (!birthDate) {
      setSubmitError("Debes ingresar la fecha de nacimiento.");
      return;
    }

    try {
      setIsSaving(true);

      await updatePet(petId, {
        name: name.trim(),
        speciesId,
        breedId,
        sex,
        birthDate,
        color: color.trim() || null,
        microchip: microchip.trim() || null,
        isSterilized,
        allergies: allergies.trim() || null,
        notes: notes.trim() || null,
      });

      setSubmitSuccess("Mascota actualizada correctamente.");

      setTimeout(() => {
        router.push("/home/pets");
        router.refresh();
      }, 1200);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No fue posible actualizar la mascota.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="h-6 w-48 rounded bg-slate-100" />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
            <div className="h-20 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
            <PawPrint className="h-4.5 w-4.5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Editar mascota
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Actualiza la información principal de la mascota registrada.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Nombre <span className="text-rose-500">*</span>
              </label>
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="h-11 rounded-2xl border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Sexo <span className="text-rose-500">*</span>
              </label>
              <select
                value={sex}
                onChange={(event) => setSex(event.target.value as PetSex)}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="UNKNOWN">No informado</option>
                <option value="MALE">Macho</option>
                <option value="FEMALE">Hembra</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Especie <span className="text-rose-500">*</span>
              </label>
              <select
                value={speciesId}
                onChange={(event) => {
                  setSpeciesId(event.target.value);
                  setBreedId("");
                }}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Seleccionar especie</option>
                {species.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Raza</label>
              <select
                value={breedId}
                onChange={(event) => setBreedId(event.target.value)}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="">Seleccionar raza</option>
                {filteredBreeds.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Fecha de nacimiento <span className="text-rose-500">*</span>
              </label>
              <Input
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
                className="h-11 rounded-2xl border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">
                Microchip
              </label>
              <Input
                value={microchip}
                onChange={(event) => setMicrochip(event.target.value)}
                className="h-11 rounded-2xl border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Color</label>
              <Input
                value={color}
                onChange={(event) => setColor(event.target.value)}
                className="h-11 rounded-2xl border-slate-200 bg-white focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                ¿Está esterilizada?
              </label>
              <select
                value={isSterilized ? "YES" : "NO"}
                onChange={(event) => setIsSterilized(event.target.value === "YES")}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
              >
                <option value="NO">No</option>
                <option value="YES">Sí</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Alergias</label>
              <textarea
                value={allergies}
                onChange={(event) => setAllergies(event.target.value)}
                className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">
                Observaciones
              </label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {submitError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
              {submitError}
            </div>
          )}

          {submitSuccess && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
              {submitSuccess}
            </div>
          )}

          <div className="flex justify-end border-t border-slate-200 pt-5">
            <Button
              type="submit"
              disabled={isSaving}
              className="h-11 rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </section>

      <aside className="space-y-5">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Edición de mascota
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Mantén actualizada la información para futuras atenciones, controles y ficha clínica.
          </p>
        </section>
      </aside>
    </div>
  );
}