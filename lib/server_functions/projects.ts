import { Projects } from "@/types/appwrite"
import { createAdminClient } from "../appwrite/server"
import { ID } from "node-appwrite"

type CreateProject = Pick<Projects, "title" | "description" | "problematic" | "objectives" | "features" | "constraints" | "user">
export const createProject = async (data: CreateProject) => {
    try {
        const { tablesDB } = createAdminClient()
        return await tablesDB.createRow({
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            tableId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_TABLE_ID!,
            rowId: ID.unique(),
            data: data
        })
    } catch (error) {
        return null
    }
}

export const getProjects = async () => {
    try {
        const { tablesDB } = createAdminClient()
        return (await tablesDB.listRows({
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            tableId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_TABLE_ID!
        })).rows
    } catch (error) {
        return null
    }
}

export const deleteProject = async (projectId: string) => {
    try {
        const { tablesDB } = createAdminClient()
        await tablesDB.deleteRow({
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            tableId: process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_TABLE_ID!,
            rowId: projectId
        })
        return true
    } catch (error) {
        return null
    }
}