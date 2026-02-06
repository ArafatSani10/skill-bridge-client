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
            { title: "My Lessons", url: "/student/lessons", icon: BookOpen },
            { title: "Favorite Tutors", url: "/student/favorites", icon: Star },
        ],
    },
    {
        title: "Communication",
        item: [
            { title: "Messages", url: "/student/messages", icon: MessageSquare },
            { title: "Notifications", url: "/student/notifications", icon: Bell },
        ],
    },
    {
        title: "Account",
        item: [
            { title: "Payments", url: "/student/payments", icon: CreditCard },
            { title: "My Profile", url: "/student/profile", icon: UserCircle },
        ],
    },
];