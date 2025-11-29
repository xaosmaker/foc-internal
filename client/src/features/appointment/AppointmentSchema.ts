import { z } from "zod/v4";

export const appointmentSchema = z.object({
  full_name: z.string().trim(),
  telephone: z
    .string()
    .trim()
    .max(10, { error: "Telephone should be 10 chars long" }),
  address: z.string().trim(),
  appointment_date: z.iso.datetime().trim(),
  status: z.coerce.number(),
  location: z.coerce.number(),
  user: z.coerce.number(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
