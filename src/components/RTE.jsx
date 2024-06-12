import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, required, errors, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <>
          <label className="flex mt-4 text-white font-bold text-xl pl-1 mb-1">
            {label} {required && <p className="text-red-400">*</p>}
          </label>
          {errors && (
            <span className="text-red-400 text-xs ml-2">
              This field is required.
            </span>
          )}
        </>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="4pz75hv94trqawhewomw4kbifud35rjgbsfhne82b6v7j86x"
            initialValue={defaultValue}
            init={{
              initialValue: { defaultValue },
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
                "tinymcespellchecker",
                "anchor",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help | spellchecker |link image",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
