import { X } from "lucide-react";
export default function Tag({
  children,
  readonly = true,
  className = "",
  onRemove,
}: {
  children: React.ReactNode;
  readonly?: boolean;
  className?: string;
  onRemove?: () => void;
}) {
  const removeIcon = readonly ? (
    <></>
  ) : (
    <X className="ml-1 cursor-pointer" onClick={onRemove} size={12} />
  );
  return (
    <>
      <div className="inline-flex items-center justify-center px-3 py-0.5 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
        <span className={className}>{children}</span>]{removeIcon}
      </div>
    </>
  );
}
