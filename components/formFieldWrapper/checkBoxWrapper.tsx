"use client";

import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../spinner";
import { get } from "@/utils/fetchApi";

interface Category {
    index: number;
    _id: string;
    name: string;
    value: string;
    isEnabled: boolean;
}

type CheckBoxProsp = {
    control: any;
    name: string;
    formLabel: string;
    disabled?: boolean;
    required?: boolean;
};
export const CheackBoxWrapper = ({ control, name, formLabel, disabled, required }: CheckBoxProsp) => {
    const {
        data: categoryData = [] as Category[],
        refetch,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["categoryData"],
        queryFn: async () => {
            const res = await get("/category");
            const data = res.data.payload?.category;

            return data as Category[];
        },
    });

    if (isLoading) {
        return (
            <div className="p-5">
                <Spinner />
            </div>
        );
    }
    if (isError) {
        return (
            <div className="p-5">
                <p className="text-destructive">something went wrong</p>
            </div>
        );
    }
    return (

        <FormField
            control={control}
            name={name}
            render={() => (
                <FormItem className="flex flex-col space-x-3 space-y-0">
                    <FormLabel className="py-3">
                        {formLabel}
                        {required && <span className="text-red-500"> *</span>}
                    </FormLabel>
                    <div className="flex flex-col gap-3 pb-3">
                        {categoryData &&
                            categoryData
                                // .filter(item => item.isEnabled)
                                .map((item) => (
                                    <FormField
                                        key={item._id}
                                        control={control}
                                        name={name}
                                        render={({ field }) => {
                                            return (
                                                <FormItem key={item._id} className="flex items-start space-x-1 space-y-0">
                                                    <FormControl>
                                                        <Checkbox
                                                            disabled={!item.isEnabled}
                                                            checked={field.value?.includes(item.value)}
                                                            onCheckedChange={(checked) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.value])
                                                                    : field.onChange(
                                                                        field.value.filter(
                                                                            (value: string) => value !== item.value
                                                                        )
                                                                    );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal cursor-pointer">
                                                        {item.name}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
