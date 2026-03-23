import { env } from "@/lib/env";
import { fetcher } from "@/lib/fetcher";
import type { ApiResponse } from "@/types/common/api-response.types";
import type {
  AppointmentTypeOption,
  AvailableTimeOption,
  BreedOption,
  CreateGuestAppointmentRequestDto,
  CreateGuestAppointmentResponseDto,
  SpeciesOption,
  VeterinarianOption,
} from "@/types/appointment-guest/appointment-guest.types";

const PUBLIC_GUEST_APPOINTMENT_BASE_PATH = `${env.apiUrl}/public/guest-appointments`;

export async function fetchPublicAppointmentTypes(): Promise<AppointmentTypeOption[]> {
  const response = await fetcher<ApiResponse<AppointmentTypeOption[]>>(
    `${PUBLIC_GUEST_APPOINTMENT_BASE_PATH}/appointment-types`,
    {
      method: "GET",
    }
  );

  return response.data;
}

export async function fetchPublicVeterinarians(): Promise<VeterinarianOption[]> {
  const response = await fetcher<ApiResponse<any[]>>(
    `${PUBLIC_GUEST_APPOINTMENT_BASE_PATH}/veterinarians`,
    {
      method: "GET",
    }
  );

  return response.data.map((veterinarian) => ({
    id: veterinarian.id,
    fullName: veterinarian.full_name,
    specialty: veterinarian.specialty_name ?? undefined,
  }));
}

export async function fetchPublicSpecies(): Promise<SpeciesOption[]> {
  const response = await fetcher<ApiResponse<any[]>>(
    `${PUBLIC_GUEST_APPOINTMENT_BASE_PATH}/species`,
    {
      method: "GET",
    }
  );

  return response.data.map((species) => ({
    id: species.id,
    code: species.code,
    name: species.name,
  }));
}

export async function fetchPublicBreedsBySpecies(
  speciesId: string
): Promise<BreedOption[]> {
  const searchParams = new URLSearchParams({ speciesId });

  const response = await fetcher<ApiResponse<any[]>>(
    `${PUBLIC_GUEST_APPOINTMENT_BASE_PATH}/breeds?${searchParams.toString()}`,
    {
      method: "GET",
    }
  );

  return response.data.map((breed) => ({
    id: breed.id,
    speciesId: breed.species_id,
    name: breed.name,
  }));
}

export async function fetchPublicAvailableTimes(
  veterinarianId: string,
  appointmentDate: string
): Promise<AvailableTimeOption[]> {
  const searchParams = new URLSearchParams({
    veterinarianId,
    appointmentDate,
  });

  const response = await fetcher<ApiResponse<AvailableTimeOption[]>>(
    `${PUBLIC_GUEST_APPOINTMENT_BASE_PATH}/available-times?${searchParams.toString()}`,
    {
      method: "GET",
    }
  );

  return response.data;
}

export async function createGuestAppointment(
  payload: CreateGuestAppointmentRequestDto
): Promise<CreateGuestAppointmentResponseDto> {
  const response = await fetcher<ApiResponse<CreateGuestAppointmentResponseDto>>(
    `${PUBLIC_GUEST_APPOINTMENT_BASE_PATH}`,
    {
      method: "POST",
      bodyJson: payload,
    }
  );

  return response.data;
}
