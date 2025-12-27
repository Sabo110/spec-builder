"use client"

import { Projects } from '@/types/appwrite'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import { deleteProject } from '@/lib/client_functions/projects'
import { toast } from 'sonner'
import { QueryClient } from '@tanstack/react-query'

type Props = {
    setOpen: (open: boolean) => void
    project: Projects
}
export default function DeleteProject({ setOpen, project }: Props) {
    const mutation = useMutation({
        mutationFn: () => deleteProject(project.$id)
    })
    const queryClient = new QueryClient()
    const handleDelete = () => {
        toast.promise(
            () => mutation.mutateAsync(),
            {
                loading: 'Suppression en cours...',
                success: (data) => {
                    queryClient.invalidateQueries({ queryKey: ['projects'] })
                    setOpen(false)
                    return data.message
                },
                error: (error) => {
                    queryClient.invalidateQueries({ queryKey: ['projects'] })
                    setOpen(false)
                    return error.message
                }
            }
        )
    }
    return (
        <div className='space-y-4'>
            <h1>Vous etes sur de vouloir supprimer ce projet ? <strong> {project.title} </strong> </h1>
            <div className="flex justify-end gap-6">
                <Button onClick={() => setOpen(false)}>Annuler</Button>
                <Button onClick={handleDelete} variant={"destructive"} disabled={mutation.isPending}>Supprimer</Button>
            </div>
        </div>
    )
}
