"use client";

import React, { useEffect, useState } from 'react';
import { tutorService } from "@/services/tutor.service";
import { bookingService } from "@/services/booking.service";
import {
  Users,
  Mail,
  Calendar,
  Search,
  MoreVertical,
  GraduationCap,
  Loader2,
  CheckCircle2,
  XCircle
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export default function MyStudents() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await tutorService.getMyStudents();
        setBookings(res?.data || res || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    try {
      const res = await bookingService.updateBookingStatus(bookingId, newStatus);
      if (res.success) {
        toast.success(`Booking ${newStatus.toLowerCase()} successfully`);

        if (newStatus === "CANCELLED") {
          setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        } else {
          setBookings((prev) =>
            prev.map((b) => b.id === bookingId ? { ...b, status: newStatus } : b)
          );
        }
      } else {
        toast.error(res.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setActiveMenu(null);
    }
  };

  const filteredBookings = bookings.filter((item: any) =>
    item.student?.name?.toLowerCase().includes(search.toLowerCase()) ||
    item.student?.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin size-8 text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-10 px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <GraduationCap className="size-6 text-zinc-500" />
            My Students
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Total {bookings.length} active enrollments found.</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 text-sm border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900/50 outline-none focus:ring-1 focus:ring-zinc-400 w-full md:w-72 transition-all"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm text-zinc-400">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-800">
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Student Info</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500">Enrollment Date</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((item: any) => (
                  <tr key={item.id} className="hover:bg-zinc-50/30 dark:hover:bg-zinc-900/10 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 relative overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm">
                          {item.student?.image ? (
                            <Image
                              src={item.student.image}
                              alt={item.student.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full font-bold text-zinc-400 text-zinc-100">
                              {item.student?.name?.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">{item.student?.name}</span>
                          <span className="text-xs text-zinc-500 flex items-center gap-1">
                            <Mail className="size-3" /> {item.student?.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${item.status === 'CONFIRMED'
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10'
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-500/10'
                        }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-3.5 text-zinc-400" />
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button
                        onClick={() => setActiveMenu(activeMenu === item.id ? null : item.id)}
                        className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-all"
                      >
                        <MoreVertical className="size-4" />
                      </button>

                      {activeMenu === item.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setActiveMenu(null)}
                          ></div>
                          <div className="absolute right-6 top-12 z-20 w-40 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl py-1.5 animate-in fade-in zoom-in duration-200">
                            <button
                              onClick={() => handleStatusUpdate(item.id, 'CONFIRMED')}
                              className="w-full px-3 py-2 text-left text-[11px] font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-emerald-600 flex items-center gap-2"
                            >
                              <CheckCircle2 className="size-3.5" /> Confirm Student
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(item.id, 'CANCELLED')}
                              className="w-full px-3 py-2 text-left text-[11px] font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 text-red-600 flex items-center gap-2"
                            >
                              <XCircle className="size-3.5" /> Cancel & Remove
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Users className="size-10 text-zinc-200" />
                      <p className="text-sm text-zinc-400 font-medium">No students found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}