"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { createProject } from "@/lib/actions";

const technologies = [
  { value: "NextJS", label: "NextJS" },
  { value: "React", label: "React" },
  { value: "React Native", label: "React Native" },
  { value: "Docker", label: "Docker" },
  { value: "Websockets", label: "Websockets" },
  { value: "TailwindCSS", label: "TailwindCSS" },
  { value: "Postgresql", label: "Postgresql" },
  { value: "Kotlin", label: "Kotlin" },
  { value: "PHP", label: "PHP" },
  { value: "Laravel", label: "Laravel" },
  { value: "Laravel Sail", label: "Laravel Sail" },
  { value: "Expo", label: "Expo" },
  { value: "Spring", label: "Spring" },
  { value: "VueJS", label: "VueJS" },
  { value: "NodeJS", label: "NodeJS" },
  { value: "MySQL", label: "MySQL" },
  { value: "Typescript", label: "Typescript" },
];


export function CreateProjects() {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id as string;
  const [techStack, setTechStack] = useState<Option[]>([]);
  console.log(JSON.stringify(techStack.map((t) => t.value)));

  return (
    <Card>
      <CardHeader className="">
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Describe your project here</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <form action={createProject} className="grid grid-cols-2 gap-4 gap-y-6">
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
            name="techstack"
            value={JSON.stringify(techStack.map(t => t.value))
}
          />

          {userId && <input type="hidden" name="userId" value={userId} />}

          <Button type="submit" className="col-span-2">
            Create Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
