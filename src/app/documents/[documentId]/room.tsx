'use client'

import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'
import { useParams } from 'next/navigation'

export function Room({ children }: { children: React.ReactNode }) {
    const params = useParams()
    return (
        <LiveblocksProvider publicApiKey={'pk_dev_gA35tyHnX3NP-HSuLrsdeOOnMOL6rH6Onu9482gxdHcbKdLPiqKUpD8e5pA4NIMx'}>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<div>Loading...</div>}>{children}</ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
