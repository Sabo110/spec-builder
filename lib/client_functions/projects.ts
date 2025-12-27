import { Projects } from "@/types/appwrite"

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
    return await response.json() as Projects
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

