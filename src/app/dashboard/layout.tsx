"use client"
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, isPending: loading } = authClient.useSession();
  return (
    <>
      <div className="grid min-h-screen md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr]">
        <div className="border-r bg-muted/40 p-4 dark:bg-muted/50 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="flex items-center border-b px-4 lg:h-[60px] lg;px-6">
              {loading ? (
                <div className="flex items-center justify-center">
                  <p className="text-muted-foreground">Loading...</p>
                </div>
              ) : (
                  <Link href="/">
                    <h1 className="text-lg font-bold">{session?.user.name}&apos;s Dashboard</h1>
                  </Link>
              )}
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                Dashboard
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
        </div>
      </div>
    </>
  );
}
