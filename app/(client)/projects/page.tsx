import React from 'react'

type Props = {}

const ProjectPage = (props: Props) => {
    return (
        <div className='min-h-screen flex-col gap-5 p-5 md:p-10'>
            <h1 className='text-2xl text-center font-semibold'>Explore Projects</h1>
            <div className='bg-green-500 h-14'>
                Category
            </div>
        </div>
    )
}

export default ProjectPage