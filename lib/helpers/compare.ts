/**
 * Compare deux objets sur des clés spécifiques.
 * @param obj1 Le premier objet (ex: original)
 * @param obj2 Le second objet (ex: nouveau)
 * @param keys La liste des clés à comparer
 * @returns true si toutes les propriétés spécifiées sont égales, false sinon
 */
export function arePropertiesEqual<T extends Record<string, any>>(
    obj1: T,
    obj2: Partial<T>,
    keys: (keyof T)[]
): boolean {
    return keys.every((key) => obj1[key] === obj2[key]);
}

/**
 * Retourne un objet contenant uniquement les propriétés qui ont changé.
 * @param original L'objet original
 * @param updated Le nouvel objet avec les modifications potentielles
 * @param keys Les clés à vérifier
 * @returns Un objet partiel contenant seulement les différences
 */
export function getChangedProperties<T extends Record<string, any>>(
    original: T,
    updated: Partial<T>,
    keys: (keyof T)[]
): Partial<T> {
    const changes: Partial<T> = {};
    let hasChanges = false;

    for (const key of keys) {
        if (updated[key] !== undefined && original[key] !== updated[key]) {
            changes[key] = updated[key];
            hasChanges = true;
        }
    }

    return hasChanges ? changes : {};
}
