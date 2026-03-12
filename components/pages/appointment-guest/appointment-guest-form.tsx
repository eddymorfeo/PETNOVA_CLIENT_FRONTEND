"use client";

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
} from "lucide-react";
import { Controller, useWatch } from "react-hook-form";

import { useAppointmentGuestAvailability } from "@/hooks/appointment-guest/use-appointment-guest-availability";
import { useAppointmentGuestCatalogs } from "@/hooks/appointment-guest/use-appointment-guest-catalogs";
import { useAppointmentGuestForm } from "@/hooks/appointment-guest/use-appointment-guest-form";

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
    <div className="flex items-start gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
        <Icon className="h-5 w-5" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
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
}: {
  htmlFor?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="text-sm font-medium text-slate-700"
    >
      {children}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="text-sm text-rose-500">{message}</p>;
}

export function AppointmentGuestForm() {
  const {
    form,
    onSubmit,
    isSubmitting,
    submitError,
    submitSuccessMessage,
  } = useAppointmentGuestForm();

  const selectedVeterinarianId = useWatch({
    control: form.control,
    name: "veterinarianId",
  });

  const selectedAppointmentDate = useWatch({
    control: form.control,
    name: "appointmentDate",
  });

  const {
    appointmentTypes,
    veterinarians,
    isLoadingCatalogs,
    catalogsError,
  } = useAppointmentGuestCatalogs();

  const {
    availableTimes,
    isLoadingTimes,
    timesError,
  } = useAppointmentGuestAvailability({
    veterinarianId: selectedVeterinarianId,
    appointmentDate: selectedAppointmentDate,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
      className="overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
    >
      <div className="border-b border-slate-200 bg-gradient-to-r from-cyan-50 via-white to-sky-50 px-6 py-8 lg:px-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 shadow-sm">
          <Stethoscope className="h-3.5 w-3.5" />
          Formulario de reserva
        </div>

        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 lg:text-3xl">
          Completa los datos de la reserva
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Ingresa los datos del tutor, de la mascota y selecciona una fecha con
          horario disponible. Luego podrás confirmar la reserva y recibir la
          notificación por correo electrónico.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
            <ShieldCheck className="h-4 w-4 text-cyan-700" />
            Reserva pública segura
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700">
            <Clock3 className="h-4 w-4 text-cyan-700" />
            Confirmación por correo
          </div>
        </div>
      </div>

      <div className="px-6 py-8 lg:px-8">
        {catalogsError && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-700">
            {catalogsError}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-8">
          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50/60 p-5 lg:p-6">
            <SectionHeader
              icon={UserRound}
              title="Datos de contacto"
              description="Información principal del tutor o persona que solicita la atención."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="contactName">Nombre completo</FieldLabel>
                <Input
                  id="contactName"
                  placeholder="Ingresa tu nombre"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("contactName")}
                />
                <FieldError message={form.formState.errors.contactName?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="contactEmail">Correo electrónico</FieldLabel>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("contactEmail")}
                />
                <FieldError message={form.formState.errors.contactEmail?.message} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <FieldLabel htmlFor="contactPhone">Teléfono</FieldLabel>
                <Input
                  id="contactPhone"
                  placeholder="+56 9 ..."
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("contactPhone")}
                />
                <FieldError message={form.formState.errors.contactPhone?.message} />
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-white p-5 lg:p-6">
            <SectionHeader
              icon={Dog}
              title="Datos de la mascota"
              description="Completa la información básica del paciente que será atendido."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel htmlFor="petName">Nombre de la mascota</FieldLabel>
                <Input
                  id="petName"
                  placeholder="Ej: Luna"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("petName")}
                />
                <FieldError message={form.formState.errors.petName?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel>Especie</FieldLabel>
                <Controller
                  control={form.control}
                  name="petSpecies"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm focus:ring-2 focus:ring-cyan-200">
                        <SelectValue placeholder="Selecciona la especie" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        <SelectItem value="dog">Perro</SelectItem>
                        <SelectItem value="cat">Gato</SelectItem>
                        <SelectItem value="other">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError message={form.formState.errors.petSpecies?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="petBreed">Raza</FieldLabel>
                <Input
                  id="petBreed"
                  placeholder="Ej: Mestizo"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("petBreed")}
                />
                <FieldError message={form.formState.errors.petBreed?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="petSex">Sexo</FieldLabel>
                <Input
                  id="petSex"
                  placeholder="Ej: Hembra"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("petSex")}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="petAge">Edad aproximada</FieldLabel>
                <Input
                  id="petAge"
                  placeholder="Ej: 2 años"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("petAge")}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="petWeightKg">Peso aproximado</FieldLabel>
                <Input
                  id="petWeightKg"
                  placeholder="Ej: 12 kg"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("petWeightKg")}
                />
              </div>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-slate-200 bg-slate-50/60 p-5 lg:p-6">
            <SectionHeader
              icon={CalendarDays}
              title="Atención y horario"
              description="Selecciona el tipo de atención, profesional, fecha y bloque disponible."
            />

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel>Tipo de atención</FieldLabel>
                <Controller
                  control={form.control}
                  name="appointmentTypeId"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoadingCatalogs}
                    >
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm focus:ring-2 focus:ring-cyan-200">
                        <SelectValue placeholder="Selecciona el tipo de atención" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {appointmentTypes.map((appointmentType) => (
                          <SelectItem key={appointmentType.id} value={appointmentType.id}>
                            {appointmentType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError message={form.formState.errors.appointmentTypeId?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel>Veterinario</FieldLabel>
                <Controller
                  control={form.control}
                  name="veterinarianId"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoadingCatalogs}
                    >
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm focus:ring-2 focus:ring-cyan-200">
                        <SelectValue placeholder="Selecciona un profesional" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {veterinarians.map((veterinarian) => (
                          <SelectItem key={veterinarian.id} value={veterinarian.id}>
                            {veterinarian.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError message={form.formState.errors.veterinarianId?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor="appointmentDate">Fecha</FieldLabel>
                <Input
                  id="appointmentDate"
                  type="date"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("appointmentDate")}
                />
                <FieldError message={form.formState.errors.appointmentDate?.message} />
              </div>

              <div className="space-y-2">
                <FieldLabel>Horario disponible</FieldLabel>
                <Controller
                  control={form.control}
                  name="appointmentTime"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={
                        !selectedVeterinarianId ||
                        !selectedAppointmentDate ||
                        isLoadingTimes
                      }
                    >
                      <SelectTrigger className="h-12 rounded-2xl border-slate-200 bg-white px-4 shadow-sm focus:ring-2 focus:ring-cyan-200">
                        <SelectValue
                          placeholder={
                            isLoadingTimes
                              ? "Cargando horarios..."
                              : "Selecciona un bloque"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl">
                        {availableTimes.map((timeOption) => (
                          <SelectItem key={timeOption.value} value={timeOption.value}>
                            {timeOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError message={form.formState.errors.appointmentTime?.message} />
                {timesError && (
                  <p className="text-sm text-amber-600">{timesError}</p>
                )}
              </div>

              <div className="space-y-2 md:col-span-2">
                <FieldLabel htmlFor="reason">Motivo de la consulta</FieldLabel>
                <Textarea
                  id="reason"
                  placeholder="Describe brevemente el motivo de la consulta"
                  className="min-h-[150px] rounded-[1.5rem] border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("reason")}
                />
                <FieldError message={form.formState.errors.reason?.message} />
              </div>

              <div className="space-y-2 md:col-span-2">
                <FieldLabel htmlFor="observations">Observaciones</FieldLabel>
                <Textarea
                  id="observations"
                  placeholder="Información adicional opcional"
                  className="min-h-[120px] rounded-[1.5rem] border-slate-200 bg-white px-4 py-3 shadow-sm transition focus-visible:ring-2 focus-visible:ring-cyan-200"
                  {...form.register("observations")}
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

          <div className="rounded-[1.75rem] border border-slate-200 bg-white px-5 py-5 shadow-sm">
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
                disabled={isSubmitting}
                className="h-12 rounded-full bg-slate-950 px-8 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:bg-slate-800"
              >
                {isSubmitting ? "Registrando..." : "Confirmar reserva"}
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-cyan-100 bg-cyan-50/70 px-4 py-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
              <p className="leading-6">
                La disponibilidad depende del profesional seleccionado, la fecha y
                los bloques actualmente disponibles en el sistema.
              </p>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}