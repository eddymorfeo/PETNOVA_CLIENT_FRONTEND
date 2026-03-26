"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { LandingReveal } from "./landing-reveal";
import { AnimatedGroup, AnimatedItem } from "./landing-motion";

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
    <section id="contacto" className="bg-white py-24">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <LandingReveal x={-24}>
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="rounded-[30px] bg-slate-950 px-7 py-8 text-white shadow-[0_26px_80px_-36px_rgba(15,23,42,0.55)] sm:px-8 sm:py-10"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-300">
              Contacto
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight tracking-[-0.04em]">
              Estamos para ayudarte a cuidar a tu mascota.
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-300">
              Escríbenos si tienes dudas, necesitas orientación o quieres
              programar una atención. Queremos acompañarte desde el primer
              contacto.
            </p>

            <AnimatedGroup className="mt-8 space-y-4" delay={0.08}>
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <AnimatedItem key={item.label}>
                    <motion.div
                      whileHover={{ x: 4, scale: 1.01 }}
                      className="rounded-[22px] border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.08, rotate: -6 }}
                          transition={{
                            type: "spring",
                            stiffness: 320,
                            damping: 16,
                          }}
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/15 text-cyan-300"
                        >
                          <Icon className="size-5" />
                        </motion.div>

                        <div>
                          <p className="text-sm text-slate-400">{item.label}</p>
                          <p className="font-semibold text-white">{item.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedItem>
                );
              })}
            </AnimatedGroup>
          </motion.div>
        </LandingReveal>

        <LandingReveal delay={0.08} x={24}>
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_24px_80px_-42px_rgba(15,23,42,0.24)] sm:p-8"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cyan-700">
              Formulario de contacto
            </p>

            <h3 className="mt-3 text-3xl font-black leading-tight tracking-[-0.03em] text-slate-950">
              Cuéntanos cómo podemos ayudarte.
            </h3>

            <p className="mt-3 text-base leading-8 text-slate-600">
              Déjanos tus datos y tu mensaje. Nos pondremos en contacto contigo
              lo antes posible.
            </p>

            <form className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nombre y apellido
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="Tu nombre completo"
                    className="h-12 w-full rounded-full border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Teléfono
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    placeholder="+56 9 ..."
                    className="h-12 w-full rounded-full border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Correo electrónico
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="h-12 w-full rounded-full border border-slate-200 px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Mensaje
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.005 }}
                  rows={6}
                  placeholder="Escribe tu mensaje"
                  className="w-full rounded-[24px] border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-7 text-slate-500">
                  Te responderemos a la brevedad según la información que nos
                  compartas.
                </p>

                <motion.button
                  type="submit"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-slate-950 px-6 font-semibold text-white transition hover:bg-slate-800"
                >
                  <Send className="size-4 shrink-0" />
                  <span>Enviar mensaje</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </LandingReveal>
      </div>
    </section>
  );
}