import type { AppointmentGuestSchemaData } from "@/schemas/appointment-guest/appointment-guest.schema";
import type { CreateGuestAppointmentRequestDto } from "@/types/appointment-guest/appointment-guest.types";

export function mapAppointmentGuestFormToRequest(
  formData: AppointmentGuestSchemaData,
): CreateGuestAppointmentRequestDto {
  return {
    contactName: formData.contactName,
    contactEmail: formData.contactEmail,
    contactPhone: formData.contactPhone || undefined,
    pet: {
      name: formData.petName,
      species: formData.petSpecies,
      breed: formData.petBreed || undefined,
      sex: formData.petSex || undefined,
      age: formData.petAge || undefined,
      weightKg: formData.petWeightKg || undefined,
    },
    appointment: {
      appointmentTypeId: formData.appointmentTypeId,
      veterinarianId: formData.veterinarianId,
      appointmentDate: formData.appointmentDate,
      appointmentTime: formData.appointmentTime,
      reason: formData.reason || undefined,
      observations: formData.observations || undefined,
      bookingSource: "guest_portal",
    },
  };
}
