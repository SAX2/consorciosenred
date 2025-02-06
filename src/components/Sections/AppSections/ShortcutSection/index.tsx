import ShortcutCard from "@/components/Cards/ShortcutCard";
import { ShortcutButtonDisplayType } from "@/types/globals";
import { FC } from "react";

export interface ShortcutsProps {
  data: any[];
  className?: string;
  mainPath: string;
  display: ShortcutButtonDisplayType;
}

export const getShortcutCols = (length: number) => length > 2 ? "grid-cols-3" : length > 1 ? "grid-cols-2" : "grid-cols-1" 

const Shortcuts: FC<ShortcutsProps> = ({
  data,
  className,
  mainPath,
  display,
}) => {
  return (
    <div className={className}>
      {data.map((shortcut) => {
        return (
          <ShortcutCard
            {...shortcut}
            display={display}
            path={`${mainPath}${shortcut.path}`}
            key={`${shortcut.id}-${crypto.randomUUID()}`}
          />
        );
      })}
    </div>
  );
};

export default Shortcuts;
