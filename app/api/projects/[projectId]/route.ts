import { NextRequest, NextResponse } from "next/server"
import { getAuthInfo } from "@/lib/clerk"
import { deleteProject, updateProject } from "@/lib/server_functions/projects"

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const { auth, user } = await getAuthInfo()
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { projectId } = await params
    const deleted = await deleteProject(projectId)
    if (!deleted) return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    return NextResponse.json({ message: 'Projet supprimé avec succès' }, { status: 200 })
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ projectId: string }> }) {
    const { auth } = await getAuthInfo()
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const { projectId } = await params
    const data = await request.json()
    const updated = await updateProject(projectId, data)
    if (!updated) return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
    return NextResponse.json({ message: 'Projet mis à jour avec succès' }, { status: 200 })
}