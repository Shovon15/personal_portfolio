import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Item } from "@/config/select";

interface Item {
    name: string;
    value: string;
}

type SeleceFieldProps = {
    config: Item[];
    control: any;
    name: string;
    formLabel: string;
    placeholder: string;
    required?: boolean;
};
const SelectFieldWrapper = ({ config, control, name, formLabel, placeholder, required }: SeleceFieldProps) => {

    console.log(config, "congiof")
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{formLabel}{required && <span className="text-red-500"> *</span>}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                                {config?.map(({ name, value }) => (
                                    <SelectItem key={value} value={value}>
                                        {name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default SelectFieldWrapper;
