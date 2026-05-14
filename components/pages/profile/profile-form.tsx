"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Save,
  UserRound,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getClientAuthHeaders,
  updateClientSessionUser,
} from "@/lib/auth/client-session";
import { withProcessToast } from "@/lib/feedback/process-toast";

type AuthMeResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    fullName: string;
    phone?: string | null;
    documentId?: string | null;
    address?: string | null;
    isActive: boolean;
  };
};

type UpdateClientResponse = {
  success: boolean;
  message: string;
  data?: {
    id: string;
    email: string;
    full_name: string;
    phone?: string | null;
    document_id?: string | null;
    address?: string | null;
    is_active: boolean;
  };
};

export function ClientProfileForm() {
  const [clientId, setClientId] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [address, setAddress] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    const loadClientProfile = async () => {
      try {
        setIsLoading(true);
        setLoadError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/clients/me`,
          {
            method: "GET",
            headers: getClientAuthHeaders(),
          }
        );

        const result: AuthMeResponse = await response.json();

        if (!response.ok || !result.success || !result.data) {
          throw new Error(result.message || "No fue posible obtener tus datos.");
        }

        setClientId(result.data.id);
        setEmail(result.data.email);
        setFullName(result.data.fullName ?? "");
        setPhone(result.data.phone ?? "");
        setDocumentId(result.data.documentId ?? "");
        setAddress(result.data.address ?? "");
        setIsActive(result.data.isActive);
      } catch (error) {
        setLoadError(
          error instanceof Error
            ? error.message
            : "Ocurrió un error al cargar tu perfil."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadClientProfile();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSubmitError("");
    setSubmitSuccess("");

    if (!clientId) {
      setSubmitError("No se encontró el identificador del cliente.");
      return;
    }

    if (!fullName.trim()) {
      setSubmitError("Debes ingresar tu nombre completo.");
      return;
    }

    try {
      setIsSaving(true);

      await withProcessToast(
        async () => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/clients/${clientId}`,
            {
              method: "PATCH",
              headers: getClientAuthHeaders(),
              body: JSON.stringify({
                fullName: fullName.trim(),
                phone: phone.trim() || null,
                documentId: documentId.trim() || null,
                address: address.trim() || null,
              }),
            },
          );

          const result: UpdateClientResponse = await response.json();

          if (!response.ok || !result.success || !result.data) {
            throw new Error(
              result.message || "No fue posible actualizar tus datos.",
            );
          }

          updateClientSessionUser({
            id: result.data.id,
            email: result.data.email,
            fullName: result.data.full_name,
            phone: result.data.phone ?? null,
            documentId: result.data.document_id ?? null,
            address: result.data.address ?? null,
            isActive: result.data.is_active,
          });

          setFullName(result.data.full_name ?? "");
          setPhone(result.data.phone ?? "");
          setDocumentId(result.data.document_id ?? "");
          setAddress(result.data.address ?? "");
          setIsActive(result.data.is_active);

          return result;
        },
        {
          loading: "Actualizando perfil...",
          success: "Perfil actualizado correctamente",
          successDescription: "Tus datos personales fueron guardados.",
          error: "No fue posible actualizar el perfil",
        },
      );

      setSubmitSuccess("Tus datos fueron actualizados correctamente.");
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al actualizar el perfil."
      );
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-3">
          <div className="h-5 w-40 rounded bg-slate-100" />
          <div className="h-4 w-72 rounded bg-slate-100" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
      <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 ring-1 ring-cyan-100">
            <UserRound className="h-4.5 w-4.5" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              Mis datos personales
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Aquí puedes actualizar tu información de contacto. El correo solo se
              muestra y no puede ser editado.
            </p>
          </div>
        </div>

        {loadError && (
          <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-4 text-sm text-rose-600">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{loadError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-700"
              >
                Nombre completo
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Tu nombre completo"
                  className="h-11 rounded-2xl border-slate-200 bg-white pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  value={email}
                  disabled
                  readOnly
                  className="h-11 rounded-2xl border-slate-200 bg-slate-50 pl-10 pr-4 text-slate-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-slate-700"
              >
                Teléfono
              </label>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+56 9 1234 5678"
                  className="h-11 rounded-2xl border-slate-200 bg-white pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="documentId"
                className="text-sm font-medium text-slate-700"
              >
                Documento de identidad
              </label>
              <div className="relative">
                <BadgeCheck className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="documentId"
                  value={documentId}
                  onChange={(event) => setDocumentId(event.target.value)}
                  placeholder="12.345.678-9"
                  className="h-11 rounded-2xl border-slate-200 bg-white pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-slate-700"
              >
                Dirección
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                <Input
                  id="address"
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  placeholder="Ingresa tu dirección"
                  className="h-11 rounded-2xl border-slate-200 bg-white pl-10 pr-4 focus-visible:ring-2 focus-visible:ring-cyan-500"
                />
              </div>
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

          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Estado de la cuenta:{" "}
              <span
                className={
                  isActive ? "font-medium text-emerald-600" : "font-medium text-rose-600"
                }
              >
                {isActive ? "Activa" : "Inactiva"}
              </span>
            </p>

            <Button
              type="submit"
              disabled={isSaving}
              className="h-11 rounded-2xl bg-slate-950 px-5 text-sm font-medium text-white hover:bg-slate-800"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Guardando..." : "Guardar cambios"}
            </Button>
          </div>
        </form>
      </section>

      <aside className="space-y-5">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Información de tu cuenta
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Estos son los datos principales asociados a tu perfil dentro del portal.
          </p>

          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Correo
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">{email || "—"}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Documento
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {documentId || "No registrado"}
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                Teléfono
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                {phone || "No registrado"}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-br from-cyan-50 to-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">
            Recomendación
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mantén tu teléfono y dirección actualizados para recibir asistencia,
            confirmaciones de citas y futuras notificaciones importantes.
          </p>
        </section>
      </aside>
    </div>
  );
}
