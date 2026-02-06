"use client";

import React, { useEffect, useState } from 'react';
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import { Calendar, Clock, CreditCard, Video, LayoutGrid, Loader2 } from "lucide-react";
import Image from 'next/image';

const StudentBookingCard = ({ booking }: { booking: any }) => {
    const { tutor, slot, status } = booking;

    return (
        <div className="group p-5 border rounded-2xl bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
            <div className="flex flex-col sm:flex-row gap-5 justify-between">

                {/* Tutor Details */}
                <div className="flex gap-4">
                    <div className="relative size-14 rounded-full overflow-hidden border-2 border-zinc-50 group-hover:border-blue-100 transition-colors">
                        <Image
                            src={tutor?.user?.image || "/avatar-placeholder.png"}
                            alt={tutor?.user?.name || "Tutor"}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-white text-lg">
                            {tutor?.user?.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-zinc-500 text-xs mt-1">
                            <Video className="size-3" />
                            <span>Online Session</span>
                        </div>
                    </div>
                </div>

                {/* Schedule & Price */}
                <div className="flex flex-col gap-2 sm:items-end">
                    <div className="flex items-center gap-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        <div className="flex items-center gap-2">
                            <Calendar className="size-4 text-blue-500" />
                            <span>{new Date(slot.startTime).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex items-center gap-2 border-l pl-4">
                            <Clock className="size-4 text-blue-500" />
                            <span>{new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600 font-bold">
                        <span className="text-xs font-normal text-zinc-400">Paid:</span>
                        ৳{tutor?.pricePerHour}
                    </div>
                </div>
            </div>

            <div className="mt-5 pt-4 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <span className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${status === "CONFIRMED"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                    • {status}
                </span>

                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                    View Class Link
                </button>
            </div>
        </div>
    );
};

// --- এটি আপনার মেইন পেজ ---
export default function MyEnrolledSessions() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMySessions = async () => {
            const res = await bookingService.getMyBookings();

            if (res.success) {
                const uniqueBookings = res.data.reduce((acc: any[], current: any) => {
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
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <Loader2 className="size-10 text-blue-500 animate-spin" />
                <p className="text-zinc-500 font-medium animate-pulse">Loading your sessions...</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl py-10 px-4">
            <header className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                        My Booked Sessions
                    </h1>
                    <p className="text-zinc-500 mt-1">Check your upcoming classes and tutor details</p>
                </div>
                <LayoutGrid className="size-8 text-zinc-200" />
            </header>

            {bookings.length === 0 ? (
                <div className="bg-zinc-50 border-2 border-dashed rounded-3xl py-20 text-center">
                    <div className="bg-white size-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Calendar className="size-8 text-zinc-300" />
                    </div>
                    <h3 className="text-zinc-900 font-bold text-lg">No sessions found</h3>
                    <p className="text-zinc-500 text-sm max-w-xs mx-auto mt-1">
                        You haven't booked any tutors yet.
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