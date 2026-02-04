"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Home, Users, Info, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import LogoImg from "../../../public/logo.png";
import { ModeToggle } from "./ModeToogle";

// Icons সহ মেনু আইটেম
const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Tutors", url: "/tutors", icon: Users },
  { title: "About", url: "/about", icon: Info },
  { title: "Contact", url: "/contact", icon: Mail },
];

const Navbar1 = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center pr-10 pointer-events-none transition-all duration-300">
        <header
          className={cn(
            "w-full max-w-7xl flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-full ",
            isScrolled
              ? "h-14 mt-2 bg-white/80 dark:bg-[#00091a]/80 backdrop-blur-md shadow-md border border-zinc-200/50 dark:border-white/10"
              : "h-20 mt-0 bg-transparent border-transparent"
          )}
        >
          <Link href="/" className="relative flex items-center shrink-0 h-full">
            <div className={cn(
              "relative transition-all duration-500 ease-in-out",
              isScrolled ? "h-28 w-44 -mt-2" : "h-36 w-56 -mt-4"
            )}>
              <Image
                src={LogoImg}
                alt="Logo"
                fill
                priority
                className="mt-3 object-cover"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-white/5 p-1 rounded-full border border-zinc-200/50 dark:border-white/10">
            {menuItems.map((item) => {
              const isActive = pathname === item.url;
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.url}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium transition-all rounded-full relative flex items-center gap-2",
                    isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                  )}
                >
                  <Icon className={cn("size-4 relative z-10", isActive ? "text-primary" : "text-zinc-400")} />
                  <span className="relative z-10">{item.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavHighlight"
                      className="absolute inset-0 bg-white dark:bg-[#000d26] shadow-sm rounded-full border border-zinc-200/50 dark:border-white/10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="sm" className="text-sm font-semibold rounded-full hover:bg-zinc-100 dark:hover:bg-white/5">
              Login
            </Button>
            <Button size="sm" className="text-sm font-bold rounded-full px-6 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-lg active:scale-95 transition-transform">
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(true)}
            className="md:hidden p-2 bg-white/50 dark:bg-[#00091a] rounded-full border border-zinc-200/50 dark:border-white/10"
          >
            <Menu className="size-5 text-zinc-700 dark:text-zinc-300" />
          </button>
        </header>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[100%] max-w-[400px] bg-white dark:bg-[#00091a] shadow-2xl z-[70] md:hidden flex flex-col border-l dark:border-white/10"
            >
              <div className="p-6 flex items-center justify-between border-b border-zinc-100 dark:border-white/10">
                <span className="font-bold text-lg dark:text-white">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-full transition-colors">
                  <X className="size-6 text-zinc-500" />
                </button>
              </div>

              <div className="flex flex-col gap-2 p-6 overflow-y-auto">
                {menuItems.map((item, idx) => {
                  const isActive = pathname === item.url;
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                    >
                      <Link
                        href={item.url}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-semibold transition-all",
                          isActive
                            ? "bg-zinc-900 text-white shadow-xl dark:bg-white dark:text-zinc-900"
                            : "hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400"
                        )}
                      >
                        <Icon className="size-5" />
                        {item.title}
                        <ChevronRight className={cn("ml-auto size-5 opacity-50", isActive && "opacity-100")} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-6 space-y-3 bg-zinc-50 dark:bg-white/5 border-t dark:border-white/10">
                <Button variant="outline" className="w-full h-12 rounded-xl text-sm font-bold">
                  Login
                </Button>
                <Button className="w-full h-12 rounded-xl text-sm font-bold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-xl">
                  Get Started Free
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export { Navbar1 };