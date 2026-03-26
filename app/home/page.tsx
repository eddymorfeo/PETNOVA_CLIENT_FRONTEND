"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ClipboardList,
  PawPrint,
  ShieldCheck,
  CalendarClock,
} from "lucide-react";
import Link from "next/link";
import {
  fetchMyAppointments,
  type AppointmentItem,
} from "@/api/appointments/appointments.api";
import { fetchMyPets } from "@/api/pets/pets.api";

function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: "cyan" | "violet" | "emerald";
}) {
  const accentStyles = {
    cyan: {
      wrapper: "from-cyan-50 to-white",
      icon: "bg-cyan-100 text-cyan-700",
      value: "text-cyan-700",
    },
    violet: {
      wrapper: "from-violet-50 to-white",
      icon: "bg-violet-100 text-violet-700",
      value: "text-violet-700",
    },
    emerald: {
      wrapper: "from-emerald-50 to-white",
      icon: "bg-emerald-100 text-emerald-700",
      value: "text-emerald-700",
    },
  };

  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-gradient-to-br ${accentStyles[accent].wrapper} p-5 shadow-sm`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2
            className={`mt-2 text-2xl font-semibold tracking-tight ${accentStyles[accent].value}`}
          >
            {value}
          </h2>
        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${accentStyles[accent].icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
    </section>
  );
}

type HomeMetricsState = {
  petsCount: number;
  nextAppointment: AppointmentItem | null;
  upcomingAppointmentsCount: number;
};

const APPOINTMENT_STATUS_EXCLUDED = new Set([
  "CANCELLED",
  "CANCELED",
  "COMPLETED",
  "NO_SHOW",
]);

function isUpcomingAppointment(appointment: AppointmentItem) {
  if (!appointment.startsAt) {
    return false;
  }

  const startsAtDate = new Date(appointment.startsAt);

  if (Number.isNaN(startsAtDate.getTime())) {
    return false;
  }

  const normalizedStatus = (appointment.status ?? "").toUpperCase();

  if (APPOINTMENT_STATUS_EXCLUDED.has(normalizedStatus)) {
    return false;
  }

  return startsAtDate.getTime() > Date.now();
}

function formatAppointmentDateTime(dateValue: string | null) {
  if (!dateValue) {
    return "Sin cita agendada";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Sin cita agendada";
  }

  const datePart = new Intl.DateTimeFormat("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);

  const timePart = new Intl.DateTimeFormat("es-CL", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(parsedDate);

  return `${datePart} ${timePart} horas`;
}

function formatUpcomingAppointmentDescription(
  appointment: AppointmentItem | null,
  upcomingAppointmentsCount: number,
) {
  if (!appointment) {
    return "Aún no tienes citas futuras registradas.";
  }

  if (upcomingAppointmentsCount <= 1) {
    return "Tu próxima atención ya se encuentra agendada en el portal.";
  }

  return `Tienes ${upcomingAppointmentsCount} citas futuras registradas.`;
}

export default function HomePage() {
  const [metrics, setMetrics] = useState<HomeMetricsState>({
    petsCount: 0,
    nextAppointment: null,
    upcomingAppointmentsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadHomeMetrics() {
      try {
        setIsLoading(true);

        const [pets, appointments] = await Promise.all([
          fetchMyPets(),
          fetchMyAppointments(),
        ]);

        const upcomingAppointments = appointments
          .filter(isUpcomingAppointment)
          .sort((left, right) => {
            const leftTime = new Date(left.startsAt ?? "").getTime();
            const rightTime = new Date(right.startsAt ?? "").getTime();

            return leftTime - rightTime;
          });

        if (!isMounted) {
          return;
        }

        setMetrics({
          petsCount: pets.length,
          nextAppointment: upcomingAppointments[0] ?? null,
          upcomingAppointmentsCount: upcomingAppointments.length,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setMetrics({
          petsCount: 0,
          nextAppointment: null,
          upcomingAppointmentsCount: 0,
        });

        console.error("No fue posible cargar el resumen del home.", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadHomeMetrics();

    return () => {
      isMounted = false;
    };
  }, []);

  const nextAppointmentValue = useMemo(() => {
    if (isLoading) {
      return "Cargando...";
    }

    return formatAppointmentDateTime(metrics.nextAppointment?.startsAt ?? null);
  }, [isLoading, metrics.nextAppointment]);

  const nextAppointmentDescription = useMemo(() => {
    if (isLoading) {
      return "Estamos consultando tus próximas atenciones.";
    }

    return formatUpcomingAppointmentDescription(
      metrics.nextAppointment,
      metrics.upcomingAppointmentsCount,
    );
  }, [isLoading, metrics.nextAppointment, metrics.upcomingAppointmentsCount]);

  const petsCountValue = isLoading ? "..." : String(metrics.petsCount);
  const upcomingAppointmentsValue = isLoading
    ? "..."
    : String(metrics.upcomingAppointmentsCount);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.65fr_0.9fr]">
      <div className="space-y-5">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-700">
            Bienvenido a PETNOVA
          </span>

          <h2 className="mt-4 text-[28px] font-semibold leading-tight tracking-tight text-slate-950">
            Un resumen claro de la salud y gestión de tus mascotas
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Desde este panel podrás revisar citas, fichas clínicas, vacunas,
            tratamientos y recordatorios importantes en una experiencia simple y
            organizada.
          </p>
        </section>

        <div className="grid gap-5 md:grid-cols-3">
          <MetricCard
            title="Mascotas registradas"
            value={petsCountValue}
            description="Revisa la ficha clínica y el estado general de cada mascota registrada."
            icon={PawPrint}
            accent="cyan"
          />

          <MetricCard
            title="Próxima cita"
            value={nextAppointmentValue}
            description={nextAppointmentDescription}
            icon={CalendarDays}
            accent="violet"
          />

          <MetricCard
            title="Reservas generadas"
            value={upcomingAppointmentsValue}
            description="Cantidad de citas registradas actualmente en tu portal."
            icon={CalendarClock}
            accent="emerald"
          />
        </div>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <ClipboardList className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Resumen del portal
              </h3>
              <p className="text-sm text-slate-500">
                Información principal disponible para tu cuenta.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Citas médicas",
                description:
                  "Consulta próximas reservas, historial de atención y cambios recientes.",
              },
              {
                title: "Historial clínico",
                description:
                  "Revisa diagnósticos, tratamientos, medicamentos y observaciones médicas.",
              },
              {
                title: "Vacunas y controles",
                description:
                  "Mantén seguimiento de vacunas pendientes y controles recomendados.",
              },
              {
                title: "Perfil y seguridad",
                description:
                  "Administra tus datos, contraseña y sesiones del portal cliente.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <p className="text-sm font-medium text-slate-900">
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-5">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Accesos rápidos
              </h3>
              <p className="text-sm text-slate-500">
                Atajos frecuentes dentro del portal.
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {[
              {
                label: "Registrar una nueva mascota",
                href: "/home/pets/new",
              },
              {
                label: "Revisar próximas citas",
                href: "/home/appointments",
              },
              {
                label: "Consultar historial clínico",
                href: "/home/medical-records",
              },
              {
                label: "Actualizar perfil",
                href: "/home/profile",
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-50 hover:border-slate-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-800 p-6 text-white shadow-sm">
          <p className="text-sm font-medium text-slate-300">Consejo PETNOVA</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight">
            Mantén los controles de rutina al día
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Llevar un seguimiento periódico ayuda a detectar oportunamente
            cambios en el estado de salud de tus mascotas.
          </p>
        </section>
      </aside>
    </div>
  );
}
