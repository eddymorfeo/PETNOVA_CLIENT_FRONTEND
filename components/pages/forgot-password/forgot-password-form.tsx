"use client";

import Link from "next/link";
import { ArrowLeft, Mail, PawPrint, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginLegal } from "../login/login-legal";

type ForgotPasswordResponse = {
  success: boolean;
  message: string;
  data?: {
    queued: boolean;
  };
};

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    if (!email.trim()) {
      setSubmitError("Debes ingresar tu correo electrónico.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/clients/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        }
      );

      const result: ForgotPasswordResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "No fue posible enviar las instrucciones."
        );
      }

      setSubmitSuccess(
        "Si el correo existe en el sistema, recibirás un enlace para restablecer tu contraseña."
      );
      setEmail("");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al enviar las instrucciones."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Recuperar contraseña
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Ingresa tu correo electrónico y te enviaremos instrucciones para
            restablecer tu contraseña.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-4 text-slate-900 shadow-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              />
            </div>
          </div>

          {submitError && (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            </div>
          )}

          {submitSuccess && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-700">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{submitSuccess}</span>
              </div>
            </div>
          )}

          <div className="space-y-3 pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-2xl bg-slate-950 text-base font-semibold text-white shadow-lg shadow-cyan-100 transition hover:bg-slate-800"
            >
              {isSubmitting ? "Enviando..." : "Enviar instrucciones"}
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-12 w-full rounded-2xl border-slate-200 bg-white text-base font-medium text-slate-700 hover:bg-slate-50"
            >
              <Link href="/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al login
              </Link>
            </Button>
          </div>
        </form>
      </section>

      <LoginLegal />
    </>
  );
}