import { z } from "zod";

export const createProjectSchema = z.object({
    title: z
        .string("Le titre doit être une chaine de caractères")
        .trim()
        .min(1, "Le titre ne peut pas être vide")
        .max(255, "Le titre ne doit pas dépasser 255 caractères"),
    description: z
        .string("La description doit être une chaine de caractères")
        .trim()
        .min(1, "La description ne peut pas être vide")
        .max(2000, "La description ne doit pas dépasser 2000 caractères"),
    problematic: z
        .string("La problématique doit être une chaine de caractères")
        .trim()
        .min(1, "La problématique ne peut pas être vide")
        .max(3000, "La problématique ne doit pas dépasser 3000 caractères"),
    objectives: z.array(
        z.object({
            value: z
                .string("Les objectifs doivent être une chaine de caractères")
                .trim()
                .min(1, "Un objectif ne peut pas être vide")
                .max(300, "Un objectif ne doit pas dépasser 300 caractères")
        })
    )
        .min(1, "Au moins un objectif est requis")
        .max(7, "Maximum 7 objectifs"),

    features: z.array(
        z.object({
            value: z
                .string("Les fonctionnalités doivent être une chaine de caractères")
                .trim()
                .min(1, "Une fonctionnalité ne peut pas être vide")
                .max(500, "Une fonctionnalité ne doit pas dépasser 500 caractères")
        })
    )
        .min(1, "Au moins une fonctionnalité est requise")
        .max(10, "Maximum 10 fonctionnalités"),

    constraints: z.array(
        z.object({
            value: z
                .string("Les contraintes doivent être une chaîne de caractères")
                .trim()
                .min(1, "Une contrainte ne peut pas être vide")
                .max(300, "Une contrainte ne doit pas dépasser 300 caractères")
        })
    )
        .min(1, "Au moins une contrainte est requise")
        .max(7, "Maximum 7 contraintes")
});

export const updateProjectSchema = createProjectSchema.partial().extend({
    // On pourra ajouter ici l'ID du projet si nécessaire pour la validation
});

export type CreateProjectValues = z.infer<typeof createProjectSchema>;
export type UpdateProjectValues = z.infer<typeof updateProjectSchema>;
