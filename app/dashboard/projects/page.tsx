"use client"

import ProjectForm from "@/components/projectForm";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/client_functions/projects";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useProjectPreviewStore } from "@/store/projects";
import PreviewProject from "@/components/PreviewProject";
import { useProjectFormStore } from "@/store/projects";
import BackBtn from "@/components/BackBtn";
import { useProjectStore } from "@/store/projects";

export default function page() {
  const setProject = useProjectStore((state) => state.setProject)
  const viewCreationProjectForm = useProjectFormStore((state) => state.viewCreationProjectForm)
  const viewUpdateProjectForm = useProjectFormStore((state) => state.viewUpdateProjectForm)
  const setViewCreationProjectForm = useProjectFormStore((state) => state.setViewCreationProjectForm)
  const setViewUpdateProjectForm = useProjectFormStore((state) => state.setViewUpdateProjectForm)
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
    staleTime: Infinity
  })
  const projectPreview = useProjectPreviewStore((state) => state.projectPreview)
  const setProjectPreview = useProjectPreviewStore((state) => state.setProjectPreview)
  return (

    <div>
      <div className="flex justify-between items-center mb-4">
        {/* entete */}
        {
          viewCreationProjectForm ? <h1 className="md:text-2xl text-xl font-bold">Création de projet</h1> :
            projectPreview ? <h1 className="md:text-2xl text-xl font-bold">Preview du projet</h1> :
              viewUpdateProjectForm ? <h1 className="md:text-2xl text-xl font-bold">Mise à jour du projet</h1> :
                <h1 className="md:text-2xl text-xl font-bold">Projets</h1>
        }
        {
          viewCreationProjectForm ? <BackBtn onClick={() => setViewCreationProjectForm(false)} /> :
            projectPreview ? <BackBtn onClick={() => setProjectPreview(null)} /> :
              viewUpdateProjectForm ? <BackBtn onClick={() => { setViewUpdateProjectForm(false); setProject(null) }} /> :
                <Button onClick={() => setViewCreationProjectForm(true)} className="cursor-pointer" size="lg">Créer un projet</Button>
        }
      </div>
      {/* contenu principal */}
      <div>
        {
          viewCreationProjectForm ? <ProjectForm setVisible={setViewCreationProjectForm} /> :
            viewUpdateProjectForm ? <ProjectForm setVisible={setViewUpdateProjectForm} /> :
              projectPreview ? <PreviewProject /> :
                isPending ? <p>Chargement...</p> :
                  <DataTable columns={columns} data={data ?? []} />
        }
      </div>
    </div>

  )
}
