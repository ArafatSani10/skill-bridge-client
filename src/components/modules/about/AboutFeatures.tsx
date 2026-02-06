import { ShieldCheck, Zap, Clock, CreditCard } from "lucide-react";

const features = [
  { 
    title: "Verified tutors", 
    description: "Every tutor undergoes a rigorous background check.", 
    icon: ShieldCheck 
  },
  { 
    title: "Flexible scheduling", 
    description: "Learn on your own terms with custom time slots.", 
    icon: Clock 
  },
  { 
    title: "Instant booking", 
    description: "Book your sessions instantly with your favorite tutors.", 
    icon: Zap 
  }
];

export default function AboutFeatures() {
  return (
    <section className="py-20  bg-zinc-50/30 dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white dark:bg-gray-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
              <feature.icon className="size-6 text-[#00baff] mb-4" strokeWidth={2} />
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 font-sans mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}