import { z } from "zod/v4";
//WARN: need proper validation

export const inspectionSchema = z.object({
  id: z.number(),
  full_name: z.string().trim().min(3, "Enter your full name here"),
  telephone: z
    .string()
    .trim()
    .max(10, { error: "Telephone should be 10 chars long" })
    .min(10, { error: "Telephone should be 10 chars long" }),
  address: z.string().trim().min(3, "Enter the address here"),
  location: z.number(),
});

export type InspectionSchema = z.infer<typeof inspectionSchema>;
//use this on other scema for files and details
//details: z.string(),
