import { Projects } from "@/types/appwrite"
import { Document, Packer, Paragraph, HeadingLevel } from "docx"
import { saveAs } from "file-saver"
import { stringToArray } from "@/lib/helpers/arrayToString"
import jsPDF from "jspdf"

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
    return await response.json() as { message: string }
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

export const updateProject = async (projectId: string, data: Projects) => {
    const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
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
                        (f) => new Paragraph({ text: `• ${f.value}` })
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

export function exportProjectToPdf(project: Projects) {
    const doc = new jsPDF()
    let y = 20

    // ===== helpers =====
    const addMainTitle = (text: string) => {
        doc.setFontSize(18)
        doc.setFont("helvetica", "bold")
        doc.text(text.toUpperCase(), 105, y, { align: "center" })
        y += 15
    }

    const addSectionTitle = (number: number, text: string) => {
        doc.setFontSize(14)
        doc.setFont("helvetica", "bold")
        doc.text(`${number}. ${text}`, 10, y)
        y += 8
    }

    const addParagraph = (text: string) => {
        doc.setFontSize(11)
        doc.setFont("helvetica", "normal")
        const lines = doc.splitTextToSize(text, 180)
        doc.text(lines, 10, y)
        y += lines.length * 6 + 4
    }

    const addNumberedList = (sectionNumber: number, items: string[]) => {
        doc.setFontSize(11)
        items.forEach((item, index) => {
            const label = `${sectionNumber}.${index + 1} `
            const lines = doc.splitTextToSize(label + item, 175)
            doc.text(lines, 15, y)
            y += lines.length * 6
        })
        y += 4
    }

    const addSignature = (text: string) => {
        y += 15
        doc.setFontSize(10)
        doc.setFont("helvetica", "italic")
        doc.text(text, 190, y, { align: "right" })
    }
    // ===== content =====
    addMainTitle("Cahier des charges")
    addMainTitle(project.title)

    addSectionTitle(1, "Description")
    addParagraph(project.description)

    addSectionTitle(2, "Problématique")
    addParagraph(project.problematic)

    addSectionTitle(3, "Objectifs")
    addNumberedList(3, stringToArray(project.objectives).map(o => o.value))

    addSectionTitle(4, "Fonctionnalités")
    addNumberedList(4, stringToArray(project.features).map(f => f.value))

    addSectionTitle(5, "Contraintes")
    addNumberedList(5, stringToArray(project.constraints).map(c => c.value))

    addSignature("Fait pour toi Baby")
    // ===== save =====
    doc.save(`Cahier_des_charges_${project.title}.pdf`)
}

