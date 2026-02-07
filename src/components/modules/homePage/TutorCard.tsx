import { Card, CardContent } from "@/components/ui/card";
import { Star, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TutorCard({ tutor }: { tutor: any }) {
    const name = tutor?.user?.name || "Professional Tutor";
    const image = tutor?.user?.image || "https://plus.unsplash.com/premium_photo-1738980401922-70995a1b6ade?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const subject = tutor?.categories?.[0]?.name || "Expert Mentor";
    const rating = tutor?.averageRating || 0;
    const price = tutor?.pricePerHour || 0;
    const experience = tutor?.experience || 0;

    return (
        <Card className="group overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white/40 dark:bg-transparent backdrop-blur-md rounded-sm transition-all duration-300 shadow-none hover:border-zinc-400 dark:hover:border-zinc-600">
            {/* Image Section - Fixed Aspect Ratio */}
            <div className="relative aspect-[16/10] w-full bg-zinc-100 -mt-6 dark:bg-zinc-900 overflow-hidden">
                <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Rating Tag */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-zinc-900/80 backdrop-blur-md px-2 py-1 rounded border border-white/10 text-white">
                    <Star className="size-3 text-orange-400 fill-orange-400" />
                    <span className="text-[11px] font-bold">{rating > 0 ? rating.toFixed(1) : "N/A"}</span>
                </div>
            </div>

            <CardContent className="p-5 space-y-4">
                {/* Header Info */}
                <div className="space-y-1">
                    <h3 className="text-[17px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                        {name}
                    </h3>
                    <div className="flex items-center gap-3 text-[12px] text-zinc-500 dark:text-zinc-400 font-medium">
                        <span className="flex items-center gap-1.5">
                            <GraduationCap className="size-3.5 text-zinc-400" /> {subject}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <span className="flex items-center gap-1.5">
                            <Briefcase className="size-3.5 text-zinc-400" /> {experience}y Exp.
                        </span>
                    </div>
                </div>

                {/* Bio Section - Fixed Height for alignment */}
                <p className="text-[13px] text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed min-h-[40px]">
                    {tutor?.bio || "Academic expert providing professional mentorship and personalized learning strategies."}
                </p>

                {/* Pricing & Call to Action */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-400  ">Rate</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-lg font-bold text-zinc-900 dark:text-zinc-100">৳{price}</span>
                            <span className="text-[11px] font-medium text-zinc-500">/hr</span>
                        </div>
                    </div>

                    <Link href={`/tutors/${tutor.id}`}>
                        <Button
                            variant="outline"
                            className="h-9 px-4 rounded-lg border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 text-[12px] font-semibold transition-all group/btn shadow-sm"
                        >
                            View Profile
                            <ArrowRight className="size-3.5 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}