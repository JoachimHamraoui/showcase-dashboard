"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option} from "@/components/ui/multiple-selector";
import { useState } from "react";

const technologies = [
  { value: "react", label: "React" },
  { value: "nextjs", label: "Next.js" },
  { value: "node", label: "Node.js" },
  { value: "typescript", label: "TypeScript" },
  { value: "tailwind", label: "TailwindCSS" },
  { value: "postgres", label: "PostgreSQL" },
];


export function CreateProjects() {
  const [techStack, setTechStack] = useState<Option[]>([]);
    console.log(techStack)
  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Describe your project here</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <form className="grid grid-cols-2 gap-4 gap-y-6">
          <Input name="title" placeholder="Project name" className="w-full" />
          <Input
            name="description"
            placeholder="Project description"
            className="w-full"
          />
          <Input name="image" placeholder="Project image" className="w-full" />
          <Input name="github" placeholder="Github link" className="w-full" />
          <Input name="live" placeholder="Live link" className="w-full" />

          {/* Tech Stack Selector */}
          <div className="w-full">
            <MultipleSelector
              className="w-full"
              defaultOptions={technologies}
              placeholder="Select technologies"
              value={techStack}
              onChange={setTechStack}
            />
          </div>

          {/* Hidden input so the server action receives the JSON values */}
          <input
            type="hidden"
            name="techStack"
            value={JSON.stringify(techStack.map((t) => t.value as string))}
          />

          <Button type="submit" className="col-span-2">
            Create Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
