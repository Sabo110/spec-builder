import { Users } from "@/types/appwrite"
import { createAdminClient } from "../appwrite/server"

export const createUser = async (data: Pick<Users, "email" | "username" | "$id">) => {
    const { tablesDB } = createAdminClient()
    try {
        const result = await tablesDB.createRow({
            databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
            tableId: process.env.NEXT_PUBLIC_APPWRITE_USERS_TABLE_ID!,
            rowId: data.$id,
            data: {
                "username": data.username,
                "email": data.email,
            },
        });
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}