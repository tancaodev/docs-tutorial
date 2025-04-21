'use client'

import { useState } from 'react'
import { useMutation } from 'convex/react'

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { toast } from 'sonner'

import { Id } from '../../convex/_generated/dataModel'
import { api } from '../../convex/_generated/api'

interface RenameDialogProps {
    documentId: Id<'documents'>
    initialTitle: string
    children: React.ReactNode
}

export const RenameDialog = ({ documentId, initialTitle, children }: RenameDialogProps) => {
    const update = useMutation(api.documents.updateById)
    const [isUpdating, setIsUpdating] = useState(false)

    const [title, setTitle] = useState(initialTitle)
    const [open, setOpen] = useState(false)

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsUpdating(true)

        update({
            id: documentId,
            title: title.trim() || 'Untitled'
        })
            .then(() => setOpen(false))
            .then(() => toast.success('Document renamed'))
            .catch(() => toast.error('Failed to rename document'))
            .finally(() => {
                setIsUpdating(false)
            })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename document</DialogTitle>
                        <DialogDescription> Enter a new name for this document</DialogDescription>
                    </DialogHeader>
                    <div className='my-4'>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Document name' onClick={(e) => e.stopPropagation()} />
                    </div>
                    <DialogFooter>
                        <Button
                            type='button'
                            variant='ghost'
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            disabled={isUpdating}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
