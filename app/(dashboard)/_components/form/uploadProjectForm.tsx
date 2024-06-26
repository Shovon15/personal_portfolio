"use client";

import React, { useState } from "react";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { ProjectSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import { ImageFieldWrapper } from "@/components/formFieldWrapper/imageFieldWrapper";
import SelectFieldWrapper from "@/components/formFieldWrapper/selectFieldWrapper";
import { CheackBoxWrapper } from "@/components/formFieldWrapper/checkBoxWrapper";
import EditorFieldWrapper from "@/components/formFieldWrapper/editorFieldWrapper";
import { post } from "@/utils/fetchApi";
import Spinner from "@/components/spinner";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { toBase64 } from "@/utils/toBase64";
import { TextAreaWrapper } from "@/components/formFieldWrapper/textAreaWrapper";

interface Category {
    index: number;
    _id: string;
    name: string;
    value: string;
    isEnabled: boolean;
}
export const UploadProjectForm = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();


    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            name: "",
            title: "",
            link: "",
            category: [],
            images: [],
            description: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {
        if (!values.images || values.images.length === 0) {
            toast({ title: "at least one Image is required" });
            return;
        }

        try {
            setLoading(true);
            const imageList = await Promise.all(
                values.images.map(async (imageFile) => {
                    try {
                        const imageData = await toBase64(imageFile); // Wait for the base64 conversion
                        return imageData;
                    } catch (error) {
                        toast({ title: `Error converting image to base64: ${error}` });
                        throw error; // Rethrow the error to halt further execution
                    }
                })
            );

            // Proceed with other operations only if imageList conversion is successful
            const formData = {
                name: values.name,
                title: values.title,
                link: values.link,
                categories: values.category,
                images: imageList, // Include the imageList in the formData
                description: values.description,
            };

            const response = await post(`/project`, formData);
            toast({ title: response.data.message });
            router.push("/dashboard/projects");
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "An error occurred while creating project";
            toast({ title: errorMessage });
        } finally {
            setLoading(false);
        }
    };



    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col gap-4 w-full max-w-[800px] mx-auto">
                        <InputFieldWrapper
                            control={form.control}
                            name="name"
                            formLabel="Project Name"
                            placeholder="name"
                            required={true}
                        />

                        <TextAreaWrapper
                            control={form.control}
                            name="title"
                            formLabel="Project title"
                            placeholder="title about project"
                            required={true}
                        />

                        <InputFieldWrapper
                            control={form.control}
                            name="link"
                            formLabel="Project Live link"
                            placeholder="live link"
                            required={true}
                        />

                        <CheackBoxWrapper
                            control={form.control}
                            name="category"
                            formLabel="Category"
                            required={true}
                        />

                        <ImageFieldWrapper
                            control={form.control}
                            name="images"
                            formLabel="Images"
                            required={true}
                        />

                        <EditorFieldWrapper
                            control={form.control}
                            name="description"
                            formLabel="Description"
                            required={true}
                        />
                    </div>

                    <div className="mx-auto w-full max-w-28">
                        <Button type="submit" className="mx-auto w-28">
                            {loading ? <Spinner /> : "Submit"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
