'use client'

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

export function Room({ children }: { children: React.ReactNode }) {
    const params = useParams()
    return (
        <LiveblocksProvider throttle={16} authEndpoint='/api/liveblocks-auth'>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<div>Loading...</div>}>{children}</ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
