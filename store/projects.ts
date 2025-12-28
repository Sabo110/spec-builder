import { create } from 'zustand'
import { Projects } from '@/types/appwrite'

type ViewProjectStore = {
    view: boolean
    setView: (view: boolean) => void
    project: Projects | null
    setProject: (project: Projects | null) => void
}
export const useViewProjectStore = create<ViewProjectStore>((set) => ({
    view: false,
    setView: (view: boolean) => set({ view }),
    project: null,
    setProject: (project: Projects | null) => set({ project })
}))


type ProjectFormStore = {
    viewCreationProjectForm: boolean
    setViewCreationProjectForm: (viewCreationProjectForm: boolean) => void
    viewUpdateProjectForm: boolean
    setViewUpdateProjectForm: (viewUpdateProjectForm: boolean) => void
}
export const useProjectFormStore = create<ProjectFormStore>((set) => ({
    viewCreationProjectForm: false,
    setViewCreationProjectForm: (viewCreationProjectForm: boolean) => set({ viewCreationProjectForm }),
    viewUpdateProjectForm: false,
    setViewUpdateProjectForm: (viewUpdateProjectForm: boolean) => set({ viewUpdateProjectForm })
}))