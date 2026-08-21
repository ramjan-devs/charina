/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
'use client';

import { Label } from '@/components/ui/label';
import { Camera, ImageIcon, Plus, X } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useRef } from 'react';

interface ImageUploadFieldProps {
  label: string;
  subLabel?: string;
  icon?: React.ReactNode;
  value?: File | string | (File | string)[] | null;
  onChange: (value: any) => void;
  error?: string;
  required?: boolean;
  isUploading?: boolean;
  multiple?: boolean;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  subLabel = 'PNG, JPG up to 10MB',
  icon,
  value,
  onChange,
  error,
  required = false,
  isUploading = false,
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Normalize files array for multiple mode
  const fileList = useMemo(() => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return [value];
  }, [value]);

  const handleSingleChange = (file: File | null) => {
    onChange(file);
  };

  const handleMultipleAdd = (newFiles: File[]) => {
    const current = Array.isArray(value) ? value : value ? [value] : [];
    onChange([...current, ...newFiles]);
  };

  const handleMultipleRemove = (indexToRemove: number) => {
    if (!Array.isArray(value)) {
      onChange(null);
      return;
    }
    const updated = value.filter((_, index) => index !== indexToRemove);
    onChange(updated);
  };

  const handleUploadClick = () => {
    if (!isUploading && inputRef.current) {
      inputRef.current.click();
    }
  };

  // Preview URLs
  const previews = useMemo(() => {
    return fileList.map((item) => {
      if (item instanceof File) {
        return {
          url: URL.createObjectURL(item),
          name: item.name,
          raw: item,
        };
      }
      return {
        url: typeof item === 'string' ? item : '',
        name: typeof item === 'string' ? item.split('/').pop() || 'Image' : 'Image',
        raw: item,
      };
    });
  }, [fileList]);

  return (
    <div className="space-y-2">
      <Label className="block font-medium">
        {label} {required && <span className="text-error">*</span>}
      </Label>

      {multiple ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Render uploaded image preview cards */}
            {previews.map((item, idx) => (
              <div
                key={idx}
                className={`group border-border bg-muted/30 relative h-24 w-full overflow-hidden rounded-lg border transition-all ${
                  error ? 'border-error/50' : ''
                }`}
              >
                {item.url ? (
                  <Image
                    src={item.url}
                    alt={`Preview ${idx + 1}`}
                    fill
                    className="object-cover p-1 transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="text-muted-foreground size-6" />
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => handleMultipleRemove(idx)}
                  className="bg-error hover:bg-error/90 absolute top-1.5 right-1.5 z-20 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full text-white shadow-xs transition-all active:scale-90"
                  title="Remove image"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>

                <div className="bg-primary/80 absolute right-0 bottom-0 left-0 truncate p-1 text-center text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {item.name}
                </div>
              </div>
            ))}

            {/* Render exactly ONE '+ Add Photo' / 'Upload Photos' box card at the end */}
            <div
              onClick={handleUploadClick}
              className={`border-border bg-muted/20 hover:bg-muted/50 flex h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-3 transition-all ${
                error ? 'border-error/50 bg-red-50/10' : ''
              } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
            >
              <div className="text-muted-foreground flex size-7 items-center justify-center rounded-full">
                {previews.length > 0 ? (
                  <Plus className="size-4" />
                ) : (
                  <Camera className="size-5 opacity-60" />
                )}
              </div>
              <p className="text-muted-foreground mt-1 text-center text-[11px] font-medium">
                {previews.length > 0 ? 'Add Photo' : 'Upload Photos'}
              </p>
            </div>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              const selected = Array.from(e.target.files || []);
              if (selected.length > 0) {
                handleMultipleAdd(selected);
              }
              e.target.value = '';
            }}
            accept="image/*"
          />
        </div>
      ) : (
        /* Single Upload Mode */
        <div className="relative">
          {previews.length === 0 || !previews[0]?.url ? (
            <div
              className={`border-border bg-muted/20 hover:bg-muted/40 flex cursor-pointer flex-col items-center justify-center rounded-sm border border-dashed p-8 transition-all duration-300 outline-none focus-within:ring-2 focus-within:ring-emerald-100 ${
                error ? 'border-error/50 bg-red-50/10' : ''
              } ${isUploading ? 'pointer-events-none opacity-80' : ''}`}
              onClick={handleUploadClick}
            >
              {isUploading ? (
                <>
                  <div className="bg-muted p-3">
                    <div className="border-t-primary size-5 animate-spin rounded-full border-2 border-emerald-200"></div>
                  </div>
                  <p className="text-foreground mt-3 text-sm font-medium">Uploading image...</p>
                </>
              ) : (
                <>
                  <div className="bg-muted text-muted-foreground rounded-full p-3 shadow-none">
                    {icon || <ImageIcon className="size-5" />}
                  </div>

                  <p className="text-foreground mt-3 text-sm font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">{subLabel}</p>
                </>
              )}

              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  handleSingleChange(file);
                  e.target.value = '';
                }}
                accept="image/*"
              />
            </div>
          ) : (
            <div
              className={`group border-border bg-muted/20 relative h-52 w-full overflow-hidden rounded-sm border ${
                error ? 'border-error/50' : ''
              }`}
            >
              <Image
                src={previews[0].url}
                alt="Preview"
                fill
                className={`object-contain p-2 transition-transform duration-500 group-hover:scale-105 ${
                  isUploading ? 'blur-sm grayscale' : ''
                }`}
              />

              {!isUploading && (
                <button
                  type="button"
                  onClick={() => handleSingleChange(null)}
                  className="bg-error absolute top-3 right-3 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-all hover:bg-red-600 active:scale-90"
                  title="Remove image"
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              )}

              <div className="bg-primary/80 absolute right-0 bottom-0 left-0 p-2 text-center text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                {previews[0].name}
              </div>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-error text-xs font-medium">{error}</p>}
    </div>
  );
};

export default ImageUploadField;
