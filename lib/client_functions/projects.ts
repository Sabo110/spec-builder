import { Projects } from "@/types/appwrite"
import { Document, Packer, Paragraph, HeadingLevel } from "docx"
import { saveAs } from "file-saver"
import { stringToArray } from "@/lib/helpers/arrayToString"

export type CreateProject = Pick<Projects, "title" | "description" | "problematic" | "objectives" | "features" | "constraints">
export const createProject = async (data: CreateProject) => {
    const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if (!response.ok) {
        const error = await response.json() as { error: string }
        throw new Error(error.error)
    }
    return await response.json() as {message: string}
}

export const getProjects = async () => {
    const response = await fetch('/api/projects')
    if (!response.ok) {
        const error = await response.json() as { error: string }
        throw new Error(error.error)
    }
    return await response.json() as Projects[]
}

export const deleteProject = async (projectId: string) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
    })
    if (!response.ok) {
        const error = await response.json() as { error: string }
        throw new Error(error.error)
    }
    return await response.json() as { message: string }
}

export async function exportProjectToWord(project: Projects) {
  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: project.title,
            heading: HeadingLevel.TITLE,
          }),

          new Paragraph({
            text: "Description",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(project.description),

          new Paragraph({
            text: "Problématique",
            heading: HeadingLevel.HEADING_1,
          }),
          new Paragraph(project.problematic),

          new Paragraph({
            text: "Objectifs",
            heading: HeadingLevel.HEADING_1,
          }),
          ...stringToArray(project.objectives).map(
            (o) => new Paragraph({ text: `• ${o.value}` })
          ),

          new Paragraph({
            text: "Fonctionnalités",
            heading: HeadingLevel.HEADING_1,
          }),
          ...stringToArray(project.features).map(
            (f) => new Paragraph({ text: `• ${f}` })
          ),

          new Paragraph({
            text: "Contraintes",
            heading: HeadingLevel.HEADING_1,
          }),
          ...stringToArray(project.constraints).map(
            (c) => new Paragraph({ text: `• ${c.value}` })
          ),
        ],
      },
    ],
  })

  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${project.title}.docx`)
}

