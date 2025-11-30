import { z } from "zod/v4";
//WARN: need proper validation

export const appointmentSchema = z.object({
  full_name: z.string().trim().min(3, "Enter your full name here"),
  telephone: z
    .string()
    .trim()
    .max(10, { error: "Telephone should be 10 chars long" })
    .min(10, { error: "Telephone should be 10 chars long" }),
  address: z.string().trim().min(3, "Enter the address here"),
  date: z.iso.date({ error: "Invalid Date" }).trim(),
  time: z.iso.time({ error: "Invalid time" }),
  status: z.number(),
  location: z.number(),
});

export type AppointmentSchema = z.infer<typeof appointmentSchema>;
