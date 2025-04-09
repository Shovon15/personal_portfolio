"use client";
import { DashboardWrapper } from "@/app/(dashboard)/_components/dashboardWrapper";
import { UpdateCategoryForm } from "@/app/(dashboard)/_components/form/updateCategoryForm";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const UpdateCategoryPage = (props: Props) => {
  const { _id } = useParams() as { _id: string };

  return (
    <DashboardWrapper>
      <UpdateCategoryForm _id={_id || ""} />
    </DashboardWrapper>
  );
};

export default UpdateCategoryPage;
