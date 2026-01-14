"use server";

import { v4 as uuid } from "uuid";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { project } from "@/drizzle/schemas/auth-schema";
import { createProjectSchema, updateProjectSchema } from "@/lib/zod-schemas"; // move schema outside client
import { revalidatePath } from "next/cache";

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
    keyImage: data.keyImage,
    github: data.github,
    live: data.live,
    techstack: data.techstack,
    userId: data.userId,
  });

  revalidatePath("/dashboard");

  return { success: true };
}

export async function updateProject(formData: FormData) {
  // Convert to an object
  const raw = Object.fromEntries(formData);

  // Validate with Zod on the server
  const parsed = updateProjectSchema.safeParse(raw);
  if (!parsed.success) {
    console.log("❌ ZOD ERROR:", parsed.error.flatten());
    return { error: parsed.error.flatten() }; // stops update
  }

  const data = parsed.data;

  await db
    .update(project)
    .set({
      name: data.title,
      description: data.description,
      keyImage: data.keyImage,
      github: data.github,
      live: data.live,
      techstack: data.techstack,
      userId: data.userId,
    })
    .where(eq(project.id, data.id));

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/projects/${data.id}/edit`);

  return { success: true };
}

export async function deleteProject(projectId: string) {
  try {
    await db.delete(project).where(eq(project.id, projectId));
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete project" };
  }
}
