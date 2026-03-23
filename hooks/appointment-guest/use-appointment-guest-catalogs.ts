"use client";

import { useEffect, useState } from "react";

import {
  fetchPublicAppointmentTypes,
  fetchPublicBreedsBySpecies,
  fetchPublicSpecies,
  fetchPublicVeterinarians,
} from "@/api/appointment-guest/appointment-guest.api";

import type {
  AppointmentTypeOption,
  BreedOption,
  SpeciesOption,
  VeterinarianOption,
} from "@/types/appointment-guest/appointment-guest.types";

export function useAppointmentGuestCatalogs(selectedSpeciesId?: string) {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentTypeOption[]>([]);
  const [veterinarians, setVeterinarians] = useState<VeterinarianOption[]>([]);
  const [speciesOptions, setSpeciesOptions] = useState<SpeciesOption[]>([]);
  const [breedOptions, setBreedOptions] = useState<BreedOption[]>([]);
  const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  const [catalogsError, setCatalogsError] = useState<string | null>(null);
  const [breedsError, setBreedsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCatalogs() {
      try {
        setIsLoadingCatalogs(true);
        setCatalogsError(null);

        const [appointmentTypesResponse, veterinariansResponse, speciesResponse] =
          await Promise.all([
            fetchPublicAppointmentTypes(),
            fetchPublicVeterinarians(),
            fetchPublicSpecies(),
          ]);

        setAppointmentTypes(appointmentTypesResponse);
        setVeterinarians(veterinariansResponse);
        setSpeciesOptions(speciesResponse);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "No fue posible cargar los catálogos.";

        setCatalogsError(errorMessage);
      } finally {
        setIsLoadingCatalogs(false);
      }
    }

    void loadCatalogs();
  }, []);

  useEffect(() => {
    async function loadBreeds() {
      if (!selectedSpeciesId) {
        setBreedOptions([]);
        setBreedsError(null);
        return;
      }

      try {
        setIsLoadingBreeds(true);
        setBreedsError(null);

        const breedsResponse = await fetchPublicBreedsBySpecies(selectedSpeciesId);
        setBreedOptions(breedsResponse);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "No fue posible cargar las razas.";

        setBreedsError(errorMessage);
        setBreedOptions([]);
      } finally {
        setIsLoadingBreeds(false);
      }
    }

    void loadBreeds();
  }, [selectedSpeciesId]);

  return {
    appointmentTypes,
    veterinarians,
    speciesOptions,
    breedOptions,
    isLoadingCatalogs,
    isLoadingBreeds,
    catalogsError,
    breedsError,
  };
}
