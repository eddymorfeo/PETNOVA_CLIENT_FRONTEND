"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  PawPrint,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RESET_PASSWORD_TOKEN_STORAGE_KEY = "petnova-reset-password-token";

type ResetPasswordResponse = {
  success: boolean;
  message: string;
  data?: {
    updated: boolean;
  };
};

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [token, setToken] = useState<string>("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    const tokenFromSession =
      typeof window !== "undefined"
        ? sessionStorage.getItem(RESET_PASSWORD_TOKEN_STORAGE_KEY)
        : null;

    if (tokenFromUrl) {
      setToken(tokenFromUrl);

      if (typeof window !== "undefined") {
        sessionStorage.setItem(RESET_PASSWORD_TOKEN_STORAGE_KEY, tokenFromUrl);
        window.history.replaceState({}, "", "/reset-password");
      }

      return;
    }

    if (tokenFromSession) {
      setToken(tokenFromSession);
    }
  }, [searchParams]);

  const passwordRules = useMemo(
    () => ({
      minLength: password.length >= 8,
      hasMatch: confirmPassword.length > 0 && password === confirmPassword,
    }),
    [password, confirmPassword]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    if (!token) {
      setSubmitError(
        "El enlace de recuperación es inválido o expiró. Solicita uno nuevo."
      );
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

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/clients/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
          }),
        }
      );

      const result: ResetPasswordResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "No fue posible restablecer la contraseña."
        );
      }

      if (typeof window !== "undefined") {
        sessionStorage.removeItem(RESET_PASSWORD_TOKEN_STORAGE_KEY);
      }

      setSubmitSuccess(
        "Contraseña actualizada correctamente. Serás redirigido al login."
      );
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        router.push("/login");
      }, 1800);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al restablecer la contraseña."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">
          <LockKeyhole className="h-3.5 w-3.5" />
          Reset password
        </div>

        <h2 className="mt-5 text-3xl font-black tracking-tight text-slate-950">
          Restablecer contraseña
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Define una nueva contraseña para volver a acceder a tu portal PETNOVA.
        </p>
      </div>

      <div className="mt-8">
        {!token && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-700">
            No se detectó un token válido. Solicita nuevamente el correo de recuperación.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Nueva contraseña
            </label>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 pr-12 text-slate-900 shadow-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              />

              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm">
              <p
                className={
                  passwordRules.minLength
                    ? "font-medium text-emerald-600"
                    : "text-slate-600"
                }
              >
                • Debe tener al menos 8 caracteres
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-semibold text-slate-700"
            >
              Confirmar nueva contraseña
            </label>

            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repite tu nueva contraseña"
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
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {confirmPassword.length > 0 && (
              <p
                className={
                  passwordRules.hasMatch
                    ? "text-sm font-medium text-emerald-600"
                    : "text-sm font-medium text-rose-500"
                }
              >
                {passwordRules.hasMatch
                  ? "Las contraseñas coinciden."
                  : "Las contraseñas no coinciden."}
              </p>
            )}
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

          <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 px-4 py-4 text-sm text-slate-600">
            <div className="flex items-start gap-3">
              <KeyRound className="mt-0.5 h-4 w-4 shrink-0 text-cyan-700" />
              <p className="leading-6">
                Tu nueva contraseña se validará con el token del enlace y luego se
                notificará el cambio al correo asociado a la cuenta.
              </p>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !token}
            className="h-12 w-full rounded-2xl bg-slate-950 text-base font-semibold text-white shadow-lg shadow-cyan-100 transition hover:bg-slate-800"
          >
            {isSubmitting
              ? "Actualizando contraseña..."
              : "Guardar nueva contraseña"}
          </Button>
        </form>
      </div>
    </section>
  );
}