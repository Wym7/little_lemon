/* "use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./ui/input";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery);
    router.push(`/search?q=${encodedSearchQuery}`);
  };
  return (
    <div>
      <form onSubmit={onSearch}>
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-96 border ring-0 border-black"
          placeholder="Search for menus..."
        />
      </form>
    </div>
  );
};

export default SearchInput;
 */
