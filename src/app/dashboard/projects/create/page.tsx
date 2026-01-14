import { CreateProjects } from "@/app/components/CreateProjects";

export default function CreateProject() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-8/10 h-[500px] mt-24">
        <CreateProjects />
      </div>
    </div>
  );
}
