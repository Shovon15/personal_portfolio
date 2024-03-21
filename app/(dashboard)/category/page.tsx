"use client"
import React from 'react'
import { DashboardWrapper } from '../_components/dashboardWrapper'
// import { useSelector } from 'react-redux';
// import { useGetCategoryQuery } from '@/redux/feature/category/categoryApi';

type Props = {}

const CategoryPage = (props: Props) => {
    // const { data } = useGetCategoryQuery('');
    // const category = useSelector((state: any) => state.category);
    // console.log(category, "Data all")
    // console.log(category[0], "Data")
    return (
        <DashboardWrapper>
            <div>
                CategoryPage
            </div>
        </DashboardWrapper>
    )
}

export default CategoryPage