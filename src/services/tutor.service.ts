import { env } from "@/env";

if (!env) {
    console.error("Environment variables not found! Check your env.ts file.");
}

const API_URL = env?.API_URL; 

export const tutorService = {
    // ১. সব টিউটর একসাথে পাওয়ার জন্য
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

    // ২. নির্দিষ্ট আইডি দিয়ে একজন টিউটরের ডিটেইলস পাওয়ার জন্য
    getSingleTutor: async function (id: string) {
        try {
            if (!API_URL) throw new Error("API_URL is missing in environment variables");

            // আইডি অনুযায়ী ডাইনামিক রিকোয়েস্ট
            const res = await fetch(`${API_URL}/api/tutor/${id}`, { 
                cache: 'no-store' 
            });

            if (!res.ok) throw new Error("Tutor not found");

            const result = await res.json();
            
            // পোস্টম্যান ডেটা অনুযায়ী ডাটা এক্সট্র্যাক্ট করা
            return result?.data || result;
        } catch (error) {
            console.error("Fetch Error (Single):", error);
            return null; // ডিটেইলস না পেলে null রিটার্ন করা ভালো যাতে UI হ্যান্ডেল করা যায়
        }
    },
};