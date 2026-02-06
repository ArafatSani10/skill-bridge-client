


import { AppSidebar } from "@/components/layout/app-sidebar";
import { ModeToggle } from "@/components/layout/ModeToogle";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { Bell, LogOut, User } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const userInfo = data?.user;

  const getDashboardTitle = () => {
    if (userInfo?.role === Roles.admin) return "Admin Panel";
    if (userInfo?.role === Roles.tutor) return "Tutor Portal";
    return "Student Dashboard";
  };

  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset className="bg-[#FAFAFA] dark:bg-[#020617]">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between px-6 bg-white dark:bg-[#020617] border-b border-zinc-200 dark:border-white/5">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-zinc-500" />
            <div className="h-5 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
            <h2 className="text-sm font-bold text-zinc-600 uppercase tracking-wider">{getDashboardTitle()}</h2>
          </div>

          <div className="flex items-center gap-3">
            <ModeToggle />
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500">
              <Bell className="size-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <div className="size-9 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200 dark:border-white/10">
                  {userInfo?.image ? (
                    <Image src={userInfo.image} alt="user" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs font-bold">{userInfo?.name?.charAt(0)}</div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <DropdownMenuLabel>
                  <p className="text-sm font-semibold">{userInfo?.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Role: {userInfo?.role}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2">
                  <User className="size-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2 text-red-500">
                  <LogOut className="size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-8">
          {userInfo?.role === Roles.admin && admin}
          {userInfo?.role === Roles.tutor && tutor}
          {userInfo?.role === Roles.student && student}
        </main>


        <Toaster richColors position="top-right"></Toaster>

      </SidebarInset>
    </SidebarProvider>
  );
}