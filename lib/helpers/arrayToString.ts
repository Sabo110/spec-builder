/**
 * Convertit un tableau d'objets avec une propriété 'value' en une chaîne séparée par '---'
 * @param array - Tableau d'objets contenant une propriété 'value'
 * @returns Chaîne de caractères avec les valeurs séparées par '---'
 * @example
 * arrayToString([{value: "obj1"}, {value: "obj2"}]) // "obj1---obj2"
 */
export function arrayToString<T extends { value: string }>(array: T[]): string {
    return array.map(item => item.value).join('---')
}

/**
 * Convertit une chaîne séparée par '---' en un tableau d'objets avec une propriété 'value'
 * @param str - Chaîne de caractères avec les valeurs séparées par '---'
 * @returns Tableau d'objets contenant une propriété 'value'
 * @example
 * stringToArray("obj1---obj2") // [{value: "obj1"}, {value: "obj2"}]
 */
export function stringToArray(str: string): { value: string }[] {
    if (!str || str.trim() === '') return []
    return str.split('---').map(value => ({ value: value.trim() }))
}
