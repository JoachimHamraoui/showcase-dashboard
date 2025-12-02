"use server";

import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { project } from "@/drizzle/schemas/auth-schema";
import { createProjectSchema } from "@/lib/zod-schemas";
import { parseWithZod } from "@conform-to/zod";

export async function createProject(previousState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, { schema: createProjectSchema });

  if (submission.status !== "success") {
    return submission.reply() as unknown as string[];
  }
  await db.insert(project).values({
    id: uuid(),
    name: submission.value.title,
    description: submission.value.description,
    keyImage: submission.value.keyImage,
    github: submission.value.github,
    live: submission.value.live,
    techstack: submission.value.techstack,
    userId: submission.value.userId,
  });

  revalidatePath("/dashboard/projects");

  return { success: true };
}
