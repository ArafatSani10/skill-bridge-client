


import { Star, GraduationCap, ChevronRight, MessageSquare, Shield, CheckCircle2, Mail, Calendar, Briefcase, BookOpen } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { tutorService } from "@/services/tutor.service";
import { userService } from "@/services/user.service";
import Link from "next/link";
import BookingSection from "@/components/modules/tutors/BookingSection";
import ReviewSection from "@/components/modules/tutors/ReviewSection";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TutorDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const { data: sessionData } = await userService.getSession();
  const loggedInUserId = sessionData?.user?.id;
  const userRole = sessionData?.user?.role;
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

  const myBooking = tutor.bookings?.find((b: any) =>
    b.studentId === loggedInUserId &&
    b.status !== "CANCELLED" &&
    b.status !== "PENDING"
  );

  const activeBookingId = myBooking?.id;

  return (
    <div className="min-h-screen bg-transparent font-sans text-zinc-900 dark:text-zinc-200 pb-20">
      <div className="sticky top-0 z-10 bg-white/80 dark:bg-transparent backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/50">
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
          <div className="col-span-12 lg:col-span-8 space-y-12">

            <div className="flex sm:flex-row gap-6 items-start">
              <div className="relative size-28 md:size-36 shrink-0 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 shadow-sm">
                <Image
                  src={tutor.user?.image || "https://plus.unsplash.com/premium_photo-1738980401922-70995a1b6ade?q=80&w=1267&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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

            <div className="grid grid-cols-3 gap-6 py-6 border-y border-zinc-100 dark:border-zinc-800/50">
              <InfoItem label="Member Since" value={joinedDate} icon={<Calendar className="size-4 text-zinc-400" />} />
              <InfoItem label="Professional Status" value={`${tutor.experience} Years • Mentor`} icon={<GraduationCap className="size-4 text-zinc-400" />} />
              <InfoItem label="Verification" value="Identity Verified" icon={<Shield className="size-4 text-emerald-500" />} />
            </div>

            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-zinc-400 ">Student Feedback</h2>
                <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800"></div>
                <span className="text-xs font-bold text-zinc-400">({tutor.reviews?.length || 0})</span>
              </div>
              <div className="grid gap-4">
                {tutor.reviews?.length > 0 ? (
                  tutor.reviews.map((review: any) => (
                    <div key={review.id} className="p-5 rounded-sm border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-transparent flex gap-4 transition-all hover:border-zinc-200">
                      <div className="relative size-12 shrink-0 rounded-sm overflow-hidden bg-zinc-100 border border-zinc-200 dark:border-zinc-800">
                        <Image
                          src={review.student?.image}
                          alt="Student"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <div className="flex justify-between items-start">
                          <span className="text-[14px] font-bold text-zinc-900 dark:text-zinc-100">{review.student?.name || "Anonymous"}</span>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`size-3 ${i < review.rating ? "text-orange-400 fill-orange-400" : "text-zinc-200 dark:text-zinc-800"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-[14px] text-zinc-600 dark:text-zinc-400 leading-relaxed italic">"{review.comment}"</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-10 text-center text-sm text-zinc-400 italic border border-dashed rounded-sm border-zinc-200">No feedback records available yet.</p>
                )}
              </div>
            </section>

            <div className="pt-6">
              <ReviewSection
                tutorId={tutor.id}
                bookingId={activeBookingId || ""}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className=" top-24 space-y-4">
              <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-sm bg-white dark:bg-transparent overflow-hidden">
                <div className="bg-zinc-50/50 dark:bg-transparent px-6 py-3 border-b border-zinc-100 dark:border-zinc-800">
                  <p className="text-lg font-bold text-zinc-400 ">Rate Information</p>
                </div>
                <CardContent className="p-4">
                  <BookingSection tutorId={tutor.id} slots={uniqueSlots} price={tutor.pricePerHour} />
                </CardContent>
              </Card>
              <button className="w-full flex items-center justify-center gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-sm text-xs font-bold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
                <MessageSquare className="size-4" /> Message {tutor.user?.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

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