import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { ProjectsList } from "../components/ProjectsList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const headersList = await headers();
  const session = await auth.api.getSession({ headers: headersList });

  if (!session?.user) {
    return (
      <div className="w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <Button asChild size="lg" variant="link">
          <Link href="/auth/login">Log in / Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-8/9 h-[500px] mt-24">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Projects</CardTitle>
                <CardDescription>
                  Manage your projects right here
                </CardDescription>
              </div>
              <Link
                className={buttonVariants()}
                href="/dashboard/projects/create"
              >
                <PlusIcon /> Create Project
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <ProjectsList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
