"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"



import logo from "../../../public/logo.png"
import { adminRoutes } from "@/routes/admin-routes"
import { studentRoutes } from "@/routes/student-routes"
import { tutorRoutes } from "@/routes/tutor-routes"

export function AppSidebar({
  user = { role: "student" }, 
  ...props
}: { user?: { role: string } } & React.ComponentProps<typeof Sidebar>) {

  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  // Role অনুযায়ী রুট সিলেক্ট করার Switch Case
  let selectedRoutes: any[] = []

  switch (user.role) {
    case "admin":
      selectedRoutes = adminRoutes
      break
    case "student":
      selectedRoutes = studentRoutes
      break
    case "tutor":
      selectedRoutes = tutorRoutes
      break
    default:
      selectedRoutes = []
  }

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-zinc-100 dark:border-white/5 bg-[#F9FAFB] dark:bg-[#020817]"
      {...props}
    >
      {/* --- Logo Section --- */}
      <SidebarHeader className="h-20 flex items-center justify-center px-4">
        <Link href="/" className="relative flex items-center justify-center">
          <div className={cn(
            "relative transition-all duration-300",
            isCollapsed ? "hidden" : "h-40 w-60"
          )}>
            <Image src={logo} alt="Skill Bridge" fill className="object-contain" priority />
          </div>
        </Link>
      </SidebarHeader>

      {/* --- Dynamic Navigation --- */}
      <SidebarContent className="px-3 pt-2">
        {selectedRoutes.map((group, index) => (
          <SidebarGroup key={index}>
            {!isCollapsed && (
              <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-400 mb-2 px-2 mt-2">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1">
              {group.item.map((item: any) => {
                const isActive = pathname === item.url
                const Icon = item.icon

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        "h-10 px-3 rounded-lg transition-all duration-300 group",
                        isActive
                          ? "bg-white dark:bg-white/5 text-foreground shadow-sm border border-zinc-200/50 dark:border-white/5"
                          : "text-zinc-500 hover:text-[#00baff] hover:bg-zinc-200/40 dark:hover:bg-white/5"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded-md transition-all duration-300 flex items-center justify-center",
                          isActive ? "bg-[#00baff] text-white" : "group-hover:bg-[#00baff]/10 group-hover:text-[#00baff]"
                        )}>
                          <Icon className="size-[16px] shrink-0" />
                        </div>
                        <span className="font-semibold text-[13px] tracking-tight">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* --- Footer Section --- */}
      <SidebarFooter className="p-4 border-t border-zinc-100 dark:border-white/5 bg-[#F4F5F7]/30 dark:bg-transparent">
        <div className={cn("flex items-center gap-2", isCollapsed ? "flex-col" : "justify-between")}>
          {/* <ModeToggle /> */}
          {!isCollapsed && (
            <button className="flex items-center gap-2 text-zinc-400 hover:text-red-500 transition-colors px-2">
              <LogOut className="size-4" />
              <span className="font-semibold text-[13px]">Logout</span>
            </button>
          )}
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}