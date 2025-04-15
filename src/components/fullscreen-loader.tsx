import { cn } from '@/lib/utils'

import { LoaderIcon } from 'lucide-react'

interface FullscreenLoaderProps {
    label?: string
    className?: string
}

export const FullscreenLoader = ({ label, className }: FullscreenLoaderProps) => {
    return (
        <div className={cn('flex flex-col min-h-screen items-center justify-center gap-2', className)}>
            <LoaderIcon className='size-6 text-muted-foreground animate-spin' />
            {label && <p className='text-sm text-muted-foreground'>{label}</p>}
        </div>
    )
}
