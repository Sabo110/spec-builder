import { auth, currentUser } from '@clerk/nextjs/server'

export const getUser = async () => {
    return await currentUser()
}

export const isAuth = async () => {
    return (await auth()).isAuthenticated
}

export const getAuthInfo = async () => {
    const auth = await isAuth()
    const user = await getUser()
    return { auth, user }
}