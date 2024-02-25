import React from 'react'
import { DashboardWrapper } from '../_components/dashboardWrapper'
import {UploadProjectForm} from '../_components/form/uploadProjectForm'

type Props = {}

const UploadPage = (props: Props) => {
    return (
        <DashboardWrapper>

            <UploadProjectForm />
        </DashboardWrapper>
    )
}

export default UploadPage