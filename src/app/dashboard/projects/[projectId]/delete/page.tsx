import { DeleteProject } from "@/app/components/DeleteProject";
import { auth } from "@/lib/auth";
import { getProjectById } from "@/lib/projects";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type Params = Promise<{ projectId: string }>;

async function fetchUserProjectById(projectId: string) {
    try {
        const headerList = await headers();
        const session = await auth.api.getSession({ headers: headerList });
        if (!session?.user?.id) return null;
        return await getProjectById(projectId, session.user.id);
    } catch (error) {
        console.error("Failed to fetch project:", error);
        return null;
    }
}

export default async function DeleteProjectPage({
    params
}: {
    params: Params
}) {
    const { projectId } = await params;
    const project = await fetchUserProjectById(projectId);
    if (!project) {
        redirect("/dashboard");
    }
    return (
        <div className="w-full flex flex-col items-center">
            <div className="w-8/10 h-[500px] mt-24">
                <DeleteProject project={project} />
            </div>
        </div>
    );
}

