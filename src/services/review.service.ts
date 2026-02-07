import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL ;

export const reviewService = {
    createReview: async function (payload: {
        tutorId: string;
        bookingId: string;
        rating: number;
        comment: string
    }) {
        try {
            const res = await fetch(`${API_URL}/api/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: "include",
            });

            const result = await res.json();
            if (!res.ok) throw new Error(result.message || "Failed to submit review");
            return { success: true, data: result.data };
        } catch (error: any) {
            return { success: false, message: error.message };
        }
    }
};