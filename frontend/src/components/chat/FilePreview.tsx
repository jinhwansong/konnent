'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export default function FilePreview({ files, onRemove }: FilePreviewProps) {
  const [imagePreviews, setImagePreviews] = useState<{ [key: number]: string }>({});

  // 이미지 파일인지 확인
  const isImageFile = (file: File) => {
    return file.type.startsWith('image/');
  };

  // 파일 아이콘 가져오기
  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'xls':
      case 'xlsx':
        return '📊';
      case 'zip':
      case 'rar':
        return '📦';
      default:
        return '📎';
    }
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 이미지 미리보기 생성
  const createImagePreview = (file: File, index: number) => {
    if (isImageFile(file) && !imagePreviews[index]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews(prev => ({
          ...prev,
          [index]: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-h-24 overflow-x-auto flex gap-2 mt-2 mb-3">
      {files.map((file, index) => {
        const isImage = isImageFile(file);
        
        // 이미지 미리보기 생성
        if (isImage && !imagePreviews[index]) {
          createImagePreview(file, index);
        }

        return (
          <div
            key={index}
            className="flex-shrink-0 relative group"
          >
            {isImage && imagePreviews[index] ? (
              // 이미지 썸네일
              <div className="w-16 h-16 rounded-lg overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg-sub)]">
                <img
                  src={imagePreviews[index]}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => onRemove(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-danger)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            ) : (
              // 파일 아이콘
              <div className="w-16 h-16 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg-sub)] flex flex-col items-center justify-center p-2">
                <div className="text-lg mb-1">
                  {getFileIcon(file)}
                </div>
                <div className="text-xs text-[var(--text)] text-center truncate w-full">
                  {file.name}
                </div>
                <button
                  onClick={() => onRemove(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-danger)] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <FiX className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {/* 파일 정보 툴팁 */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--primary-sub03)] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div className="font-medium">{file.name}</div>
              <div className="text-gray-300">{formatFileSize(file.size)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
