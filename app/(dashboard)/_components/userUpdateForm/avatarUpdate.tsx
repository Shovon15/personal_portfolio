
import { ImageFieldWrapper } from '@/components/formFieldWrapper/imageFieldWrapper';
import { Button } from '@/components/ui/button';
import { post } from '@/utils/fetchApi';
import { toBase64 } from '@/utils/toBase64';
import { QueryObserverResult } from '@tanstack/react-query';
import React, { useState } from 'react'

type Props = {
    setModalOpen: (modalOpen: boolean) => void;
    // refetch: () => Promise<QueryObserverResult<any, unknown>>;
    refetch: () => void;
}

export const AvatarUpdateForm = ({ refetch, setModalOpen }: Props) => {
    // const [image, setImage] = useState<File | null>(null);
    const [image, setImage] = useState<File[] | null>(null);

    const handleUpdateProfile = async () => {
        // // const title="this is title",
        // if (!image) {
        //     return;
        // }
        // const base64Image = await toBase64(image[0] as File);
        // // console.log(JSON.stringify(base64Image), "image");

        // const formData = {
        //     image: base64Image,
        // };

        // const res = await post("/update-user", formData);

        // refetch()
        // setModalOpen(false)
    }

    return (
        <div>
            <div>
                <p className="font-bold text-color-primary py-2">
                    Avatar <span className="text-red-500">*</span>
                </p>
                <div className="w-full max-w-80 mx-auto">
                    {/* <ImageFieldWrapper
                        control={form.control}
                        name="images"
                        formLabel="Images"
                        required={true}
                    /> */}
                </div>
            </div>
            <div className='p-5'>
                <Button onClick={handleUpdateProfile} className="bg-destructive w-full">update</Button>
            </div>
        </div>
    )
}

