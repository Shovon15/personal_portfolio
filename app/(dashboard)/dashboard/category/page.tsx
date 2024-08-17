"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utils/fetchApi";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ICategory } from "@/utils/dataTypes";
import { InputModal } from "@/components/customModel/inputModal";
import { UploadCategoryForm } from "../../_components/form/uploadCategoryForm";



interface DeletingData {
    _id: string;
    name: string;
}

const CategoryPage = () => {
    //create modal state
    const [modalOpen, setModalOpen] = useState(false);

    // const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    // const [deletingData, setDeletingData] = useState<DeletingData | null>(null);
    // console.log(deletingData, "deletingData");

    // const { toast } = useToast();

    const {
        data: categoryData = [] as ICategory[],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["categoryData"],
        queryFn: async () => {
            const res = await get("/category");
            const data = res.data.payload?.category;

            return data as ICategory[];
        },
    });

    // const toggleIsEnabled = async ({ _id, isEnabled }: { _id: string, isEnabled: boolean }) => {
    //     try {
    //         const updateIsEnabled = !isEnabled;

    //         await put(`/category/${_id}`, { isEnabled: updateIsEnabled });

    //         refetch();
    //         toast({ title: updateIsEnabled ? "Enabled" : "Disabled" });
    //     } catch (error: any) {
    //         toast({ title: error.response?.data?.message });
    //     }
    // };

    // const handleDelete = async ({ _id, name }: { _id: string, name: string }) => {
    //     // console.log(data, "finally---------------------------");

    //     try {
    //         const response = await del(`/category/${_id}`);
    //         refetch();
    //         toast({ title: response.data.message });
    //     } catch (error) {
    //         console.error("Error deleting social support:", error);
    //         toast({ title: `Error deleting data with Title: ${name}` });
    //     } finally {
    //         setDeletingData(null)
    //         setDeleteModalOpen(false)
    //     }
    // };

    const TABLE_HEAD = ["No.", "Name", "Value", "status", "action"];

    if (isLoading) {
        return <div className="flex min-h-screen justify-center items-center">loading...</div>;
    }
    return (
        // <DashboardWrapper>
        <div>
            <div className="flex justify-center md:justify-end">
                <InputModal
                    button={
                        <Button className="flex gap-2">
                            <Plus />
                            add Category
                        </Button>
                    }
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    handleOpen={() => setModalOpen(true)}
                    formComponent={<UploadCategoryForm refetch={refetch} setModalOpen={setModalOpen} />}
                />
            </div>
            <p className="font-bold text-xl text-center">Project Category</p>
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
                    {categoryData &&
                        categoryData.map(({ _id, name, value, isEnabled }, index) => (
                            <TableRow key={_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{name}</TableCell>
                                <TableCell>{value}</TableCell>
                                {/* <TableCell>
                                    {isEnabled ? (
                                        <Button size="sm" onClick={() => toggleIsEnabled({ _id, isEnabled })}>
                                            Enabled
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            onClick={() => toggleIsEnabled({ _id, isEnabled })}
                                        >
                                            Disabled
                                        </Button>
                                    )}
                                </TableCell> */}
                                {/* <TableCell>
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
                                </TableCell> */}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {/* {deletingData !== null &&
                <ConfirmationModal
                    modalOpen={deleteModalOpen}
                    onClose={() => setDeletingData(null)}
                    data={deletingData}
                    description="Deleting this data is permanent and can not be undone."
                    successAction={handleDelete}
                />
            } */}
            {/* </DashboardWrapper> */}
        </div >
    );
};

export default CategoryPage;
