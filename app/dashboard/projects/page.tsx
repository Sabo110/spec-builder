"use client"

import ProjectForm from "@/components/projectForm";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/lib/client_functions/projects";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function page() {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })
  const [visible, setVisible] = useState(false)
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Projects</h1>
        <Button onClick={() => setVisible(!visible)} className="cursor-pointer">{visible ? "Retour" : "Créer un projet"}</Button>
      </div>
      {visible ? <ProjectForm /> : null}
      {!visible ? <div>
        <DataTable columns={columns} data={data ?? []} />
      </div> : null}
    </div>
  )
}
