import { env } from "@/env";

if (!env) {
    console.error("Environment variables not found! Check your env.ts file.");
}

const API_URL = env?.API_URL;

export const tutorService = {
    getAllTutor: async function () {
        try {
            if (!API_URL) throw new Error("API_URL is missing in environment variables");

            const res = await fetch(`${API_URL}/api/tutor`, {
                cache: 'no-store'
            });
            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            console.error("Fetch Error (All):", error);
            return [];
        }
    },

    getSingleTutor: async function (id: string) {
        try {
            if (!API_URL) throw new Error("API_URL is missing in environment variables");

            // আইডি অনুযায়ী ডাইনামিক রিকোয়েস্ট
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