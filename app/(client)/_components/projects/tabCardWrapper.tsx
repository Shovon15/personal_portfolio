import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { projectData } from '@/data';
import Image from 'next/image';
import Link from 'next/link';
import { IProject } from '@/utils/dataTypes';


type CardObject = {
    // name: string;
    // images: string[];
    // description: string;
    // live_link: string;
}
type CardProps = {
    item: IProject;
}

const TabCardWrapper = ({ item }: CardProps) => {
    return (
        <Card className='w-full max-w-80 bg-primary-foreground dark:bg-primary-foreground shadow-xl'>
            <Image src={item?.images[0]} alt='...' width={1200} height={700} className='rounded-lg' />
            <CardHeader>
                <CardTitle className='pb-2'>{item.name}</CardTitle>
                <CardDescription>
                    {item.title}
                </CardDescription>
            </CardHeader>
            {/* <CardContent className="space-y-2">
                <div className="space-y-1">
                    <p>{item.description}</p>
                </div>
                <div className="space-y-1">
                    <p>hello</p>
                </div>
            </CardContent> */}
            <CardFooter className='flex justify-between'>
                <Link href={`projects/${item.slug}`}>
                    <Button className='w-28'>details</Button>
                </Link>
                {
                    item.link &&
                    <Button className='w-28' asChild>
                            <Link href={item.link} target="_blank" passHref={true} rel="noopener noreferrer">
                            Live Preview
                        </Link>
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}

export default TabCardWrapper