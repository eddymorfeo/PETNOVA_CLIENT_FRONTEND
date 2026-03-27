"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarClock, History, PlusCircle } from "lucide-react";

import {
  fetchMyAppointments,
  type AppointmentItem,
} from "@/api/appointments/appointments.api";
import { fetchMyPets } from "@/api/pets/pets.api";
import type { PetItem } from "@/types/pets/pet.types";

import { AppointmentHeader } from "./appointment-header";
import { AppointmentBookingForm } from "./appointment-booking-form";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatDate(value?: string | null) {
  if (!value) return "Sin fecha";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Sin fecha";

  return date.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTime(value?: string | null) {
  if (!value) return "Sin hora";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Sin hora";

  return date.toLocaleTimeString("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAppointmentStatusLabel(status?: string | null) {
  const normalizedStatus = status?.toUpperCase() ?? "";

  const labels: Record<string, string> = {
    SCHEDULED: "Agendada",
    CONFIRMED: "Confirmada",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
    CANCELED: "Cancelada",
    NO_SHOW: "No asistió",
    IN_PROGRESS: "En atención",
    PENDING: "Pendiente",
  };

  return labels[normalizedStatus] ?? "Pendiente";
}

function getAppointmentStatusBadgeClassName(status?: string | null) {
  const normalizedStatus = status?.toUpperCase() ?? "";

  const styles: Record<string, string> = {
    SCHEDULED: "border-cyan-100 bg-cyan-50 text-cyan-700",
    CONFIRMED: "border-emerald-100 bg-emerald-50 text-emerald-700",
    COMPLETED: "border-slate-200 bg-slate-100 text-slate-700",
    CANCELLED: "border-rose-100 bg-rose-50 text-rose-700",
    CANCELED: "border-rose-100 bg-rose-50 text-rose-700",
    NO_SHOW: "border-amber-100 bg-amber-50 text-amber-700",
    IN_PROGRESS: "border-violet-100 bg-violet-50 text-violet-700",
    PENDING: "border-slate-200 bg-slate-100 text-slate-700",
  };

  return (
    styles[normalizedStatus] ?? "border-slate-200 bg-slate-100 text-slate-700"
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-8 text-center text-sm text-slate-500">
      {message}
    </div>
  );
}

function AppointmentStatusBadge({ status }: { status?: string | null }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        getAppointmentStatusBadgeClassName(status),
      ].join(" ")}
    >
      {getAppointmentStatusLabel(status)}
    </span>
  );
}

function AppointmentsTable({
  appointments,
  petNameById,
}: {
  appointments: AppointmentItem[];
  petNameById: Map<string, string>;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200 bg-slate-50/80 hover:bg-slate-50/80">
              <TableHead className="h-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Mascota
              </TableHead>
              <TableHead className="h-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Motivo
              </TableHead>
              <TableHead className="h-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Fecha
              </TableHead>
              <TableHead className="h-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Inicio
              </TableHead>
              <TableHead className="h-10 whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Estado
              </TableHead>
              <TableHead className="h-10 min-w-[180px] text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                Observaciones
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {appointments.map((appointment) => (
              <TableRow
                key={appointment.id}
                className="border-b border-slate-200 hover:bg-slate-50/60"
              >
                <TableCell className="py-3 text-sm font-medium text-slate-900">
                  {petNameById.get(appointment.petId ?? "") || "Mascota"}
                </TableCell>

                <TableCell className="max-w-[240px] py-3 text-sm text-slate-600">
                  <span className="line-clamp-2">
                    {appointment.reason || "Sin motivo informado"}
                  </span>
                </TableCell>

                <TableCell className="whitespace-nowrap py-3 text-sm text-slate-700">
                  {formatDate(appointment.startsAt)}
                </TableCell>

                <TableCell className="whitespace-nowrap py-3 text-sm text-slate-700">
                  {formatTime(appointment.startsAt)}
                </TableCell>

                <TableCell className="py-3">
                  <AppointmentStatusBadge status={appointment.status} />
                </TableCell>

                <TableCell className="max-w-[240px] py-3 text-sm text-slate-600">
                  <span className="line-clamp-2">
                    {appointment.observations || "Sin observaciones"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export function AppointmentsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
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

  const nowTimestamp = Date.now();

  const upcomingAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => {
        if (!appointment.startsAt) return false;
        return new Date(appointment.startsAt).getTime() >= nowTimestamp;
      })
      .sort((leftAppointment, rightAppointment) => {
        const leftDate = leftAppointment.startsAt
          ? new Date(leftAppointment.startsAt).getTime()
          : 0;
        const rightDate = rightAppointment.startsAt
          ? new Date(rightAppointment.startsAt).getTime()
          : 0;

        return leftDate - rightDate;
      });
  }, [appointments, nowTimestamp]);

  const historyAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => {
        if (!appointment.startsAt) return true;
        return new Date(appointment.startsAt).getTime() < nowTimestamp;
      })
      .sort((leftAppointment, rightAppointment) => {
        const leftDate = leftAppointment.startsAt
          ? new Date(leftAppointment.startsAt).getTime()
          : 0;
        const rightDate = rightAppointment.startsAt
          ? new Date(rightAppointment.startsAt).getTime()
          : 0;

        return rightDate - leftDate;
      });
  }, [appointments, nowTimestamp]);

  const handleAppointmentCreated = async () => {
    await loadData();
    setActiveTab("upcoming");
  };

  return (
    <section className="space-y-4">
      <AppointmentHeader />

      <section className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm md:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid h-11 w-full grid-cols-3 rounded-full bg-slate-100 p-1">
            <TabsTrigger
              value="upcoming"
              className="h-full rounded-full border border-transparent px-3 text-sm font-medium shadow-none outline-none ring-0 transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-slate-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <CalendarClock className="mr-2 h-4 w-4 shrink-0" />
              Próximas citas
            </TabsTrigger>

            <TabsTrigger
              value="history"
              className="h-full rounded-full border border-transparent px-3 text-sm font-medium shadow-none outline-none ring-0 transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-slate-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <History className="mr-2 h-4 w-4 shrink-0" />
              Historial
            </TabsTrigger>

            <TabsTrigger
              value="booking"
              className="h-full rounded-full border border-transparent px-3 text-sm font-medium shadow-none outline-none ring-0 transition-all focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 data-[state=active]:border-slate-200 data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              <PlusCircle className="mr-2 h-4 w-4 shrink-0" />
              Reservar cita
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            {isLoading ? (
              <EmptyState message="Cargando próximas citas..." />
            ) : loadError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {loadError}
              </div>
            ) : upcomingAppointments.length ? (
              <AppointmentsTable
                appointments={upcomingAppointments}
                petNameById={petNameById}
              />
            ) : (
              <EmptyState message="No tienes próximas citas registradas." />
            )}
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            {isLoading ? (
              <EmptyState message="Cargando historial..." />
            ) : loadError ? (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {loadError}
              </div>
            ) : historyAppointments.length ? (
              <AppointmentsTable
                appointments={historyAppointments}
                petNameById={petNameById}
              />
            ) : (
              <EmptyState message="Aún no tienes historial de citas." />
            )}
          </TabsContent>

          <TabsContent value="booking" className="mt-4">
            <AppointmentBookingForm onCreated={handleAppointmentCreated} />
          </TabsContent>
        </Tabs>
      </section>
    </section>
  );
}