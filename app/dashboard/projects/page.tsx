"use client"

import ProjectForm from "@/components/projectForm";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/client_functions/projects";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import { useViewProjectStore } from "@/store/projects";
import PreviewProject from "@/components/PreviewProject";
import { useProjectFormStore } from "@/store/projects";

export default function page() {
  const viewCreationProjectForm = useProjectFormStore((state) => state.viewCreationProjectForm)
  const setViewCreationProjectForm = useProjectFormStore((state) => state.setViewCreationProjectForm)
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
  const setViewProject = useViewProjectStore((state) => state.setView)
  const viewProject = useViewProjectStore((state) => state.view)
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* entete */}
        <h1>
          {
            viewCreationProjectForm ? "Interface de creation de projet" :
              viewProject ? "Preview du projet" :
                "Projets"
          }
        </h1>
        {
          viewCreationProjectForm ? <Button onClick={() => setViewCreationProjectForm(false)} className="cursor-pointer">Retour</Button> :
            viewProject ? <Button onClick={() => setViewProject(false)} className="cursor-pointer">Retour</Button> :
              <Button onClick={() => setViewCreationProjectForm(true)} className="cursor-pointer">Créer un projet</Button>
        }
      </div>
      {/* contenu principal */}
      <div>
        {
          viewCreationProjectForm ? <ProjectForm setVisible={setViewCreationProjectForm} /> :
            viewProject ? <PreviewProject /> :
              <DataTable columns={columns} data={data ?? []} />
        }
      </div>
    </div>
  )
}
