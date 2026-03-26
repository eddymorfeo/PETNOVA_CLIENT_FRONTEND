"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createGuestAppointment } from "@/api/appointment-guest/appointment-guest.api";
import { mapAppointmentGuestFormToRequest } from "@/api/appointment-guest/appointment-guest.mapper";
import {
  appointmentGuestSchema,
  type AppointmentGuestSchemaData,
} from "@/schemas/appointment-guest/appointment-guest.schema";

const defaultValues: AppointmentGuestSchemaData = {
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  petName: "",
  petSpecies: "",
  petBreed: "",
  petSex: "",
  petAge: "",
  petWeightKg: "",
  appointmentTypeId: "",
  veterinarianId: "",
  appointmentDate: "",
  appointmentTime: "",
  reason: "",
  observations: "",
};

export function useAppointmentGuestForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccessMessage, setSubmitSuccessMessage] = useState<string | null>(null);

  const form = useForm<AppointmentGuestSchemaData>({
    resolver: zodResolver(appointmentGuestSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const onSubmit = form.handleSubmit(async (formData) => {
    setSubmitError(null);
    setSubmitSuccessMessage(null);

    try {
      const payload = mapAppointmentGuestFormToRequest(formData);
      const response = await createGuestAppointment(payload);

      setSubmitSuccessMessage(
        response.message || "Reserva registrada correctamente."
      );

      form.reset(defaultValues);
      form.clearErrors();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "No fue posible registrar la reserva.";

      setSubmitError(errorMessage);
    }
  });

  return useMemo(
    () => ({
      form,
      onSubmit,
      submitError,
      submitSuccessMessage,
      isSubmitting: form.formState.isSubmitting,
    }),
    [form, onSubmit, submitError, submitSuccessMessage]
  );
}