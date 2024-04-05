"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MenuCategory } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { MenuCategorySkeleton } from "../../loading";

interface FilterProps {
  data: MenuCategory[];
  name: string;
  valueKey: string;
}
const Filter: React.FC<FilterProps> = ({ data, name, valueKey }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="mb-8 ">
      <h3 className="text-3xl font-semibold">Filter by {name}</h3>
      <hr className="my-4" />
      {isLoading ? (
        <MenuCategorySkeleton />
      ) : (
        <div className="flex flex-wrap gap-5">
          {data.map((filter) => (
            <div key={filter.id} className="flex items-center">
              <Button
                className={cn(
                  "rounded-md text-sm text-gray-800 p-2 bg-white border border-gray-300",
                  selectedValue === filter.id && "bg-yellow-400 text-white"
                )}
                onClick={() => onClick(filter.id)}
              >
                {filter.name}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
