"use client";

import React, { useEffect, useState } from 'react';
import { Star, MessageSquare, Calendar, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { tutorService } from '@/services/tutor.service';
import { userService } from '@/services/user.service';

export default function TutorReviews() {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTutorReviews = async () => {
            try {
                const { data: sessionData } = await userService.getSession();
                const loggedInUserId = sessionData?.user?.id;

                if (loggedInUserId) {
                    const allTutors = await tutorService.getAllTutor();
                    const currentTutor = allTutors.find((t: any) => t.user?.id === loggedInUserId || t.userId === loggedInUserId);

                    if (currentTutor && currentTutor.reviews) {
                        setReviews(currentTutor.reviews);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchTutorReviews();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-20 bg-transparent">
                <Loader2 className="size-6 animate-spin text-zinc-500" />
            </div>
        );
    }

    if (!reviews || reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 border border-zinc-200 dark:border-zinc-800 rounded-sm bg-transparent text-center">
                <MessageSquare className="size-6 text-zinc-400 mb-3" />
                <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 ">No Records Found</h3>
                <p className="text-zinc-500 text-[11px] mt-1">Review log is currently empty.</p>
            </div>
        );
    }

    const averageRating = reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length;

    return (
        <div className="space-y-4 bg-transparent">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 ">My Student Feedback</h2>
                    <p className="text-zinc-500 text-[10px] font-sans mt-0.5">TOTAL_ENTRIES: {reviews.length}</p>
                </div>
                <div className="flex items-center gap-4 bg-zinc-100/50 dark:bg-zinc-900/50 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 rounded-sm">
                    <div className="flex items-center gap-1">
                        <Star className="size-3 text-zinc-900 dark:text-zinc-100 fill-current" />
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{averageRating.toFixed(1)}</span>
                    </div>
                    <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-700" />
                    <span className="text-[9px] font-bold text-zinc-500">Avg Score</span>
                </div>
            </div>

            <div className="grid gap-2">
                {reviews.map((review) => (
                    <div
                        key={review.id || review._id}
                        className="group p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/30 transition-all duration-200"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                            <div className="flex items-center gap-3">
                                <div className="relative size-9 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shrink-0">
                                    <Image
                                        src={review.student?.user?.image || review.student?.image || "https://avatar.iran.liara.run/public"}
                                        alt=""
                                        fill
                                        className="object-cover "
                                    />
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-tight">
                                        {review.student?.user?.name || review.student?.name || "UID_UNKNOWN"}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-[9px] text-zinc-400 font-mono">
                                        <Calendar className="size-2.5" />
                                        {new Date(review.createdAt || Date.now()).toLocaleDateString('en-GB').replace(/\//g, '-')}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-2.5 ${i < review.rating ? "text-zinc-900 dark:text-zinc-100 fill-current" : "text-zinc-200 dark:text-zinc-800"}`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="border-l border-zinc-900 dark:border-zinc-100 pl-3 py-0.5">
                            <p className="text-[12px] text-zinc-600 dark:text-zinc-400 leading-snug font-medium">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}