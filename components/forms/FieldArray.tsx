"use client"

import { Control, FieldValues, Path, useFieldArray, ArrayPath } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"

type FieldArrayProps<TFieldValues extends FieldValues> = {
    control: Control<TFieldValues>
    name: ArrayPath<TFieldValues> // ⬅️ IMPORTANT
    label: string
    placeholder?: string
    addButtonLabel?: string
    disabled?: boolean
}

export default function FieldArray<TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    addButtonLabel = "Ajouter",
    disabled = false,
}: FieldArrayProps<TFieldValues>) {
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    })

    return (
        <FormField
            control={control}
            name={name as Path<TFieldValues>}
            render={() => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>

                    <div className="space-y-3 shadow-sm p-4 border border-gray-200 rounded-md grid grid-cols-2">
                        {fields.map((item, index) => (
                            <FormField
                                key={item.id}
                                control={control}
                                name={`${name}.${index}.value` as Path<TFieldValues>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <div className="flex gap-2">
                                                <Input
                                                    {...field}
                                                    placeholder={placeholder}
                                                    disabled={disabled}
                                                />
                                                {fields.length > 1 ? <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => remove(index)}
                                                    disabled={disabled}
                                                >
                                                    ❌
                                                </Button> : null}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    {/* Affiche les erreurs au niveau du tableau (min/max items) */}
                    <FormMessage />
                    <Button
                            type="button"
                            variant="secondary"
                            onClick={() => append({ value: "" } as any)}
                            disabled={disabled}
                        >
                            ➕ {addButtonLabel}
                        </Button>
                </FormItem>
            )}
        />
    )
}

