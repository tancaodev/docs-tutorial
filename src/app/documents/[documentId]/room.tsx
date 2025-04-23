'use client'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'

import { toast } from 'sonner'
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from '@liveblocks/react/suspense'

import { FullscreenLoader } from '@/components/fullscreen-loader'

import { getUsers } from './actions'

type User = {
    id: string
    name: string
    avatar: string
}

export function Room({ children }: { children: React.ReactNode }) {
    const params = useParams()

    const [users, setUsers] = useState<User[]>([])

    const fetchUsers = useMemo(
        () => async () => {
            try {
                const list = await getUsers()
                setUsers(list)
            } catch (error) {
                toast.error('Failed to fetch users')
            }
        },
        []
    )

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint='/api/liveblocks-auth'
            resolveUsers={({ userIds }) => {
                return userIds.map((userId) => users.find((user) => user.id === userId))
            }}
            resolveMentionSuggestions={({ text }) => {
                let filteredUsers = users

                if (text) {
                    filteredUsers = users.filter((user) => user.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
                }

                return filteredUsers.map((user) => user.id)
            }}
            resolveRoomsInfo={() => []}
        >
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={<FullscreenLoader label='Room loading...' />}>{children}</ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}
