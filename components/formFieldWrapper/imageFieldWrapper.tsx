import { LucideUploadCloud, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface ImageUploaderProps {
    control: any;
    name: string;
    formLabel: string;
    required?: boolean;
    oldImages?: string[];
    selectedOldImages?: (images: string[]) => void;
}

export const ImageFieldWrapper: React.FC<ImageUploaderProps> = ({
    control,
    name,
    formLabel,
    required,
    oldImages,
    selectedOldImages,
}) => {
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const inputImageRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (oldImages && oldImages.length > 0 && selectedOldImages) {
            selectedOldImages(oldImages)
        }
    }, [oldImages, selectedOldImages]);


    const removeOldImage = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        if (oldImages && selectedOldImages) {
            const updatedOldImages = oldImages.filter((image, i) => i !== index);
            selectedOldImages(updatedOldImages);
        }
    }

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
                        <>
                            {oldImages && oldImages.length > 0 && (
                                <div className="border border-primary p-3">
                                    <p className="text-color-primary py-2">Uploaded image(&apos;s)</p>
                                    <div className="flex gap-2 flex-wrap justify-center">
                                        {
                                            oldImages.map((image, index) => (
                                                <div key={index} className="flex flex-col justify-center items-center hover:ring-2 p-1">
                                                    <Image
                                                        src={image}
                                                        className="w-44 h-34 "
                                                        alt={`img-${index}`}
                                                        width={200}
                                                        height={200}
                                                        priority={true}
                                                    />
                                                    <Button
                                                        onClick={(e) => removeOldImage(e, index)}
                                                        variant="ghost"
                                                        className="text-red-500 rounded-full"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-2 flex-wrap justify-center">
                                {selectedImages.length > 0 &&
                                    selectedImages.map((image, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col justify-center items-center hover:ring-2 p-1"
                                        >
                                            <Image
                                                src={URL.createObjectURL(image)}
                                                className="w-44 h-34 "
                                                alt={`img-${index}`}
                                                width={200}
                                                height={200}
                                                priority={true}
                                            />
                                            <Button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectedImages((prevImages) =>
                                                        prevImages.filter((image, i) => i !== index)
                                                    );
                                                    const newValue = [...field.value];
                                                    newValue.splice(index, 1);
                                                    field.onChange(newValue);
                                                }}
                                                variant="ghost"
                                                className="text-red-500 rounded-full"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    ))}
                            </div>
                            <div className="flex justify-center p-2 ">
                                <div
                                    className="w-full max-w-80 h-44 cursor-pointer flex justify-center items-center border border-dashed border-green-500"
                                    onClick={() => inputImageRef?.current?.click()}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="input-field"
                                        hidden
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (!files) return;
                                            const imagesArray = Array.from(files);
                                            setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
                                            const newValue = [...field.value, ...imagesArray];
                                            field.onChange(newValue);
                                        }}
                                        ref={inputImageRef}
                                        multiple
                                    />
                                    <div className="flex flex-col items-center gap-2 text-color-primary">
                                        <LucideUploadCloud className="w-12 h-12 " />
                                        <p className="">Browse file to upload</p>
                                    </div>
                                </div>
                            </div>
                        </>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

// const [oldImages, setOldImages] = useState<string[]>([]);
// const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
// const [selectedImageFileNames, setSelectedImageFileNames] = useState<FileNameArray>([]);

// const inputImageRef = useRef<HTMLInputElement>(null);
// // console.log(selectedImages, "selectedImages")

// // useEffect(() => {
// //     if (oldImagesData && oldImagesData.length > 0) {
// //         setOldImages(oldImagesData);
// //     }
// // }, [oldImagesData]);

// // useEffect(() => {
// //     if (onOldImageSelect) {
// //         onOldImageSelect(oldImages);
// //     }
// // }, [oldImages, onOldImageSelect]);

// // const removeOldImage = (index: number) => {
// //     setOldImages((prevImages) => {
// //         const updatedImages = prevImages.filter((image, i) => i !== index);
// //         return updatedImages;
// //     });
// // };

// useEffect(() => {
//     if (selectedImages.length > 0) {
//         onImageSelect(selectedImages);
//     }
// }, [selectedImages, onImageSelect]);

// const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (!files) return;
//     const imagesArray = Array.from(files);
//     setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);

//     const fileNamesArray = Array.from(files).map((file) => file.name);
//     setSelectedImageFileNames((prevNames) => [...prevNames, ...fileNamesArray]);
// };

// const removeImage = (index: number) => {
//     setSelectedImages((prevImages) => prevImages.filter((image, i) => i !== index));
//     setSelectedImageFileNames((prevNames) => prevNames.filter((name, i) => i !== index));
// };

{
    /* <>
            <p className="font-semibold text-color-primary py-2">
                Image(&apos;s) <span className="text-red-500">*</span>
            </p>
            {oldImages && (
                <div className="border border-primary p-3">
                    <p className="text-color-primary py-2">old image(&apos;s)</p>
                    <div className="flex gap-2 flex-wrap justify-center">
                        {oldImages.length > 0 &&
                            oldImages.map((image, index) => (
                                <div key={index} className="flex flex-col justify-center items-center hover:ring-2 p-1">
                                    <Image
                                        src={image}
                                        className="w-44 h-34 "
                                        alt={`img-${index}`}
                                        width={200}
                                        height={200}
                                    />
                                    <Button
                                        onClick={() => removeOldImage(index)}
                                        variant="ghost"
                                        className=" text-red-500 rounded-full"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            <div className="flex gap-2 flex-wrap justify-center">
                {selectedImages.length > 0 &&
                    selectedImages.map((image, index) => (
                        <div key={index} className="flex flex-col justify-center items-center hover:ring-2 p-1">
                            <Image
                                src={URL.createObjectURL(image)}
                                className="w-44 h-34 "
                                alt={selectedImageFileNames[index]}
                                width={200}
                                height={200}
                            />
                            <Button
                                onClick={() => removeImage(index)}
                                variant="ghost"
                                className=" text-red-500 rounded-full"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    ))}
            </div>
            <div className="flex justify-center p-2 ">
                <div
                    className="w-full max-w-80 h-44 cursor-pointer flex justify-center items-center border border-dashed border-green-500"
                    onClick={() => inputImageRef?.current?.click()}
                >
                    <input
                        type="file"
                        accept="image/*"
                        className="input-field"
                        hidden
                        onChange={handleImageChange}
                        ref={inputImageRef}
                        multiple
                    />
                    <div className="flex flex-col items-center gap-2 text-color-primary">
                        <LucideUploadCloud className="w-12 h-12 " />
                        <p className="">Browse file to upload</p>
                    </div>
                </div>
            </div>
        </> */
}
