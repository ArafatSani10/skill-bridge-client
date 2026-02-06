import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const bookingService = {
    createBooking: async function (payload: { tutorId: string; slotId: string }) {
        try {
            const baseUrl = API_URL;

            const res = await fetch(`${baseUrl}/api/bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "You are not authorized!");
            }

            return { success: true, data: result?.data || result };
        } catch (error: any) {
            console.error("Booking Create Error:", error);
            return {
                success: false,
                message: error.message || "An unexpected error occurred"
            };
        }
    },

    getMyBookings: async function () {
        try {
            const baseUrl = API_URL;
            const res = await fetch(`${baseUrl}/api/bookings/my-bookings`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || "Failed to fetch bookings");
            }

            return { success: true, data: result.data };
        } catch (error: any) {
            console.error("Fetch Bookings Error:", error);
            return { success: false, message: error.message };
        }
    }
};
