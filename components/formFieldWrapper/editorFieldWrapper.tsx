import { Editor } from "@tinymce/tinymce-react";
import React, { useRef } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { tineMceApiKey } from "@/secret";

type Props = {
    control: any;
    name: string;
    formLabel: string;
    required?: boolean;
};

const EditorFieldWrapper = ({ control, name, formLabel, required }: Props) => {
    const editorRef = useRef<any>(null);
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
                        <Editor
                            apiKey="dne6kwcfh5bie2h2hkj9qjtgu1xk4qthm9k6xajczb3vuj4e"
                            onInit={(evt, editor) => {
                                editorRef.current = editor;
                                editor.on("change", () => field.onChange(editor.getContent()));
                            }}
                            init={{
                                plugins:
                                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                toolbar:
                                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                            }}
                            initialValue={field.value}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default EditorFieldWrapper;
