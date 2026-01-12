"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Project = {
  id: string;
  name: string;
  description: string | null;
  github: string | null;
  live: string | null;
  techstack: string[] | null;
  keyImage: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

interface EditProjectFormProps {
  project: Project;
}

export function EditProjectForm({ project }: EditProjectFormProps) {
  // Now you have properly typed project data from the server
  console.log(project);

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Editing</CardTitle>
        <CardDescription>{project.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6"></CardContent>
    </Card>
  );
}
