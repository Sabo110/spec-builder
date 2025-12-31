import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/lib/clerk";
import { createProject, getProjects } from "@/lib/server_functions/projects";

export async function POST(request: NextRequest) {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const data = await request.json()
    const dataForDataBase = {
        ...data,
        user: user.id
    }
    const result = await createProject(dataForDataBase)
    if (!result) return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    return NextResponse.json({ message: "Projet créé avec succès" })
}

export async function GET() {
    const user = await getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const result = await getProjects(user.id)
    if (!result) return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    return NextResponse.json(result)
}