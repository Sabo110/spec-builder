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
    const pageHeight = doc.internal.pageSize.height
    const pageWidth = doc.internal.pageSize.width
    const margin = 15

    // Couleurs (RGB)
    const primaryColor = { r: 0, g: 0, b: 0 } // Noir pour le texte principal
    const accentColor = { r: 59, g: 130, b: 246 } // Bleu pour les accents
    const lightGray = { r: 80, g: 80, b: 80 } // Gris foncé pour le texte

    const checkPageBreak = (space = 10) => {
        if (y + space > pageHeight - 15) {
            doc.addPage()
            y = 20
        }
    }

    // ============================================
    // TITRE PRINCIPAL CENTRÉ
    // ============================================
    const addMainTitle = () => {
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(22)
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
        doc.text('CAHIER DES CHARGES', pageWidth / 2, y, { align: 'center' })
        y += 15
    }

    // ============================================
    // SECTION NUMÉROTÉE (1. Projet, 2. Description, etc.)
    // ============================================
    const addNumberedSection = (number: number, title: string, content: string) => {
        checkPageBreak(15)

        // Titre de la section avec numéro
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(13)
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
        doc.text(`${number}. ${title}:`, margin, y)
        y += 8

        // Contenu de la section
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(11)
        doc.setTextColor(lightGray.r, lightGray.g, lightGray.b)

        const lines = doc.splitTextToSize(content, pageWidth - 2 * margin)
        lines.forEach((line: string) => {
            checkPageBreak(6)
            doc.text(line, margin, y)
            y += 6
        })
        y += 8
    }

    // ============================================
    // SECTION AVEC LISTE NUMÉROTÉE (4.1, 4.2, etc.)
    // ============================================
    const addNumberedListSection = (number: number, title: string, items: string[]) => {
        checkPageBreak(15)

        // Titre de la section avec numéro
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(13)
        doc.setTextColor(primaryColor.r, primaryColor.g, primaryColor.b)
        doc.text(`${number}. ${title}:`, margin, y)
        y += 8

        // Liste des items
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(11)

        items.forEach((item, index) => {
            checkPageBreak(10)

            // Numéro de l'item (ex: 4.1, 4.2)
            const itemNumber = `${number}.${index + 1}`
            doc.setFont('helvetica', 'bold')
            doc.setTextColor(accentColor.r, accentColor.g, accentColor.b)
            doc.text(itemNumber, margin + 5, y)

            // Contenu de l'item
            doc.setFont('helvetica', 'normal')
            doc.setTextColor(lightGray.r, lightGray.g, lightGray.b)
            const lines = doc.splitTextToSize(item, pageWidth - 2 * margin - 20)

            lines.forEach((line: string, i: number) => {
                if (i > 0) {
                    checkPageBreak(6)
                    y += 6
                }
                doc.text(line, margin + 20, y)
            })

            y += 7
        })

        y += 5
    }

    /* ======================
        CONTENU DU DOCUMENT
       ====================== */

    // Titre principal centré
    addMainTitle()

    // 1. Projet
    addNumberedSection(1, "Projet", project.title)

    // 2. Description du projet
    addNumberedSection(2, "Description du projet", project.description)

    // 3. Problématique ou contexte
    addNumberedSection(3, "Problématique ou contexte", project.problematic)

    // 4. Objectifs du projet
    addNumberedListSection(4, "Objectifs du projet", stringToArray(project.objectives).map(o => o.value))

    // 5. Fonctionnalités
    addNumberedListSection(5, "Fonctionnalités", stringToArray(project.features).map(f => f.value))

    // 6. Contraintes
    addNumberedListSection(6, "Contraintes", stringToArray(project.constraints).map(c => c.value))

    doc.save(`${project.title}.pdf`)
}

