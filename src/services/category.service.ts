export const categoryService = {
    getAllCategories: async function () {
        try {
            const res = await fetch("http://localhost:5000/api/categories", {
                next: { revalidate: 3600 } 
            });
            const result = await res.json();
            return result?.data || result; 
        } catch (error) {
            console.error("Category Fetch Error:", error);
            return [];
        }
    }
};