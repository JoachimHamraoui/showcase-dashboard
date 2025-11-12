"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/auth/login");
  };

  return (
    <Button
      variant="link"
      onClick={handleSignOut}
      className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
    >
      <LogOutIcon size={20} />
      Log out
    </Button>
  );
}
