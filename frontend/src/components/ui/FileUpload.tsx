'use client';

import React, { useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  label?: string;
  error?: string;
  accept?: string;
  multiple?: boolean;
  value?: string | string[];
  onChange: (files: File | File[]) => void;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  error,
  accept = 'image/*',
  multiple = false,
  value,
  onChange,
  className,
}) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onChange(multiple ? files : files[0]);
      }
    },
    [multiple, onChange]
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onChange(multiple ? files : files[0]);
      }
    },
    [multiple, onChange]
  );

  const previewUrls = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <div className={cn('w-full', className)}>
      {label && <label className="label">{label}</label>}
      <div
        className={cn(
          'border-2 border-dashed rounded-xl p-8 text-center',
          'transition-all duration-200 cursor-pointer',
          'hover:border-accent hover:bg-accent/5',
          error && 'border-error'
        )}
        style={{ borderColor: 'var(--color-border)' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-10 h-10 text-text-muted mx-auto mb-3" />
          <p className="text-text-primary font-medium mb-1">
            拖拽文件到此处或点击上传
          </p>
          <p className="text-sm text-text-secondary">
            支持 JPG, PNG, GIF 格式
          </p>
        </label>
      </div>
      {error && <p className="error-text">{error}</p>}
      {previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="w-full h-20 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => {}}
                className="absolute top-1 right-1 p-1 bg-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
