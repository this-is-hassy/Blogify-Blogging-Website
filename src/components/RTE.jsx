import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from '../conf/conf.js';


export default function RTE({name, control, label, defaultValue =""}) {
  const handleEditorChange = (editor) => {
    // Ensure the character limit is not exceeded
    const plainTextContent = editor.getContent({ format: 'text' });
    if (plainTextContent.length > 2000) {
      const truncatedContent = plainTextContent.substring(0, 2000);
      editor.setContent(truncatedContent);
      alert('Character limit exceeded! Only 2000 characters are allowed.');
    }
  };

  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
    <Controller
    name={name || "content"}
    control={control}
    render={({field: {onChange}}) => ( 
        <Editor
        apiKey={conf.tinyMCEApiKey}
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            setup: (editor) => {
              editor.on('keyup', () => handleEditorChange(editor.getContent(), editor));
            },
        }}
        onEditorChange={onChange}
        />
    )}
    />
     </div>
  )
}

