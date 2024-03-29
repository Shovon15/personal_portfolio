"use client"
import React, { useState } from 'react'
import { DashboardWrapper } from '../../_components/dashboardWrapper'
import { Button } from '@/components/ui/button'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { del, get, put } from '@/utils/fetchApi'
import { useQuery } from '@tanstack/react-query'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast'
import ConfirmationModal from '@/components/customModel/confirmationModal'
import { IProject } from '@/utils/dataTypes'
// import { Project, useDataContext } from '@/context/dataProvider'


const ProjectPage = () => {

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deletingData, setDeletingData] = useState<{ _id: string, name: string } | null>(null);
    const { toast } = useToast();

    const {
        data: projectData = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["projectAllData"],
        queryFn: async () => {
            const res = await get("/project/all");
            const data = res.data.payload?.data;

            return data as IProject[];
        },
    });

    const toggleIsEnabled = async (id: string, isEnabled: boolean,) => {
        try {
            const updatedIsEnabled = !isEnabled;

            await put(`/project/${id}`, { isEnabled: updatedIsEnabled });

            refetch();
            toast({ title: updatedIsEnabled ? "Enabled" : "Disabled" });

        } catch (error: any) {
            toast({ title: error.response?.data?.message });
        }
    };

    const handleDelete = async ({ _id, name }: { _id: string, name: string }) => {
        try {
            const response = await del(`/project/${_id}`);
            refetch();
            toast({ title: response.data.message });
        } catch (error) {
            console.error("Error deleting social support:", error);
            toast({ title: `Error deleting data with Title: ${name}` });
        } finally {
            setDeletingData(null)
            setDeleteModalOpen(false)
        }
    };


    const TABLE_HEAD = ["No.", "Project Name", "category", "status", "action"];

    if (isLoading) {
        return <div className="flex min-h-screen justify-center items-center">loading...</div>;
    }

    return (
        <DashboardWrapper>
            <div className='flex justify-end'>
                <Link href="/dashboard/projects/upload-project">
                    <Button className="flex gap-2">
                        <Plus />
                        add Project
                    </Button>
                </Link>
            </div>

            <p className="font-bold text-xl text-center">Projects</p>
            <Table>
                <TableHeader>
                    <TableRow>
                        {TABLE_HEAD.map((head) => (
                            <TableHead key={head} className="w-[100px]">
                                {head}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!isLoading && projectData &&
                        projectData.map(({ _id, name, category, isEnabled }, index) => (
                            <TableRow key={_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{name}</TableCell>
                                <TableCell className="font-medium">
                                    {category && category.map((item) => (
                                        <p key={item}>{item}</p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {isEnabled ? (
                                        <Button size="sm"
                                            onClick={() => toggleIsEnabled(_id, isEnabled)}
                                        >
                                            Enabled
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => toggleIsEnabled(_id, isEnabled)}
                                        >
                                            Disabled
                                        </Button>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className='flex justify-center gap-3'>
                                        <Link href={`/dashboard/projects/${_id}`}>
                                            <Button
                                                variant="ghost"
                                                className="rounded-full p-2 bg-primary-foreground/60 hover:bg-primary-foreground"
                                            >
                                                <Pencil className=" text-primary cursor-pointer" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            className="rounded-full p-2"
                                            onClick={() => {
                                                setDeletingData({ _id, name });
                                                setDeleteModalOpen(true);
                                            }}
                                        >
                                            <Trash2 className=" text-red-500 cursor-pointer" />
                                        </Button>

                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>

            {deletingData !== null &&
                <ConfirmationModal
                    modalOpen={deleteModalOpen}
                    onClose={() => setDeletingData(null)}
                    data={deletingData}
                    description="Deleting this data is permanent and can not be undone."
                    successAction={handleDelete}
                />
            }
        </DashboardWrapper>
    )
}

export default ProjectPage