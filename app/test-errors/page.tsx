"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { DynamicStringArray } from "@/components/forms/DynamicStringArray"

const testSchema = z.object({
    objectives: z.array(z.string().min(1, "L'objectif ne peut pas être vide"))
        .min(1, "Au moins un objectif est requis")
        .max(7, "Maximum 7 objectifs autorisés"),
})

type TestValues = z.infer<typeof testSchema>

export default function TestPage() {
    const form = useForm<TestValues>({
        resolver: zodResolver(testSchema),
        mode: "onChange",
        defaultValues: {
            objectives: [],
        },
    })

    return (
        <div className="container mx-auto max-w-2xl py-10">
            <h1 className="text-2xl font-bold mb-6">Test des erreurs de tableau</h1>

            <Form {...form}>
                <form className="space-y-6">
                    <DynamicStringArray
                        control={form.control}
                        name="objectives"
                        label="Objectifs (min 1, max 7)"
                        placeholder="Ajoutez un objectif"
                    />

                    <Button type="submit">Soumettre</Button>
                </form>
            </Form>

            {/* Debug */}
            <div className="mt-8 p-4 bg-muted rounded">
                <h3 className="font-semibold mb-2">Debug - Erreurs :</h3>
                <pre className="text-xs">
                    {JSON.stringify(form.formState.errors, null, 2)}
                </pre>
            </div>
        </div>
    )
}
