import {
    CalendarCheck,
    CreditCard,
    GraduationCap,
    LayoutDashboard,
    UserCheck,
    Users,
    MessageSquare,
    Settings,
    UserX,
    Activity
} from "lucide-react";

export const adminRoutes = [
    {
        title: "Overview",
        item: [
            { title: "Dashboard", url: "/admin-dashboard", icon: LayoutDashboard },
            { title: "Site Activity", url: "/admin-activity", icon: Activity },
        ],
    },
    {
        title: "User Management",
        item: [
            { title: "User List", url: "/admin/users", icon: Users },
            { title: "Tutors List", url: "/admin-tutors", icon: GraduationCap },
            { title: "Students List", url: "/admin/students", icon: Users },
            { title: "Approvals", url: "/admin/approvals", icon: UserCheck },
            { title: "Banned Users", url: "/admin/banned-users", icon: UserX }, // এখানে ব্যান করা স্টুডেন্ট/টিউটরদের লিস্ট থাকবে
        ],
    },
    {
        title: "Bookings & Chats",
        item: [
            { title: "Session Bookings", url: "/admin/bookings", icon: CalendarCheck },
            { title: "Support Messages", url: "/admin/messages", icon: MessageSquare },
        ],
    },
    {
        title: "Finance & Admin",
        item: [
            { title: "Revenue / Payments", url: "/admin/payments", icon: CreditCard },
            { title: "Settings", url: "/admin/settings", icon: Settings },
        ],
    },
];