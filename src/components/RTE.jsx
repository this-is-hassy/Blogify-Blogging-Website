import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller } from 'react-hook-form';
import conf from '../conf/conf.js';


export default function RTE({name, control, label, defaultValue =""}) {
  
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1 text-xl text-indigo-950 font-bold'>{label}</label>}
    <Controller
    name={name || "content"}
    control={control}
    rules={{
      required: "Post content is required",
      maxLength: {
        value: 190000,
        message: "Content is too long",
      },
    }}
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
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />
     </div>
  )
}

