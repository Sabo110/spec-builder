"use client"
import { exportProjectToWord, exportProjectToPdf } from '@/lib/client_functions/projects'
import { stringToArray } from '@/lib/helpers/arrayToString'
import { useViewProjectStore } from '@/store/projects'
import { Button } from './ui/button'
import { FileText, Download } from 'lucide-react'
import { Section } from './Section'
import { NumberedList } from './NumberedList'

export default function PreviewProject() {
  const project = useViewProjectStore((state) => state.project)!

  const objectives = stringToArray(project.objectives).map(o => o.value)
  const features = stringToArray(project.features).map(f => f.value)
  const constraints = stringToArray(project.constraints).map(c => c.value)

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-8 border rounded-lg bg-white">

      {/* En-tête */}
      <div className="text-center space-y-2">
        <p className="text-sm uppercase text-muted-foreground">
          Cahier des charges
        </p>
        <h1 className="text-2xl font-bold uppercase">
          {project.title}
        </h1>
      </div>

      <Section number={1} title="Description du projet">
        <p className="whitespace-pre-line">{project.description}</p>
      </Section>

      <Section number={2} title="Problématique">
        <p className="whitespace-pre-line">{project.problematic}</p>
      </Section>

      <Section number={3} title="Objectifs">
        <NumberedList sectionNumber={3} items={objectives} />
      </Section>

      <Section number={4} title="Fonctionnalités">
        <NumberedList sectionNumber={4} items={features} />
      </Section>

      <Section number={5} title="Contraintes">
        <NumberedList sectionNumber={5} items={constraints} />
      </Section>
      <Button onClick={() => exportProjectToPdf(project)}>
        <FileText className="mr-2 h-4 w-4" />
        Exporter en PDF
      </Button>
    </article>

  )
}
