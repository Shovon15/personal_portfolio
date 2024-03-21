"use client";
import React, { useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthWrapper } from "./authWrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/schemas";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/fromError";
import { FormSuccess } from "@/components/fromSuccess";
import Spinner from "@/components/spinner";

type Props = {};

export const SignupForm = (props: Props) => {
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    // useEffect(() => {
    //     if (isSuccess) {
    //         const message = data?.message || "signup succcessful";
    //         setSuccess(message);
    //         // router.push('/verification');
    //     }

    //     if (signupError) {
    //         if ("data" in signupError) {
    //             const errorData = signupError as any;
    //             const errorMessage = errorData?.data?.message || "something went wrong";
    //             setError(errorMessage);
    //         }
    //     }
    // }, [signupError, isSuccess, data?.message]);

    const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
        setSuccess("");
        setError("");
        // await register(values);
        console.log(values)
    };

    return (
        <AuthWrapper
            headerTitle="Signup"
            headerLabel="Create Your Account"
            backButtonLabel="Already have an Account?"
            backButtonHref="/login"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <InputFieldWrapper
                        control={form.control}
                        name="name"
                        formLabel="Name"
                        placeholder="john Doe"
                        required={true}
                    />
                    <InputFieldWrapper
                        control={form.control}
                        name="email"
                        formLabel="Email"
                        placeholder="johnDoe@example.com"
                        required={true}
                    />
                    <InputFieldWrapper
                        control={form.control}
                        name="password"
                        formLabel="Password"
                        placeholder="******"
                        required={true}
                        passwordShowButton={true}
                    />

                    <FormError message={error} />
                    <FormSuccess message={success} />
                    <Button disabled={isLoading} type="submit" className="w-full">
                        {isLoading ? <Spinner /> : "Signup"}
                    </Button>
                </form>
            </Form>
        </AuthWrapper>
    );
};
