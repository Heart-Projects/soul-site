import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className=" h-full w-full">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-8" />
      </div>
    </div>
  );
}
