import React from 'react'
import {
    Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Breadcrumb from '@/components/breadcrumbs';
import { ChevronRight } from 'lucide-react';


type DashboardWrapperProps = {
    children: React.ReactNode;
}

export const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
    return (
        <Card className="w-full min-h-screen px-5 bg-transparent">
            <CardHeader className='p-4'>
                <Breadcrumb
                    homeElement={"dashobard"}
                    separator={<ChevronRight />}
                    activeClasses='text-muted-background'
                    // containerClasses='flex p-5 md:p-10 bg-transparent'
                    listClasses='text-muted-foreground font-semibold px-2 py-1'
                    capitalizeLinks
                />
                {/* <CardTitle>Create project</CardTitle>
                <CardDescription>Deploy your new project in one-click.</CardDescription> */}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
            {/* <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                </CardFooter> */}
        </Card>

    )
}

