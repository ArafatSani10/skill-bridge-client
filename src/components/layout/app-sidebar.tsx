"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LogOut, LayoutDashboard, GraduationCap, Users, CalendarCheck, UserCheck, CreditCard } from "lucide-react"

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
// import { ModeToggle } from "./ModeToogle" 
import logo from "../../../public/logo.png"

const routes = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Tutors", url: "/admin/tutors", icon: GraduationCap },
  { title: "Students List", url: "/admin/students", icon: Users },
  { title: "Bookings", url: "/admin/bookings", icon: CalendarCheck },
  { title: "Approvals", url: "/admin/approvals", icon: UserCheck },
  { title: "Payments", url: "/admin/payments", icon: CreditCard },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-zinc-100 dark:border-white/5 bg-[#F9FAFB] dark:bg-[#020817]" 
      {...props}
    >
      {/* --- Logo Section: Space Fixed --- */}
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

      {/* --- Main Navigation --- */}
      <SidebarContent className="px-3 pt-2">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-400 mb-3 px-2">
              Main Menu
            </SidebarGroupLabel>
          )}
          <SidebarMenu className="gap-1.5">
            {routes.map((item) => {
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
                      {/* Icon Box like your image */}
                      <div className={cn(
                        "p-1.5 rounded-md transition-all duration-300 flex items-center justify-center",
                        isActive ? "bg-[#00baff] text-white" : "group-hover:bg-[#00baff]/10 group-hover:text-[#00baff]"
                      )}>
                        <Icon className="size-[16px] shrink-0" />
                      </div>
                      <span className="font-semibold text-[13px] tracking-tight">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* --- Footer: Controls --- */}
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