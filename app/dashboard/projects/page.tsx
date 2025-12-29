"use client"

import ProjectForm from "@/components/projectForm";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/client_functions/projects";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import { useProjectPreviewStore } from "@/store/projects";
import PreviewProject from "@/components/PreviewProject";
import { useProjectFormStore } from "@/store/projects";

export default function page() {
  const viewCreationProjectForm = useProjectFormStore((state) => state.viewCreationProjectForm)
  const viewUpdateProjectForm = useProjectFormStore((state) => state.viewUpdateProjectForm)
  const setViewCreationProjectForm = useProjectFormStore((state) => state.setViewCreationProjectForm)
  const setViewUpdateProjectForm = useProjectFormStore((state) => state.setViewUpdateProjectForm)
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
  const projectPreview = useProjectPreviewStore((state) => state.projectPreview)
  const setProjectPreview = useProjectPreviewStore((state) => state.setProjectPreview)
  return (
    
      <div>
        <div className="flex justify-between items-center mb-4">
          {/* entete */}
          <h1>
            {
              viewCreationProjectForm ? "Interface de creation de projet" :
                projectPreview ? "Preview du projet" :
                  "Projets"
            }
          </h1>
          {
            viewCreationProjectForm ? <Button onClick={() => setViewCreationProjectForm(false)} className="cursor-pointer">Retour</Button> :
              projectPreview ? <Button onClick={() => setProjectPreview(null)} className="cursor-pointer">Retour</Button> :
                viewUpdateProjectForm ? <Button onClick={() => setViewUpdateProjectForm(false)} className="cursor-pointer">Retour</Button> :
                  <Button onClick={() => setViewCreationProjectForm(true)} className="cursor-pointer">Créer un projet</Button>
          }
        </div>
        {/* contenu principal */}
        <div>
          {
            viewCreationProjectForm ? <ProjectForm setVisible={setViewCreationProjectForm} /> :
              viewUpdateProjectForm ? <ProjectForm setVisible={setViewUpdateProjectForm} /> :
                projectPreview ? <PreviewProject /> :
                  <DataTable columns={columns} data={data ?? []} />
          }
        </div>
      </div>
    
  )
}
