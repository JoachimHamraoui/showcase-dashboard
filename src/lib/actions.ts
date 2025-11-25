"use server";
import { v4 as uuid } from "uuid";
import { revalidatePath } from "next/cache";
import { db } from "@/drizzle/db";
import { project } from "@/drizzle/schemas/auth-schema";

export async function createProject(formData: FormData) {
    const name = formData.get("title") as string;
  const description = formData.get("description") as string;
  const keyImage = formData.get("image") as string;
  const github = formData.get("github") as string;
  const live = formData.get("live") as string;
  const techstackRaw = formData.get("techstack") as string;
  const techstack: string[] = JSON.parse(techstackRaw)
  console.log(techstack);

  const userId = formData.get("userId") as string;

  await db.insert(project).values({
    id: uuid(),
    name,
    description,
    keyImage,
    github,
    live,
    techstack, // ← this matches your schema (text[])
    userId
  });

  revalidatePath("/dashboard/projects"); // update UI
}