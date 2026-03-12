"use client";

import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, PawPrint, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginLegal } from "../login/login-legal";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <section className="rounded-[2rem] border border-slate-200/70 bg-white/90 p-6 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.18)] sm:p-8">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50">
            <PawPrint className="h-5 w-5 text-cyan-700" />
          </div>

          <div>
            <p className="font-black tracking-[0.14em] text-slate-900">PETNOVA</p>
            <p className="text-xs text-slate-500">Clínica veterinaria</p>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">
            Crear cuenta
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Registra tus datos para acceder al portal de clientes PETNOVA.
          </p>
        </div>

        <form className="mt-8 space-y-5">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-slate-700">
              Nombre completo
            </label>

            <div className="relative">
              <UserRound className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="fullName"
                type="text"
                placeholder="Tu nombre completo"
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-4 text-slate-900 shadow-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
              Correo electrónico
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-4 text-slate-900 shadow-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-semibold text-slate-700">
              Contraseña
            </label>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña"
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-12 text-slate-900 shadow-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              />

              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
              Confirmar contraseña
            </label>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repite tu contraseña"
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-12 text-slate-900 shadow-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              />

              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Ocultar confirmación de contraseña"
                    : "Mostrar confirmación de contraseña"
                }
                onClick={() => setShowConfirmPassword((value) => !value)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button className="h-12 w-full rounded-2xl bg-slate-950 text-base font-semibold text-white shadow-lg shadow-cyan-100 transition hover:bg-slate-800">
              Crear cuenta
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-2xl border-slate-200 bg-white text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              <Link href="/login">Ya tengo una cuenta</Link>
            </Button>
          </div>
        </form>
      </section>

      <p className="mt-6 text-center text-sm text-slate-500">
        ¿Ya tienes una cuenta?{" "}
        <Link
          href="/login"
          className="font-semibold text-cyan-700 transition hover:text-cyan-800"
        >
          Iniciar sesión
        </Link>
      </p>
    </>
  );
}