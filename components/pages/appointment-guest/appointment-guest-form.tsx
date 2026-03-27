"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Dog,
  Mail,
  UserRound,
  Info,
  ShieldCheck,
  Clock3,
  Stethoscope,
  CalendarIcon,
} from "lucide-react";
import { Controller, useWatch } from "react-hook-form";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { useAppointmentGuestAvailability } from "@/hooks/appointment-guest/use-appointment-guest-availability";
import { useAppointmentGuestCatalogs } from "@/hooks/appointment-guest/use-appointment-guest-catalogs";
import { useAppointmentGuestForm } from "@/hooks/appointment-guest/use-appointment-guest-form";
import { useAppointmentGuestTodayAvailability } from "@/hooks/appointment-guest/use-appointment-guest-today-availability";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const EMPTY_OPTION_VALUE = "__empty__";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function parseDateStringToLocalDate(value?: string) {
  if (!value) return undefined;

  const [year, month, day] = value.split("-").map(Number);

  if (!year || !month || !day) return undefined;

  return new Date(year, month - 1, day);
}

function formatDateToYmd(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function normalizeSelectValue(value?: string | null): string {
  return value ?? EMPTY_OPTION_VALUE;
}

function denormalizeSelectValue(value: string): string {
  return value === EMPTY_OPTION_VALUE ? "" : value;
}

function SectionHeader({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
        <Icon className="h-4.5 w-4.5" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-semibold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function FieldLabel({
  htmlFor,
  children,
  required = false,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-medium text-slate-700">
      {children}
      {required && <span className="ml-1 text-rose-500">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-rose-500">{message}</p>;
}

const textareaClassName =
  "w-full rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-cyan-200";

const selectTriggerClassName =
  "!h-10 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition focus:ring-2 focus:ring-cyan-200 focus:ring-offset-0";

const selectContentClassName =
  "rounded-xl border border-slate-200 bg-white shadow-xl";

const selectItemClassName =
  "cursor-pointer rounded-lg text-sm text-slate-700 outline-none focus:bg-cyan-50 focus:text-slate-900 data-[state=checked]:bg-cyan-50 data-[state=checked]:text-slate-900";

export function AppointmentGuestForm() {
  const { form, onSubmit, isSubmitting, submitError, submitSuccessMessage } =
    useAppointmentGuestForm();

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const selectedSpeciesId = useWatch({
    control: form.control,
    name: "petSpecies",
  });

  const selectedVeterinarianId = useWatch({
    control: form.control,
    name: "veterinarianId",
  });

  const selectedAppointmentDate = useWatch({
    control: form.control,
    name: "appointmentDate",
  });

  const selectedPetName = useWatch({
    control: form.control,
    name: "petName",
  });

  const {
    appointmentTypes,
    veterinarians,
    speciesOptions,
    breedOptions,
    isLoadingCatalogs,
    isLoadingBreeds,
    catalogsError,
    breedsError,
  } = useAppointmentGuestCatalogs(selectedSpeciesId);

  const { availableTimes, isLoadingTimes, timesError } =
    useAppointmentGuestAvailability({
      veterinarianId: selectedVeterinarianId,
      appointmentDate: selectedAppointmentDate,
    });

  const { hasTodayAvailability, isCheckingTodayAvailability } =
    useAppointmentGuestTodayAvailability({
      veterinarianId: selectedVeterinarianId,
    });

  const shouldBlockTodaySelection =
    !!selectedVeterinarianId &&
    !isCheckingTodayAvailability &&
    !hasTodayAvailability;

  const shouldShowAppointmentTimeError =
    !!form.formState.errors.appointmentTime &&
    (!!form.formState.touchedFields.appointmentTime ||
      form.formState.submitCount > 0);

  const todayDate = getTodayDateString();
  const todayDateObject = startOfDay(new Date());

  const hasAvailableTimes = availableTimes.length > 0;
  const canSelectAppointmentTime =
    !!selectedVeterinarianId &&
    !!selectedAppointmentDate &&
    !isLoadingTimes &&
    hasAvailableTimes;

  useEffect(() => {
    form.setValue("petBreed", "", {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    form.clearErrors("petBreed");
  }, [selectedSpeciesId, form]);

  useEffect(() => {
    form.setValue("appointmentTime", "", {
      shouldValidate: false,
      shouldDirty: false,
      shouldTouch: false,
    });
    form.clearErrors("appointmentTime");
  }, [selectedVeterinarianId, selectedAppointmentDate, form]);

  useEffect(() => {
    if (!selectedVeterinarianId || !selectedAppointmentDate) {
      return;
    }

    const isTodaySelected = selectedAppointmentDate === todayDate;

    if (isTodaySelected && shouldBlockTodaySelection) {
      form.setValue("appointmentDate", "", {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      form.setValue("appointmentTime", "", {
        shouldValidate: false,
        shouldDirty: false,
        shouldTouch: false,
      });

      form.setError("appointmentDate", {
        type: "manual",
        message:
          "Hoy ya no hay horarios disponibles para el veterinario seleccionado. Debes elegir otra fecha.",
      });
    }
  }, [
    selectedVeterinarianId,
    selectedAppointmentDate,
    todayDate,
    shouldBlockTodaySelection,
    form,
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay: 0.08 }}
      className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
    >
      <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50/80 via-white to-sky-50/70 px-6 py-7 lg:px-7">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/95 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm">
          <Stethoscope className="h-3.5 w-3.5" />
          Formulario de reserva
        </div>

        <h2 className="mt-4 text-[1.9rem] font-bold tracking-tight text-slate-950 lg:text-[2.2rem]">
          Completa los datos de la reserva
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Ingresa los datos del tutor, de la mascota y selecciona una fecha con
          horario disponible. Luego podrás confirmar la reserva y recibir la
          notificación por correo electrónico.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 px-6 py-6 lg:px-7">
        {catalogsError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {catalogsError}
          </div>
        )}

        <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
          <SectionHeader
            icon={CalendarDays}
            title="Datos de la cita"
            description="Selecciona mascota, tipo de atención, profesional, fecha y bloque disponible."
          />

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <FieldLabel>Mascota</FieldLabel>
              <Controller
                control={form.control}
                name="petName"
                render={({ field }) => (
                  <Select
                    value={normalizeSelectValue(field.value)}
                    onValueChange={(value) =>
                      field.onChange(denormalizeSelectValue(value))
                    }
                  >
                    <SelectTrigger className={selectTriggerClassName}>
                      <SelectValue placeholder="Seleccionar una opción" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                      <SelectItem
                        value={EMPTY_OPTION_VALUE}
                        className={selectItemClassName}
                      >
                        Seleccionar una opción
                      </SelectItem>

                      {selectedPetName ? null : null}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel required>Tipo de atención</FieldLabel>
              <Controller
                control={form.control}
                name="appointmentTypeId"
                render={({ field }) => (
                  <Select
                    value={normalizeSelectValue(field.value)}
                    onValueChange={(value) =>
                      field.onChange(denormalizeSelectValue(value))
                    }
                    disabled={isLoadingCatalogs}
                  >
                    <SelectTrigger className={selectTriggerClassName}>
                      <SelectValue placeholder="Seleccionar una opción" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                      <SelectItem
                        value={EMPTY_OPTION_VALUE}
                        className={selectItemClassName}
                      >
                        Seleccionar una opción
                      </SelectItem>

                      {appointmentTypes.map((appointmentType) => (
                        <SelectItem
                          key={appointmentType.id}
                          value={appointmentType.id}
                          className={selectItemClassName}
                        >
                          {appointmentType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError
                message={form.formState.errors.appointmentTypeId?.message}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel required>Veterinario</FieldLabel>
              <Controller
                control={form.control}
                name="veterinarianId"
                render={({ field }) => (
                  <Select
                    value={normalizeSelectValue(field.value)}
                    onValueChange={(value) =>
                      field.onChange(denormalizeSelectValue(value))
                    }
                    disabled={isLoadingCatalogs}
                  >
                    <SelectTrigger className={selectTriggerClassName}>
                      <SelectValue placeholder="Seleccionar una opción" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClassName}>
                      <SelectItem
                        value={EMPTY_OPTION_VALUE}
                        className={selectItemClassName}
                      >
                        Seleccionar una opción
                      </SelectItem>

                      {veterinarians.map((veterinarian) => (
                        <SelectItem
                          key={veterinarian.id}
                          value={veterinarian.id}
                          className={selectItemClassName}
                        >
                          {veterinarian.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError
                message={form.formState.errors.veterinarianId?.message}
              />
            </div>

            <div className="space-y-2">
              <FieldLabel required>Fecha</FieldLabel>

              <Controller
                control={form.control}
                name="appointmentDate"
                render={({ field }) => {
                  const selectedDate = parseDateStringToLocalDate(field.value);

                  return (
                    <Popover
                      open={isDatePickerOpen}
                      onOpenChange={setIsDatePickerOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "h-10 w-full justify-between rounded-xl border-slate-200 bg-white px-4 text-left text-sm font-normal text-slate-700 shadow-sm hover:bg-white",
                            !field.value && "text-slate-400",
                          )}
                        >
                          {selectedDate ? (
                            format(selectedDate, "dd-MM-yyyy", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}

                          <CalendarIcon className="h-4 w-4 shrink-0 text-slate-500" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent
                        className="w-auto rounded-xl border border-slate-200 bg-white p-0 shadow-xl"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          locale={es}
                          onSelect={(date) => {
                            if (!date) {
                              field.onChange("");
                              return;
                            }

                            const normalizedDate = startOfDay(date);
                            const nextValue = formatDateToYmd(normalizedDate);
                            const isTodaySelected = nextValue === todayDate;

                            if (isTodaySelected && shouldBlockTodaySelection) {
                              form.setError("appointmentDate", {
                                type: "manual",
                                message:
                                  "Hoy ya no hay horarios disponibles para el veterinario seleccionado. Debes elegir otra fecha.",
                              });

                              field.onChange("");
                              setIsDatePickerOpen(false);
                              return;
                            }

                            form.clearErrors("appointmentDate");
                            field.onChange(nextValue);
                            setIsDatePickerOpen(false);
                          }}
                          disabled={(date) => {
                            const normalizedDate = startOfDay(date);

                            if (normalizedDate < todayDateObject) {
                              return true;
                            }

                            if (
                              shouldBlockTodaySelection &&
                              normalizedDate.getTime() ===
                                todayDateObject.getTime()
                            ) {
                              return true;
                            }

                            return false;
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />

              <FieldError
                message={form.formState.errors.appointmentDate?.message}
              />

              {!!selectedVeterinarianId &&
                !isCheckingTodayAvailability &&
                !hasTodayAvailability && (
                  <p className="text-sm text-amber-600">
                    Hoy ya no quedan horarios disponibles para el veterinario
                    seleccionado.
                  </p>
                )}
            </div>

            <div className="space-y-2">
              <FieldLabel required>Horario disponible</FieldLabel>
              <Controller
                control={form.control}
                name="appointmentTime"
                render={({ field }) => (
                  <Select
                    value={normalizeSelectValue(field.value)}
                    onValueChange={(value) =>
                      field.onChange(denormalizeSelectValue(value))
                    }
                    disabled={!canSelectAppointmentTime}
                  >
                    <SelectTrigger className={selectTriggerClassName}>
                      <SelectValue
                        placeholder={
                          !selectedVeterinarianId || !selectedAppointmentDate
                            ? "Selecciona veterinario y fecha"
                            : isLoadingTimes
                              ? "Cargando horarios..."
                              : hasAvailableTimes
                                ? "Seleccionar una opción"
                                : "No hay horarios disponibles"
                        }
                      />
                    </SelectTrigger>

                    <SelectContent className={selectContentClassName}>
                      {availableTimes.map((timeOption) => (
                        <SelectItem
                          key={timeOption.value}
                          value={timeOption.value}
                          className={selectItemClassName}
                        >
                          {timeOption.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {timesError && <FieldError message={timesError} />}

              {!timesError &&
                selectedVeterinarianId &&
                selectedAppointmentDate &&
                !isLoadingTimes &&
                !hasAvailableTimes && (
                  <p className="text-sm text-amber-600">
                    No existen horarios disponibles para el veterinario y la
                    fecha seleccionados.
                  </p>
                )}

              {shouldShowAppointmentTimeError && (
                <FieldError
                  message={form.formState.errors.appointmentTime?.message}
                />
              )}
            </div>

            <div className="space-y-2 md:col-span-2">
              <FieldLabel htmlFor="reason">Motivo de la consulta</FieldLabel>
              <Textarea
                id="reason"
                placeholder="Describe brevemente el motivo de la atención"
                className={textareaClassName}
                rows={4}
                {...form.register("reason")}
              />
              <FieldError message={form.formState.errors.reason?.message} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <FieldLabel htmlFor="observations">Observaciones</FieldLabel>
              <Textarea
                id="observations"
                placeholder="Información adicional opcional"
                className={textareaClassName}
                rows={4}
                {...form.register("observations")}
              />
              <FieldError
                message={form.formState.errors.observations?.message}
              />
            </div>
          </div>
        </section>

        {submitError && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
            {submitError}
          </div>
        )}

        {submitSuccessMessage && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
            {submitSuccessMessage}
          </div>
        )}

        <div className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3 text-sm text-slate-600">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-slate-800">
                  Confirmación por correo electrónico
                </p>
                <p className="mt-1 leading-6">
                  Recibirás el detalle de tu reserva una vez que el registro se
                  complete correctamente.
                </p>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={
                isSubmitting ||
                (Boolean(selectedVeterinarianId) &&
                  Boolean(selectedAppointmentDate) &&
                  !isLoadingTimes &&
                  !hasAvailableTimes)
              }
              className="h-11 rounded-full bg-slate-950 px-7 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,23,42,0.16)] transition hover:bg-slate-800"
            >
              {isSubmitting ? "Registrando..." : "Confirmar reserva"}
            </Button>
          </div>
        </div>

        <div className="rounded-[1.25rem] border border-cyan-100 bg-cyan-50/70 px-4 py-3.5 text-sm text-slate-600">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
            <p className="leading-6">
              La disponibilidad depende del profesional seleccionado, la fecha y
              los bloques actualmente disponibles en el sistema.
            </p>
          </div>
        </div>
      </form>
    </motion.div>
  );
}