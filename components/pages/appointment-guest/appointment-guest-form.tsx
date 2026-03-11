"use client";

import { motion } from "framer-motion";
import { CalendarDays, Dog, Mail, Phone, UserRound } from "lucide-react";

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

export function AppointmentGuestForm() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
      className="landing-card rounded-[2rem] p-6 lg:p-8"
    >
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
          Formulario
        </p>
        <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-800">
          Completa los datos de la reserva
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          Esta versión es la base visual. Luego la conectamos a tus schemas, types y api.
        </p>
      </div>

      <form className="grid gap-8">
        <section className="grid gap-5">
          <div className="flex items-center gap-2">
            <UserRound className="size-4 text-primary" />
            <h3 className="text-lg font-bold text-slate-800">Datos del tutor</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                Nombre completo
              </label>
              <Input
                id="fullName"
                placeholder="Ingresa tu nombre"
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                Teléfono
              </label>
              <Input
                id="phone"
                placeholder="+56 9 ..."
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="clientType" className="text-sm font-semibold text-slate-700">
                Tipo de cliente
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-full border-slate-200 bg-white px-5">
                  <SelectValue placeholder="Selecciona una opción" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="registered">Ya tengo cuenta</SelectItem>
                  <SelectItem value="guest">Reservar sin cuenta</SelectItem>
                  <SelectItem value="new">Soy cliente nuevo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          <div className="flex items-center gap-2">
            <Dog className="size-4 text-primary" />
            <h3 className="text-lg font-bold text-slate-800">Datos de la mascota</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="petName" className="text-sm font-semibold text-slate-700">
                Nombre de la mascota
              </label>
              <Input
                id="petName"
                placeholder="Ej: Luna"
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="species" className="text-sm font-semibold text-slate-700">
                Especie
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-full border-slate-200 bg-white px-5">
                  <SelectValue placeholder="Selecciona la especie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Perro</SelectItem>
                  <SelectItem value="cat">Gato</SelectItem>
                  <SelectItem value="other">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="breed" className="text-sm font-semibold text-slate-700">
                Raza
              </label>
              <Input
                id="breed"
                placeholder="Ej: Mestizo"
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="age" className="text-sm font-semibold text-slate-700">
                Edad aproximada
              </label>
              <Input
                id="age"
                placeholder="Ej: 2 años"
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-5">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-4 text-primary" />
            <h3 className="text-lg font-bold text-slate-800">Atención y horario</h3>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="appointmentType" className="text-sm font-semibold text-slate-700">
                Tipo de atención
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-full border-slate-200 bg-white px-5">
                  <SelectValue placeholder="Selecciona el tipo de atención" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consulta médica</SelectItem>
                  <SelectItem value="vaccine">Vacunación</SelectItem>
                  <SelectItem value="control">Control</SelectItem>
                  <SelectItem value="treatment">Tratamiento</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="veterinarian" className="text-sm font-semibold text-slate-700">
                Veterinario
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-full border-slate-200 bg-white px-5">
                  <SelectValue placeholder="Selecciona un profesional" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vet-1">Dr. Juan Pérez</SelectItem>
                  <SelectItem value="vet-2">Dra. Camila Soto</SelectItem>
                  <SelectItem value="vet-3">Primer profesional disponible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="date" className="text-sm font-semibold text-slate-700">
                Fecha
              </label>
              <Input
                id="date"
                type="date"
                className="h-12 rounded-full border-slate-200 bg-white px-5"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="time" className="text-sm font-semibold text-slate-700">
                Horario disponible
              </label>
              <Select>
                <SelectTrigger className="h-12 rounded-full border-slate-200 bg-white px-5">
                  <SelectValue placeholder="Selecciona un bloque" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="09:00">09:00</SelectItem>
                  <SelectItem value="10:00">10:00</SelectItem>
                  <SelectItem value="11:30">11:30</SelectItem>
                  <SelectItem value="16:00">16:00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 md:col-span-2">
              <label htmlFor="reason" className="text-sm font-semibold text-slate-700">
                Motivo de la consulta
              </label>
              <Textarea
                id="reason"
                placeholder="Describe brevemente el motivo de la consulta"
                className="min-h-[140px] rounded-[1.75rem] border-slate-200 bg-white px-5 py-4"
              />
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <Mail className="size-4 text-primary" />
            Recibirás la confirmación en tu correo electrónico.
          </div>

          <Button
            type="submit"
            size="lg"
            className="rounded-full bg-primary px-8 py-6 text-base shadow-lg shadow-cyan-200/60"
          >
            Confirmar reserva
          </Button>
        </div>
      </form>
    </motion.div>
  );
}