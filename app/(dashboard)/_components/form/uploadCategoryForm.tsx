"use client";

import React, { useState } from "react";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

import { selectConfig } from "@/config/select";
import { Label } from "@/components/ui/label";
import { CategorySchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import SelectFieldWrapper from "@/components/formFieldWrapper/selectFieldWrapper";
import { QueryObserverResult } from "@tanstack/react-query";
import { post } from "@/utils/fetchApi";
import { FormError } from "@/components/fromError";
import { FormSuccess } from "@/components/fromSuccess";
// import { useGetCategoryQuery } from "@/redux/feature/category/categoryApi";
// import { useSelector } from "react-redux";
type Props = {
    setModalOpen: (modalOpen: boolean) => void;
    refetch: () => Promise<QueryObserverResult<any, unknown>>;
}


export const UploadCategoryForm = ({ setModalOpen, refetch }: Props) => {

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            categoryName: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
        setSuccess("")
        setError("")

        const formData = {
            name: values.categoryName,
        };

        try {
            const res = await post("/category", formData);

            const successMessage = res.data.message || "category create succssfully"
            setSuccess(successMessage);
            refetch();
            setModalOpen(false);

        } catch (error: any) {
            console.log(error, "error")
            const errorMessage = error.response.data.message || "An error occurred while updating category"
            setError(errorMessage);
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="space-y-6 px-5 h-full flex flex-col items-center justify-center min-h-56">
                        <InputFieldWrapper
                            control={form.control}
                            name="categoryName"
                            formLabel="Category Name"
                            placeholder="category name"
                            required={true}
                        />
                        <FormError message={error} />
                        <FormSuccess message={success} />
                    </div>
                    <Button

                        type="submit"
                        className="mx-auto w-full"
                    >
                        {loading ? "submitting..." : "submit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};


