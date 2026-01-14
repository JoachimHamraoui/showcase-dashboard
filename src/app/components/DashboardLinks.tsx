"use client";

import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

// use client when you need JavaScript bundle

export const dashboardLinks = [
  {
    id: 0,
    title: "Projects",
    href: "/dashboard",
    icon: HomeIcon,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      {dashboardLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary my-2"
          )}
        >
          <link.icon size={20} />
          {link.title}
        </Link>
      ))}
      <LogoutButton />
    </>
  );
}
