"use client"

import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { X } from 'lucide-react'

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    children: React.ReactNode
}
export default function Dialogue({ open, onOpenChange, title, children }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
            <AlertDialogContent>
                <div><X onClick={() => onOpenChange(false)} /></div>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div>
                    {children}
                </div>
                {/* <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter> */}
            </AlertDialogContent>
        </AlertDialog>
    )
}
