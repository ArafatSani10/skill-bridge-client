import { Star, GraduationCap, ChevronRight, MessageSquare, Clock, Shield, CheckCircle2, Video, BookOpen, Mail, Calendar, Briefcase } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { tutorService } from "@/services/tutor.service";
import Link from "next/link";
import BookingSection from "@/components/modules/tutors/BookingSection";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TutorDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const allTutors = await tutorService.getAllTutor();
  const tutor = allTutors.find((t: any) => t.id === id);

  if (!tutor) return <div className="p-20 text-center font-sans text-zinc-500">Resource not found.</div>;

  const joinedDate = new Date(tutor.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const uniqueSlots = (tutor.slots || []).filter((slot: any, index: number, self: any[]) =>
    index === self.findIndex((s) => s.startTime === slot.startTime)
  );

  return (
    <div className="min-h-screen bg-transparent font-sans text-zinc-900 dark:text-zinc-200 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-[12px] text-zinc-400">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Home</Link>
          <ChevronRight className="size-3" />
          <span className="text-zinc-500 font-medium truncate">Tutors</span>
          <ChevronRight className="size-3" />
          <span className="text-zinc-400 truncate">{tutor.user?.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          
          {/* Left Column: Tutor Info */}
          <div className="col-span-12 lg:col-span-8 space-y-12">
            <div className="flex sm:flex-row gap-6 items-start">
              <div className="relative size-28 md:size-36 shrink-0 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 shadow-sm">
                <Image
                  src={tutor.user?.image || "https://images.unsplash.com/photo-1544717297-f1e3eec99665"}
                  alt={tutor.user?.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">{tutor.user?.name}</h1>
                  <CheckCircle2 className="size-5 text-blue-500 shrink-0" />
                </div>
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-[13px] text-zinc-500">
                  <span className="flex items-center gap-1.5"><Mail className="size-3.5" /> {tutor.user?.email}</span>
                  <span className="flex items-center gap-1.5"><Star className="size-3.5 text-orange-400 fill-orange-400" /> {tutor.averageRating?.toFixed(1) || "0.0"}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="size-3.5" /> {tutor.experience}y Exp.</span>
                </div>
                <p className="text-[14px] md:text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl">
                  {tutor.bio || "No bio provided."}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {tutor.categories?.map((cat: any) => (
                    <span key={cat.id} className="px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-[11px] font-medium text-zinc-600 dark:text-zinc-300">
                      {cat.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-zinc-100 dark:border-zinc-800/50">
              <InfoItem label="Member Since" value={joinedDate} icon={<Calendar className="size-4 text-zinc-400" />} />
              <InfoItem 
                label="Professional Status" 
                value={`${tutor.experience} Years • ${tutor.experience > 4 ? 'Senior Mentor' : 'Associate'}`} 
                icon={<GraduationCap className="size-4 text-zinc-400" />} 
              />
              <InfoItem label="Verification" value="Identity Verified" icon={<Shield className="size-4 text-emerald-500" />} />
            </div>

            {/* Reviews Section */}
            <section className="space-y-4">
              <h2 className="text-[13px] font-semibold text-zinc-400 tracking-wider uppercase">Student Feedback ({tutor.reviews?.length || 0})</h2>
              <div className="divide-y divide-zinc-100 dark:divide-zinc-800 border-t border-zinc-100 dark:border-zinc-800">
                {tutor.reviews?.length > 0 ? (
                  tutor.reviews.map((review: any) => (
                    <div key={review.id} className="py-5 space-y-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`size-3 ${i < review.rating ? "text-orange-400 fill-orange-400" : "text-zinc-200 dark:text-zinc-800"}`} />
                        ))}
                      </div>
                      <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-snug">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <p className="py-2 text-[13px] text-zinc-400 italic">No feedback records available yet.</p>
                )}
              </div>
            </section>
          </div>

          {/* Right Column: Booking Card */}
          <div className="col-span-12 lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-xl bg-white dark:bg-zinc-950 overflow-hidden">
                <div className="bg-zinc-50/50 dark:bg-zinc-900/50 px-6 py-3 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-sm font-bold text-zinc-400">Rate Information</p>
                </div>
                <CardContent className="p-4">
                  <BookingSection
                    tutorId={tutor.id} 
                    slots={uniqueSlots} 
                    price={tutor.pricePerHour} 
                  />
                </CardContent>
              </Card>

              <button className="w-full flex items-center justify-center gap-2 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl text-[12px] font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
                <MessageSquare className="size-4" /> Message {tutor.user?.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Helper components
function InfoItem({ label, value, icon }: { label: string; value: string; icon: any }) {
  return (
    <div className="space-y-1.5">
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{label}</p>
      <div className="text-[12px] md:text-[13px] font-medium flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
        {icon} <span>{value}</span>
      </div>
    </div>
  );
}