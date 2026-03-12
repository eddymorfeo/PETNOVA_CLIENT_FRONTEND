"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LandingReveal } from "./landing-reveal";

const contactItems = [
  {
    icon: Phone,
    value: "+56 9 1234 5678",
  },
  {
    icon: MapPin,
    value: "Tu calle 123, Santiago, Chile",
  },
  {
    icon: Mail,
    value: "contacto@petnova.cl",
  },
];

export function LandingContact() {
  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
        <LandingReveal>
          <div className="max-w-xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-700">
              Contacto
            </p>

            <h2 className="mt-4 text-balance text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Estamos para ayudarte a cuidar a{" "}
              <span className="text-cyan-700">tu mascota.</span>
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              No dudes en escribirnos si tienes alguna consulta, necesitas
              orientación o quieres programar una cita. Queremos acompañarte desde
              el primer contacto.
            </p>

            <div className="mt-8 space-y-4">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.value}
                    className="flex items-center gap-4 rounded-[1.5rem] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.24)] backdrop-blur"
                  >
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50">
                      <Icon className="size-5 text-cyan-700" />
                    </div>
                    <span className="text-base font-medium text-slate-700">
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </LandingReveal>

        <LandingReveal delay={0.08}>
          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_70px_-32px_rgba(15,23,42,0.25)] backdrop-blur lg:p-8">
            <form className="grid gap-5">
              <div className="grid gap-2">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-slate-700"
                >
                  Nombre y apellido
                </label>
                <Input
                  id="fullName"
                  placeholder="Tu nombre completo"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-5 shadow-none focus-visible:ring-cyan-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-slate-700"
                >
                  Teléfono
                </label>
                <Input
                  id="phone"
                  placeholder="+56 9 ..."
                  className="h-12 rounded-2xl border-slate-200 bg-white px-5 shadow-none focus-visible:ring-cyan-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-5 shadow-none focus-visible:ring-cyan-500"
                />
              </div>

              <div className="grid gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-semibold text-slate-700"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Escribe tu mensaje"
                  className="min-h-[150px] rounded-[1.5rem] border-slate-200 bg-white px-5 py-4 shadow-none focus-visible:ring-cyan-500"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 rounded-full bg-slate-950 px-8 text-base text-white shadow-lg shadow-cyan-200/50 hover:bg-slate-800"
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