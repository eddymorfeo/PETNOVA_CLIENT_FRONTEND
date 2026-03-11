"use client";

import { motion } from "framer-motion";
import { CalendarDays, CircleCheck, Clock3, Info, ShieldCheck } from "lucide-react";

export function AppointmentGuestSummary() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
      className="lg:sticky lg:top-28"
    >
      <div className="landing-card rounded-[2rem] p-6 lg:p-7">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Resumen
        </p>

        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-800">
          Tu reserva
        </h2>

        <div className="mt-6 space-y-4">
          <div className="rounded-[1.5rem] bg-primary/6 p-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="font-semibold text-slate-800">Consulta médica</p>
                <p className="text-sm leading-7 text-slate-600">
                  Selecciona el tipo de atención, profesional y horario disponible.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="font-semibold text-slate-800">Duración estimada</p>
                <p className="text-sm leading-7 text-slate-600">30 a 45 minutos por atención.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-5 text-primary" />
              <div>
                <p className="font-semibold text-slate-800">Confirmación por correo</p>
                <p className="text-sm leading-7 text-slate-600">
                  Te enviaremos el detalle una vez completada la reserva.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-dashed border-primary/30 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 text-primary" />
            <p className="text-sm leading-7 text-slate-700">
              Luego conectaremos este panel con la disponibilidad real del backend,
              veterinarios, tipos de cita y mascotas registradas del cliente.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3 border-t border-slate-200 pt-6">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <CircleCheck className="size-4 text-primary" />
            Reserva disponible para clientes con o sin cuenta.
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <CircleCheck className="size-4 text-primary" />
            Flujo preparado para integración con tu backend.
          </div>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <CircleCheck className="size-4 text-primary" />
            Base visual alineada con la landing de PETNOVA.
          </div>
        </div>
      </div>
    </motion.aside>
  );
}