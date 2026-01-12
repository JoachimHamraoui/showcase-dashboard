type Params = Promise<{ projectId: string }>;

export default async function EditProject({
  params
}: {
  params: Params
}) {

    const { projectId } = await params;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-8/10 h-[500px] mt-24">
        <h1 className="text-2xl font-bold">Edit Project {projectId}</h1>
      </div>
    </div>
  );
}
