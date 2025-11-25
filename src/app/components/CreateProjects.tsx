"use client";

import { useState } from "react";
import Image from "next/image";

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
  const [imageUrl, setImageUrl] = useState<string>(""); // cloud URL
  const [preview, setPreview] = useState<string | null>(null); // local preview

  // convert file → base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  // handle file upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file)); // local preview

    const base64 = await toBase64(file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ file: base64 }),
    });

    const data = await res.json();
    setImageUrl(data.url); // store uploaded URL
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Describe your project</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 p-6">
        <form action={createProject} className="grid grid-cols-2 gap-4 gap-y-6">
          <Input name="title" placeholder="Project name" />
          <Input name="description" placeholder="Project description" />

          {/* Image uploader */}
          <div className="col-span-2 flex flex-col gap-2">
            <Input type="file" accept="image/*" onChange={handleImageUpload} />

            {preview && (
              <div className="relative w-full h-52">
                <Image
                  src={preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            {/* Hidden input to submit uploaded URL */}
            <input type="hidden" name="image" value={imageUrl} />
          </div>

          <Input name="github" placeholder="Github link" />
          <Input name="live" placeholder="Live link" />

          {/* Tech stack */}
          <div className="col-span-2">
            <MultipleSelector
              defaultOptions={technologies}
              value={techStack}
              onChange={setTechStack}
              placeholder="Select technologies used"
            />
          </div>

          {/* Hidden techstack input as JSON array */}
          <input
            type="hidden"
            name="techstack"
            value={JSON.stringify(techStack.map((t) => t.value))}
          />

          {/* Hidden user ID */}
          {userId && <input type="hidden" name="userId" value={userId} />}

          <Button type="submit" className="col-span-2">
            Create Project
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
