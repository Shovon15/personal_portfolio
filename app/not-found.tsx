import { Button } from '@/components/ui/button'
import { Frown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
    return (
        <div className='flex flex-col gap-5 justify-center items-center min-h-screen'>
            <Frown />
            <p className='text-xl font-semibold'>Page not found</p>
            <Link href="/"><Button>Home</Button></Link>
        </div>
    )
}

export default NotFoundPage