import { env } from "@/env";

if (!env) {
    console.error("Environment variables not found! Check your env.ts file.");
}

const API_URL = env?.API_URL;

export const tutorService = {
    getAllTutor: async function (filters?: {
        categoryId?: string;
        searchTerm?: string;
        minPrice?: string;
        maxPrice?: string;
        sortBy?: string;
        sortOrder?: string;
    }) {
        try {
            const queryParams = new URLSearchParams();
            if (filters?.categoryId) queryParams.append("categoryId", filters.categoryId);
            if (filters?.searchTerm) queryParams.append("searchTerm", filters.searchTerm);
            if (filters?.minPrice) queryParams.append("minPrice", filters.minPrice);
            if (filters?.maxPrice) queryParams.append("maxPrice", filters.maxPrice);
            if (filters?.sortBy) queryParams.append("sortBy", filters.sortBy);
            if (filters?.sortOrder) queryParams.append("sortOrder", filters.sortOrder);

            const url = `${env.API_URL}/api/tutor?${queryParams.toString()}`;
            const res = await fetch(url, { cache: 'no-store' });
            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            console.error(error);
            return [];
        }
    },


    getSingleTutor: async function (id: string) {
        try {
            if (!API_URL) throw new Error("API_URL is missing in environment variables");

            const res = await fetch(`${API_URL}/api/tutor/${id}`, {
                cache: 'no-store'
            });

            if (!res.ok) throw new Error("Tutor not found");

            const result = await res.json();

            return result?.data || result;
        } catch (error) {
            console.error("Fetch Error (Single):", error);
            return null;
        }
    },
};