import {
    LayoutDashboard,
    BookOpen,
    CalendarClock,
    Search,
    MessageSquare,
    CreditCard,
    UserCircle,
    Star,
    Bell
} from "lucide-react";

export const studentRoutes = [
    {
        title: "Menu",
        item: [
            { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
            { title: "Find Tutors", url: "/tutors", icon: Search },
        ],
    },
    {
        title: "My Learning",
        item: [
            { title: "My Bookings", url: "/my-bookings", icon: CalendarClock },
        ],
    },

    {
        title: "Account",
        item: [
            { title: "My Profile", url: "/student/profile", icon: UserCircle },
        ],
    },
];