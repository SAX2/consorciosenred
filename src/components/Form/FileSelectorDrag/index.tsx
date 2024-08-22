import { cn } from '@/lib/utils';
import { IconPhotoUp } from '@tabler/icons-react';
import React, { useState, DragEvent, ChangeEvent, FC } from 'react';

const FileSelectorDrag: FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [isOver, setIsOver] = useState<boolean>(false);

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
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
  };

  return (
    <div>
      <div
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col gap-1 justify-center items-center py-8 px-4 min-h-[150px] h-full border rounded-lg border-dashed border-outline dark:border-outline-dark transition-colors",
          isOver ? "bg-grey/40 dark:bg-grey-dark/40" : ""
        )}
      >
        <div className="bg-grey dark:bg-grey-dark p-1 rounded-lg text-text-grey mb-2">
          <IconPhotoUp width={32} height={32} />
        </div>
        <p className="font-medium text-lg text-center">
          Arrastra y suelta imagenes para subir
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
        />
        <label
          htmlFor="fileInput"
          className="px-2 py-1 border border-outline dark:border-outline-dark rounded-md font-medium cursor-pointer mt-2 shadow-shortcut"
        >
          Seleccionar archivos
        </label>
      </div>
    </div>
  );
};

export default FileSelectorDrag;
