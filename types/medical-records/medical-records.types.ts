export type MedicalRecordPetItem = {
  id: string;
  name: string;
  sex: string | null;
  birthDate: string | null;
  color: string | null;
  isActive: boolean;
  speciesName: string | null;
  breedName: string | null;
  consultationsCount: number;
  lastConsultationDate: string | null;
};

export type MedicalRecordNoteItem = {
  id: string;
  note: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type MedicalRecordTreatmentItem = {
  id: string;
  description: string;
  createdAt: string | null;
  updatedAt: string | null;
};

export type MedicalRecordPrescriptionItem = {
  id: string;
  medicationName: string | null;
  dose: string | null;
  frequency: string | null;
  duration: string | null;
  notes: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type MedicalRecordAttachmentItem = {
  id: string;
  fileName: string | null;
  mimeType: string | null;
  storageKey: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export type MedicalRecordConsultation = {
  id: string;
  appointmentId: string | null;
  consultationDate: string | null;
  veterinarianName: string | null;
  chiefComplaint: string | null;
  anamnesis: string | null;
  physicalExam: string | null;
  assessment: string | null;
  plan: string | null;
  diagnosis: string | null;
  summary: string | null;
  weightKg: number | null;
  temperatureC: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  consultationNotes: MedicalRecordNoteItem[];
  treatments: MedicalRecordTreatmentItem[];
  prescriptions: MedicalRecordPrescriptionItem[];
  attachments: MedicalRecordAttachmentItem[];
};

export type PetMedicalRecord = {
  pet: {
    id: string;
    name: string;
    speciesName: string | null;
    breedName: string | null;
    sex: string | null;
    birthDate: string | null;
    color: string | null;
    microchip: string | null;
    allergies: string | null;
    notes: string | null;
  };
  summary: {
    totalConsultations: number;
    lastConsultationDate: string | null;
  };
  consultations: MedicalRecordConsultation[];
};