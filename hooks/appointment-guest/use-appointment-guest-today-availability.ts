"use client";

import { useEffect, useState } from "react";
import { fetchPublicAvailableTimes } from "@/api/appointment-guest/appointment-guest.api";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

type UseAppointmentGuestTodayAvailabilityParams = {
  veterinarianId: string;
};

export function useAppointmentGuestTodayAvailability({
  veterinarianId,
}: UseAppointmentGuestTodayAvailabilityParams) {
  const [hasTodayAvailability, setHasTodayAvailability] = useState(true);
  const [isCheckingTodayAvailability, setIsCheckingTodayAvailability] =
    useState(false);

  useEffect(() => {
    async function checkTodayAvailability() {
      if (!veterinarianId) {
        setHasTodayAvailability(true);
        return;
      }

      try {
        setIsCheckingTodayAvailability(true);

        const todayDate = getTodayDateString();
        const response = await fetchPublicAvailableTimes(
          veterinarianId,
          todayDate,
        );

        setHasTodayAvailability(response.length > 0);
      } catch {
        setHasTodayAvailability(false);
      } finally {
        setIsCheckingTodayAvailability(false);
      }
    }

    void checkTodayAvailability();
  }, [veterinarianId]);

  return {
    hasTodayAvailability,
    isCheckingTodayAvailability,
  };
}