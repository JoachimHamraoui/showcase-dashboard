import Link from "next/link";
import { DashboardLinks } from "../components/DashboardLinks";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr]">
      <div className="border-r bg-muted/40 p-4 dark:bg-muted/50 md:block">
        <div className="flex flex-col max-h-screen h-full gap-2">
          <div className="flex items-center border-b px-4 lg:h-[60px]">
            <Link href="/">
              <h1 className="text-lg font-bold">Dashboard</h1>
            </Link>
          </div>
          <div className="flex-1 flex-col justify-between">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <DashboardLinks />
            </nav>
          </div>
        </div>
      </div>
      <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
    </div>
  );
}
