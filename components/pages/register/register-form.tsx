"use client";

import Link from "next/link";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  PawPrint,
  UserRound,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginLegal } from "../login/login-legal";
import { withProcessToast } from "@/lib/feedback/process-toast";

type RegisterResponse = {
  success: boolean;
  message: string;
  data?: {
    accessToken: string;
    client: {
      id: string;
      email: string;
      fullName: string;
      phone?: string | null;
      documentId?: string | null;
      address?: string | null;
      isActive: boolean;
    };
  };
};

export function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    if (!fullName.trim()) {
      setSubmitError("Debes ingresar tu nombre completo.");
      return;
    }

    if (!email.trim()) {
      setSubmitError("Debes ingresar tu correo electrónico.");
      return;
    }

    if (password.length < 8) {
      setSubmitError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setSubmitError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsSubmitting(true);

      await withProcessToast(
        async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/clients/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fullName: fullName.trim(),
                email: email.trim().toLowerCase(),
                password,
              }),
            },
          );

          const result: RegisterResponse = await response.json();

          if (!response.ok || !result.success || !result.data) {
            throw new Error(result.message || "No fue posible crear la cuenta.");
          }

          return result;
        },
        {
          loading: "Creando cuenta...",
          success: "Cuenta creada correctamente",
          successDescription: "Serás redirigido al inicio de sesión.",
          error: "No fue posible crear la cuenta",
        },
      );

      setSubmitSuccess("Cuenta creada correctamente. Serás redirigido.");

      setTimeout(() => {
        router.push("/login");
        router.refresh();
      }, 1200);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al crear la cuenta."
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
            Crear cuenta
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Registra tus datos para acceder al portal de clientes PETNOVA.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
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
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
              {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
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

      <LoginLegal />
    </>
  );
}
