import Banner from "@/components/modules/homePage/Banner";
import TutorCard from "@/components/modules/homePage/TutorCard";
import { tutorService } from "@/services/tutor.service";

export default async function Home() {
  const tutors = await tutorService.getAllTutor();

  return (
    <main className="">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Banner />

        <section className="mt-20">
          <div className="flex justify-between items-end mb-10">
            <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white">
              Available <span className="text-[#00baff]">Tutors</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors && tutors.length > 0 ? (
              tutors.map((tutor: any, index: number) => (
                <TutorCard key={tutor._id || index} tutor={tutor} />
              ))
            ) : (
              <p className="col-span-full text-center py-20 text-zinc-400">
                No real-time data found in database.
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}