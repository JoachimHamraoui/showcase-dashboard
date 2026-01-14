"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { deleteProject } from "@/lib/actions";
import { Trash2 } from "lucide-react";
import { redirect } from "next/navigation";
import { toast } from "sonner";

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

interface DeleteProjectProps {
  project: Project;
}

export function DeleteProject({ project }: DeleteProjectProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete {project.name} project ?</CardTitle>
        <CardDescription>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="bg-gray-600/20 w-full h-50 mb-4 flex justify-center items-center rounded-xl">
            <Trash2 className="text-gray-600/50" size={100} />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => {
                redirect("/dashboard");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={async () => {
                const result = await deleteProject(project.id);
                if (result.success) {
                  toast.success("Deleted project succesfully !");
                } else {
                  toast.error(result.error || "Failed to delete project");
                }
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
