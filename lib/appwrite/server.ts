import { Client, TablesDB } from "node-appwrite";

export const createAdminClient = () => {
    const client = new Client();
    client.setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string);
    client.setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string);
    client.setKey(process.env.APPWRITE_API_KEY as string);

    return {
        get tablesDB() {
            return new TablesDB(client);
        }
    }
}