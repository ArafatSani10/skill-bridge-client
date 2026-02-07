


import Banner from "@/components/modules/homePage/Banner";
import TutorCard from "@/components/modules/homePage/TutorCard";
import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import CategoryCard from "@/components/modules/homePage/CategoryCard";
import HowItWorks from "@/components/modules/homePage/HowItWorks";
import Testimonials from "@/components/modules/homePage/Testimonials";

export default async function Home() {
  const [tutors, categories] = await Promise.all([
    tutorService.getAllTutor(),
    categoryService.getAllCategories()
  ]);

  const allReviews = tutors
    ?.flatMap((tutor: any) => (tutor.reviews || []).map((rev: any) => ({
      ...rev,
      student: rev.student || null
    })))
    .filter((rev: any) => rev.student)
    .slice(0, 10);

  return (
    <main className="">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Banner categories={categories} />

        <section className="mt-16">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              Explore by <span className="text-[#00baff]">Categories</span>
            </h2>
            <p className="text-zinc-500 text-sm">Find specialized tutors across various subjects</p>
          </div>
          <CategoryCard categories={categories} />
        </section>

        <section className="mt-14">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Find Your Perfect <span className="text-[#00baff]">Tutor</span>
              </h2>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Learn faster with verified and experienced tutors
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors && tutors.length > 0 ? (
              tutors.slice(0, 6).map((tutor: any, index: number) => (
                <TutorCard key={tutor._id || index} tutor={tutor} />
              ))
            ) : (
              <div className="col-span-full text-center py-24">
                <p className="text-zinc-400 text-lg">No tutors available.</p>
              </div>
            )}
          </div>
        </section>

        <section>
          <HowItWorks />
        </section>

        {allReviews && allReviews.length > 0 && (
          <section className="mt-5">
            <Testimonials reviews={allReviews} />
          </section>
        )}
      </div>
    </main>
  );
}