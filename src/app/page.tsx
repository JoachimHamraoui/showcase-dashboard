"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { NavBar } from "./components/NavBar";
import { Hero } from "./components/Hero";
import { UpdateLog } from "./components/UpdateLog";

export default function Home() {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-0">
        {session == null ? (
          <main className="w-full">
            <NavBar />
            <Hero />
            <UpdateLog />
          </main>
        ) : (
          redirect("/dashboard")
        )}
      </div>
    </div>
  );
}
