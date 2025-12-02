// /lib/zod-schemas.ts
import z from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  // REQUIRED
  github: z.string().url("Invalid GitHub URL"),

  // OPTIONAL
  live: z.string().url("Invalid URL").optional().or(z.literal("")),

  // techstack is sent as JSON string in a hidden input; transform it to array
  techstack: z
    .string()
    .transform((val) => {
      try {
        return JSON.parse(val);
      } catch {
        return [];
      }
    })
    .refine((arr: unknown) => Array.isArray(arr) && (arr as string[]).length > 0, {
      message: "Select at least one technology",
    }),

  // REQUIRED — must not be empty
  keyImage: z.string().min(1, "Image is required"),

  userId: z.string().min(1, "User is required"),
});

export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
