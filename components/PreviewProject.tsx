"use client"
import { exportProjectToWord, exportProjectToPdf } from '@/lib/client_functions/projects'
import { stringToArray } from '@/lib/helpers/arrayToString'
import { useProjectPreviewStore } from '@/store/projects'
import { Button } from './ui/button'
import { FileText, Download } from 'lucide-react'
import { Section } from './Section'
import { NumberedList } from './NumberedList'

export default function PreviewProject() {
  const projectPreview = useProjectPreviewStore((state) => state.projectPreview)!

  const objectives = stringToArray(projectPreview.objectives).map(o => o.value)
  const features = stringToArray(projectPreview.features).map(f => f.value)
  const constraints = stringToArray(projectPreview.constraints).map(c => c.value)

  return (
    <article className="max-w-3xl mx-auto p-8 space-y-8 border rounded-lg bg-white">

      {/* En-tête */}
      <div className="text-center space-y-2">
        <p className="text-sm uppercase text-muted-foreground">
          Cahier des charges
        </p>
        <h1 className="text-2xl font-bold uppercase">
          {projectPreview.title}
        </h1>
      </div>

      <Section number={1} title="Description du projet">
        <p className="whitespace-pre-line">{projectPreview.description}</p>
      </Section>

      <Section number={2} title="Problématique">
        <p className="whitespace-pre-line">{projectPreview.problematic}</p>
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
      <Button onClick={() => exportProjectToPdf(projectPreview)}>
        <FileText className="mr-2 h-4 w-4" />
        Exporter en PDF
      </Button>
    </article>

  )
}
