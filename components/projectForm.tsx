"use client"

import { createProjectSchema, CreateProjectValues } from "@/schemas/project"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useWatch } from "react-hook-form"
import { Form } from "./ui/form"
import { FormTextarea } from "./forms/FormTextarea"
import { Button } from "./ui/button"
import FieldArray from "./forms/FieldArray"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProject, createProject } from "@/lib/client_functions/projects"
import { toast } from "sonner"
import { stringToArray, arrayToString } from "@/lib/helpers/arrayToString"
import { useProjectStore } from "@/store/projects"
import { useState } from "react"
import { UpdateProject, updateProject } from "@/lib/client_functions/projects"
import { getChangedProperties } from "@/lib/helpers/compare"
import { Projects } from "@/types/appwrite"

type Props = {
    setVisible: (visible: boolean) => void
}

export default function projectForm({ setVisible }: Props) {
    const project = useProjectStore((state) => state.project)
    const form = useForm<CreateProjectValues>({
        resolver: zodResolver(createProjectSchema),
        mode: "onChange", // Validation en temps réel
        defaultValues: project ? {
            title: project.title,
            description: project.description,
            problematic: project.problematic,
            objectives: stringToArray(project.objectives),
            features: stringToArray(project.features),
            constraints: stringToArray(project.constraints),
        } :
            {
                title: "",
                description: "",
                problematic: "",
                objectives: [{ value: "" }],
                features: [{ value: "" }],
                constraints: [{ value: "" }],
            },
    })
    const queryClient = useQueryClient()
    const creationM = useMutation({
        mutationFn: (data: CreateProject) => createProject(data),
    })
    const updateM = useMutation({
        mutationFn: (data: UpdateProject) => updateProject(project?.$id!, data),
    })
    function onSubmit(data: CreateProjectValues) {
        if (!project) {
            const project = {
                ...data,
                objectives: arrayToString(data.objectives),
                features: arrayToString(data.features),
                constraints: arrayToString(data.constraints),
            }
            console.log(project)
            toast.promise(
                () => creationM.mutateAsync(project),
                {
                    loading: "création en cours...",
                    success: (data) => {
                        queryClient.invalidateQueries({ queryKey: ["projects"] })
                        setVisible(false)
                        return data.message
                    },
                    error: (error) => error.message,
                }
            )
        } else {
            const projectFromForm = {
                ...data,
                objectives: arrayToString(data.objectives),
                features: arrayToString(data.features),
                constraints: arrayToString(data.constraints),
            }
            const keysToCompare: (keyof typeof projectFromForm)[] = [
                "title",
                "description",
                "problematic",
                "objectives",
                "features",
                "constraints"
            ]

            const changes = getChangedProperties(project, projectFromForm, keysToCompare)

            if (Object.keys(changes).length === 0) {
                toast.info("Aucune modification détectée")
                return
            }

            toast.promise(
                () => updateM.mutateAsync(changes),
                {
                    loading: "mise à jour en cours...",
                    success: (data) => {
                        queryClient.invalidateQueries({ queryKey: ["projects"] })
                        setVisible(false)
                        return data.message
                    },
                    error: (error) => error.message,
                }
            )

        }

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormTextarea
                    control={form.control}
                    name="title"
                    label="Titre"
                    placeholder="Décris ton projet..."
                    description="Maximum 255 caractères"
                    rows={3}
                />

                <FormTextarea
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Décris ton projet..."
                    description="Maximum 2000 caractères"
                    rows={6}
                />

                <FormTextarea
                    control={form.control}
                    name="problematic"
                    label="Problématique"
                    placeholder="Quelle problématique ce projet résout-il ?"
                    description="Maximum 3000 caractères"
                    rows={6}
                />

                <FieldArray
                    control={form.control}
                    name="objectives"
                    label="Objectifs"
                    placeholder="Ajoute un objectif"
                />
                <FieldArray
                    control={form.control}
                    name="features"
                    label="Caractéristiques"
                    placeholder="Ajoute une caractéristique"
                />
                <FieldArray
                    control={form.control}
                    name="constraints"
                    label="Contraintes"
                    placeholder="Ajoute une contrainte"
                />
                {
                    !project ?
                        <div className="flex justify-end mt-10">
                            <Button type="submit" disabled={creationM.isPending} className="cursor-pointer" size={"lg"}>Créer</Button>
                        </div>
                        :
                        <div className="flex justify-end mt-10">
                            <Button type="submit" disabled={updateM.isPending} className="cursor-pointer" size={"lg"}>Mettre à jour</Button>
                        </div>
                }
            </form>
        </Form>
    )
}
