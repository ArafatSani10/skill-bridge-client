import TutorCard from "@/components/modules/homePage/TutorCard";
import TutorFilters from "@/components/modules/tutors/TutorFilters";
import { tutorService } from "@/services/tutor.service";

export default async function TutorPage({
  searchParams,
}: {
  searchParams: Promise<{ categoryId?: string; searchTerm?: string }>;
}) {
  const filters = await searchParams;

  const tutors = await tutorService.getAllTutor(filters);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
      <aside className="w-full lg:w-1/4 shrink-0">
        <TutorFilters />
      </aside>

      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tutors && tutors.length > 0 ? (
            tutors.map((tutor: any) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 border rounded-2xl">
              <p className="text-muted-foreground">No tutors found for this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}