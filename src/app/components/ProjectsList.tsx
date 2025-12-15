import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/projects";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { DashboardActions } from "./DashboardActions";

async function fetchUserProjects() {
  try {
    const headersList = await headers();
    const session = await auth.api.getSession({ headers: headersList });
    if (!session?.user?.id) return [];
    return await getProjects(session.user.id);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function ProjectsList() {
  const projects = await fetchUserProjects();

  return (
    <div className="max-h-[50vh] overflow-y-auto border rounded-lg">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">Thumbnail</TableHead>
            <TableHead className="w-2/12">Title</TableHead>
            <TableHead className="w-2/12">Description</TableHead>
            <TableHead className="w-3/12">Tech Stack</TableHead>
            <TableHead className="w-1/12">Live</TableHead>
            <TableHead className="w-auto">Repository</TableHead>
            <TableHead className="w-[90px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {projects.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No projects yet.
              </TableCell>
            </TableRow>
          )}

          {projects.map((p) => (
            <TableRow key={p.id}>
              <TableCell>
                {p.keyImage ? (
                  <Image
                    src={p.keyImage}
                    alt={p.name}
                    width={120}
                    height={40}
                    className="object-cover rounded"
                  />
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell className="truncate">{p.name}</TableCell>
              <TableCell className="truncate">{p.description || "-"}</TableCell>

              <TableCell>
                {Array.isArray(p.techstack) && p.techstack.length ? (
                  <div className="flex flex-wrap gap-1">
                    {p.techstack.map((t: string) => (
                      <Badge key={t} className="px-2 py-1">
                        {t}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  "-"
                )}
              </TableCell>

              <TableCell>
                {p.live ? (
                  <Link href={p.live} target="_blank" rel="noopener noreferrer">
                    <Badge className="bg-background border border-green-400 text-green-400 px-2 py-1">
                      Live
                    </Badge>
                  </Link>
                ) : (
                  <Badge className="bg-background border border-gray-600 text-gray-600 px-2 py-1">
                    Live
                  </Badge>
                )}
              </TableCell>

              <TableCell>
                {p.github ? (
                  <Link href={p.github} target="_blank">
                    <Badge className="bg-background border border-orange-400 text-orange-400 px-2">
                      Repository
                    </Badge>
                  </Link>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <DashboardActions projectId={p.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
