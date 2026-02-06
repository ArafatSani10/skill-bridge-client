const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const tutorService = {
    getAllTutor: async function (filters?: any) {
        try {
            const queryParams = new URLSearchParams(filters).toString();
            const res = await fetch(`${API_URL}/api/tutor?${queryParams}`, { cache: 'no-store' });
            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            return [];
        }
    },

    getSingleTutor: async function (id: string) {
        try {
            const res = await fetch(`${API_URL}/api/tutor/${id}`, { cache: 'no-store' });
            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            return null;
        }
    },

    updateTutorProfile: async function (data: any) {
        try {
            const res = await fetch(`${API_URL}/api/tutor/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (res.status === 401) {
                return { success: false, message: "Unauthorized: Please login again" };
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error("Update Profile Fetch Error:", error);
            return { success: false, message: "Network error" };
        }
    },

    getTutorProfile: async function () {
        try {
            const res = await fetch(`${API_URL}/api/tutor/profile`, {
                headers: { "Content-Type": "application/json" },
                cache: 'no-store',
                credentials: "include",
            });

            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            return null;
        }
    },


    updateAvailability: async function (data: any) {
        try {
            const res = await fetch(`${API_URL}/api/tutor/availability`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (res.status === 401) {
                return { success: false, message: "Unauthorized: Please login again" };
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error("Availability Update Error:", error);
            return { success: false, message: "Network error" };
        }
    },

    getAvailability: async function () {
        try {
            const res = await fetch(`${API_URL}/api/tutor/availability`, {
                headers: { "Content-Type": "application/json" },
                cache: 'no-store',
                credentials: "include",
            });

            const result = await res.json();
            return result?.data || result;
        } catch (error) {
            console.error("Get Availability Error:", error);
            return null;
        }
    },


    getMyStudents: async function () {
        try {
            const res = await fetch(`${API_URL}/api/tutor/my-students`, {
                headers: { "Content-Type": "application/json" },
                cache: 'no-store',
                credentials: "include",
            });

            if (res.status === 401) {
                return { success: false, message: "Unauthorized" };
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error("Get My Students Error:", error);
            return { success: false, data: [] };
        }
    },
};