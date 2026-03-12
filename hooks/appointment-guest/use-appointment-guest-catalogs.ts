"use client";

import { useEffect, useState } from "react";

import {
  fetchPublicAppointmentTypes,
  fetchPublicVeterinarians,
} from "@/api/appointment-guest/appointment-guest.api";
import type {
  AppointmentTypeOption,
  VeterinarianOption,
} from "@/types/appointment-guest/appointment-guest.types";

export function useAppointmentGuestCatalogs() {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentTypeOption[]>([]);
  const [veterinarians, setVeterinarians] = useState<VeterinarianOption[]>([]);
  const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true);
  const [catalogsError, setCatalogsError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCatalogs() {
      try {
        setIsLoadingCatalogs(true);
        setCatalogsError(null);

        const [appointmentTypesResponse, veterinariansResponse] = await Promise.all([
          fetchPublicAppointmentTypes(),
          fetchPublicVeterinarians(),
        ]);

        setAppointmentTypes(appointmentTypesResponse);
        setVeterinarians(veterinariansResponse);
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

  return {
    appointmentTypes,
    veterinarians,
    isLoadingCatalogs,
    catalogsError,
  };
}