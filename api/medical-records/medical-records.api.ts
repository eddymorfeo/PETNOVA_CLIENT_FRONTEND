"use client";

import { getClientAuthHeaders } from "@/lib/auth/client-session";
import type {
  MedicalRecordPetItem,
  PetMedicalRecord,
} from "@/types/medical-records/medical-records.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ensureJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El backend no devolvió una respuesta JSON válida.");
  }
}

export async function fetchMyMedicalRecordPets(): Promise<MedicalRecordPetItem[]> {
  const response = await fetch(`${API_URL}/client-medical-records/pets`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "No fue posible obtener las mascotas.");
  }

  return result.data ?? [];
}

export async function fetchMyPetMedicalRecord(
  petId: string,
): Promise<PetMedicalRecord> {
  const response = await fetch(`${API_URL}/client-medical-records/pets/${petId}`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);

  const result = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.message || "No fue posible obtener la ficha clínica.",
    );
  }

  return result.data;
}