"use client"
import React from 'react'
import gitIcon from "../../../../public/social/github.png"
import linkedinIcon from "../../../../public/social/linkedin.png"
import Link from 'next/link'
import Image from 'next/image'
const SocialLink = () => {
    const Data = [
        {
            title: "github",
            link: "https://github.com/Shovon15",
            icon: gitIcon,
        },
        {
            title: "linkedin",
            link: "https://linkedin.com/in/shovon-mahamud-profile",
            icon: linkedinIcon,
        },
    ]
    return (
        <div className='flex gap-2'>
            {
                Data.map((item) => (
                    <div key={item.title}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                            <Image src={item.icon} width={30} height={30} alt='icon' />
                        </a>
                    </div>
                ))
            }
        </div>
    )
}

export default SocialLink