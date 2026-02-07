


import { authClient } from "@/lib/auth-client";

export const userService = {
    getSession: async function () {
        try {
            let fetchOptions = {};

            if (typeof window === "undefined") {
                const { headers } = await import("next/headers");
                fetchOptions = {
                    headers: await headers(),
                };
            }

            const { data: session, error } = await authClient.getSession({
                fetchOptions
            });

            if (error || !session) {
                return { data: null, error: { message: error?.message || "Session is missing.." } };
            }

            return { data: session, error: null };
        } catch (err) {
            console.error("Session error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};