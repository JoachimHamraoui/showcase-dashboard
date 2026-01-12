import { db } from "@/drizzle/db";
import { project } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getProjects(userId: string) {
  return await db
    .select()
    .from(project)
    .where(eq(project.userId, userId));
}

export async function getProjectById(projectId: string, userId: string) {
 return await db
    .select()
    .from(project)
    .where((eq(project.id, projectId), eq(project.userId, userId)));
}