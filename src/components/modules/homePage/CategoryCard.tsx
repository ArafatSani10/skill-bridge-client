"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { 
  Code2, Languages, Sigma, FlaskConical, 
  Palette, Music, Globe, Briefcase, GraduationCap 
} from "lucide-react";
import Link from "next/link";

const getIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("web") || n.includes("program")) return <Code2 size={40} />;
  if (n.includes("language") || n.includes("english")) return <Languages size={40} />;
  if (n.includes("math")) return <Sigma size={40} />;
  if (n.includes("science") || n.includes("physics")) return <FlaskConical size={40} />;
  if (n.includes("design") || n.includes("art")) return <Palette size={40} />;
  if (n.includes("music")) return <Music size={40} />;
  if (n.includes("business")) return <Briefcase size={40} />;
  return <GraduationCap size={40} />;
};

export default function CategoryCard({ categories }: { categories: any[] }) {
  return (
    <div className="py-10">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-12"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id}>
            <Link href={`/tutors?categoryId=${cat.id}`}>
              <div className="group p-8 bg-white dark:bg-transparent border border-zinc-200 dark:border-zinc-800 rounded-lg flex flex-col items-center justify-center text-center transition-all hover:border-[#00baff] hover:shadow-xl hover:shadow-[#00baff]/10 cursor-pointer">
                <div className="mb-4 p-4 rounded-full bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-[#00baff]/10 group-hover:text-[#00baff] transition-all">
                  {getIcon(cat.name)}
                </div>
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200 group-hover:text-[#00baff]">
                  {cat.name}
                </h3>
                <p className="text-xs text-zinc-500 mt-2">Explore Tutors</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}