"use client";

import { useEffect, useState } from "react";

import { fetchPublicAvailableTimes } from "@/api/appointment-guest/appointment-guest.api";
import type { AvailableTimeOption } from "@/types/appointment-guest/appointment-guest.types";

type UseAppointmentGuestAvailabilityParams = {
  veterinarianId: string;
  appointmentDate: string;
};

export function useAppointmentGuestAvailability({
  veterinarianId,
  appointmentDate,
}: UseAppointmentGuestAvailabilityParams) {
  const [availableTimes, setAvailableTimes] = useState<AvailableTimeOption[]>([]);
  const [isLoadingTimes, setIsLoadingTimes] = useState(false);
  const [timesError, setTimesError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAvailableTimes() {
      if (!veterinarianId || !appointmentDate) {
        setAvailableTimes([]);
        return;
      }

      try {
        setIsLoadingTimes(true);
        setTimesError(null);

        const response = await fetchPublicAvailableTimes(veterinarianId, appointmentDate);
        setAvailableTimes(response);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "No fue posible cargar los horarios disponibles.";
        setTimesError(errorMessage);
        setAvailableTimes([]);
      } finally {
        setIsLoadingTimes(false);
      }
    }

    void loadAvailableTimes();
  }, [veterinarianId, appointmentDate]);

  return {
    availableTimes,
    isLoadingTimes,
    timesError,
  };
}