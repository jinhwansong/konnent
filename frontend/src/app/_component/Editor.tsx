'use client'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { useDropzone } from 'react-dropzone';
import QuillEditor from './QuillEditor';
import 'react-quill/dist/quill.snow.css';
import './editor.scss';
Quill.register('modules/imageResize', ImageResize);

interface IEditor {
  setContent: React.Dispatch<React.SetStateAction<string>>;
  content: string;
}

export default function Editors({ setContent, content }: IEditor) {
  const quillRef = useRef<ReactQuill>(null);

  const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'formula',
    'list',
    'bullet',
    'indent',
    'image',
    'align',
    'color',
    'background',
  ];
  // 이미지 업로드
  const handleImageUpload = useCallback(async (files: File[]) => {
    const imageform = new FormData();
    files.forEach((file) => {
      imageform.append('image', file);
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/image`, {
        method: 'POST',
        credentials: 'include',
        body: imageform,
      });
      const data = await res.json();
      const editor = quillRef.current?.getEditor();
      const range = editor?.getSelection()?.index || 0;
      data.forEach((path: string, i: number) => {
        const imgUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${path}`;
        editor?.insertEmbed(range + i, 'image', imgUrl);
      });
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  }, []);
  // 드래그앤 드랍
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleImageUpload(acceptedFiles);
    },
    [handleImageUpload]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();
    input.onchange = async () => {
      const files = input.files;
      if (files) {
        await handleImageUpload(Array.from(files));
      }
    };
  }, [handleImageUpload]);

  // 모듈
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },

      clipboard: {
        matchVisual: false,
      },
      imageDrop: undefined,
      imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
      },
    }),
    [imageHandler]
  );
  const handleChange = (value: string) => setContent(value);
  return (
    <div {...getRootProps()} style={{ position: 'relative' }}>
      <input {...getInputProps()} />
      {isDragActive && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            zIndex: 1000,
          }}
        >
          이미지를 여기에 놓으세요
        </div>
      )}
      <QuillEditor
        modules={modules}
        theme="snow"
        value={content}
        onChange={handleChange}
        formats={formats}
        forwardedRef={quillRef}
        className="editor"
      />
    </div>
  );
}
