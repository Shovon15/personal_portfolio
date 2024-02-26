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


type CardObject = {
    name: string;
    images: string[];
    description: string;
    live_link: string;
}
type CardProps = {
    item: CardObject;
}

const TabCardWrapper = ({ item }: CardProps) => {
    // console.log(item, "item.image")
    return (
        <Card className='w-80 bg-primary-foreground dark:bg-primary-foreground'>
            <Image src={item?.images[0]} alt='...' width={400} height={300} />
            <CardHeader>
                <CardTitle className='pb-2'>{item.name}</CardTitle>
                <CardDescription>
                    {item.description}
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
                <Button className='w-28'>details</Button>
                {
                    item.live_link &&

                    <Button className='w-28' asChild>
                        <Link href={item.live_link} target="_blank" passHref={true} rel="noopener noreferrer">
                            Live Preview
                        </Link>
                    </Button>
                }
            </CardFooter>
        </Card>
    )
}

export default TabCardWrapper