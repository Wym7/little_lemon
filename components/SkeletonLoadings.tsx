import { Skeleton } from "@/components/ui/skeleton";

export const ThisWeekSpecialsSkeleton = () => {
  return (
    <div className="justify-center mt-10 gird-cols-1 flex items-center m-auto w-[50vh] gap-x-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
      {[...Array(3)].map((_, i) => (
        <SpecialSkeleton key={i} />
      ))}
    </div>
  );
};

export const SpecialSkeleton = () => {
  return (
    <div className="w-full flex">
      <div className="space-y-2 ">
        <Skeleton className="h-[300px] w-[300px] bg-gray-300 " />
      </div>
    </div>
  );
};

export const MenuCategorySkeleton = () => {
  return (
    <div className="flex w-full gap-x-6">
      {[...Array(4)].map((_, i) => (
        <Skeleton key={i} className="h-[40px] w-[80px] bg-gray-300 " />
      ))}
    </div>
  );
};
