import { Users, GraduationCap, Globe, BookCheck } from "lucide-react";

interface AboutStatsProps {
  tutorCount: number;
  categoryCount: number;
}

export default function AboutStats({ tutorCount, categoryCount }: AboutStatsProps) {
  const stats = [
    {
      label: "Expert tutors",
      value: `${tutorCount}+`,
      icon: Users,
      description: "Professionally verified mentors"
    },
    {
      label: "Subjects covered",
      value: `${categoryCount}+`,
      icon: GraduationCap,
      description: "Learning categories available"
    },
    {
      label: "Success rate",
      value: "99%",
      icon: BookCheck,
      description: "Positive student feedback"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 p-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="group p-4 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-gray-900 rounded-lg transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
        >
          <div className="flex flex-col items-center text-center">
            {/* Icon Container */}
            <div className="mb-6 size-12 rounded-lg bg-zinc-50 dark:bg-gray-900 flex items-center justify-center border border-zinc-100 dark:border-zinc-700 group-hover:bg-[#00baff]/10 transition-colors">
              <stat.icon className="size-6 text-zinc-500 dark:text-zinc-400 group-hover:text-[#00baff] transition-colors" strokeWidth={1.5} />
            </div>

            <div className="space-y-1">
              <h3 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
                {stat.value}
              </h3>
              <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 font-sans">
                {stat.label}
              </p>
              <p className="text-[12px] text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed max-w-[180px]">
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}