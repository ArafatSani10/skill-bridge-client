import { authClient } from "@/lib/auth-client";

export const userService = {
    getSession: async function () {
        try {

            const { data: session, error } = await authClient.getSession();

            if (error || !session) {
                return { data: null, error: { message: error?.message || "Session is missing.." } };
            }

            return { data: session, error: null };
        } catch (err) {
            console.error("Client Session error:", err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};