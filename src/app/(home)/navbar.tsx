import Link from 'next/link'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { SearchInput } from './search-input'

export const Navbar = () => {
    return (
        <nav className='flex items-center justify-between h-full w-full'>
            <div className='flex items-center gap-3 shrink-0 pr-6'>
                <Link href='/'>
                    <Image src='/logo.svg' alt='Logo' width={36} height={36} />
                </Link>
                <h3 className='text-xl'>DOCS</h3>
            </div>
            <SearchInput />
            <UserButton />
        </nav>
    )
}
