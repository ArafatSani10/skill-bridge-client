// "use client"

// import * as React from "react"
// import Link from "next/link"
// import Image from "next/image"
// import { usePathname } from "next/navigation"
// import { LogOut } from "lucide-react"
// import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarGroup, SidebarGroupLabel, SidebarFooter, useSidebar } from "@/components/ui/sidebar"
// import { cn } from "@/lib/utils"

// import logo from "../../../public/logo.png"
// import { adminRoutes } from "@/routes/admin-routes"
// import { studentRoutes } from "@/routes/student-routes"
// import { tutorRoutes } from "@/routes/tutor-routes"
// import { Roles } from "@/constants/roles"

// export function AppSidebar({ user, ...props }: { user?: any } & React.ComponentProps<typeof Sidebar>) {
//   const pathname = usePathname()
//   const { state } = useSidebar()
//   const isCollapsed = state === "collapsed"

//   // রুট বের করার লজিক
//   const selectedRoutes = React.useMemo(() => {
//     if (user?.role === Roles.admin) return adminRoutes;
//     if (user?.role === Roles.tutor) return tutorRoutes;
//     if (user?.role === Roles.student) return studentRoutes;
//     return [];
//   }, [user?.role]);

//   return (
//     <Sidebar collapsible="icon" className="border-r border-zinc-100 dark:border-white/5 bg-[#F9FAFB] dark:bg-[#020817]" {...props}>
//       <SidebarHeader className="h-20 flex items-center justify-center px-4">
//         <Link href="/" className="relative flex items-center justify-center w-full">
//           <div className={cn("relative transition-all duration-300", isCollapsed ? "h-10 w-10" : "h-12 w-32")}>
//             <Image src={logo} alt="Logo" fill className="object-contain" priority />
//           </div>
//         </Link>
//       </SidebarHeader>

//       <SidebarContent className="px-3 pt-2">
//         {selectedRoutes.length > 0 ? (
//           selectedRoutes.map((group: any, index: number) => (
//             <SidebarGroup key={index}>
//               {!isCollapsed && group.title && (
//                 <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-[2px] text-zinc-400 mb-2 px-2 mt-2">
//                   {group.title}
//                 </SidebarGroupLabel>
//               )}
//               <SidebarMenu className="gap-1">
//                 {(group.item || group.items || []).map((item: any, idx: number) => {
//                   const isActive = pathname === item.url
//                   return (
//                     <SidebarMenuItem key={idx}>
//                       <SidebarMenuButton asChild tooltip={item.title} className={cn("h-10 px-3 rounded-lg transition-all duration-300 group", isActive ? "bg-white dark:bg-white/5 text-[#00baff] shadow-sm border border-zinc-200/50 dark:border-white/5" : "text-zinc-500 hover:text-[#00baff] hover:bg-zinc-200/40 dark:hover:bg-white/5")}>
//                         <Link href={item.url} className="flex items-center gap-3">
//                           <div className={cn("p-1.5 rounded-md flex items-center justify-center", isActive ? "bg-[#00baff] text-white" : "group-hover:bg-[#00baff]/10")}>
//                             {item.icon && <item.icon className="size-4 shrink-0" />}
//                           </div>
//                           {!isCollapsed && <span className="font-semibold text-[13px] tracking-tight">{item.title}</span>}
//                         </Link>
//                       </SidebarMenuButton>
//                     </SidebarMenuItem>
//                   )
//                 })}
//               </SidebarMenu>
//             </SidebarGroup>
//           ))
//         ) : (
//           <div className="p-10 text-center text-[10px] text-zinc-500">
//             No Routes! <br />
//             User: {JSON.stringify(user?.role || "Empty")}
//           </div>
//         )}
//       </SidebarContent>
//       <SidebarFooter className="p-4 border-t border-zinc-100 dark:border-white/5">
//         <button className={cn("flex items-center gap-2 text-zinc-500 hover:text-red-500 transition-colors w-full", isCollapsed ? "justify-center" : "px-2")}>
//           <LogOut className="size-4" />
//           {!isCollapsed && <span className="font-semibold text-[13px]">Logout</span>}
//         </button>
//       </SidebarFooter>
//       <SidebarRail />
//     </Sidebar>
//   )
// }


"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
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
  useSidebar // এই ইম্পোর্টটা মিস হয়েছিল
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

import logo from "../../../public/logo.png"
import { adminRoutes } from "@/routes/admin-routes"
import { studentRoutes } from "@/routes/student-routes"
import { tutorRoutes } from "@/routes/tutor-routes"
import { Roles } from "@/constants/roles"

export function AppSidebar({ user, ...props }: { user?: any } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const selectedRoutes = React.useMemo(() => {
    if (user?.role === Roles.admin) return adminRoutes;
    if (user?.role === Roles.tutor) return tutorRoutes;
    if (user?.role === Roles.student) return studentRoutes;
    return [];
  }, [user?.role]);

  return (
    <Sidebar collapsible="icon" className="border-r border-zinc-200 dark:border-white/5 bg-white dark:bg-[#020817]" {...props}>
      <SidebarHeader className="h-20 flex items-center justify-center px-6">
        <Link href="/" className="relative flex items-center justify-start w-full">
          <div className={cn("relative transition-all duration-300", isCollapsed ? "h-8 w-8" : "h-40 w-64")}>
            <Image src={logo} alt="Logo" fill className="object-contain" priority />
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-4 pt-4">
        {selectedRoutes.map((group: any, index: number) => (
          <SidebarGroup key={index} className="mb-4">
            {!isCollapsed && group.title && (
              <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-2 px-2">
                {group.title}
              </SidebarGroupLabel>
            )}
            <SidebarMenu className="gap-1.5">
              {(group.item || group.items || []).map((item: any, idx: number) => {
                const isActive = pathname === item.url
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title} 
                      className={cn(
                        "h-10 px-3 rounded-lg transition-all duration-200 group",
                        isActive 
                          ? "bg-[#00baff]/10 text-[#00baff] font-bold" 
                          : "text-zinc-500 hover:bg-zinc-50 dark:hover:bg-white/5"
                      )}
                    >
                      <Link href={item.url} className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded-md flex items-center justify-center",
                          isActive ? "bg-[#00baff] text-white" : "group-hover:text-[#00baff]"
                        )}>
                          {Icon && <Icon className="size-4 shrink-0" />}
                        </div>
                        {!isCollapsed && <span className="text-[13px]">{item.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}