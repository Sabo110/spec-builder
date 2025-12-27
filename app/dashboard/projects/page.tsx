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

export default function page() {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
  const [visible, setVisible] = useState(false)
  const viewProject = useViewProjectStore((state) => state.view)
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1> {!visible ? "Projets" : "Interface de creation de projet"}</h1>
        {
          !visible ? <Button onClick={() => setVisible(!visible)} className="cursor-pointer">Créer un projet</Button> : <X onClick={() => setVisible(!visible)} className="cursor-pointer" />
        }
      </div>
      {visible ? <ProjectForm setVisible={setVisible} /> : null}
      {!visible ? <div>
        <DataTable columns={columns} data={data ?? []} />
      </div> : null}
      {
        viewProject ?
          <PreviewProject /> : null
      }
    </div>
  )
}
