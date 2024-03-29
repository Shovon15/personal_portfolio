import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Textarea } from "../ui/textarea";

// import { Control } from 'react-hook-form';

type InputWrapperProsp = {
    control: any;
    name: string;
    formLabel: string;
    placeholder: string;
    disabled?: boolean;
    required?: boolean;
    passwordShowButton?: boolean;
};
export const TextAreaWrapper = ({
    control,
    name,
    formLabel,
    placeholder,
    disabled,
    required,
    passwordShowButton,
}: InputWrapperProsp) => {
    const [passwordToggle, setPasswordToggle] = React.useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="relative w-full h-full">
                    <FormLabel>
                        {formLabel}
                        {required && <span className="text-red-500"> *</span>}
                    </FormLabel>

                        <FormControl>
                            <Textarea
                                {...field}
                                disabled={disabled}
                                placeholder={placeholder}
                            />
                        </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
