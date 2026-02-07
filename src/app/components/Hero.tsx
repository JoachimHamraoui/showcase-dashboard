import Image from "next/image";
import { AuroraText } from "@/components/ui/aurora-text";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

export function Hero() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center py-12 lg:py-32">
        <AnimatedShinyText>✨ Introducing Alpha v1.0</AnimatedShinyText>
      <h1 className="-mt-2 font-black text-4xl sm:text-6xl md:text-7xl lg:text-9xl tracking-tighter">
        <AuroraText speed={1} colors={["#FE8C00", "#F83600"]}>
          DSHBRD.
        </AuroraText>
      </h1>
      <p className="text-md font-medium text-muted-foreground">
        Manage your portfolio&apos;s projects right here.
      </p>
      <p className="text-md font-medium text-muted-foreground ùm">
        For developers, by developers.
      </p>
      <Link href="/auth/login" className="mt-6 -mb-6">
        <InteractiveHoverButton>Get Started</InteractiveHoverButton>
      </Link>
      <Image
        src="/hero.png"
        alt="Hero Image"
        width={1920}
        height={1080}
        className="relative object-cover w-full rounded-lg lg:rounded-2xl shadow-xl mt-24"
      />
    </div>
  );
}
