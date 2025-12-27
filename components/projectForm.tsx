"use client"

import { createProjectSchema, CreateProjectValues } from "@/schemas/project"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "./ui/form"
import { FormTextarea } from "./forms/FormTextarea"
import { Button } from "./ui/button"
import { Projects } from "@/types/appwrite"
import FieldArray from "./forms/FieldArray"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateProject, createProject } from "@/lib/client_functions/projects"
import { toast } from "sonner"
import { arrayToString } from "@/lib/helpers/arrayToString"

type Props = {
    project?: Projects
    setVisible: (visible: boolean) => void
}

export default function projectForm({ project, setVisible }: Props) {
    const form = useForm<CreateProjectValues>({
        resolver: zodResolver(createProjectSchema),
        mode: "onChange", // Validation en temps réel
        defaultValues: {
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
                <Button type="submit" disabled={creationM.isPending}>Créer</Button>
            </form>
        </Form>
    )
}
