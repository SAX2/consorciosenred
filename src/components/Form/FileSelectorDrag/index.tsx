import Pill from '@/components/Pill';
import { cn } from '@/lib/utils';
import { IconPhotoPlus, IconPhotoUp } from '@tabler/icons-react';
import React, { useState, DragEvent, ChangeEvent, FC } from 'react';

interface FileSelectorDragProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
  className?: string;
  error?: string;
}

const FileSelectorDrag: FC<FileSelectorDragProps> = ({
  onFilesSelected,
  maxFiles = Infinity,
  acceptedFileTypes = ['image/*'],
  className,
  error
}) => {
  const [isOver, setIsOver] = useState<boolean>(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(true)
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsOver(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    handleFiles(selectedFiles);
  };

  const handleFiles = (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => 
      acceptedFileTypes.some(type => file.type.match(type))
    ).slice(0, maxFiles);
    setUploadedFiles(prevFiles => [...prevFiles, ...validFiles]);
    onFilesSelected(validFiles);
  };

    return (
    <div className={cn("flex flex-col gap-3", className)}>
      {uploadedFiles.length === 0 && (
        <div
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col gap-1 justify-center items-center py-8 px-4 min-h-[150px] h-full border rounded-lg border-dashed border-outline dark:border-outline-dark transition-colors outline outline-transparent",
            isOver ? "bg-grey/40 dark:bg-grey-dark/40" : "",
            error &&
              "!outline-4 !outline-red/5 dark:!outline-red-dark/20 !border-red dark:!border-red-dark border-solid"
          )}
        >
          <div className="bg-grey dark:bg-grey-dark p-1 rounded-lg text-text-grey mb-2">
            <IconPhotoUp width={32} height={32} />
          </div>
          <p className="font-medium text-lg text-center">
            Arrastra y suelta imágenes para subir
          </p>
          <p className="text-sm text-text-grey text-center">
            Sube tus imágenes arrastrándolas aquí o selecciona archivos.
          </p>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="fileInput"
            accept={acceptedFileTypes.join(",")}
          />
          <label
            htmlFor="fileInput"
            className="px-2 py-1 border border-outline dark:border-outline-dark rounded-md font-medium cursor-pointer mt-2 shadow-shortcut"
          >
            Seleccionar archivos
          </label>
        </div>
      )}
      {uploadedFiles.length > 0 && (
        <>
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="fileInput"
            accept={acceptedFileTypes.join(",")}
          />
          <label
            htmlFor="fileInput"
            className="p-2 border border-outline dark:border-outline-dark rounded-md font-medium cursor-pointer mt-2 shadow-shortcut w-full text-center flex items-center justify-center gap-2"
          >
            Seleccionar mas archivos
            <IconPhotoPlus width={16} height={16} className="text-black dark:!text-white" />
          </label>
          <div className="flex flex-wrap gap-2 mb-4">
            {uploadedFiles.map((file, index) => (
              <Pill
                key={index}
                text={file.name}
                isFile={true}
                fileId={file.name}
                className="text-sm"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FileSelectorDrag;
