
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (base64: string, mimeType: string) => void;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = useCallback((file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        setFileName(file.name);
        onImageUpload(base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 border-b pb-3 mb-6">Upload Medical Image</h2>
      <label
        htmlFor="image-upload"
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="w-full flex justify-center items-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 transition-colors duration-300 bg-slate-50"
      >
        <div className="space-y-1 text-center">
          {preview ? (
            <div className="relative group">
              <img src={preview} alt="Preview" className="mx-auto h-48 w-auto rounded-md object-contain" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                <p className="text-white text-sm font-semibold">Click or drag to replace image</p>
              </div>
            </div>
          ) : (
            <>
              <UploadIcon />
              <div className="flex text-sm text-slate-600">
                <p className="pl-1">
                  Drag and drop an image here, or{' '}
                  <span className="font-semibold text-blue-600">click to upload</span>
                </p>
              </div>
              <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
        <input id="image-upload" name="image-upload" type="file" className="sr-only" accept="image/*" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
      </label>
       {fileName && <p className="text-sm text-slate-600 mt-2 text-center">Uploaded: <span className="font-medium">{fileName}</span></p>}
    </div>
  );
};
