"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Quote, Star, User } from "lucide-react";

export default function Testimonials({ reviews }: { reviews: any[] }) {
  return (
    <section className="py-24 border-t border-zinc-100 dark:border-zinc-800">
      <div className="mb-14">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          What our students <span className="text-[#00baff]">say</span>
        </h2>
        <p className="text-zinc-500 text-sm mt-2 font-medium">
          Verified feedback from our global learning community.
        </p>
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        speed={800} 
        autoplay={{ 
          delay: 5000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        grabCursor={true} 
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-16 !overflow-visible"
      >
        {reviews?.map((review) => (
          <SwiperSlide key={review._id} className="h-full">
            <div className="select-text cursor-auto p-8 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 flex flex-col h-full space-y-6 transition-colors hover:border-zinc-300 dark:hover:border-zinc-700">
              
              <div className="flex justify-between items-start">
                <Quote className="size-8 text-[#00baff]/20 fill-[#00baff]/10" strokeWidth={2} />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
                  <Star className="size-3 text-amber-500 fill-amber-500" />
                  <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                    {review.rating || 5.0}
                  </span>
                </div>
              </div>
              
              <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal flex-1">
                "{review.comment || review.reviewText}"
              </p>

              <div className="pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 overflow-hidden shrink-0">
                  {review.student?.user?.image ? (
                     <img src={review.student.user.image} alt="" className="object-cover size-full" />
                  ) : (
                    <User className="size-5 text-zinc-400" />
                  )}
                </div>
                <div className="overflow-hidden">
                 
                  <p className="text-[11px] text-zinc-500 font-medium tracking-wide">
                    Student
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #00baff !important;
        }
        .swiper-pagination-bullet {
          background: #00baff;
          opacity: 0.2;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}