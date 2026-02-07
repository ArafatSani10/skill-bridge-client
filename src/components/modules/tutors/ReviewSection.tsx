"use client";

import React, { useState } from 'react';
import { Star, Send, Loader2, MessageSquareQuote } from 'lucide-react';
import { reviewService } from '@/services/review.service';
import { toast } from 'sonner';

interface ReviewProps {
  tutorId: string;
  bookingId: string;
  onSuccess?: () => void;
}

export default function ReviewSection({ tutorId, bookingId, onSuccess }: ReviewProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bookingId || bookingId === "") {
      return toast.error("You can only review sessions you have successfully booked.");
    }

    if (rating === 0) return toast.error("Please select a rating");
    if (comment.trim().length < 5) return toast.error("Please write a bit more in your comment");

    setIsSubmitting(true);

    try {
      const res = await reviewService.createReview({
        tutorId,
        bookingId,
        rating,
        comment
      });

      if (res.success) {
        toast.success("Review submitted successfully!");
        setRating(0);
        setComment("");
        if (onSuccess) onSuccess();
      } else {
        toast.error(res.message || "Failed to submit review");
      }
    } catch (error: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-sans w-full p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-transparent shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-sm bg-zinc-100 dark:bg-transparent text-zinc-600 dark:text-zinc-400">
          <MessageSquareQuote className="size-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">Add a Review</h2>
          <p className="text-zinc-500 text-sm font-medium">Share your experience with this mentor</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center p-6 rounded-sm bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50">
          <span className="text-lg font-bold  text-zinc-400 mb-4">Tap to Rate</span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="transition-all duration-200 transform hover:scale-110"
              >
                <Star
                  className={`size-8 ${(hover || rating) >= star
                    ? "fill-orange-400 text-orange-400"
                    : "text-zinc-200 dark:text-zinc-800"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your feedback here..."
            className="w-full min-h-[120px] p-5 rounded-sm bg-transparent border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-zinc-500/10 focus:border-zinc-400 outline-none transition-all text-zinc-800 dark:text-zinc-200 text-sm placeholder:text-zinc-400"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {isSubmitting ? (
            <Loader2 className="size-5 animate-spin" />
          ) : (
            <>
              Submit Feedback
              <Send className="size-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}