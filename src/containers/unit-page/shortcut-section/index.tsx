import ShortcutCard from "@/components/Cards/ShortcutCard";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface ShortcutsProps {
  data: any[];
  classNameItem?: string;
  className?: string;
  mainPath: string;
}

const Shortcuts: FC<ShortcutsProps> = ({ data, classNameItem, className, mainPath }) => {
  return (
    <div className={cn("grid grid-cols-2 gap-2", className)}>
      {data.map((shortcut) => {
        if (shortcut.isActive) {
          return (
            <ShortcutCard
              isModal={shortcut.isModal}
              modalContent={shortcut.modalContent}
              className={classNameItem}
              color={shortcut.color}
              title={shortcut.title}
              icon={shortcut.icon}
              key={shortcut.title}
              path={mainPath + shortcut.path}
            />
          );
        }
      })}
    </div>
  );
};

export default Shortcuts