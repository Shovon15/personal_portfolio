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


type CardObject = {
    name: string;
    description: string;
}
type CardProps = {
    item: CardObject;
}

const TabCardWrapper = ({ item }: CardProps) => {

    return (
        <Card className='w-80 bg-primary-foreground dark:bg-primary-foreground'>
            <Image src="https://res.cloudinary.com/dreeqkcfb/image/upload/v1708800683/pp0xe1n3ndgfyv9tfvkz.png" alt='...' width={400} height={300} />
            <CardHeader>
                <CardTitle>{item.name}</CardTitle>
                <CardDescription>
                    Make changes to your account here. Click save when yore done.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <p>{item.description}</p>
                </div>
                <div className="space-y-1">
                    <p>hello</p>
                </div>
            </CardContent>
            <CardFooter>
                <Button>Save changes</Button>
            </CardFooter>
        </Card>
    )
}

export default TabCardWrapper