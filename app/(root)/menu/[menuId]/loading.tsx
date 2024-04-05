import { Skeleton } from "@/components/ui/skeleton";

export const MenuCategorySkeleton = () => {
  return (
    <div className="justify-center gird-cols-1 flex items-center m-auto w-[50vh] gap-x-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 ">
      {[...Array(4)].map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div>
      <Skeleton className="h-10 w-20 bg-gray-200" />
    </div>
  );
};

export const MenuDetailSkeleton = () => {
  return (
    <div className="flex items-center justify-center rounded-xl">
      <Skeleton className="h-80 w-[900px] bg-gray-200" />
    </div>
  );
};

export default function Loading() {
  return <div className="text-6xl">Loading....</div>;
}
