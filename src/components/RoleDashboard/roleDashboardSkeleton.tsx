import { Skeleton } from "../ui/skeleton";

export default function RoleDashboardSkeleton() {
  return (
    <div className="w-full">
      <Skeleton className="h-96 w-full rounded-3xl" />
      <div className="mt-12 flex w-full justify-end">
        <Skeleton className="h-12 w-24" />
      </div>
    </div>
  );
}
