import { db } from "@/drizzle/db";
import { project } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getProjects(userId: string) {
  return await db.select().from(project).where(eq(project.userId, userId));
}

export async function getProjectById(projectId: string, userId: string) {
  const result = await db
    .select()
    .from(project)
    .where(eq(project.id, projectId));

  // Return first result if it belongs to the user, otherwise null
  return result[0]?.userId === userId ? result[0] : null;
}
