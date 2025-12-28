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
import { useEffect, useState } from "react"

type Props = {
    setVisible: (visible: boolean) => void
}

export default function projectForm({ setVisible }: Props) {
    const [disableUpdateBtn, setDisableUpdateBtn] = useState(false)
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
    const values = useWatch({
        control: form.control,
    })
    
    const queryClient = useQueryClient()
    const creationM = useMutation({
        mutationFn: (data: CreateProject) => createProject(data),
    })
    function onSubmit(data: CreateProjectValues) {
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
                        <Button type="submit" disabled={creationM.isPending}>Créer</Button> :
                        <Button type="button" disabled={disableUpdateBtn}>Mettre à jour</Button>
                }
            </form>
        </Form>
    )
}
