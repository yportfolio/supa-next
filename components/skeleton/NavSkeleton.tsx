import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function NavSkeleton() {
  return (
    <div className="flex space-x-3 h-10 my-4">
      <Skeleton className="w-9/12" />
      <Skeleton className="w-2/12" />
      <Skeleton className="w-1/12 rounded-full" />
    </div>
  );
}
