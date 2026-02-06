"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { bookingService } from "@/services/booking.service";
import { toast } from "sonner";
import { Video, BookOpen, Clock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";

interface Slot {
  id: string;
  startTime: string;
  isBooked: boolean;
}

export default function BookingSection({ tutorId, slots: initialSlots, price }: { tutorId: string; slots: Slot[]; price: number }) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState<Slot[]>(initialSlots);
  const router = useRouter();

  const handleBooking = async () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot first!");
      return;
    }

    setLoading(true);
    const res = await bookingService.createBooking({ tutorId, slotId: selectedSlot });

    if (res.success) {
      toast.success("Booking confirmed successfully!");
      
      setSlots((prev) =>
        prev.map((s) => (s.id === selectedSlot ? { ...s, isBooked: true } : s))
      );
      setSelectedSlot(null);

      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } else {
      toast.error(res.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-3xl font-semibold">৳{price}</span>
        <span className="text-zinc-400 text-[13px]">/hour</span>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-400">
          <Video className="size-4 text-zinc-400" /> 
          <span className="font-medium">1-on-1 Online Class</span>
        </div>
        <div className="flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-400">
          <BookOpen className="size-4 text-zinc-400" /> 
          <span className="font-medium">Custom Study Plan</span>
        </div>
        <div className="flex items-center gap-3 text-[13px] text-zinc-600 dark:text-zinc-400">
          <Clock className="size-4 text-zinc-400" /> 
          <span className="font-medium">60 Min Duration</span>
        </div>
      </div>

      <div className="space-y-3 border-t border-zinc-100 dark:border-zinc-800 pt-6 mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Available Slots</p>
          {slots.some(s => !s.isBooked) && (
            <span className="size-2 bg-emerald-500 rounded-full animate-pulse" />
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          {slots.length > 0 ? (
            slots.map((slot) => (
              <button
                key={slot.id}
                disabled={slot.isBooked || loading}
                onClick={() => setSelectedSlot(slot.id)}
                className={`p-2 text-[11px] font-semibold border rounded transition-all 
                  ${slot.isBooked 
                    ? "bg-zinc-50 text-zinc-300 border-zinc-100 cursor-not-allowed" 
                    : selectedSlot === slot.id 
                      ? "border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20" 
                      : "border-zinc-200 dark:border-zinc-800 hover:border-blue-500 hover:text-blue-500"
                  }`}
              >
                {new Date(slot.startTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </button>
            ))
          ) : (
            <p className="col-span-2 text-center text-[11px] text-zinc-400 italic">No slots found.</p>
          )}
        </div>
      </div>

      <Button
        onClick={handleBooking}
        disabled={loading || !selectedSlot}
        className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[13px] shadow-sm transition-all"
      >
        {loading ? "Processing..." : "Confirm Booking"}
      </Button>

      <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-zinc-400 pt-4 border-t border-zinc-50 dark:border-zinc-900">
        <Shield className="size-3" />
        <span className="font-medium">Secure checkout protected by SSL</span>
      </div>
    </div>
  );
}