import { Skeleton } from "@/components/ui/skeleton";
export const ThisWeekSpecialsSkeleton = () => {
  return (
    <div className="flex flex-col justify-center  gap-y-6 items-center m-auto w-[50vh] gap-x-10 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {[...Array(3)].map((_, i) => (
        <SpecialSkeleton key={i} />
      ))}
    </div>
  );
};

/* testing */
export const SpecialSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-center  ">
      <Skeleton className="h-[300px] w-[300px] bg-gray-300 " />
    </div>
  );
};
export const MenuCategorySkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center items-center m-auto w-[50vh] gap-x-2 md:grid md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-4 2xl:grid-cols-5">
      {[...Array(4)].map((_, i) => (
        <CategorySkeleton key={i} />
      ))}
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="flex gap-x-5">
      <Skeleton className="h-10 w-20 bg-gray-200" />
    </div>
  );
};

export default function Loading() {
  return <></>;
}
