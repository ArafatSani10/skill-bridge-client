"use client";

import React, { useEffect, useState } from 'react';
import { userService } from "@/services/user.service";
import {
  User,
  Mail,
  ShieldCheck,
  Calendar,
  Globe,
  Camera,
  Loader2,
  MapPin,
  Clock,
  Settings,
  CreditCard,
  Bell,
  Activity,
  ArrowRight,
  Zap
} from "lucide-react";
import Image from 'next/image';
import ProfileEditDrawer from "@/components/shared/ProfileEditDrawer"; 

export default function StudentProfiles() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userService.getSession();
        if (res?.data?.user) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Profile Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center bg-transparent">
        <Loader2 className="animate-spin size-5 text-[#00baff]" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto space-y-8 animate-in fade-in duration-500 bg-transparent font-sans">

      {/* Top Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/40 dark:bg-zinc-900/20 backdrop-blur-sm shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative group">
            <div className="size-28 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center shadow-md">
              {user?.image ? (
                <Image src={user.image} alt="profile" width={112} height={112} className="object-cover" />
              ) : (
                <User className="size-12 text-zinc-400" />
              )}
            </div>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="absolute -bottom-2 -right-2 p-2.5 bg-[#00baff] text-white rounded-lg shadow-lg hover:scale-105 transition-all border-2 border-white dark:border-zinc-900"
            >
              <Camera className="size-4" />
            </button>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                {user?.name || "Student"}
              </h2>
              <ShieldCheck className="size-5 text-emerald-500" />
            </div>
            <p className="text-zinc-500 font-medium text-sm mt-1">{user?.email}</p>
            <div className="flex items-center gap-3 mt-4">
              <span className="px-3 py-1 bg-[#00baff]/10 text-[#00baff] text-[10px] font-black uppercase rounded-lg border border-[#00baff]/20 tracking-widest">
                {user?.role || "Student"}
              </span>
              
            </div>
          </div>
        </div>

        <div className="flex gap-3">
         
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-black rounded-lg  hover:opacity-90 shadow-xl transition-all"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <ProfileEditDrawer
        user={user}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onUpdateSuccess={(updatedUser) => setUser(updatedUser)} 
      />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Account Details Box */}
        <div className="lg:col-span-8">
          <div className="h-full border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/30 dark:bg-zinc-900/10 backdrop-blur-sm overflow-hidden flex flex-col shadow-sm">
            <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/20">
              <div className="flex items-center gap-3">
                <User className="size-5 text-[#00baff]" />
                <h3 className="text-sm font-black text-zinc-800 dark:text-zinc-200 ">Personal Information</h3>
              </div>
              <Zap className="size-4 text-amber-500 fill-amber-500" />
            </div>

            <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 flex-grow">
              <div className="space-y-1.5">
                <p className="text-xs font-black text-zinc-400 ">Legal Name</p>
                <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">{user?.name}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black text-zinc-400 ">Primary Email</p>
                <p className="text-base font-bold text-zinc-800 dark:text-zinc-200">{user?.email}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-black text-zinc-400 ">Account Status</p>
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm font-black text-emerald-500 ">Active Learner</p>
                </div>
              </div>
              
            </div>

            
          </div>
        </div>

        {/* Sidebar Activity Box */}
        <div className="lg:col-span-4 h-full">
          <div className="h-full p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/30 dark:bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between shadow-sm">
            <div>
              <h3 className="text-sm font-black text-zinc-400  mb-8 flex items-center gap-2">
                <Activity className="size-4" /> Platform Activity
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-2 uppercase">
                    <Calendar className="size-3.5" /> Joined
                  </span>
                  <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }) : "2024"}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-3">
                  <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-2 uppercase">
                    <Clock className="size-3.5" /> Activity
                  </span>
                  <span className="text-xs font-black text-emerald-500 uppercase">Just now</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-500 flex items-center gap-2 uppercase">
                    <Bell className="size-3.5" /> Alerts
                  </span>
                  <span className="text-xs font-black text-zinc-800 dark:text-zinc-200">System Enabled</span>
                </div>
              </div>

              
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}