"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, ListFilter, ArrowUpDown, CircleX, Hash } from "lucide-react";

export default function TutorFilters({ categories }: { categories: any[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [priceRange, setPriceRange] = useState([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 2000,
  ]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("searchTerm") || "");

  const updateQueryParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateQueryParams({ searchTerm: searchQuery });
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateQueryParams({
      minPrice: value[0].toString(),
      maxPrice: value[1].toString(),
    });
  };

  return (
    <div className="bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg sticky top-24 overflow-hidden">
      {/* Header Area */}
      <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-transparent">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
          <ListFilter className="size-4" />
          <span className="text-sm font-semibold tracking-tight">Filter Options</span>
        </div>
        {(searchParams.get("categoryId") || searchParams.get("searchTerm") || searchParams.get("minPrice")) && (
          <button 
            onClick={() => {
              setSearchQuery("");
              setPriceRange([0, 2000]);
              router.push(pathname);
            }}
            className="text-xs font-medium text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1"
          >
            Clear <CircleX className="size-3" />
          </button>
        )}
      </div>

      <div className="p-6 space-y-8">
        {/* Search Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-500">
            <Search className="size-4" />
            <span className="text-sm font-semibold   ">Keyword Search</span>
          </div>
          <Input
            placeholder="Search by name & bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-1 focus-visible:ring-[#00baff] rounded-md text-sm transition-all"
          />
        </div>

        {/* Category Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-zinc-500">
            <Hash className="size-4" />
            <span className="text-sm font-semibold ">Categories</span>
          </div>
          <div className="space-y-1.5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {categories?.map((cat) => (
              <div
                key={cat.id}
                className={`flex items-center space-x-3 p-2 rounded-md transition-all cursor-pointer ${
                  searchParams.get("categoryId") === cat.id 
                  ? "bg-[#00baff]/5 text-[#00baff]" 
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                }`}
                onClick={() => {
                   const currentId = searchParams.get("categoryId");
                   updateQueryParams({ categoryId: currentId === cat.id ? null : cat.id });
                }}
              >
                <Checkbox
                  id={cat.id}
                  checked={searchParams.get("categoryId") === cat.id}
                  className="border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-[#00baff] data-[state=checked]:border-[#00baff]"
                />
                <span className="text-sm font-medium">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price Section */}
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-500">
              <span className="text-sm font-semibold">Price / Hour</span>
            </div>
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              ${priceRange[0]} — ${priceRange[1]}
            </span>
          </div>
          <div className="px-2">
            <Slider
              defaultValue={[0, 2000]}
              max={2000}
              step={50}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4 [&_[role=slider]]:border-[#00baff]"
            />
          </div>
        </div>

        {/* Sorting Section */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-zinc-500">
            <ArrowUpDown className="size-4" />
            <span className="text-sm font-semibold">Sort Results</span>
          </div>
          <select
            onChange={(e) => updateQueryParams({ sortBy: "pricePerHour", sortOrder: e.target.value })}
            className="w-full h-9 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#00baff] transition-all cursor-pointer"
            value={searchParams.get("sortOrder") || "desc"}
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}