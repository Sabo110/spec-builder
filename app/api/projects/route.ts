import { NextRequest, NextResponse } from "next/server";
import { getAuthInfo } from "@/lib/clerk";
import { createProject } from "@/lib/server_functions/projects";

export async function POST(request: NextRequest) {
    const { auth, user } = await getAuthInfo()
    if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    const data = await request.json()
    const dataForDataBase = {
        ...data,
        user: user?.id
    }
    const result = await createProject(dataForDataBase)
    if (!result) return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    return NextResponse.json(result)
}