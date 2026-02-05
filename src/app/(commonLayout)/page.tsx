import Banner from "@/components/modules/homePage/Banner";
import TutorCard from "@/components/modules/homePage/TutorCard";
import { tutorService } from "@/services/tutor.service";

export default async function Home() {
  const tutors = await tutorService.getAllTutor();

  return (
    <main className="min-h-scree">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Banner />

        <section className="mt-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white">
                Find Your Perfect{" "}
                <span className="bg-linear-to-r
from-blue-500
to-cyan-400
 bg-clip-text text-transparent">
                  Tutor
                </span>
              </h2>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Learn faster with verified and experienced tutors
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors && tutors.length > 0 ? (
              tutors.map((tutor: any, index: number) => (
                <TutorCard key={tutor._id || index} tutor={tutor} />
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <p className="text-zinc-400 text-lg">
                  No tutors available right now.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
