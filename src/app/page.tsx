"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

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
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-0">
        {session == null ? (
          <>
            <h1 className="text-3xl font-bold">Welcome</h1>
            <Button asChild size="lg" variant="link">
              <Link href="/auth/login">Log in / Sign up</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold">Welcome {session.user.name}</h1>
            <Button
              size="lg"
              variant="destructive"
              onClick={() => authClient.signOut()}
            >
              Log out
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
