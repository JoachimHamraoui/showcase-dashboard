"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";

export function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/auth/login");
  };

  return (
    <Link href=""
      onClick={handleSignOut}
      className="flex gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary my-2"
    >
      <LogOutIcon size={20} />
      Log out
    </Link>
  );
}
