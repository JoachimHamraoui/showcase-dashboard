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
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { authClient } from "@/lib/auth-client";
import { updateProject } from "@/lib/actions";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { updateProjectSchema } from "@/lib/zod-schemas";
import { useRouter } from "next/navigation";

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

type UpdateProjectForm = z.infer<typeof updateProjectSchema>;

export function EditProjectForm({ project }: EditProjectFormProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id as string;

  // Initialize states with existing project data
  const initialTechStack: Option[] = (project.techstack || []).map((tech) => ({
    value: tech,
    label: tech,
  }));

  const [techStack, setTechStack] = useState<Option[]>(initialTechStack);
  const [imageUrl, setImageUrl] = useState<string>(project.keyImage || ""); // cloud URL
  const [preview, setPreview] = useState<string | null>(
    project.keyImage || null
  ); // local preview
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const form = useForm<UpdateProjectForm>({
    defaultValues: {
      id: project.id,
      title: project.name,
      description: project.description || "",
      github: project.github || "",
      live: project.live || "",
      techstack: "",
      keyImage: project.keyImage || "",
      userId: project.userId,
    },
  });

  const isSubmitting = form.formState.isSubmitting;

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

    setIsUploadingImage(true);
    setPreview(URL.createObjectURL(file)); // local preview

    const base64 = await toBase64(file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: JSON.stringify({ file: base64 }),
    });

    const data = await res.json();
    setImageUrl(data.url); // store uploaded URL
    setIsUploadingImage(false);
  }

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Editing </CardTitle>
        <CardDescription>{project.name}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <form
          action={async (formData: FormData) => {
            // Client-side check: ensure image is uploaded
            if (!imageUrl) {
              toast.error("Please upload an image before submitting");
              return;
            }

            await toast.promise(updateProject(formData), {
              loading: "Updating project...",
              success: (result) => {
                if (result?.error) {
                  throw new Error(JSON.stringify(result.error));
                }
                if (result?.success) {
                  return "Project updated successfully!";
                }
                throw new Error("Unknown error");
              },
              error: (err) => {
                console.log("❌ Update project error:", err.message);
                return "Failed to update project.";
              },
            });
            router.push("/dashboard");
          }}
          className="grid grid-cols-2 gap-4 gap-y-6"
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="title">Project Name</Label>
            <Input
              id="title"
              name="title"
              placeholder="My awesome project"
              defaultValue={project.name}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              name="description"
              placeholder="A brief description"
              defaultValue={project.description || ""}
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="github">GitHub Link</Label>
            <Input
              id="github"
              name="github"
              placeholder="https://github.com/..."
              defaultValue={project.github || ""}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="live">Live Link (Optional)</Label>
            <Input
              id="live"
              name="live"
              placeholder="https://..."
              defaultValue={project.live || ""}
            />
          </div>

          {/* Tech stack */}
          <div className="col-span-2 flex flex-col gap-2">
            <Label>Tech Stack</Label>
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

          {/* Image uploader */}
          <div className="col-span-1 flex flex-col gap-2">
            <Label>Project Image</Label>
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
              />
            </label>

            <input type="hidden" name="keyImage" value={imageUrl} />
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

          {/* Hidden fields */}
          <input type="hidden" name="id" value={project.id} />
          {userId && <input type="hidden" name="userId" value={userId} />}

          <Button
            type="submit"
            disabled={isSubmitting || isUploadingImage}
            className="w-full"
          >
            <LoadingSwap isLoading={isSubmitting || isUploadingImage}>
              <span>Update</span>
            </LoadingSwap>
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
