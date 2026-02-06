import {
    LayoutDashboard,
    CalendarCheck,
    Clock,
    Users,
    MessageSquare,
    Wallet,
    UserCircle,
    Settings,
    BookOpenText,
    Star
} from "lucide-react";

export const tutorRoutes = [
    {
        title: "Menu",
        item: [
            { title: "Dashboard", url: "/tutor-dashboard", icon: LayoutDashboard },
            { title: "Create Profile", url: "/tutor-profile", icon: UserCircle },
        ],
    },
    {
        title: "Class Management",
        item: [
            { title: "Availability", url: "tutor-availability", icon: CalendarCheck },
            { title: "My Students", url: "/my-student", icon: Users },
        ],
    },
    {
        title: "Students Feedbacks",
        item: [
            { title: "Reviews", url: "/tutor/reviews", icon: Star },
        ],
    },

];