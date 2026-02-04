import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/layout/ModeToogle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#FFFFFF] dark:bg-[#020617]">
                {/* Modern Top Header */}
                <header className="flex h-16 shrink-0 items-center justify-between px-8 border-b border-zinc-100 dark:border-white/5">
                    <div className="flex items-center gap-4">
                        <SidebarTrigger className="text-zinc-400" />
                        <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                        <h2 className="text-sm font-semibold text-zinc-500">Admin Dashboard</h2>
                    </div>

                    {/* Right side icons like the image */}
                    <div className="flex items-center gap-4">
                        <ModeToggle></ModeToggle>

                        <button className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 text-zinc-500">
                            <Bell className="size-4" />
                        </button>
                        <div className="size-8 rounded-full bg-zinc-200 dark:bg-zinc-800 border-2 border-white dark:border-white/10 overflow-hidden">
                            {/* User Image */}
                        </div>

                    </div>



                </header>

                <main className="p-8">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}