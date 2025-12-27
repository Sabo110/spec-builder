"use client"
import { exportProjectToWord } from '@/lib/client_functions/projects'
import { stringToArray } from '@/lib/helpers/arrayToString'
import { useViewProjectStore } from '@/store/projects'
import { Button } from './ui/button'

export default function PreviewProject() {
    const project = useViewProjectStore((state) => state.project)!
    return (
        <>
            <div className="space-y-6 rounded-lg border p-6 bg-background">
                {/* Titre */}
                <h1 className="text-2xl font-bold">{project?.title}</h1>

                {/* Description */}
                <section>
                    <h2 className="text-lg font-semibold">Description</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                        {project.description}
                    </p>
                </section>

                {/* Problématique */}
                <section>
                    <h2 className="text-lg font-semibold">Problématique</h2>
                    <p className="text-muted-foreground whitespace-pre-line">
                        {project.problematic}
                    </p>
                </section>

                {/* Objectifs */}
                <section>
                    <h2 className="text-lg font-semibold">Objectifs</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        {stringToArray(project.objectives).map((o, i) => (
                            <li key={i}>{o.value}</li>
                        ))}
                    </ul>
                </section>

                {/* Fonctionnalités */}
                <section>
                    <h2 className="text-lg font-semibold">Fonctionnalités</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        {stringToArray(project.features).map((f, i) => (
                            <li key={i}>{f.value}</li>
                        ))}
                    </ul>
                </section>

                {/* Contraintes */}
                <section>
                    <h2 className="text-lg font-semibold">Contraintes</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        {stringToArray(project.constraints).map((c, i) => (
                            <li key={i}>{c.value}</li>
                        ))}
                    </ul>
                </section>
            </div>
            <Button onClick={() => exportProjectToWord(project)} className="mt-4">Exporter en Word</Button>
        </>
    )
}
