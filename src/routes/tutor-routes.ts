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
            { title: "Dashboard", url: "/tutor/dashboard", icon: LayoutDashboard },
            { title: "My Profile", url: "/tutor/profile", icon: UserCircle },
        ],
    },
    {
        title: "Class Management",
        item: [
            { title: "Student Bookings", url: "/tutor/bookings", icon: CalendarCheck },
            { title: "Manage Schedule", url: "/tutor/schedule", icon: Clock }, // এখানে টিউটর তার ফ্রি সময় সেট করবে
            { title: "My Students", url: "/tutor/my-students", icon: Users },
            { title: "Course Content", url: "/tutor/content", icon: BookOpenText },
        ],
    },
    {
        title: "Finance & Feedback",
        item: [
            { title: "Earnings", url: "/tutor/earnings", icon: Wallet },
            { title: "Reviews", url: "/tutor/reviews", icon: Star },
        ],
    },
    {
        title: "Support",
        item: [
            { title: "Messages", url: "/tutor/messages", icon: MessageSquare },
            { title: "Settings", url: "/tutor/settings", icon: Settings },
        ],
    },
];