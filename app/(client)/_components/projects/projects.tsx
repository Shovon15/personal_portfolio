"use client"
import React from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { Button } from '@/components/ui/button'
import { docsConfig } from '@/config/docs'
import TabCardWrapper from './tabCardWrapper'
import { projectData } from '@/data'
import { ScrollArea } from '@/components/ui/scroll-area'

type Props = {}

const ProjectComponent = (props: Props) => {
    const [activeTab, setActiveTab] = React.useState(docsConfig?.category[0]?.value || "");

    const matchingItems: any[] = [];

    projectData.forEach(item => {
        if (item.category_value.some(val => val === activeTab)) {
            matchingItems.push(item);
        }
    });

    return (
        <div className='min-h-screen'>
            <h1 className='text-center font-bold text-3xl text-primary dark:text-primary py-2'>My Works</h1>

            <Tabs defaultValue={activeTab} className="">
                <TabsList className="flex gap-2 w-full px-3 md:w-[600px] md:mx-auto">
                    {
                        docsConfig.category.map(({ title, value, disabled }) => (
                            !disabled ? (
                                <div key={value} onClick={() => setActiveTab(value)}>
                                    <TabsTrigger value={value} >{title}</TabsTrigger>
                                </div>
                            ) : (
                                <div key={value}>
                                    <TabsTrigger disabled value={value}>{title}</TabsTrigger>
                                </div>
                            )
                        ))
                    }
                </TabsList>

                <ScrollArea className="my-4 h-[calc(100vh-3rem)] pb-10">
                    <TabsContent value={activeTab} className='flex flex-wrap justify-center gap-5 p-5'>
                        {
                            matchingItems.map((item, index) => (
                                <TabCardWrapper key={index} item={item} />
                            ))
                        }
                    </TabsContent>
                </ScrollArea>
            </Tabs>
        </div>
    )
}

export default ProjectComponent