"use client";

import { useActionState, useState } from "react";
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
import { Upload } from "lucide-react";
import { useForm } from "@conform-to/react";
import { createProjectSchema } from "@/lib/zod-schemas";
import { parseWithZod } from "@conform-to/zod";

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

  const [lastResult, action] = useActionState(createProject, undefined);
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createProjectSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

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

  function resetFields() {
    setTechStack([]);
    setPreview(null);
    setImageUrl("");

    // also reset file input manually
    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Describe your project</CardDescription>
      </CardHeader>

      <CardContent className="grid gap-4 p-6">
        <form
          action={createProject}
          id={form.id}
          onSubmit={form.onSubmit}
          noValidate
          className="grid grid-cols-2 gap-4 gap-y-6"
        >
          <Input
            name={fields.title.name}
            key={fields.title.name}
            defaultValue={fields.title.defaultValue}
            placeholder="Project name"
          />
          <Input
            name={fields.description.name}
            key={fields.description.name}
            defaultValue={fields.description.defaultValue}
            placeholder="Project description"
          />

          <Input
            name={fields.github.name}
            key={fields.github.name}
            defaultValue={fields.github.defaultValue}
            placeholder="Github link"
          />
          <Input
            name={fields.live.name}
            key={fields.live.name}
            defaultValue={fields.live.defaultValue}
            placeholder="Live link"
          />

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
            name={fields.techstack.name}
            key={fields.techstack.name}
            defaultValue={fields.techstack.defaultValue}
            value={JSON.stringify(techStack.map((t) => t.value))}
          />

          {/* Image uploader */}
          <div className="col-span-1 flex flex-col gap-2">
            <label
              htmlFor="file-upload"
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const file = e.dataTransfer.files?.[0];
                if (file) {
                  // Manually call your existing upload handler
                  handleImageUpload({
                    target: { files: [file] },
                  } as unknown as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              className="
      flex flex-col gap-2 items-center justify-center
      border border-border rounded-xl cursor-pointer
      p-8 text-center transition
      hover:bg-muted/50 h-42
    "
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-muted">
                <Upload className="h-6 w-6 opacity-80" />
              </div>

              <div>
                <p className="text-sm font-medium">Upload your image</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Drag & drop or click to browse
                </p>
              </div>

              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                name={fields.keyImage.name}
                key={fields.keyImage.name}
                defaultValue={fields.keyImage.defaultValue}
              />
            </label>

            <input type="hidden" name="image" value={imageUrl} />
          </div>
          <div className="col-span-1">
            {!preview && (
              <h2 className="text-lg font-bold text-primary">Preview</h2>
            )}
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={300}
                height={300}
                className="w-auto h-42 object-cover rounded-lg"
              />
            )}
          </div>

          {userId && <input type="hidden" name="userId" value={userId} />}

          <Button type="submit" className="w-full">
            <span>Create</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
