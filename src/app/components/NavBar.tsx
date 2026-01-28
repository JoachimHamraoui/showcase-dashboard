import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import { User2Icon } from "lucide-react";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-black hover:text-primary-600">
          <AuroraText speed={1} colors={["#FE8C00", "#F83600"]}>
            DSHBRD.
          </AuroraText>
        </h1>
      </Link>
      <Link href="/auth/login">
        <Button><User2Icon className="size-4" /> Login</Button>
      </Link>
    </nav>
  );
}
