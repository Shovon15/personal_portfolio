"use client";

import React, { useEffect, useRef, useState } from "react";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { selectConfig } from "@/config/select";
import { Label } from "@/components/ui/label";
import { ProjectSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import SelectFieldWrapper from "@/components/formFieldWrapper/selectFieldWrapper";
import { Checkbox } from "@radix-ui/react-checkbox";
import { CheackBoxWrapper } from "@/components/formFieldWrapper/checkBoxWrapper";
import { get, post, put } from "@/utils/fetchApi";
import Spinner from "@/components/spinner";
import { ImageFieldWrapper } from "@/components/formFieldWrapper/imageFieldWrapper";
import { Editor } from "@tinymce/tinymce-react";
import { link } from "fs";
import { toast, useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { toBase64 } from "@/utils/toBase64";
import { CustomPageSpinner } from "@/utils/customPageSpinner";
import EditorFieldWrapper from "@/components/formFieldWrapper/editorFieldWrapper";
import { TextAreaWrapper } from "@/components/formFieldWrapper/textAreaWrapper";

interface Category {
    index: number;
    _id: string;
    name: string;
    value: string;
    isEnabled: boolean;
}
interface UpdateProjectFormProps {
    id: string;
    data: any;
}
export const UpdateProjectForm = ({ id, data }: UpdateProjectFormProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [oldImages, setOldImages] = useState<string[]>([]);

    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {
        if (data && data?.images?.length > 0) {
            setOldImages(data?.images);
        }
    }, [data]);

    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            name: data?.name || "",
            title: data?.title || "",
            link: data?.link || "",
            category: data?.category || [],
            images: [],
            description: data?.description || ""
        },
    });

    const onSubmit = async (values: z.infer<typeof ProjectSchema>) => {

        if ((!values.images || values.images.length === 0) && (!oldImages || oldImages.length === 0)) {
            toast({ title: "at least one Image is required" });
            return;
        }

        try {
            setLoading(true);

            let formData = {
                name: values.name,
                title: values.title,
                link: values.link,
                categories: values.category,
                oldImages: oldImages,
                description: values.description,
                images: [] as string[],
            };

            if (values.images && values.images.length > 0) {
                const imageList: string[] = await Promise.all(
                    values.images.map(async (imageFile) => {
                        const imageData = await toBase64(imageFile);
                        return imageData.toString();
                    })
                );

                formData = {
                    ...formData,
                    images: imageList,
                };
            }


            const response = await put(`/project/${id}`, formData);
            toast({ title: response.data.message });
            router.push("/dashboard/projects");
        } catch (error: any) {
            console.error(error);
            const errorMessage = error.response?.data?.message || "An error occurred while creating project";
            toast({ title: errorMessage });
        } finally {
            setLoading(false);
        }
    }


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
                            oldImages={oldImages}
                            selectedOldImages={(images) => setOldImages(images)}
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
