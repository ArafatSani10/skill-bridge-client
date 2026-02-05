"use client"

import { useState } from "react";
import { Menu, Home, Info, Mail, User, X, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToogle";
import { authClient } from "@/lib/auth-client"; // Better Auth Client

import logo from "../../../public/logo.png";

const Navbar1 = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  const menu = [
    { title: "Home", url: "/", icon: Home },
    { title: "Tutors", url: "/tutors", icon: User },
    { title: "About", url: "/about", icon: Info },
    { title: "Contact", url: "/contact", icon: Mail },
  ];

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-[#00091a]/95 backdrop-blur-md h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-full relative">
          
          {/* 1. Left: Logo */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="relative z-60 group">
              <div className="relative h-40 w-52 sm:h-40 sm:w-60">
                <Image
                  src={logo}
                  alt="Skill Bridge Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* 2. Center: Desktop Navigation */}
          <nav className="hidden lg:flex justify-center items-center gap-1 bg-muted/50 dark:bg-white/5 p-1 rounded-full border dark:border-white/10">
            {menu.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "group flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-[#00baff] text-white shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Actions */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
            <ModeToggle />

            {/* Desktop Auth Logic */}
            <div className="hidden lg:flex items-center gap-3">
              {isPending ? (
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
              ) : session ? (
                /* User Dropdown when logged in */
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer size-10 border-2 border-[#00baff]/20 hover:border-[#00baff] transition-all">
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback className="bg-[#00baff] text-white">
                        {session.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 mt-2">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{session.user.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{session.user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" /> Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                /* Login/Signup when logged out */
                <>
                  <Button asChild variant="ghost" className="rounded-full font-semibold">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="rounded-2xl border px-6 shadow-lg transition-all active:scale-95 bg-[#00baff] hover:bg-[#00baff]/90 text-white">
                    <Link href="/register">Sign up</Link>
                  </Button>
                </>
              )}
            </div>
{/* Mobile Menu Toggle & User Profile Dropdown */}
            <div className="lg:hidden flex items-center gap-2">
              {session && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {/* মোবাইল প্রোফাইল ইমেজ - সাইজ বাড়িয়ে h-10 w-10 করা হয়েছে */}
                    <Avatar className="h-10 w-10 cursor-pointer border-2 border-[#00baff]/20 active:scale-95 transition-all">
                      <AvatarImage src={session.user.image || ""} />
                      <AvatarFallback className="bg-[#00baff] text-white text-xs">
                        {session.user.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  
                  {/* z-[100] দেওয়া হয়েছে যাতে এটি Sheet এর উপরে থাকে */}
                  <DropdownMenuContent align="end" className="w-56 mt-2 z-[100] shadow-xl">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{session.user.name}</span>
                        <span className="text-xs text-muted-foreground truncate">{session.user.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" /> Profile Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="text-red-500 cursor-pointer focus:bg-red-50 focus:text-red-500"
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              {/* Hamburger Menu (Sheet) */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-lg border-primary/20">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%] bg-background dark:bg-[#00091a] p-0 border-l dark:border-white/10">
                  <SheetHeader className="p-6 text-left border-b dark:border-white/10">
                    <div className="flex items-center gap-3">
                      {session ? (
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12 border-2 border-[#00baff] shadow-sm">
                            <AvatarImage src={session.user.image || ""} />
                            <AvatarFallback>{session.user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-sm leading-none mb-1">{session.user.name}</p>
                            <p className="text-xs text-muted-foreground">Welcome Back!</p>
                          </div>
                        </div>
                      ) : (
                        <p className="font-bold text-lg text-[#00baff]">Skill Bridge</p>
                      )}
                    </div>
                  </SheetHeader>

                  <div className="flex flex-col h-[calc(100vh-100px)] justify-between p-3">
                    <div className="flex flex-col gap-2">
                      {menu.map((item) => {
                        const isActive = pathname === item.url;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center gap-4 p-4 rounded-lg transition-all duration-200 border",
                              isActive
                                ? "bg-[#00baff] text-white border-[#00baff] shadow-lg"
                                : "bg-muted/30 dark:bg-white/5 border-transparent text-muted-foreground hover:border-[#00baff]/20"
                            )}
                          >
                            <Icon className={cn("size-5", isActive ? "text-white" : "text-[#00baff]")} />
                            <span className="font-bold text-sm">{item.title}</span>
                          </Link>
                        );
                      })}
                      
                      {/* মোবাইল মেনুতেও ড্যাশবোর্ড লিঙ্ক (লগইন থাকলে) */}
                      {session && (
                        <Link
                          href="/dashboard"
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-transparent text-muted-foreground hover:border-[#00baff]/20 transition-all"
                        >
                          <LayoutDashboard className="size-5 text-[#00baff]" />
                          <span className="font-bold text-sm">Dashboard</span>
                        </Link>
                      )}
                    </div>

                    <div className="flex flex-col gap-3 pb-6">
                      {session ? (
                        <Button 
                          onClick={() => {
                            setOpen(false);
                            handleLogout();
                          }} 
                          variant="destructive" 
                          className="h-14 rounded-lg text-sm font-semibold shadow-md"
                        >
                          <LogOut className="mr-2 size-5" /> Logout
                        </Button>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="h-14 rounded-lg text-sm font-semibold border-primary/20" onClick={() => setOpen(false)}>
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button asChild className="h-14 rounded-lg text-sm font-semibold bg-[#00baff] hover:bg-[#00baff]/90 text-white shadow-lg" onClick={() => setOpen(false)}>
                            <Link href="/register">Sign up</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };