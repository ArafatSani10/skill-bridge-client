"use client"

import { useState } from "react";
import { Menu, Home, Info, Mail, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  // SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./ModeToogle";

import logo from "../../../public/logo.png";

const Navbar1 = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const menu = [
    { title: "Home", url: "/", icon: Home },
    { title: "Tutors", url: "/tutors", icon: User },
    { title: "About", url: "/about", icon: Info },
    { title: "Contact", url: "/contact", icon: Mail },
  ];

  return (
    <section className="sticky top-0 z-50 w-full border-b bg-background/95 dark:bg-[#00091a]/95 backdrop-blur-md h-16 flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">

        {/* --- Desktop & Mobile Wrapper --- */}
        <div className="flex items-center justify-between h-full relative">

          {/* 1. Left: Logo (Desktop & Mobile) */}
          <div className="flex-1 flex items-center">
            <Link href="/" className="relative z-60
 group">
              <div className="relative h-40 w-60">
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
                      ? "bg-[#00baff] text-primary-foreground shadow-md"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="size-4" />
                  {item.title}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Desktop Actions & Mobile Menu Toggle */}
          <div className="flex-1 flex justify-end items-center gap-2 sm:gap-3">
            {/* Theme Toggle (Visible on all screens) */}
            <ModeToggle />

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button asChild variant="ghost" className="rounded-full font-semibold">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-2xl border px-6 shadow-lg  transition-all active:scale-95">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>

            {/* Mobile Sheet (Menu) Trigger */}
            <div className="lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-lg border-primary/20">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85%]  bg-background dark:bg-[#00091a] p-0 border-l dark:border-white/10">

                  {/* Mobile Menu Header */}
                  <SheetHeader className="p-6 text-left border-b dark:border-white/10">

                  </SheetHeader>

                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col h-[calc(100vh-180px)] justify-between p-3">
                    <div className="flex flex-col gap-3">
                      {menu.map((item) => {
                        const isActive = pathname === item.url;
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.title}
                            href={item.url}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "flex items-center justify-between group p-4 rounded-lg transition-all duration-200 border",
                              isActive
                                ? "bg-primary text-primary-foreground border-primary shadow-lg"
                                : "bg-muted/30 dark:bg-white/5 border-transparent text-muted-foreground hover:border-primary/20 hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-4">
                              <Icon className={cn("size-5", isActive ? "text-primary-foreground" : "text-primary")} />
                              <span className="font-bold text-sm">{item.title}</span>
                            </div>
                            {/* <ChevronRight className={cn("size-5 transition-transform", isActive ? "rotate-90" : "opacity-50")} /> */}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Mobile Auth Buttons */}
                    <div className="flex flex-col gap-3">
                      <Button asChild variant="outline" className="h-14 rounded-lg text-sm font-semibold border-primary/20" onClick={() => setOpen(false)}>
                        <Link href="/login">Login</Link>
                      </Button>
                      <Button asChild className="h-14 rounded-lg text-sm font-semibold bg-[#00baff]" onClick={() => setOpen(false)}>
                        <Link href="/signup">Sign up</Link>
                      </Button>
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