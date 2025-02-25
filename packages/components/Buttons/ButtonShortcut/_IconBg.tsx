import { handlePress as handlePressAction } from './actions';
import { memo } from "react";
import { ShortcutProps } from "@/types/globals";
import Link from "next/link";

const IconBg = memo(({ title, icon, style, handlePress, index, isBottomSheet, path }: ShortcutProps) => {
  const content = (
    <div className="flex items-center justify-center gap-2 max-md:gap-1 w-full">
      <div className="rounded-[8px] p-[3px]" style={{ backgroundColor: style?.background }}>
        {icon}
      </div>
      <span className="text-base font-medium text-start" style={{ color: style?.color }}>
        {title}
      </span>
    </div>
  );

  if (isBottomSheet) {
    return (
      <button
        onClick={handlePress ?? handlePressAction}
        className={`border-outline dark:border-outline-dark dark:bg-black-app-bg flex items-center justify-center rounded-[12px] border bg-white p-3 max-md:p-2 ${
          index && index > 0 ? "ml-2" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={path}
      className={`border-outline dark:border-outline-dark dark:bg-black-app-bg flex rounded-[12px] border bg-white p-3 max-md:p-2 ${
        index && index > 0 ? "ml-2" : ""
      }`}
    >
      {content}
    </Link>
  );
});

export default IconBg;