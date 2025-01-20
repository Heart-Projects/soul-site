import { cn } from "@/lib/utils";
const ArticleTag = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <span
      className={cn(
        "cursor-pointer inline-block px-2 py-1 leading-6 h-6 border rounded-sm bg-gray-200 text-xs text-gray-500",
        className
      )}
    >
      {children}
    </span>
  );
};

export { ArticleTag };
