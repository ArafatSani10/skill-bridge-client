export const categoryService = {
    getAllCategories: async function () {
        try {
            const PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

            if (!PUBLIC_API_URL) {
                console.warn("API_URL is missing, falling back to localhost");
            }

            const res = await fetch(`${PUBLIC_API_URL}/api/categories`, {
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