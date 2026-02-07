import { AuroraText } from "@/components/ui/aurora-text";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background/50 text-sm text-muted-foreground mt-32">
      <div className="container mx-auto py-4 text-center">
        <p className="font-black tracking-tighter">
            &copy; {new Date().getFullYear()}{" "}
          <AuroraText speed={1} colors={["#FE8C00", "#F83600"]}>
            DSHBRD.
          </AuroraText>
          {" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
