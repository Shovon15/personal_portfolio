"use client";

import React from "react";
import { Control, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


import { selectConfig } from "@/config/select";
import { Label } from "@/components/ui/label";
import { ProjectSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import SelectFieldWrapper from "@/components/formFieldWrapper/selectFieldWrapper";
import { useGetCategoryQuery } from "@/redux/feature/category/categoryApi";
import { useSelector } from "react-redux";

export const UploadProjectForm = () => {


    const { data } = useGetCategoryQuery('');
    const category = useSelector((state: any) => state.category);
    console.log(category[0], "Data")
    console.log(selectConfig.bloodGroup, "selectConfig.bloodGroup")


    const form = useForm<z.infer<typeof ProjectSchema>>({
        resolver: zodResolver(ProjectSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof ProjectSchema>) => {
        console.log(values, "values");
    };

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-4/6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputFieldWrapper
                                control={form.control}
                                name="name"
                                formLabel="Name of Student (in English)"
                                placeholder="student name (English)"
                                required={true}
                            />

                            <SelectFieldWrapper
                                config={category[0]}
                                control={form.control}
                                name="category"
                                formLabel="Category"
                                placeholder="select one"
                            />
                            {/* <SelectFieldWrapper
                                config={selectConfig.bloodGroup}
                                control={form.control}
                                name="category"
                                formLabel="Category"
                                placeholder="select one"
                            /> */}
                        </div>
                        <div className="w-full md:w-2/6">
                            <Input type="email" placeholder="image" className="h-44 " />
                        </div>
                    </div>



                    <Button
                        // disabled={isPending}
                        type="submit"
                        className="mx-auto"
                    >
                        submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};


