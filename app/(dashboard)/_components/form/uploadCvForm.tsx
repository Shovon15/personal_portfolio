"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CvSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import { post } from "@/utils/fetchApi";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";


export const UploadCvForm = () => {

    const [loading, setLoading] = useState<boolean>(false)

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof CvSchema>>({
        resolver: zodResolver(CvSchema),
        defaultValues: {
            link: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof CvSchema>) => {

        const formData = {
            link: values.link,
        };

        try {
            setLoading(true)
            const res = await post("/cv", formData);
            const successMessage = res.data.message || "cv link create succssfully"
            toast({ title: successMessage });
            router.push("/dashboard/cv");

        } catch (error: any) {
            console.log(error, "error")
            const errorMessage = error.response.data.message || "An error occurred while updating cv link"
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
                            name="link"
                            formLabel="Cv Link"
                            placeholder="cv link"
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


