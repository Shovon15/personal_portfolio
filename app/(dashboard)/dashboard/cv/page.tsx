"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { del, get, put } from "@/utils/fetchApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ICv } from "@/utils/dataTypes";
// import { InputModal } from "@/components/customModel/inputModal";
// import { UploadCategoryForm } from "../../_components/form/uploadCategoryForm";
// import { DashboardWrapper } from "../../_components/dashboardWrapper";
// import ConfirmationModal from "@/components/customModel/confirmationModal";
import { useToast } from "@/components/ui/use-toast";
// import { InputModal } from "@/components/customModel/inputModal";
// import { UploadCategoryForm } from "../../_components/form/uploadCategoryForm";
import Link from "next/link";
import { DashboardWrapper } from "../../_components/dashboardWrapper";
import ConfirmationModal from "@/components/customModel/confirmationModal";

interface DeletingData {
  _id: string;
  link: string;
}

const CvPage = () => {
  //create modal state
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingData, setDeletingData] = useState<DeletingData | null>(null);

  const { toast } = useToast();

  const {
    data: cvData = [] as ICv[],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cvData"],
    queryFn: async () => {
      const res = await get("/cv");
      const data = res.data.payload?.cv;

      return data as ICv[];
    },
  });

  const toggleIsEnabled = async ({
    _id,
    isEnabled,
  }: {
    _id: string;
    isEnabled: boolean;
  }) => {
    try {
      const updateIsEnabled = !isEnabled;

      await put(`/cv/${_id}`, { isEnabled: updateIsEnabled });

      refetch();
      toast({ title: updateIsEnabled ? "Enabled" : "Disabled" });
    } catch (error: any) {
      toast({ title: error.response?.data?.message });
    }
  };

  const handleDelete = async ({ _id, name }: { _id: string; name: string }) => {
    // console.log(data, "finally---------------------------");

    try {
      const response = await del(`/cv/${_id}`);
      refetch();
      toast({ title: response.data.message });
    } catch (error) {
      console.error("Error deleting social support:", error);
      toast({ title: `Error deleting data with Title: ${name}` });
    } finally {
      setDeletingData(null);
      setDeleteModalOpen(false);
    }
  };

  const TABLE_HEAD = ["No.", "Link", "status", "action"];

  if (isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        loading...
      </div>
    );
  }
  return (
    <DashboardWrapper>
      <div className="flex justify-center md:justify-end">
        <Link href="/dashboard/cv/upload-cv">
          <Button className="flex gap-2">
            <Plus />
            add Cv Link
          </Button>
        </Link>
        {/* <InputModal
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
                /> */}
      </div>
      <p className="font-bold text-xl text-center">Upload Cv Link</p>
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
          {cvData &&
            cvData.map(({ _id, link, isEnabled }, index) => (
              <TableRow key={_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="font-medium">{link}</TableCell>
                <TableCell>
                  {isEnabled ? (
                    <Button
                      size="sm"
                      onClick={() => toggleIsEnabled({ _id, isEnabled })}
                    >
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
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    className="rounded-full p-2"
                    onClick={() => {
                      setDeletingData({ _id, link });
                      setDeleteModalOpen(true);
                    }}
                  >
                    <Trash2 className=" text-red-500 cursor-pointer" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* {deletingData !== null && (
        <ConfirmationModal
          modalOpen={deleteModalOpen}
          onClose={() => setDeletingData(null)}
          data={deletingData}
          description="Deleting this data is permanent and can not be undone."
          successAction={handleDelete}
        />
      )} */}
    </DashboardWrapper>
  );
};

export default CvPage;
