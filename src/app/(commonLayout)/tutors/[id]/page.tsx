import { Star, GraduationCap, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { tutorService } from "@/services/tutor.service";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TutorDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const allTutors = await tutorService.getAllTutor();

  const tutor = allTutors.find((t: any) => t.id === id);

  if (!tutor) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-3xl font-bold text-red-500">Tutor Not Found!</h1>
        <p className="text-zinc-500 mt-2">The tutor with ID: <span className="font-mono bg-zinc-100 px-2 underline">{id}</span> does not exist.</p>
        <Button className="mt-6 bg-[#00baff]" asChild>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-zinc-400">
        <Link href="/" className="hover:text-[#00baff]">Tutors</Link> 
        <ChevronRight className="size-4" />
        <span className="text-zinc-900 font-medium">{tutor.user?.name}</span>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* প্রোফাইল এবং ডিটেইলস সেকশন */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm overflow-hidden rounded-3xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative h-64 w-64 rounded-2xl overflow-hidden shrink-0 border-4 border-[#00baff]/10 shadow-lg">
                    <Image
                      src={tutor.user?.image || "https://images.unsplash.com/photo-1544717297-f1e3eec99665"}
                      alt={tutor.user?.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <h1 className="text-4xl font-black text-zinc-900 leading-tight">
                        {tutor.user?.name}
                      </h1>
                      <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
                        <Star className="size-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-bold text-yellow-700">{tutor.averageRating || 5}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[#00baff] font-bold">
                      <GraduationCap className="size-5" />
                      <span>{tutor.categories?.[0]?.name || "Expert Tutor"}</span>
                    </div>

                    <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">About Me</h3>
                      <p className="text-zinc-600 text-lg leading-relaxed italic">
                        {tutor.bio || "No biography provided by the tutor."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-zinc-800">Student Reviews ({tutor.reviews?.length || 0})</h2>
              <div className="grid gap-4">
                {tutor.reviews && tutor.reviews.length > 0 ? (
                  tutor.reviews.map((review: any) => (
                    <div key={review.id} className="p-6 bg-white border border-zinc-100 shadow-sm rounded-2xl">
                      <div className="flex text-yellow-500 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`size-4 ${i < review.rating ? "fill-yellow-500" : "text-zinc-200"}`} 
                          />
                        ))}
                      </div>
                      <p className="text-zinc-700 leading-relaxed italic">"{review.comment}"</p>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-400 italic">No reviews yet for this tutor.</p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 p-8 bg-zinc-900 text-white rounded-[2.5rem] shadow-2xl border border-white/5">
              <p className="text-zinc-400 font-bold uppercase tracking-widest text-[10px]">Investment Per Hour</p>
              <h3 className="text-5xl font-black mt-2 text-[#00baff]">৳{tutor.pricePerHour}</h3>
              
              <div className="mt-10 space-y-4">
                <Button className="w-full py-7 bg-[#00baff] hover:bg-[#009bd6] text-white rounded-2xl font-extrabold text-lg shadow-lg shadow-[#00baff]/20 transition-all active:scale-95">
                  Book Session Now
                </Button>
                <Button variant="outline" className="w-full py-7 border-white/20 hover:bg-white/5 text-white rounded-2xl font-bold">
                  Send Message
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-zinc-400">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Available for Online Classes</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  By booking, you agree to our terms of service and 24-hour cancellation policy.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}