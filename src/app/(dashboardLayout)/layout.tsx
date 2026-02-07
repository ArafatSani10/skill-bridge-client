import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userService } from "@/services/user.service";
import { Bell, LogOut, User as UserIcon } from "lucide-react";
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
import React from "react";
import ThemeWrapper from "@/components/modules/layoutTheme/ThemeWrapper";

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
            <h2 className="text-sm font-bold text-zinc-600 uppercase ">{getDashboardTitle()}</h2>
          </div>

          <div className="flex items-center gap-3">
            <ThemeWrapper />
            
            <button className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 transition-colors">
              <Bell className="size-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none focus:outline-none" asChild>
                <button className="size-9 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden relative border border-zinc-200 dark:border-white/10 cursor-pointer outline-none">
                  {userInfo?.image ? (
                    <Image src={userInfo.image} alt="user" fill className="object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs font-bold text-zinc-500">
                      {userInfo?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-md border-zinc-200 dark:border-zinc-800 shadow-none">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-bold leading-none text-zinc-900 dark:text-zinc-100">{userInfo?.name}</p>
                    <p className="text-[10px] leading-none text-zinc-500 uppercase font-bold tracking-tighter">Role: {userInfo?.role}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2 focus:bg-zinc-100 dark:focus:bg-zinc-800 rounded-sm">
                  <UserIcon className="size-4" /> Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-2 text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20 rounded-sm transition-colors">
                  <LogOut className="size-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="p-8 min-h-[calc(100vh-64px)]">
          {userInfo?.role === Roles.admin && admin}
          {userInfo?.role === Roles.tutor && tutor}
          {userInfo?.role === Roles.student && student}
        </main>

        <Toaster richColors position="top-right" closeButton />

      </SidebarInset>
    </SidebarProvider>
  );
}