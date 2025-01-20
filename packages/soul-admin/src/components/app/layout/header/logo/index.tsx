import { cn } from "@/lib/utils";

const SiteLogo = ({
  className,
  menuCollapse = false,
}: {
  className?: string;
  menuCollapse?: boolean;
}) => {
  return (
    <>
      <div className={cn("block px-6 py-2", className)}>
        <h1 className="font-bold">Soul Admin</h1>
      </div>
    </>
  );
};
export default SiteLogo;
