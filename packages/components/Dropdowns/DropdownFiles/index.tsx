import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { IconArrowUpRight, IconChevronDown, IconFile } from "@tabler/icons-react";
import Link from "next/link";

export const DropdownFiles = ({ files, totalLength }: { files: any[], totalLength: number }) => {
  return (
    <Popover modal>
      <PopoverTrigger>
        <div className="flex flex-row w-full flex-wrap">
          <div className="bg-white border border-outline flex flex-row gap-2 p-1 rounded-lg">
            <span className="p-[2px] bg-grey-sec rounded-md">
              <IconFile size={20} className="text-text-grey" />
            </span>
            <p className="text-black">
              {totalLength} Adjunto
              {totalLength > 1 ? "s" : ""}
            </p>
            <Separator orientation="vertical" />
            <span className="font-medium text-text-grey flex flex-row items-center gap-1">
              Ver <IconChevronDown size={20} />
            </span>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-1 flex-col w-fit rounded-lg">
        {files.map((file, index) => (
          <Link
            target="_blank"
            href={`/file/${file.tipo}/${file.id}/${file.nombre}`}
            className="w-[250px] flex flex-row justify-between items-center p-1 hover:bg-grey rounded-md group"
            key={file.id + index}
          >
            <div className="flex flex-row items-center gap-2 flex-1">
              <span className="p-[2px] bg-grey-sec rounded-md">
                <IconFile size={20} className="text-text-grey" />
              </span>
              <p className="truncate flex-1">{file.nombre}</p>
            </div>
            <IconArrowUpRight size={20} className="text-text-grey group-hover:rotate-45 group-hover:text-black transition-all" />
          </Link>
        ))}
      </PopoverContent>
    </Popover>
  );
}