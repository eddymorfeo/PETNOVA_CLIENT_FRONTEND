"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LandingReveal } from "./landing-reveal";

export function LandingContact() {
  return (
    <section id="contact" className="section-shell py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <LandingReveal>
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
              Contacto
            </p>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-800 sm:text-5xl">
              Estamos para ayudarte a cuidar a <span className="text-primary">tu mascota.</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              No dudes en escribirnos si tienes alguna consulta, necesitas orientación
              o quieres programar una cita. Queremos acompañarte desde el primer contacto.
            </p>

            <div className="mt-8 space-y-5 text-slate-600">
              <div className="flex items-center gap-3">
                <Phone className="size-5 text-primary" />
                <span className="text-base font-medium">+56 9 1234 5678</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="size-5 text-primary" />
                <span className="text-base font-medium">Tu calle 123, Santiago, Chile</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="size-5 text-primary" />
                <span className="text-base font-medium">contacto@petnova.cl</span>
              </div>
            </div>
          </div>
        </LandingReveal>

        <LandingReveal delay={0.08}>
          <div className="landing-card rounded-[2.25rem] p-6 lg:p-8">
            <form className="grid gap-5">
              <div className="grid gap-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                  Nombre y apellido
                </label>
                <Input
                  id="fullName"
                  placeholder="Tu nombre completo"
                  className="h-12 rounded-full border-slate-200 bg-white/90 px-5"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  placeholder="+56 9 ..."
                  className="h-12 rounded-full border-slate-200 bg-white/90 px-5"
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
                  className="h-12 rounded-full border-slate-200 bg-white/90 px-5"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje"
                  className="min-h-[150px] rounded-[1.75rem] border-slate-200 bg-white/90 px-5 py-4"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="rounded-full bg-primary px-8 py-6 text-base shadow-lg shadow-cyan-200/60"
                >
                  Enviar mensaje
                </Button>
              </div>
            </form>
          </div>
        </LandingReveal>
      </div>
    </section>
  );
}