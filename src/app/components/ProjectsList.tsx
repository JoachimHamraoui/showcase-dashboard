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

export function ProjectsList() {
  return (
    <Table>
      <TableHeader className="bg-muted/10">
        <TableRow>
          <TableHead className="w-[100px] font-medium">ID</TableHead>
          <TableHead className="w-[140px]">Image</TableHead>
          <TableHead className="w-[200px] font-medium">Title</TableHead>
          <TableHead className="font-medium">Description</TableHead>
          <TableHead className="">Tech Stack</TableHead>
          <TableHead>Live</TableHead>
          <TableHead>Repository</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>Image 1</TableCell>
          <TableCell>Project 1</TableCell>
          <TableCell>Description 1</TableCell>
          <TableCell>Tech Stack 1</TableCell>
          <TableCell>
            <Link href={"#"}>
              <Badge className="bg-background border border-green-400 text-green-400 dark:bg-background dark:text-green-400 text-semibold px-2">
                Live
              </Badge>
            </Link>
          </TableCell>
          <TableCell>
             <Link href={"#"}>
              <Badge className="bg-background border border-orange-400 text-orange-400 dark:bg-background dark:text-orange-400 text-semibold px-2">
                Repository
              </Badge>
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
