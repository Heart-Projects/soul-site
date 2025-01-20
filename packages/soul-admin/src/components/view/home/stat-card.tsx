import { cn } from "@/lib/utils";
import { ReactNode } from "react";
const StatCard = ({
  className,
  title,
  icon,
  count,
  desc,
}: {
  className?: string;
  title: string;
  icon?: ReactNode;
  count?: string;
  desc?: string;
}) => {
  return (
    <div
      className={cn(
        " inline-block border rounded-xl bg-card text-card-foreground shadow-lg min-h-28 w-60",
        className
      )}
    >
      <div className=" p-6 flex justify-between">
        <span>{title}</span>
        <span>{icon}</span>
      </div>
      <div className=" text-3xl text-center">{count}</div>
      <p className=" pl-6 py-2 text-xs text-muted-foreground">{desc}</p>
    </div>
  );
};

export default StatCard;
