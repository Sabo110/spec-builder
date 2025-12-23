import { currentUser } from '@clerk/nextjs/server'

export default async function page() {
    const user = await currentUser()
    return (
        <div>page dashboard {user?.emailAddresses[0].emailAddress}</div>
    )
}   
