import AboutFeatures from '@/components/modules/about/AboutFeatures'
import AboutHero from '@/components/modules/about/AboutHero'
import AboutStats from '@/components/modules/about/AboutStats'
import { tutorService } from '@/services/tutor.service'
import { categoryService } from '@/services/category.service'
import React from 'react'

export default async function AboutPage() {
  const [tutors, categories] = await Promise.all([
    tutorService.getAllTutor(),
    categoryService.getAllCategories()
  ]);

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <AboutHero />

      <section className="mt-10">
        <div className="">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
            Our Core Features
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
            Everything you need for a seamless learning experience.
          </p>
        </div>
        <AboutFeatures />
      </section>

      <section className="mt-20 mb-20">
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 font-sans">
            Platform Statistics
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
            Real-time data reflecting our growing community.
          </p>
        </div>
        <AboutStats
          tutorCount={tutors?.length || 0}
          categoryCount={categories?.length || 0}
        />
      </section>
    </div>
  )
}