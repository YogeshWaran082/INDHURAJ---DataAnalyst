import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter at least 2 characters.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address.").max(254, "Email is too long."),
  service: z.string().max(120, "Please choose a valid service."),
  message: z.string().trim().min(10, "Please add a little more detail (at least 10 characters).").max(5000, "Message is too long."),
  website: z.string(),
});

export type ContactValues = z.infer<typeof contactSchema>;
