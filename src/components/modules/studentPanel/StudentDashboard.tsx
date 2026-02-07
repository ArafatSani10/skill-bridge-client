"use client";

import React, { useEffect, useState } from 'react';
import { bookingService } from "@/services/booking.service";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import { categoryService } from "@/services/category.service";
import {
    BookOpen,
    Star,
    LayoutDashboard,
    TrendingUp,
    Activity,
    ArrowRight,
    User,
    Loader2,
    CalendarCheck,
    MessageSquare
} from "lucide-react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import Image from 'next/image';

export default function StudentDashboard() {
    const [sessionCount, setSessionCount] = useState(0);
    const [myReviews, setMyReviews] = useState<any[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [bookingRes, sessionRes, tutorRes, categories] = await Promise.all([
                    bookingService.getMyBookings(),
                    userService.getSession(),
                    tutorService.getAllTutor(),
                    categoryService.getAllCategories()
                ]);

                const loggedInUser = sessionRes?.data?.user;
                setCurrentUser(loggedInUser);
                const loggedInUserId = loggedInUser?.id || loggedInUser?._id;

                if (bookingRes.success) {
                    const activeBookings = bookingRes.data.filter((b: any) => b.status !== "CANCELLED");
                    const uniqueBookings = activeBookings.reduce((acc: any[], current: any) => {
                        const isDuplicate = acc.find(item => item.slotId === current.slotId);
                        if (!isDuplicate) return acc.concat([current]);
                        return acc;
                    }, []);
                    setSessionCount(uniqueBookings.length);
                }

                if (loggedInUserId && tutorRes) {
                    const extractedReviews: any[] = [];
                    const tutorsList = Array.isArray(tutorRes) ? tutorRes : (tutorRes.data || []);

                    tutorsList.forEach((tutor: any) => {
                        if (tutor.reviews && Array.isArray(tutor.reviews)) {
                            tutor.reviews.forEach((rev: any) => {
                                const reviewerId = rev.userId || rev.studentId || rev.user?._id || rev.user?.id;

                                if (reviewerId === loggedInUserId) {
                                    const categoryObj = categories.find((c: any) => c._id === tutor.categoryId || c.id === tutor.categoryId);

                                    extractedReviews.push({
                                        ...rev,
                                        tutorName: tutor.user?.name || tutor.name || "Guest",
                                        tutorImage: tutor.user?.image || tutor.image ||  "https://plus.unsplash.com/premium_photo-1738980401922-70995a1b6ade?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                        tutorEmail: tutor.user?.email || "Guest@bridge.com",
                                        tutorCategory: categoryObj?.name || "Guest Expert",
                                    });
                                }
                            });
                        }
                    });
                    setMyReviews(extractedReviews);
                }
            } catch (error) {
                console.error("Dashboard Sync Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center bg-transparent">
                <Loader2 className="animate-spin size-5 text-zinc-500" />
            </div>
        );
    }

    const chartData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month, index) => ({
        name: month,
        sessions: index === new Date().getMonth() ? sessionCount : 0
    }));

    return (
        <div className="space-y-8 bg-transparent animate-in fade-in duration-700 font-sans">
            <header className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                        <LayoutDashboard className="size-5 text-zinc-600" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 leading-none">Student Dashboard</h1>
                        <p className="text-sm text-zinc-500 mt-1.5 font-medium">Monitoring academic interactions</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm group hover:border-[#00baff]/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-sm">
                            <CalendarCheck className="size-5 text-[#00baff]" />
                        </div>
                        <TrendingUp className="size-4 text-emerald-500" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-500">Active Bookings</p>
                    <h3 className="text-3xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">{sessionCount}</h3>
                </div>

                <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm group hover:border-amber-500/40 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-sm">
                            <MessageSquare className="size-5 text-amber-500" />
                        </div>
                        <Activity className="size-4 text-zinc-300" />
                    </div>
                    <p className="text-sm font-semibold text-zinc-500">Reviews Given</p>
                    <h3 className="text-3xl font-bold mt-1 text-zinc-900 dark:text-zinc-100">{myReviews.length}</h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="lg:col-span-2 p-6 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                    <div className="flex items-center gap-2 mb-10">
                        <TrendingUp className="size-4 text-zinc-400" />
                        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Monthly Engagement</h4>
                    </div>
                    <div className="h-[280px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00baff" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#00baff" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888810" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #e4e4e7' }} />
                                <Area type="monotone" dataKey="sessions" stroke="#00baff" strokeWidth={2} fillOpacity={1} fill="url(#colorSessions)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 px-1">
                        <Star className="size-4 text-amber-500" />
                        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-200">Recent Feedback</h4>
                    </div>
                    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1 scrollbar-hide">
                        {myReviews.map((review, idx) => (
                            <div key={idx} className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-transparent group hover:border-[#00baff]/30 transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="size-8 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center shrink-0">
                                            {currentUser?.image ? (
                                                <Image src={currentUser.image} alt="me" width={32} height={32} className="object-cover" />
                                            ) : (
                                                <User className="size-4 text-zinc-400" />
                                            )}
                                        </div>
                                        <div className="hidden sm:block">
                                            <p className="text-[10px] font-bold truncate w-16 text-zinc-700 dark:text-zinc-300">
                                                {currentUser?.name?.split(' ')[0] || "Student"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-1 px-2">
                                        <div className="h-[1px] bg-zinc-100 dark:bg-zinc-800 w-full relative">
                                            <ArrowRight className="size-3 text-[#00baff] absolute -top-[5.5px] left-1/2 -translate-x-1/2 bg-white dark:bg-zinc-950 px-0.5 rounded-full" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 truncate w-20">{review.tutorName}</p>
                                            <p className="text-[8px] font-medium text-[#00baff] truncate w-20">{review.tutorEmail}</p>
                                        </div>
                                        <div className="size-8 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden flex items-center justify-center shrink-0">
                                            {review.tutorImage ? (
                                                <Image src={review.tutorImage} alt="t" width={32} height={24} className="object-cover" />
                                            ) : (
                                                <span className="text-[10px] font-bold text-zinc-400">{review.tutorName[0]}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 pt-3 border-t border-zinc-50 dark:border-zinc-800/50">
                                    <div className="flex items-center gap-0.5 mb-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`size-2.5 ${i < review.rating ? 'fill-amber-500 text-amber-500' : 'text-zinc-200'}`} />
                                        ))}
                                    </div>
                                    <p className="text-[11px] font-medium text-zinc-500 italic leading-relaxed">"{review.comment}"</p>
                                </div>
                            </div>
                        ))}
                        {myReviews.length === 0 && (
                            <div className="py-12 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-sm text-center">
                                <p className="text-xs font-semibold text-zinc-400">No review activity found</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}