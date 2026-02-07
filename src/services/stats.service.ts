const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const statsService = {
    getTutorStats: async function () {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stats/tutor-stats`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                cache: 'no-store'
            });
            return await res.json();
        } catch (error) {
            console.error("Fetch Error:", error);
            return null;
        }
    }
};
