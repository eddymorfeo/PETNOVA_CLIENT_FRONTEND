import { z } from "zod";

function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const appointmentGuestSchema = z.object({
  contactName: z
    .string()
    .min(3, "El nombre completo es obligatorio.")
    .max(120, "El nombre es demasiado largo."),
  contactEmail: z
    .string()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo válido."),
  contactPhone: z
    .string()
    .max(20, "El teléfono es demasiado largo.")
    .optional()
    .or(z.literal("")),
  petName: z
    .string()
    .min(1, "El nombre de la mascota es obligatorio.")
    .max(80, "El nombre es demasiado largo."),
  petSpecies: z.string().min(1, "Debes seleccionar una especie."),
  petBreed: z
    .string()
    .max(80, "La raza es demasiado larga.")
    .optional()
    .or(z.literal("")),
  petSex: z.string().optional().or(z.literal("")),
  petAge: z.string().optional().or(z.literal("")),
  petWeightKg: z.string().optional().or(z.literal("")),
  appointmentTypeId: z
    .string()
    .min(1, "Debes seleccionar un tipo de atención."),
  veterinarianId: z
    .string()
    .min(1, "Debes seleccionar un veterinario."),
  appointmentDate: z
    .string()
    .min(1, "Debes seleccionar una fecha.")
    .refine((value) => value >= getTodayDateString(), {
      message: "No puedes seleccionar una fecha anterior a la actual.",
    }),
  appointmentTime: z.string().min(1, "Debes seleccionar un horario."),
  reason: z
    .string()
    .max(1000, "El motivo es demasiado largo.")
    .optional()
    .or(z.literal("")),
  observations: z
    .string()
    .max(1000, "Las observaciones son demasiado largas.")
    .optional()
    .or(z.literal("")),
});

export type AppointmentGuestSchemaData = z.infer<typeof appointmentGuestSchema>;