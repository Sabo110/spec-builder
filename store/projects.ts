import { create } from 'zustand'
import { Projects } from '@/types/appwrite'

type ProjectPreviewStore = {
    projectPreview: Projects | null
    setProjectPreview: (projectPreview: Projects | null) => void
}
export const useProjectPreviewStore = create<ProjectPreviewStore>((set) => ({
    projectPreview: null,
    setProjectPreview: (projectPreview: Projects | null) => set({ projectPreview })
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

type ProjectStore = {
    project: Projects | null
    setProject: (project: Projects | null) => void
}
export const useProjectStore = create<ProjectStore>((set) => ({
    project: null,
    setProject: (project: Projects | null) => set({ project })
}))