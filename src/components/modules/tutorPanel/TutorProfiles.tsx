"use client";

import React, { useEffect, useState } from 'react';
import { statsService } from "@/services/stats.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import {
    User, Mail, ShieldCheck, Camera, Loader2, Settings,
    ArrowRight, BookOpen, Star, TrendingUp, Award, Zap
} from "lucide-react";
import Image from 'next/image';
import ProfileEditDrawer from "@/components/shared/ProfileEditDrawer";
import Link from 'next/link';

export default function TutorProfiles() {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState<any>(null);
    const [tutorCategories, setTutorCategories] = useState<any[]>([]); 
    const [reviewCount, setReviewCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        const fetchAllProfileData = async () => {
            try {
                const [sessionRes, statsRes] = await Promise.all([
                    userService.getSession(),
                    statsService.getTutorStats()
                ]);

                const loggedInUser = sessionRes?.data?.user;
                if (loggedInUser) {
                    setUser(loggedInUser);
                    setStats(statsRes?.data || null);

                    const allTutors = await tutorService.getAllTutor();
                    const currentTutor = allTutors.find(
                        (t: any) => t.user?.id === loggedInUser.id || t.userId === loggedInUser.id
                    );

                    if (currentTutor) {
                        setReviewCount(currentTutor.reviews?.length || 0);
                        setTutorCategories(currentTutor.categories || []);
                    }
                }
            } catch (error) {
                console.error("Profile Data Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProfileData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center bg-transparent">
                <Loader2 className="animate-spin size-5 text-[#00baff]" />
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto space-y-8 animate-in fade-in duration-700 bg-transparent font-sans">

            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/40 dark:bg-zinc-900/20 backdrop-blur-md">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                        <div className="size-28 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex items-center justify-center shadow-2xl">
                            {user?.image ? (
                                <Image src={user.image} alt="avatar" width={112} height={112} className="object-cover" />
                            ) : (
                                <User className="size-12 text-zinc-400" />
                            )}
                        </div>
                        <button
                            onClick={() => setIsDrawerOpen(true)}
                            className="absolute -bottom-2 -right-2 p-2.5 bg-[#00baff] text-white rounded-lg hover:scale-110 transition-all shadow-lg border-2 border-white dark:border-zinc-900"
                        >
                            <Camera className="size-4" />
                        </button>
                    </div>

                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tighter">
                                {user?.name}
                            </h2>
                            <Award className="size-6 text-amber-500" />
                        </div>
                        <p className="text-zinc-500 font-medium text-sm mt-1">{user?.email}</p>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="px-3 py-1 bg-[#00baff]/10 text-[#00baff] text-[10px] font-bold uppercase rounded-lg tracking-widest border border-[#00baff]/20">
                                {user?.role}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-bold border-l border-zinc-200 dark:border-zinc-800 pl-3">
                                <Star className="size-3.5 text-amber-500 fill-amber-500" />
                                {stats?.averageRating?.toFixed(1) || "0.0"} ({reviewCount} Reviews)
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                   
                    <button
                        onClick={() => setIsDrawerOpen(true)}
                        className="px-8 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-bold rounded-lg  hover:opacity-90 shadow-xl"
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

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"> 

                {/* Left Box: Professional Identity */}
                <div className="lg:col-span-8">
                    <div className="h-full border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/30 dark:bg-zinc-900/10 backdrop-blur-sm overflow-hidden flex flex-col"> {/* h-full এবং flex-col যোগ করা হয়েছে */}
                        <div className="px-8 py-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-800/20">
                            <div className="flex items-center gap-3">
                                <BookOpen className="size-5 text-[#00baff]" />
                                <h3 className="text-sm font-black text-zinc-800 dark:text-zinc-200 ">Professional Identity</h3>
                            </div>
                            <Zap className="size-4 text-amber-500 fill-amber-500" />
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12 flex-grow"> 
                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-zinc-400 ">Full Name</p>
                                <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">{user?.name}</p>
                            </div>

                            <div className="space-y-3">
                                <p className="text-[10px] font-bold text-zinc-400 ">Tutor Expertise</p>
                                <div className="flex flex-wrap gap-2">
                                    {tutorCategories.length > 0 ? (
                                        tutorCategories.map((cat: any) => (
                                            <span key={cat.id} className="px-2.5 py-1 bg-[#00baff]/10 dark:bg-zinc-800 rounded text-[11px] font-bold text-[#00baff] dark:text-[#00baff] border border-[#00baff]/20">
                                                {cat.name}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-sm font-bold text-zinc-500 italic">No categories assigned</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-zinc-400 ">Total Students</p>
                                <p className="text-base font-bold text-zinc-800 dark:text-zinc-100">
                                    {stats?.totalSessions || 0} <span className="text-xs text-zinc-500 font-medium ml-1">Learners</span>
                                </p>
                            </div>

                            <div className="space-y-2">
                                <p className="text-[10px] font-bold text-zinc-400 ">Verification Status</p>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="size-4 text-emerald-500" />
                                    <span className="text-sm font-bold text-emerald-500 uppercase tracking-tight">Identity Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="h-full p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white/30 dark:bg-zinc-900/10 backdrop-blur-sm flex flex-col justify-between"> {/* h-full এবং justify-between যোগ করা হয়েছে */}
                        <div>
                            <h4 className="text-[10px] font-black text-zinc-400 mb-6 flex items-center gap-2 ">
                                <TrendingUp className="size-4" /> Insight
                            </h4>
                            <div className="space-y-4">
                                <p className="text-xs text-zinc-500 font-medium leading-relaxed">
                                    You have <span className="dark:text-zinc-200 font-bold">{reviewCount} student feedbacks</span>. Having expertise in <span className="text-[#00baff] font-bold">{tutorCategories[0]?.name || 'multiple subjects'}</span> helps you get more bookings.
                                </p>
                            </div>
                        </div>

                        <Link href="/tutor-dashboard" className="mt-8">
                            <button className="w-full py-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-black  hover:bg-[#00baff] hover:text-white transition-all flex items-center justify-center gap-2">
                                View Analytics <ArrowRight className="size-3" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}