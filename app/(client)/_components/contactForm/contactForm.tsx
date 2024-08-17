"use client"
import { InputFieldWrapper } from '@/components/formFieldWrapper/inputFieldWrapper'
import { TextAreaWrapper } from '@/components/formFieldWrapper/textAreaWrapper'
import Spinner from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { useToast } from '@/components/ui/use-toast'
import { ContactSchema } from '@/schemas'
import { post } from '@/utils/fetchApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const ContactForm = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const router = useRouter();


    const form = useForm<z.infer<typeof ContactSchema>>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            details: "",

        },
    });

    const onSubmit = async (values: z.infer<typeof ContactSchema>) => {

        try {
            setLoading(true);
            // const imageList = await Promise.all(
            //     values.images.map(async (imageFile) => {
            //         try {
            //             const imageData = await toBase64(imageFile); // Wait for the base64 conversion
            //             return imageData;
            //         } catch (error) {
            //             toast({ title: `Error converting image to base64: ${error}` });
            //             throw error; // Rethrow the error to halt further execution
            //         }
            //     })
            // );

            // Proceed with other operations only if imageList conversion is successful
            // const formData = {
            //     name: values.name,
            //     title: values.title,
            //     link: values.link,
            //     categories: values.category,
            //     images: imageList, // Include the imageList in the formData
            //     description: values.description,
            // };

            // const response = await post(`/`, formData);
            // toast({ title: response.data.message });
            // router.push("/dashboard/projects");
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
                            formLabel="Organization or Person Name"
                            placeholder="name"
                        // required={true}
                        />

                        <InputFieldWrapper
                            control={form.control}
                            name="email"
                            formLabel="Email Address"
                            placeholder="Email Address"
                            required={true}
                        />

                        <TextAreaWrapper
                            control={form.control}
                            name="details"
                            formLabel="details"
                            placeholder="details"
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
    )
}

export default ContactForm