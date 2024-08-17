import React from 'react'
import { DashboardWrapper } from '../../../_components/dashboardWrapper'
import { UploadCategoryForm } from '@/app/(dashboard)/_components/form/uploadCategoryForm'

type Props = {}

const UploadCategoryPage = (props: Props) => {
    return (
        <DashboardWrapper>
            <UploadCategoryForm/>
        </DashboardWrapper>
    )
}
export default UploadCategoryPage;
