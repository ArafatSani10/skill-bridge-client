"use client";

import React, { useEffect, useState } from 'react';
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import { Calendar, Clock, Video, LayoutGrid, Loader2, Sparkles, Inbox } from "lucide-react";
import Image from 'next/image';

const StudentBookingCard = ({ booking }: { booking: any }) => {
    const { tutor, slot, status } = booking;

    return (
        <div className="group relative p-6 border border-zinc-200 dark:border-zinc-800 rounded-3xl bg-white dark:bg-zinc-950 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-500 overflow-hidden">
            <div className="relative flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex gap-5 items-center">
                    <div className="relative size-16 rounded-2xl overflow-hidden ring-4 ring-zinc-50 dark:ring-zinc-900 group-hover:ring-blue-50 transition-all">
                        <Image
                            src={tutor?.user?.image || "/avatar-placeholder.png"}
                            alt={tutor?.user?.name || "Tutor"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white text-xl tracking-tight">
                            {tutor?.user?.name}
                        </h3>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs mt-1.5 font-medium bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-md w-fit">
                            <Video className="size-3.5 text-blue-500" />
                            <span>1-on-1 Online Class</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 md:flex-col md:items-end w-full md:w-auto">
                    <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-3 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                            <Calendar className="size-4 text-blue-500" />
                            <span>{new Date(slot.startTime).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex items-center gap-2 border-l border-zinc-200 dark:border-zinc-700 pl-4 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                            <Clock className="size-4 text-blue-500" />
                            <span>{new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-zinc-900 dark:text-white font-black text-lg">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">Paid:</span>
                        ৳{tutor?.pricePerHour}
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${status === "CONFIRMED"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10"
                        : "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10"
                    }`}>
                    • {status}
                </span>

                <button className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                    View Class Link
                </button>
            </div>
        </div>
    );
};

export default function MyEnrolledSessions() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMySessions = async () => {
            const res = await bookingService.getMyBookings();

            if (res.success) {
                const activeBookings = res.data.filter((booking: any) => booking.status !== "CANCELLED");

                const uniqueBookings = activeBookings.reduce((acc: any[], current: any) => {
                    const isDuplicate = acc.find(item => item.slotId === current.slotId);
                    if (!isDuplicate) {
                        return acc.concat([current]);
                    } else {
                        return acc;
                    }
                }, []);

                setBookings(uniqueBookings);
            } else {
                toast.error("Failed to load your sessions");
            }
            setLoading(false);
        };

        fetchMySessions();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4">
                <Loader2 className="size-12 text-blue-500 animate-spin" />
                <p className="text-zinc-500 font-bold text-sm tracking-widest uppercase animate-pulse">Loading Sessions...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl  py-12 px-6">
            <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
                        <Sparkles className="size-4" /> Learning Hub
                    </div>
                    <h1 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
                        My Booked <span className="text-blue-600">Sessions</span>
                    </h1>
                    <p className="text-zinc-500 mt-2 font-medium">Manage your learning journey and upcoming live classes.</p>
                </div>
                <LayoutGrid className="size-10 text-zinc-200 dark:text-zinc-800 hidden md:block" />
            </header>

            {bookings.length === 0 ? (
                <div className="bg-zinc-50 dark:bg-zinc-900/50 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] py-24 text-center">
                    <div className="bg-white dark:bg-zinc-900 size-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm rotate-6">
                        <Inbox className="size-10 text-zinc-300" />
                    </div>
                    <h3 className="text-zinc-900 dark:text-white font-bold text-2xl">No Active Sessions</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-2">
                        You haven't booked any tutors yet or your sessions have been cancelled.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <StudentBookingCard key={booking.id} booking={booking} />
                    ))}
                </div>
            )}
        </div>
    );
}