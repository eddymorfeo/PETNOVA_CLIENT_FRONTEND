"use client";

import { getClientAuthHeaders } from "@/lib/auth/client-session";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ensureJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El backend no devolvió una respuesta JSON válida.");
  }
}

export type AppointmentItem = {
  id: string;
  clientId: string | null;
  petId: string | null;
  veterinarianId: string | null;
  appointmentTypeId: string | null;
  startsAt: string | null;
  endsAt: string | null;
  status: string | null;
  reason: string | null;
  observations: string | null;
  bookedSource: string | null;
  createdAt: string | null;
};

function mapAppointment(raw: any): AppointmentItem {
  return {
    id: raw.id,
    clientId: raw.client_id ?? raw.clientId ?? null,
    petId: raw.pet_id ?? raw.petId ?? null,
    veterinarianId: raw.veterinarian_id ?? raw.veterinarianId ?? null,
    appointmentTypeId:
      raw.appointment_type_id ?? raw.appointmentTypeId ?? null,
    startsAt: raw.starts_at ?? raw.startsAt ?? null,
    endsAt: raw.ends_at ?? raw.endsAt ?? null,
    status: raw.status ?? null,
    reason: raw.reason ?? null,
    observations: raw.observations ?? null,
    bookedSource: raw.booked_source ?? raw.bookedSource ?? null,
    createdAt: raw.created_at ?? raw.createdAt ?? null,
  };
}

export type AuthClientProfile = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  documentId: string | null;
  address: string | null;
};

export async function fetchAuthenticatedClient(): Promise<AuthClientProfile> {
  const response = await fetch(`${API_URL}/auth/clients/me`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);

  const result = await response.json();

  if (!response.ok || !result.success || !result.data?.id) {
    throw new Error(
      result.message || "No fue posible obtener el cliente autenticado.",
    );
  }

  return {
    id: result.data.id,
    fullName: result.data.fullName ?? result.data.full_name ?? "",
    email: result.data.email ?? "",
    phone: result.data.phone ?? null,
    documentId: result.data.documentId ?? result.data.document_id ?? null,
    address: result.data.address ?? null,
  };
}

export async function fetchMyAppointments(): Promise<AppointmentItem[]> {
  const response = await fetch(`${API_URL}/appointments/my`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "No fue posible obtener las citas.");
  }

  return (result.data ?? []).map(mapAppointment);
}

type CreateAuthenticatedAppointmentPayload = {
  petId: string;
  veterinarianId: string;
  appointmentTypeId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason: string;
  observations?: string | null;
};

export async function createAuthenticatedAppointment(
  payload: CreateAuthenticatedAppointmentPayload,
) {
  const client = await fetchAuthenticatedClient();
  const startsAt = new Date(
    `${payload.appointmentDate}T${payload.appointmentTime}:00`,
  );
  const endsAt = new Date(startsAt.getTime() + 30 * 60 * 1000);

  const requestBody = {
    clientId: client.id,
    petId: payload.petId,
    veterinarianId: payload.veterinarianId,
    appointmentTypeId: payload.appointmentTypeId,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    reason: payload.reason.trim(),
    observations: payload.observations?.trim() || null,
    bookedSource: "CLIENT_PORTAL",
  };

  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: getClientAuthHeaders(),
    body: JSON.stringify(requestBody),
  });

  ensureJsonResponse(response);

  const result = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "No fue posible registrar la cita.");
  }

  return mapAppointment(result.data);
}
