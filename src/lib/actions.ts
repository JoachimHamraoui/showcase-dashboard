"use server";

import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { project } from "@/drizzle/schemas/auth-schema";
import { createProjectSchema } from "@/lib/zod-schemas"; // move schema outside client

export async function createProject(formData: FormData) {
  // Convert to an object
  const raw = Object.fromEntries(formData);

  // Validate with Zod on the server
  const parsed = createProjectSchema.safeParse(raw);
  if (!parsed.success) {
    console.log("❌ ZOD ERROR:", parsed.error.flatten());
    return { error: parsed.error.flatten() }; // stops insert
  }

  const data = parsed.data;

  await db.insert(project).values({
    id: uuid(),
    name: data.title,
    description: data.description,
    keyImage: data.image,
    github: data.github,
    live: data.live,
    techstack: data.techstack,
    userId: data.userId,
  });

  revalidatePath("/dashboard/projects");

  return { success: true };
}
