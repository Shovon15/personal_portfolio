"use client"
import React, { useContext, useEffect } from 'react'
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
import Spinner from '@/components/spinner';
import { useRouter } from 'next/navigation';
import { post } from '@/utils/fetchApi';
import Cookies from "js-cookie";
import { useAuth } from '@/context/authProvider';


type Props = {}

export const LoginForm = (props: Props) => {
    const [success, setSuccess] = React.useState("");
    const [error, setError] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const { fetchData, user } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof LoginSchema>) => {

        setSuccess("");
        setError("");
        console.log(values)
        try {
            setIsLoading(true);

            const response = await post("/login", values);
            const userToken = response.data?.payload?.accessToken;

            const successMessage = response.data?.message;

            if (userToken) {
                Cookies.set("token", userToken);
                fetchData();
                setSuccess(successMessage);
                router.push('/deshboard');
        }

        } catch (error: any) {
            console.log(error);
            const errorMessage = (error?.response?.data.message);
            setError(errorMessage)
        } finally {
            setIsLoading(false);
        }
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

