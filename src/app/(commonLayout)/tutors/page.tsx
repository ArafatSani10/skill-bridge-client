import { tutorService } from "@/services/tutor.service";
import { categoryService } from "@/services/category.service";
import TutorFilters from "@/components/modules/tutors/TutorFilters";
import TutorCard from "@/components/modules/homePage/TutorCard";

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string; searchTerm?: string; minPrice?: string; maxPrice?: string; sortOrder?: string }>;
}) {
  const filters = await searchParams;
  const tutors = await tutorService.getAllTutor(filters);
  const categories = await categoryService.getAllCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-10 md:mb-14">
        <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
          Find Your Perfect <span className="text-[#00baff]">Tutor</span>
        </h1>
        <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 font-sans mt-3 max-w-2xl leading-relaxed">
          Discover experienced mentors tailored to your learning needs. Use filters to narrow down by price, category, and expertise.
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-[350px] shrink-0">
          <div className=" top-24">
            <TutorFilters categories={categories} />
          </div>
        </aside>

        <main className="flex-1 -mt-5">
          <div className="flex it1ems-center justify-between mb-6">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 font-sans">
              Showing <span className="text-zinc-900 dark:text-zinc-100 font-semibold">{tutors?.length || 0}</span> tutors
            </p>
          </div>

          {tutors && tutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
              {tutors.map((tutor: any) => (
                <TutorCard key={tutor._id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-zinc-50/30 dark:bg-zinc-900/10">
              <p className="text-zinc-500 dark:text-zinc-400 font-sans font-medium">No results found for your search.</p>
              <p className="text-xs text-zinc-400 mt-1">Try clearing some filters to see more results.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}