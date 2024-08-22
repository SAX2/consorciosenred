import { cn } from "@/lib/utils";
import Sidebar from "@/components/Navbar/AppNavbars/UnitSidebar";
import MediaQueryProvider from "@/context/MediaQueryProvider";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] gap-8 max-md:grid-cols-[1fr]",
        "w-full col-span-2 max-md:col-span-1"
      )}
    >
      <MediaQueryProvider minWidth={768}>
        <div className="relative">
          <Sidebar />
        </div>
      </MediaQueryProvider>
      {children}
    </div>
  );
};

export default layout;
