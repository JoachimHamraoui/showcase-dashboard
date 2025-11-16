"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ProjectsList } from "../components/ProjectsList";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";

export default function Dashboard() {
  const { data: session, isPending: loading } = authClient.useSession();

  if (loading) {
    return (
      <div className="my-6 px-4 max-w-md mx-auto">
        <div className="text-center space-y-0">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col items-center">
      {session == null ? (
        <>
          <h1 className="text-3xl font-bold">Welcome</h1>
          <Button asChild size="lg" variant="link">
            <Link href="/auth/login">Log in / Sign up</Link>
          </Button>
        </>
      ) : (
        <>
          {/* <h1 className="text-3xl font-bold">Welcome {session.user.name}</h1>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => authClient.signOut()}
            >
              Log out
            </Button> */}
          <div className="w-8/10 h-[500px] mt-24">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>
                      Manage your projects right here
                    </CardDescription>
                  </div>
                  <Link className={buttonVariants()} href="/dashboard/invoices/create">
                    <PlusIcon /> Create Project
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <ProjectsList />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
