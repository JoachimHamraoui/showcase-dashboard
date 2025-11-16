import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProjectsList() {
    return (
        <Table>
            <TableHeader className="bg-muted/10">
                <TableRow>
                    <TableHead className="w-[100px] font-medium">ID</TableHead>
                    <TableHead className="w-[200px] font-medium">Title</TableHead>
                    <TableHead className="w-[50px]">Image</TableHead>
                    <TableHead className="font-medium">Description</TableHead>
                    <TableHead className="">Tech Stack</TableHead>
                    <TableHead>Live</TableHead>
                    <TableHead>Repo</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>Project 1</TableCell>
                    <TableCell>Description 1</TableCell>
                    <TableCell>Tech Stack 1</TableCell>
                    <TableCell>Description 1</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}