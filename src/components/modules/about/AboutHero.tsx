import React from 'react';

export default function AboutHero() {
  return (
    <section className="py-20 bg-white dark:bg-transparent">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold text-zinc-900 dark:text-zinc-100 font-sans leading-tight">
          We bridge the gap between <span className="text-[#00baff]">knowledge and success</span>
        </h1>
        <p className="text-base text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
          Skill Bridge is a community dedicated to personalized learning, 
          academic excellence, and global growth. We connect students 
          with world-class mentors.
        </p>
      </div>
    </section>
  );
}