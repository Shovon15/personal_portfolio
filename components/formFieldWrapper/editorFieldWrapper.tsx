import { Editor } from '@tinymce/tinymce-react';
import React, { useRef } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { tineMceApiKey } from '@/secret';
import Head from 'next/head';

type Props = {
  control: any;
  name: string;
  formLabel: string;
  required?: boolean;
};

const EditorFieldWrapper = ({ control, name, formLabel, required }: Props) => {
  const editorRef = useRef<any>(null);

  <Head>
    <link
      rel='stylesheet'
      href='https://cdn.jsdelivr.net/npm/tinymce@7.4.1/skins/ui/oxide/content.min.css'
    />
  </Head>;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='relative w-full h-full'>
          <FormLabel>
            {formLabel}
            {required && <span className='text-red-500'> *</span>}
          </FormLabel>

          <FormControl>
            <Editor
              apiKey={tineMceApiKey}
              onInit={(evt, editor) => {
                editorRef.current = editor;
                editor.on('change', () => field.onChange(editor.getContent()));
              }}
              init={{
                plugins:
                  'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar:
                  'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
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
