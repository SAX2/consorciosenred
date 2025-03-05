import { Popover, PopoverContent, PopoverTrigger } from "app/components/ui/popover";
import { Separator } from "app/components/ui/separator";
import { IconArrowUpRight, IconChevronDown, IconFile, IconFileFilled, IconFiles } from "@tabler/icons-react";
import Link from "next/link";
import { dropdownContainerClassName } from "..";

export const ButtonTrigger = ({ totalLength }: { totalLength: number }) => {
  return (
    <div className="flex flex-row w-full flex-wrap">
      <div className="bg-white dark:bg-black-app-bg border border-outline dark:border-outline-dark flex flex-row gap-2 rounded-lg">
        <div className="p-1 flex flex-row gap-1 items-center">
          <IconFiles size={20} className="text-text-grey" />
          <p className="font-medium select-none">
            {totalLength} Adjunto
            {totalLength > 1 ? "s" : ""}
          </p>
        </div>
        <Separator orientation="vertical" />
        <span className="font-medium text-text-grey flex flex-row items-center gap-1">
          Ver <IconChevronDown size={20} className="mr-1" />
        </span>
      </div>
    </div>
  );
}

export const DropdownFiles = ({ files, totalLength, modal = true }: { files: any[], totalLength: number, modal?: boolean }) => {
  return (
    <Popover modal={modal}>
      <PopoverTrigger>
        <ButtonTrigger totalLength={totalLength} />
      </PopoverTrigger>
      <PopoverContent align="start" className={dropdownContainerClassName}>
        {files.map((file, index) => (
          <Link
            target="_blank"
            href={`/file/${file.tipo}/${file.id}/${file.nombre}`}
            className="w-[250px] flex flex-row justify-between items-center p-1 hover:bg-grey dark:hover:bg-grey-dark rounded-md group"
            key={file.id + index}
          >
            <div className="flex flex-row items-center gap-1 flex-1 max-w-[220px]">
              <IconFileFilled size={20} className="text-text-grey" />
              <p className="truncate flex-1">{file.nombre}</p>
            </div>
            <IconArrowUpRight size={20} className="text-text-grey group-hover:text-black dark:group-hover:text-white" />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}