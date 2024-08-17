"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CategorySchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
// import { QueryObserverResult } from "@tanstack/react-query";
import { post } from "@/utils/fetchApi";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";


// type Props = {
//     setModalOpen: (modalOpen: boolean) => void;
//     refetch: () => Promise<QueryObserverResult<any, unknown>>;
// }


export const UploadCategoryForm = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
            categoryName: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CategorySchema>) => {


        const formData = {
            name: values.categoryName,
        };

        try {
            setLoading(true)
            const res = await post("/category", formData);
            const successMessage = res.data.message || "category create succssfully"
            toast({ title: successMessage });
            router.push("/dashboard/category");

        } catch (error: any) {
            console.log(error, "error")
            const errorMessage = error.response.data.message || "An error occurred while updating category"
            toast({ title: errorMessage });
        } finally {
            setLoading(false)
        }
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center">
                    <div className="space-y-6 px-5 h-full w-full flex flex-col items-center justify-center min-h-56 max-w-96">
                        <InputFieldWrapper
                            control={form.control}
                            name="categoryName"
                            formLabel="Category Name"
                            placeholder="category name"
                            required={true}
                        />

                    </div>
                    <Button

                        type="submit"
                        className="mx-auto w-full max-w-96"
                    >
                        {loading ? <Spinner /> : "submit"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};


