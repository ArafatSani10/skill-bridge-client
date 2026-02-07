import { Search, CalendarCheck, GraduationCap } from "lucide-react";

const steps = [
    {
        title: "Find your tutor",
        description: "Search by subject, price or rating to find your perfect match.",
        icon: Search,
    },
    {
        title: "Book a session",
        description: "Select a time that works for you and book in seconds.",
        icon: CalendarCheck,
    },
    {
        title: "Start learning",
        description: "Connect with your tutor and achieve your learning goals.",
        icon: GraduationCap,
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20">
            <div className="mb-10">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                    How Its  <span className="text-[#00baff]">Work</span>
                </h2>
                <p className="text-zinc-500 mt-3">Get started with our platform in three simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Decorative Line for Desktop */}
                <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-[1px] bg-zinc-100 dark:bg-zinc-800 -z-10" />

                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center space-y-5">
                        <div className="size-20 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-[#00baff] shadow-sm">
                            <step.icon size={32} strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{step.title}</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed px-4">
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}