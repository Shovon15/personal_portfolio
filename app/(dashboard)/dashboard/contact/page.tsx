"use client";
import React from "react";
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

import { DashboardWrapper } from "../../_components/dashboardWrapper";

import { IContact } from "@/utils/dataTypes";


const ContactPage = () => {

    const {
        data: contactData = [] as IContact[],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["contactData"],
        queryFn: async () => {
            const res = await get("/contact");
            const data = res.data.payload?.contact;

            return data as IContact[];
        },
    });


    const TABLE_HEAD = ["No.", "Name", "email", "details"];

    if (isLoading) {
        return <div className="flex min-h-screen justify-center items-center">loading...</div>;
    }

    return (
        <DashboardWrapper>

            <p className="font-bold text-xl text-center">Contact manager</p>
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
                    {contactData &&
                        contactData.map(({ _id, name, email, details }, index) => (
                            <TableRow key={_id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell className="font-medium">{name}</TableCell>
                                <TableCell>{email}</TableCell>
                                <TableCell>
                                    {details}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </DashboardWrapper>

    );
};

export default ContactPage;
