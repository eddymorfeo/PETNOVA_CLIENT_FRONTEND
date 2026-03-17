"use client";

import { useEffect, useMemo, useState } from "react";
import { History, CalendarClock, PlusCircle } from "lucide-react";

import {
  fetchMyAppointments,
  type AppointmentItem,
} from "@/api/appointments/appointments.api";
import { fetchMyPets } from "@/api/pets/pets.api";
import type { PetItem } from "@/types/pets/pet.types";
import { AppointmentHeader } from "./appointment-header";
import { AppointmentBookingForm } from "./appointment-booking-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function formatDateTime(value?: string | null) {
  if (!value) return "Sin fecha";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Sin fecha";

  return date.toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function AppointmentCard({
  appointment,
  petName,
}: {
  appointment: AppointmentItem;
  petName: string;
}) {
  return (
    <article className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{petName}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {appointment.reason || "Sin motivo informado"}
          </p>
        </div>

        <span className="inline-flex w-fit rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700">
          {appointment.status || "PENDIENTE"}
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Fecha
          </p>
          <p className="mt-2 text-sm text-slate-800">
            {formatDateTime(appointment.startsAt)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Fin
          </p>
          <p className="mt-2 text-sm text-slate-800">
            {formatDateTime(appointment.endsAt)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Origen
          </p>
          <p className="mt-2 text-sm text-slate-800">
            {appointment.bookedSource || "No informado"}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            Observaciones
          </p>
          <p className="mt-2 text-sm text-slate-800">
            {appointment.observations || "Sin observaciones"}
          </p>
        </div>
      </div>
    </article>
  );
}

export function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [pets, setPets] = useState<PetItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setLoadError("");

      const [appointmentsData, petsData] = await Promise.all([
        fetchMyAppointments(),
        fetchMyPets(),
      ]);

      setAppointments(appointmentsData);
      setPets(petsData);
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "No fue posible cargar las citas.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const petNameById = useMemo(() => {
    return new Map(pets.map((pet) => [pet.id, pet.name]));
  }, [pets]);

  const now = new Date();

  const upcomingAppointments = appointments.filter((appointment) => {
    if (!appointment.startsAt) return false;
    return new Date(appointment.startsAt).getTime() >= now.getTime();
  });

  const historyAppointments = appointments.filter((appointment) => {
    if (!appointment.startsAt) return true;
    return new Date(appointment.startsAt).getTime() < now.getTime();
  });

  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-7xl space-y-5">
        <AppointmentHeader />

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-5 grid w-full grid-cols-3 rounded-2xl bg-slate-100 p-1">
              <TabsTrigger value="upcoming" className="rounded-xl">
                <CalendarClock className="mr-2 h-4 w-4" />
                Próximas citas
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl">
                <History className="mr-2 h-4 w-4" />
                Historial
              </TabsTrigger>
              <TabsTrigger value="booking" className="rounded-xl">
                <PlusCircle className="mr-2 h-4 w-4" />
                Reservar cita
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {isLoading ? (
                <div className="h-44 rounded-[1.5rem] border border-slate-200 bg-slate-50" />
              ) : loadError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
                  {loadError}
                </div>
              ) : upcomingAppointments.length ? (
                upcomingAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    petName={petNameById.get(appointment.petId ?? "") || "Mascota"}
                  />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 px-5 py-8 text-center text-sm text-slate-500">
                  No tienes próximas citas registradas.
                </div>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              {isLoading ? (
                <div className="h-44 rounded-[1.5rem] border border-slate-200 bg-slate-50" />
              ) : loadError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
                  {loadError}
                </div>
              ) : historyAppointments.length ? (
                historyAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    petName={petNameById.get(appointment.petId ?? "") || "Mascota"}
                  />
                ))
              ) : (
                <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 px-5 py-8 text-center text-sm text-slate-500">
                  Aún no tienes historial de citas.
                </div>
              )}
            </TabsContent>

            <TabsContent value="booking">
              <AppointmentBookingForm onCreated={loadData} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </div>
  );
}