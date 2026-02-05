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
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-1/4 shrink-0">
        <TutorFilters categories={categories} />
      </aside>

      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border rounded-2xl text-muted-foreground">
              No tutors found.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}