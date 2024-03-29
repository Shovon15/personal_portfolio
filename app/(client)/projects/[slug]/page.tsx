"use client";
import { Button } from "@/components/ui/button";
import { CustomPageSpinner } from "@/utils/customPageSpinner";
import { IProject } from "@/utils/dataTypes";
import { get } from "@/utils/fetchApi";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import ImageSlide from "../../_components/swiperSlide/imageSlide";

type Props = {
    params: {
        slug: string;
    };
};

const ProjectDetailsPage = ({ params }: Props) => {
    const {
        data: projectData = {} as IProject,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["projectDataById"],
        queryFn: async () => {
            const res = await get(`/project/slug/${params.slug}`);
            const data = res.data.payload?.data;

            return data as IProject;
        },
    });
    // console.log(projectData, "projectData");

    if (isLoading) {
        return <CustomPageSpinner />;
    }
    return (
        <div className="min-h-screen p-5 md:p-10">
            {projectData && (
                <>
                    <div className="w-full flex flex-col md:flex-row">
                        <div className="w-full md:w-2/5">
                            <p className="text-2xl font-semibold py-3">{projectData.name}</p>
                            <p className="">{projectData.title}</p>
                            <div className="flex justify-center md:justify-end py-3">
                                <Button className='w-28 ' asChild>
                                    <Link href={projectData.link} target="_blank" passHref={true} rel="noopener noreferrer">
                                        Live Preview
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <div className="w-full md:w-3/5 md:ml-5">
                            <ImageSlide data= {projectData.images}/>
                        </div>
                    </div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: projectData?.description
                        }}
                        className="pt-5"
                    />
                </>
            )}
        </div>
    );
};

export default ProjectDetailsPage;
