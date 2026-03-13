import { getClientAuthHeaders } from "@/lib/auth/client-session";
import type {
  BreedOption,
  CreatePetPayload,
  PetItem,
  PetResponse,
  PetsListResponse,
  SpeciesOption,
} from "@/types/pets/pet.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function ensureJsonResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("El backend no devolvió una respuesta JSON válida.");
  }
}

function mapPet(raw: any): PetItem {
  return {
    id: raw.id,
    clientId: raw.client_id ?? raw.clientId,
    name: raw.name,
    speciesId: raw.species_id ?? raw.speciesId ?? null,
    breedId: raw.breed_id ?? raw.breedId ?? null,
    sex: raw.sex ?? "UNKNOWN",
    birthDate: raw.birth_date ?? raw.birthDate ?? null,
    color: raw.color ?? null,
    microchip: raw.microchip ?? null,
    isSterilized:
      raw.is_sterilized !== undefined && raw.is_sterilized !== null
        ? Boolean(raw.is_sterilized)
        : raw.isSterilized !== undefined && raw.isSterilized !== null
          ? Boolean(raw.isSterilized)
          : null,
    allergies: raw.allergies ?? null,
    notes: raw.notes ?? null,
    isActive: raw.is_active ?? raw.isActive ?? true,
    createdAt: raw.created_at ?? raw.createdAt,
    updatedAt: raw.updated_at ?? raw.updatedAt,
  };
}

export async function fetchMyPets(): Promise<PetItem[]> {
  const meResponse = await fetch(`${API_URL}/auth/clients/me`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(meResponse);
  const meResult = await meResponse.json();

  if (!meResponse.ok || !meResult.success || !meResult.data?.id) {
    throw new Error(
      meResult.message || "No fue posible obtener el cliente autenticado.",
    );
  }

  const clientId = meResult.data.id;

  const response = await fetch(`${API_URL}/pets`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);
  const result: PetsListResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "No fue posible obtener tus mascotas.");
  }

  return (result.data ?? [])
    .map(mapPet)
    .filter((pet) => pet.clientId === clientId);
}

export async function fetchPetById(petId: string): Promise<PetItem> {
  const response = await fetch(`${API_URL}/pets/${petId}`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);
  const result: PetResponse = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "No fue posible obtener la mascota.");
  }

  return mapPet(result.data);
}

export async function createPet(payload: CreatePetPayload): Promise<PetItem> {
  const meResponse = await fetch(`${API_URL}/auth/clients/me`, {
    method: "GET",
    headers: getClientAuthHeaders(),
  });

  ensureJsonResponse(meResponse);
  const meResult = await meResponse.json();

  if (!meResponse.ok || !meResult.success || !meResult.data?.id) {
    throw new Error(
      meResult.message || "No fue posible obtener el cliente autenticado.",
    );
  }

  const clientId = meResult.data.id;

  const requestBody: Record<string, unknown> = {
    clientId,
    name: payload.name,
    speciesId: payload.speciesId,
    sex: payload.sex || "UNKNOWN",
    birthDate: payload.birthDate,
    isSterilized: payload.isSterilized ?? false,
  };

  if (payload.breedId && payload.breedId.trim() !== "") {
    requestBody.breedId = payload.breedId;
  }

  if (payload.color && payload.color.trim() !== "") {
    requestBody.color = payload.color;
  }

  if (payload.microchip && payload.microchip.trim() !== "") {
    requestBody.microchip = payload.microchip;
  }

  if (payload.allergies && payload.allergies.trim() !== "") {
    requestBody.allergies = payload.allergies;
  }

  if (payload.notes && payload.notes.trim() !== "") {
    requestBody.notes = payload.notes;
  }

  const response = await fetch(`${API_URL}/pets`, {
    method: "POST",
    headers: getClientAuthHeaders(),
    body: JSON.stringify(requestBody),
  });

  ensureJsonResponse(response);
  const result: PetResponse = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "No fue posible registrar la mascota.");
  }

  return mapPet(result.data);
}

export async function updatePet(
  petId: string,
  payload: CreatePetPayload,
): Promise<PetItem> {
  const requestBody: Record<string, unknown> = {
    name: payload.name,
    speciesId: payload.speciesId,
    sex: payload.sex || "UNKNOWN",
    birthDate: payload.birthDate,
    isSterilized: payload.isSterilized ?? false,
  };

  if (payload.breedId && payload.breedId.trim() !== "") {
    requestBody.breedId = payload.breedId;
  }

  if (payload.color && payload.color.trim() !== "") {
    requestBody.color = payload.color;
  }

  if (payload.microchip && payload.microchip.trim() !== "") {
    requestBody.microchip = payload.microchip;
  }

  if (payload.allergies && payload.allergies.trim() !== "") {
    requestBody.allergies = payload.allergies;
  }

  if (payload.notes && payload.notes.trim() !== "") {
    requestBody.notes = payload.notes;
  }

  const response = await fetch(`${API_URL}/pets/${petId}`, {
    method: "PATCH",
    headers: getClientAuthHeaders(),
    body: JSON.stringify(requestBody),
  });

  ensureJsonResponse(response);
  const result: PetResponse = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(result.message || "No fue posible actualizar la mascota.");
  }

  return mapPet(result.data);
}

export async function deletePet(petId: string): Promise<void> {
  const response = await fetch(`${API_URL}/pets/${petId}`, {
    method: "DELETE",
    headers: getClientAuthHeaders(),
  });

  ensureJsonResponse(response);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "No fue posible eliminar la mascota.");
  }
}

export async function fetchSpeciesOptions(): Promise<SpeciesOption[]> {
  const response = await fetch(`${API_URL}/species`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "No fue posible obtener las especies.");
  }

  return (result.data ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
  }));
}

export async function fetchBreedOptions(): Promise<BreedOption[]> {
  const response = await fetch(`${API_URL}/breeds`, {
    method: "GET",
    headers: getClientAuthHeaders(),
    cache: "no-store",
  });

  ensureJsonResponse(response);
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "No fue posible obtener las razas.");
  }

  return (result.data ?? []).map((item: any) => ({
    id: item.id,
    name: item.name,
    speciesId: item.species_id ?? item.speciesId ?? null,
  }));
}