"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Search, ChevronDown } from "lucide-react";
import { categoryService } from "@/services/category.service";

export default function TutorFilters() {
    const [categories, setCategories] = useState<any[]>([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("searchTerm") || "");

    useEffect(() => {
        categoryService.getAllCategories().then(setCategories);
    }, []);

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
            maxPrice: value[1].toString()
        });
    };

    return (
        <div className="p-6 border rounded-2xl space-y-8 bg-card shadow-sm sticky top-24">
            <div className="space-y-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Search</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                        placeholder="Search tutor name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-muted/30 border-none rounded-xl"
                    />
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center space-x-3 group">
                            <Checkbox
                                id={cat.id}
                                checked={searchParams.get("categoryId") === cat.id}
                                onCheckedChange={() => {
                                    const currentId = searchParams.get("categoryId");
                                    updateQueryParams({ categoryId: currentId === cat.id ? null : cat.id });
                                }}
                                className="border-[#00baff]/30 data-[state=checked]:bg-[#00baff]"
                            />
                            <Label htmlFor={cat.id} className="cursor-pointer text-sm font-medium group-hover:text-[#00baff] transition-colors">
                                {cat.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Price Range</h3>
                    <span className="text-xs font-bold text-[#00baff]">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
                <Slider
                    defaultValue={[0, 2000]}
                    max={2000}
                    step={10}
                    value={priceRange}
                    onValueChange={handlePriceChange}
                    className="py-4"
                />
                <p className="text-[10px] text-muted-foreground italic text-center">Set your budget range per hour</p>
            </div>

            <div className="space-y-3">
                <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Sort By</h3>
                <select 
                    onChange={(e) => updateQueryParams({ sortBy: 'pricePerHour', sortOrder: e.target.value })}
                    className="w-full bg-muted/30 border-none rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-[#00baff] outline-none appearance-none"
                    value={searchParams.get("sortOrder") || "desc"}
                >
                    <option value="asc">Price: Low to High</option>
                    <option value="desc">Price: High to Low</option>
                </select>
            </div>

            <button 
                onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 2000]);
                    router.push(pathname);
                }}
                className="w-full py-3 text-xs font-bold text-white bg-[#00baff] rounded-xl hover:bg-[#00baff]/90 transition-all shadow-md shadow-[#00baff]/20"
            >
                Clear All Filters
            </button>
        </div>
    );
}