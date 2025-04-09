"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CategorySchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { InputFieldWrapper } from "@/components/formFieldWrapper/inputFieldWrapper";
// import { QueryObserverResult } from "@tanstack/react-query";
import { get, post, put } from "@/utils/fetchApi";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";

type Props = {
  _id: string;
  // setModalOpen: (modalOpen: boolean) => void;
  // refetch: () => Promise<QueryObserverResult<any, unknown>>;
};

export const UpdateCategoryForm = ({ _id }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      categoryName: "",
      precedence: "",
    },
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await get(`/category/single/${_id}`);
        console.log(res.data.payload, "data");
        const data = res.data.payload.category;
        form.reset({
          categoryName: data?.name,
          precedence: data?.precedence,
        });
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [_id, form]);

  const onSubmit = async (values: z.infer<typeof CategorySchema>) => {
    const formData = {
      name: values.categoryName,
      precedence: values.precedence,
    };

    try {
      setLoading(true);
      const res = await put(`/category/${_id}`, formData);
      const successMessage = res.data.message || "category create succssfully";
      toast({ title: successMessage });
      router.push("/dashboard/category");
    } catch (error: any) {
      console.log(error, "error");
      const errorMessage =
        error?.response?.data?.message ||
        "An error occurred while updating category";
      toast({ title: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center"
        >
          <div className="space-y-6 px-5 h-full w-full flex flex-col items-center justify-center min-h-56 max-w-96">
            <InputFieldWrapper
              control={form.control}
              name="categoryName"
              formLabel="Category Name"
              placeholder="category name"
              required={true}
            />
            <InputFieldWrapper
              control={form.control}
              name="precedence"
              formLabel="Precedence"
              placeholder="precedence"
              // required={true}
            />
          </div>
          <Button type="submit" className="mx-auto w-full max-w-96">
            {loading ? <Spinner /> : "submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
