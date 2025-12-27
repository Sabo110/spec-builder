"use client"
import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Projects } from "@/types/appwrite"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Dialogue from "@/components/Dialogue"
import DeleteProject from "@/components/DeleteProject"
import { useViewProjectStore } from "@/store/projects"
export const columns: ColumnDef<Projects>[] = [
    {
        accessorKey: "title",
        header: "Projet",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const project = row.original
            const [open, setOpen] = React.useState(false)
            const setViewProject = useViewProjectStore((state) => state.setView)
            const setProject = useViewProjectStore((state) => state.setProject)
            return (
                <>
                    <Dialogue open={open} onOpenChange={setOpen} title="Supprimer le projet">
                        <DeleteProject setOpen={setOpen} project={project} />
                    </Dialogue>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    setViewProject(true)
                                    setProject(project)
                                }}
                            >
                                Previsualiser
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Mettre a jour</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setOpen(true)}>Supprimer</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </>
            )
        },
    },
]