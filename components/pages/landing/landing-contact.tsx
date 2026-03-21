"use client";

import { Mail, MapPin, Phone, SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LandingReveal } from "./landing-reveal";

const contactItems = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+56 9 1234 5678",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Tu calle 123, Santiago, Chile",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "contacto@petnova.cl",
  },
];

export function LandingContact() {
  return (
    <section id="contact" className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <LandingReveal>
        <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-sm">
            Contacto
          </p>

          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
            Estamos para ayudarte a cuidar a tu mascota.
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Escríbenos si tienes dudas, necesitas orientación o quieres programar una
            atención. Queremos acompañarte desde el primer contacto.
          </p>

          <div className="mt-8 space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.value}
                  className="rounded-[1.5rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fcfd_100%)] px-5 py-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-50 ring-1 ring-cyan-100">
                      <Icon className="size-5 text-cyan-700" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-500">{item.label}</p>
                      <p className="text-base font-medium text-slate-800">{item.value}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LandingReveal>

      <LandingReveal delay={0.08}>
        <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-[0_24px_60px_-42px_rgba(15,23,42,0.22)]">
          <div className="border-b border-slate-200 bg-[linear-gradient(180deg,#f3fbfd_0%,#f8fbfd_100%)] px-6 py-6 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700 sm:text-sm">
              Formulario de contacto
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
              Cuéntanos cómo podemos ayudarte.
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Déjanos tus datos y tu mensaje. Nos pondremos en contacto contigo lo
              antes posible.
            </p>
          </div>

          <form className="grid gap-5 p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="grid gap-2">
                <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
                  Nombre y apellido
                </label>
                <Input
                  id="fullName"
                  placeholder="Tu nombre completo"
                  className="h-12 rounded-2xl border-slate-200 bg-white px-5 shadow-none focus-visible:ring-cyan-500"
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
                  Teléfono
                </label>
                <Input
                  id="phone"
                  placeholder="+56 9 ..."
                  className="h-12 rounded-2xl border-slate-200 bg-white px-5 shadow-none focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
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
              <label htmlFor="message" className="text-sm font-semibold text-slate-700">
                Mensaje
              </label>
              <Textarea
                id="message"
                placeholder="Escribe tu mensaje"
                className="min-h-[170px] rounded-[1.5rem] border-slate-200 bg-white px-5 py-4 shadow-none focus-visible:ring-cyan-500"
              />
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-6 text-slate-500">
                Te responderemos a la brevedad según la información que nos compartas.
              </p>

              <Button
                type="submit"
                size="lg"
                className="h-12 rounded-full bg-slate-950 px-8 text-base text-white shadow-[0_18px_34px_-18px_rgba(8,145,178,0.85)] hover:bg-slate-800"
              >
                <SendHorizonal className="mr-2 size-4" />
                Enviar mensaje
              </Button>
            </div>
          </form>
        </div>
      </LandingReveal>
    </section>
  );
}
