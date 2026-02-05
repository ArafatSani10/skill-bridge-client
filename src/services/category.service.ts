import { env } from "@/env";

const API_URL = env?.API_URL;

export const categoryService = {
    getAllCategories: async function () {
        try {
            if (!API_URL) {
                throw new Error("API_URL is missing in environment variables");
            }

            const res = await fetch(`${API_URL}/api/categories`, {
                next: { revalidate: 3600 }
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch categories: ${res.statusText}`);
            }

            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            console.error("Category Fetch Error:", error);
            return [];
        }
    }
};