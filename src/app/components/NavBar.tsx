import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/">
        <h1 className="text-3xl font-black text-primary hover:text-primary-600">DSHBRD.</h1>
      </Link>
      <Link href="/auth/login">
        <RainbowButton>Get Started</RainbowButton>
      </Link>
    </nav>
  );
}
