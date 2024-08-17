import Image from 'next/image'
import React from 'react'
import ContactForm from '../_components/contactForm/contactForm'
import image from "../../../public/images/hero.png"
type Props = {}

const HireMePage = (props: Props) => {
    return (
        <div className='min-h-screen max-w-[1600px] mx-auto p-5 md:p-10 flex flex-col md:flex-row gap-5  font-semibold w-full'>
            <div className='w-full md:w-1/2'>
                <Image src={image} alt='contact-image' width={500} height={400} />
            </div>
            <div className=' w-full md:w-1/2'>
                <ContactForm />
            </div>

        </div>
    )
}

export default HireMePage