import React from "react";
import { DashboardWrapper } from "../../../_components/dashboardWrapper";
import { UploadCvForm } from "@/app/(dashboard)/_components/form/uploadCvForm";

type Props = {};

const UploadCategoryPage = (props: Props) => {
  return (
    <DashboardWrapper>
      <UploadCvForm />
    </DashboardWrapper>
  );
};
export default UploadCategoryPage;
