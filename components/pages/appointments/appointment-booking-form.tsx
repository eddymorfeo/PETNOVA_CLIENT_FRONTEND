"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Info,
  Mail,
  PawPrint,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { Controller, useForm, useWatch } from "react-hook-form";

import { fetchMyPets } from "@/api/pets/pets.api";
import type { PetItem } from "@/types/pets/pet.types";
import {
  createAuthenticatedAppointment,
  fetchAuthenticatedClient,
  type AuthClientProfile,
} from "@/api/appointments/appointments.api";
import { useAppointmentGuestAvailability } from "@/hooks/appointment-guest/use-appointment-guest-availability";
import { useAppointmentGuestCatalogs } from "@/hooks/appointment-guest/use-appointment-guest-catalogs";
import { withProcessToast } from "@/lib/feedback/process-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AppointmentBookingFormValues = {
  petId: string;
  appointmentTypeId: string;
  veterinarianId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  observations: string;
};

type AppointmentBookingFormProps = {
  onCreated?: () => Promise<void> | void;
};

const EMPTY_SELECT_VALUE = "__empty__";

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

const selectTriggerClassName =
  "!h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition focus:ring-2 focus:ring-cyan-200 focus:ring-offset-0";

const selectContentClassName =
  "rounded-xl border border-slate-200 bg-white shadow-xl";

export function AppointmentBookingForm({
  onCreated,
}: AppointmentBookingFormProps) {
  const [client, setClient] = useState<AuthClientProfile | null>(null);
  const [pets, setPets] = useState<PetItem[]>([]);
  const [isBootLoading, setIsBootLoading] = useState(true);
  const [bootError, setBootError] = useState("");

  const form = useForm<AppointmentBookingFormValues>({
    defaultValues: {
      petId: "",
      appointmentTypeId: "",
      veterinarianId: "",
      appointmentDate: "",
      appointmentTime: "",
      reason: "",
      observations: "",
    },
  });

  const selectedPetId = useWatch({ control: form.control, name: "petId" });
  const selectedVeterinarianId = useWatch({
    control: form.control,
    name: "veterinarianId",
  });
  const selectedAppointmentDate = useWatch({
    control: form.control,
    name: "appointmentDate",
  });
  const selectedAppointmentTypeId = useWatch({
    control: form.control,
    name: "appointmentTypeId",
  });

  const { appointmentTypes, veterinarians, isLoadingCatalogs, catalogsError } =
    useAppointmentGuestCatalogs();

  const { availableTimes, isLoadingTimes, timesError } =
    useAppointmentGuestAvailability({
      veterinarianId: selectedVeterinarianId,
      appointmentDate: selectedAppointmentDate,
    });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsBootLoading(true);
        setBootError("");

        const [clientData, petsData] = await Promise.all([
          fetchAuthenticatedClient(),
          fetchMyPets(),
        ]);

        setClient(clientData);
        setPets(petsData);
      } catch (error) {
        setBootError(
          error instanceof Error
            ? error.message
            : "No fue posible cargar la información de reserva.",
        );
      } finally {
        setIsBootLoading(false);
      }
    };

    void loadInitialData();
  }, []);

  useEffect(() => {
    form.setValue("appointmentTime", "");
  }, [selectedVeterinarianId, selectedAppointmentDate, form]);

  const selectedPet = useMemo(
    () => pets.find((pet) => pet.id === selectedPetId),
    [pets, selectedPetId],
  );

  const selectedVeterinarian = useMemo(
    () => veterinarians.find((item) => item.id === selectedVeterinarianId),
    [veterinarians, selectedVeterinarianId],
  );

  const selectedAppointmentType = useMemo(
    () => appointmentTypes.find((item) => item.id === selectedAppointmentTypeId),
    [appointmentTypes, selectedAppointmentTypeId],
  );

  const inputClassName =
    "h-10 rounded-xl border-slate-200 bg-white px-3 text-sm text-slate-700 shadow-sm";

  const selectTriggerClassName =
    "!h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition focus:ring-2 focus:ring-cyan-200 focus:ring-offset-0";

  const selectContentClassName =
    "rounded-xl border border-slate-200 bg-white shadow-xl";

  const selectItemClassName =
    "text-sm text-slate-700 focus:bg-slate-50 focus:text-slate-900";

  const onSubmit = form.handleSubmit(async (values) => {
    try {
      await withProcessToast(
        () => createAuthenticatedAppointment(values),
        {
          loading: "Registrando cita...",
          success: "Cita registrada correctamente",
          successDescription: "La reserva quedó asociada a tu cuenta.",
          error: "No fue posible registrar la cita",
        },
      );

      form.reset();

      await onCreated?.();
    } catch {
      // El toast de error se muestra en withProcessToast.
    }
  });

  if (isBootLoading) {
    return (
      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div className="h-6 w-56 rounded bg-slate-100" />
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
    <section
      id="reservar-cita"
      className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
          <CalendarDays className="h-4 w-4" />
        </div>

        <div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">
            Reservar cita
          </h3>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            La reserva se asociará automáticamente a tu cuenta y a una de tus
            mascotas registradas.
          </p>
        </div>
      </div>

      {bootError && (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
          {bootError}
        </div>
      )}

      {catalogsError && (
        <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
          {catalogsError}
        </div>
      )}

      <form onSubmit={onSubmit} className="mt-6 space-y-6">
        <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <section className="rounded-[1.25rem] border border-slate-200 bg-slate-50/60 p-5">
              <div className="mb-4 flex items-center gap-2">
                <UserRound className="h-4 w-4 text-cyan-700" />
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">
                  Datos del cliente
                </h4>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel>Nombre</FieldLabel>
                  <Input
                    value={client?.fullName ?? ""}
                    disabled
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Correo</FieldLabel>
                  <Input
                    value={client?.email ?? ""}
                    disabled
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Teléfono</FieldLabel>
                  <Input
                    value={client?.phone ?? ""}
                    disabled
                    className={inputClassName}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Documento</FieldLabel>
                  <Input
                    value={client?.documentId ?? ""}
                    disabled
                    className={inputClassName}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[1.25rem] border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center gap-2">
                <PawPrint className="h-4 w-4 text-cyan-700" />
                <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-700">
                  Datos de la cita
                </h4>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <FieldLabel>Mascota</FieldLabel>
                  <Controller
                    control={form.control}
                    name="petId"
                    rules={{ required: "Debes seleccionar una mascota." }}
                    render={({ field }) => (
                      <Select
                        value={field.value || EMPTY_SELECT_VALUE}
                        onValueChange={(value) =>
                          field.onChange(
                            value === EMPTY_SELECT_VALUE ? "" : value,
                          )
                        }
                        disabled={!pets.length}
                      >
                        <SelectTrigger className={selectTriggerClassName}>
                          <SelectValue
                            placeholder={
                              pets.length
                                ? "Seleccionar una opción"
                                : "No tienes mascotas registradas"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className={selectContentClassName}>
                          {pets.length > 0 && (
                            <SelectItem
                              value={EMPTY_SELECT_VALUE}
                              className={selectItemClassName}
                            >
                              Seleccionar una opción
                            </SelectItem>
                          )}
                          {pets.map((pet) => (
                            <SelectItem
                              key={pet.id}
                              value={pet.id}
                              className={selectItemClassName}
                            >
                              {pet.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Tipo de atención</FieldLabel>
                  <Controller
                    control={form.control}
                    name="appointmentTypeId"
                    rules={{ required: "Debes seleccionar un tipo de atención." }}
                    render={({ field }) => (
                      <Select
                        value={field.value || EMPTY_SELECT_VALUE}
                        onValueChange={(value) =>
                          field.onChange(
                            value === EMPTY_SELECT_VALUE ? "" : value,
                          )
                        }
                        disabled={isLoadingCatalogs}
                      >
                        <SelectTrigger className={selectTriggerClassName}>
                          <SelectValue placeholder="Seleccionar una opción" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClassName}>
                          <SelectItem
                            value={EMPTY_SELECT_VALUE}
                            className={selectItemClassName}
                          >
                            Seleccionar una opción
                          </SelectItem>
                          {appointmentTypes.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id}
                              className={selectItemClassName}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Veterinario</FieldLabel>
                  <Controller
                    control={form.control}
                    name="veterinarianId"
                    rules={{ required: "Debes seleccionar un veterinario." }}
                    render={({ field }) => (
                      <Select
                        value={field.value || EMPTY_SELECT_VALUE}
                        onValueChange={(value) =>
                          field.onChange(
                            value === EMPTY_SELECT_VALUE ? "" : value,
                          )
                        }
                        disabled={isLoadingCatalogs}
                      >
                        <SelectTrigger className={selectTriggerClassName}>
                          <SelectValue placeholder="Seleccionar una opción" />
                        </SelectTrigger>
                        <SelectContent className={selectContentClassName}>
                          <SelectItem
                            value={EMPTY_SELECT_VALUE}
                            className={selectItemClassName}
                          >
                            Seleccionar una opción
                          </SelectItem>
                          {veterinarians.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id}
                              className={selectItemClassName}
                            >
                              {item.fullName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor="appointmentDate">Fecha</FieldLabel>
                  <Input
                    id="appointmentDate"
                    type="date"
                    className={inputClassName}
                    {...form.register("appointmentDate", {
                      required: "Debes seleccionar una fecha.",
                    })}
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel>Horario disponible</FieldLabel>
                  <Controller
                    control={form.control}
                    name="appointmentTime"
                    rules={{ required: "Debes seleccionar un horario." }}
                    render={({ field }) => (
                      <Select
                        value={field.value || EMPTY_SELECT_VALUE}
                        onValueChange={(value) =>
                          field.onChange(
                            value === EMPTY_SELECT_VALUE ? "" : value,
                          )
                        }
                        disabled={
                          !selectedVeterinarianId ||
                          !selectedAppointmentDate ||
                          isLoadingTimes
                        }
                      >
                        <SelectTrigger className={selectTriggerClassName}>
                          <SelectValue
                            placeholder={
                              isLoadingTimes
                                ? "Cargando horarios..."
                                : "Seleccionar una opción"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className={selectContentClassName}>
                          {!isLoadingTimes && (
                            <SelectItem
                              value={EMPTY_SELECT_VALUE}
                              className={selectItemClassName}
                            >
                              Seleccionar una opción
                            </SelectItem>
                          )}
                          {availableTimes.map((item) => (
                            <SelectItem
                              key={item.value}
                              value={item.value}
                              className={selectItemClassName}
                            >
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {timesError && (
                    <p className="text-xs text-rose-600">{timesError}</p>
                  )}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <FieldLabel htmlFor="reason">Motivo de la consulta</FieldLabel>
                  <Textarea
                    id="reason"
                    placeholder="Describe brevemente el motivo de la atención"
                    className="min-h-[110px] rounded-[1.25rem] border-slate-200 bg-white px-4 py-3"
                    {...form.register("reason", {
                      required: "Debes indicar el motivo de la consulta.",
                    })}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <FieldLabel htmlFor="observations">Observaciones</FieldLabel>
                  <Textarea
                    id="observations"
                    placeholder="Información adicional opcional"
                    className="min-h-[120px] rounded-[1.25rem] border-slate-200 bg-white px-4 py-3"
                    {...form.register("observations")}
                  />
                </div>
              </div>
            </section>

            <div className="rounded-[1.25rem] border border-slate-200 bg-white px-5 py-5 shadow-sm">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">
                      Confirmación asociada a tu cuenta
                    </p>
                    <p className="mt-1 leading-6">
                      La reserva quedará vinculada a tu sesión y a la mascota que
                      selecciones.
                    </p>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting || !pets.length}
                  className="h-11 rounded-full bg-slate-950 px-8 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
                >
                  {form.formState.isSubmitting
                    ? "Registrando..."
                    : "Confirmar reserva"}
                </Button>
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/70 px-4 py-4 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
                <p className="leading-6">
                  La disponibilidad depende del profesional seleccionado, la fecha
                  y los bloques actualmente disponibles en el sistema.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    Datos de la reserva
                  </h3>
                  <p className="text-sm text-slate-500">
                    Revisa lo seleccionado antes de confirmar.
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Mascota
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {selectedPet?.name || "Selecciona una mascota"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Veterinario
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {selectedVeterinarian?.fullName || "Sin seleccionar"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Tipo de atención
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {selectedAppointmentType?.name || "Sin seleccionar"}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Fecha y hora
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    {selectedAppointmentDate || "Sin fecha"}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {form.watch("appointmentTime") || "Sin horario"}
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </form>
    </section>
  );
}
