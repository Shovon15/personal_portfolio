"use client"
import React, { useEffect } from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthWrapper } from './authWrapper'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '@/schemas';
import { InputFieldWrapper } from '@/components/formFieldWrapper/inputFieldWrapper';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/fromError';
import { FormSuccess } from '@/components/fromSuccess';
import { useLoginMutation } from '@/redux/feature/auth/authApi';
import Spinner from '@/components/spinner';
import { useRouter } from 'next/navigation';

type Props = {}

export const LoginForm = (props: Props) => {
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");
    const router = useRouter();

    const [login, { isError, error: loginError, data, isSuccess, isLoading }] = useLoginMutation();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });


    useEffect(() => {
        if (isSuccess) {
            const message = data?.message || "signup succcessful";
            setSuccess(message);
            router.push('/dashboard');
        }

        if (loginError) {
            if ("data" in loginError) {
                const errorData = loginError as any;
                const errorMessage = errorData?.data?.message || "something went wrong";
                setError(errorMessage);
            }
        }
    }, [loginError, isSuccess, data?.message, router]);

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
        setSuccess("");
        setError("");
        await login(values);
    };


    return (
        <AuthWrapper
            headerTitle="Login"
            headerLabel="Welcome Back Chief"
            backButtonLabel="Don't have an account?"
            backButtonHref="/signup"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                        {isLoading ? <Spinner /> : "login"}
                    </Button>
                </form>
            </Form>

        </AuthWrapper>
    )
}

