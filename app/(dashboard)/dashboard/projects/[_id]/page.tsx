"use client"

import { DashboardWrapper } from '@/app/(dashboard)/_components/dashboardWrapper';
import { UpdateProjectForm } from '@/app/(dashboard)/_components/form/UpdateProjectForm';
import { CustomPageSpinner } from '@/utils/customPageSpinner';
import { get } from '@/utils/fetchApi';
import React, { useEffect, useState } from 'react'
type Props = {
    params: {
        _id: string;
    };
};

const UpdateProjectPage = ({ params }: Props) => {

    const [singleProjectData, setSingleProjectData] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const res = await get(`/project/${params._id}`);
                const data = res.data.payload?.data;
                setSingleProjectData(data);
            } catch (error) {
                console.error('Error fetching project data:', error);
                // Handle error
            } finally {
                setIsLoading(false);
            }
        };

        if (params._id) {
            fetchData();
        }

    }, [params._id]);



    return (
        <DashboardWrapper>
            {
                isLoading ? <CustomPageSpinner /> :
                    <UpdateProjectForm id={params._id} data={singleProjectData} />
            }
        </DashboardWrapper>
    )
}

export default UpdateProjectPage