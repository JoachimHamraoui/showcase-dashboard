import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="my-6 px-4 max-w-md mx-auto">
      <div className="text-center space-y-0">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <Button asChild size="lg" variant="link">
          <Link href="/auth/login">Log in / Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
