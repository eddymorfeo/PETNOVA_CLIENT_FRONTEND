import { z } from "zod";

export const appointmentGuestSchema = z.object({
  contactName: z
    .string()
    .min(3, "El nombre es obligatorio.")
    .max(120, "El nombre es demasiado largo."),

  contactEmail: z
    .string()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo válido."),

  contactPhone: z
    .string()
    .min(8, "El teléfono es obligatorio.")
    .max(20, "El teléfono es demasiado largo."),

  petName: z
    .string()
    .min(1, "El nombre de la mascota es obligatorio.")
    .max(80, "El nombre es demasiado largo."),

  petSpecies: z.enum(["dog", "cat", "other"], {
    message: "Debes seleccionar una especie.",
  }),

  petBreed: z
    .string()
    .min(1, "La raza es obligatoria.")
    .max(80, "La raza es demasiado larga."),

  petSex: z.string().optional(),
  petAge: z.string().optional(),
  petWeightKg: z.string().optional(),

  appointmentTypeId: z
    .string()
    .min(1, "Debes seleccionar un tipo de atención."),

  veterinarianId: z
    .string()
    .min(1, "Debes seleccionar un veterinario."),

  appointmentDate: z
    .string()
    .min(1, "Debes seleccionar una fecha."),

  appointmentTime: z
    .string()
    .min(1, "Debes seleccionar un horario."),

  reason: z
    .string()
    .min(5, "Debes ingresar el motivo de la consulta.")
    .max(1000, "El motivo es demasiado largo."),

  observations: z
    .string()
    .max(1000, "Las observaciones son demasiado largas.")
    .optional(),
});

export type AppointmentGuestSchemaData = z.infer<typeof appointmentGuestSchema>;