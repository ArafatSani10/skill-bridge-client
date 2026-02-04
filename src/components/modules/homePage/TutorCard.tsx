import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, GraduationCap, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function TutorCard({ tutor }: { tutor: any }) {
    // ডেটা ম্যাপ করা
    const name = tutor?.user?.name || "Professional Tutor";
    const image = tutor?.user?.image || "https://images.unsplash.com/photo-1544717297-f1e3eec99665";
    const subject = tutor?.categories?.[0]?.name || "Expert Mentor";
    const rating = tutor?.averageRating || 5;
    const price = tutor?.pricePerHour || 0;

    return (
        <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-zinc-900">
            <div className="relative h-48 w-full bg-zinc-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="size-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-[10px] font-bold">{rating}</span>
                </div>
            </div>

            <CardContent className="p-4">
                <h3 className="text-lg font-bold line-clamp-1">{name}</h3>
                <p className="text-sm text-[#00baff] font-semibold flex items-center gap-1 mt-1">
                    <GraduationCap className="size-4" />
                    {subject}
                </p>

                {/* Bio থাকলে দেখাতে পারেন */}
                <p className="text-xs text-zinc-500 mt-2 line-clamp-2 italic">
                    "{tutor?.bio}"
                </p>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between border-t border-zinc-100 mt-2">
                <div>
                    <span className="text-xs text-zinc-400">BDT / hr</span>
                    <p className="font-bold text-zinc-700">৳{price}</p>
                </div>
                <Link href={`/tutors/${tutor.id}`}>
                    <Button className="bg-[#00baff] ...">
                        View Profile
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}