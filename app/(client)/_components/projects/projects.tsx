"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "@/components/ui/button";
import { docsConfig } from "@/config/docs";
import TabCardWrapper from "./tabCardWrapper";
import { projectData } from "@/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery } from "@tanstack/react-query";
import { ICategory, IProject } from "@/utils/dataTypes";
import { get } from "@/utils/fetchApi";
import Spinner from "@/components/spinner";

type Props = {};

const ProjectComponent = (props: Props) => {
    const [activeTab, setActiveTab] = React.useState<string>("");
    const [projectData, setProjectData] = useState<IProject[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [projectError, setProjectError] = useState<boolean>(false);

    const {
        data: categoryData = [] as ICategory[],
        isLoading: categoryLoading,
        isError: isCategoryError,
    } = useQuery({
        queryKey: ["categoryPublicData"],
        queryFn: async () => {
            const res = await get("/category/public");
            const data = res.data.payload?.data;

            return data as ICategory[];
        },
    });

    useEffect(() => {
        if (activeTab !== "") {
            const fetchProjectData = async () => {
                setIsLoading(true);
                try {
                    const res = await get(`/project/public/${activeTab}`);
                    const data = res.data.payload?.data;
                    setProjectData(data || []);
                } catch (error) {
                    console.error("Error fetching project data:", error);
                    setProjectError(true);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchProjectData();
        }
    }, [activeTab]);

    useEffect(() => {
        if (categoryData && categoryData.length > 0) {
            setActiveTab(categoryData[0].value);
        }
    }, [categoryData]);

    if (categoryLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen ">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen md:min-h-[70vh]">
            <h1 className="text-center font-bold text-3xl text-primary dark:text-primary py-2">My Works</h1>
            {activeTab && (
                <Tabs defaultValue={activeTab} className="p-5 md:px-10">
                    <TabsList className="flex gap-2 flex-wrap h-auto px-5 mx-auto max-w-max max-h-max">
                        {categoryData.length > 0 &&
                            categoryData.map(({ name, value }) => (
                                <div key={value} onClick={() => setActiveTab(value)}>
                                    <TabsTrigger value={value}>{name}</TabsTrigger>
                                </div>
                            ))}
                    </TabsList>

                    {isLoading ? (
                        <div className="my-2 min-h-[calc(100vh-3rem)] flex justify-center items-center bg-secondary rounded-lg">
                            <Spinner />
                        </div>
                    ) : (
                        <ScrollArea className="my-2 h-[calc(100vh-3rem)] py-5 bg-secondary rounded-lg">
                            <TabsContent value={activeTab} className="flex flex-wrap justify-center gap-5 p-5 mt-0">
                                {projectData && projectData.length > 0 ? (
                                    projectData.map((item, index) => <TabCardWrapper key={index} item={item} />)
                                ) : (
                                    <div><p className="font-semibold">coming soon</p></div>
                                )}
                            </TabsContent>
                        </ScrollArea>
                    )}
                </Tabs>
            )}
        </div>
    );
};

export default ProjectComponent;
