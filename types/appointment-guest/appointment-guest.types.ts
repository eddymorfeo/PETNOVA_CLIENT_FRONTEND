export type AppointmentGuestFormData = {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  petName: string;
  petSpecies: string;
  petBreed?: string;
  petSex?: string;
  petAge?: string;
  petWeightKg?: string;
  appointmentTypeId: string;
  veterinarianId: string;
  appointmentDate: string;
  appointmentTime: string;
  reason?: string;
  observations?: string;
};

export type CreateGuestAppointmentRequestDto = {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  pet: {
    name: string;
    species: string;
    breed?: string;
    sex?: string;
    age?: string;
    weightKg?: string;
  };
  appointment: {
    appointmentTypeId: string;
    veterinarianId: string;
    appointmentDate: string;
    appointmentTime: string;
    reason?: string;
    observations?: string;
    bookingSource: "guest_portal";
  };
};

export type CreateGuestAppointmentResponseDto = {
  appointmentId: string;
  guestBookingId?: string;
  status: string;
  message: string;
};

export type AppointmentTypeOption = {
  id: string;
  name: string;
  description?: string;
};

export type VeterinarianOption = {
  id: string;
  fullName: string;
  specialty?: string;
};

export type AvailableTimeOption = {
  value: string;
  label: string;
};

export type SpeciesOption = {
  id: string;
  code: string;
  name: string;
};

export type BreedOption = {
  id: string;
  speciesId: string;
  name: string;
};
