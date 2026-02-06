"use client";

import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Typewriter } from 'react-simple-typewriter';

import studyAbroadLottie from "../../../../public/lottie/Study Abroad.json";

export default function Banner({ categories }: { categories: any[] }) {
    

    const subjectWords = categories && categories.length > 0 
        ? categories.map(cat => cat.name) 
        : ['Mathematics', 'Science', 'Programming', 'English'];

    return (
        <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-background py-12 md:py-20">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 -z-10 h-full w-full opacity-20">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
                <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-[#00baff]/20 blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-3/5 text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
                        >
                            🚀 Your Journey Start With Skill Bridge
                        </motion.div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                            Master Your Future in <br />
                            <span className="text-[#00baff]">
                                <Typewriter
                                    words={subjectWords} 
                                    loop={0}
                                    cursor
                                    cursorStyle='|'
                                    typeSpeed={70}
                                    deleteSpeed={50}
                                    delaySpeed={1500}
                                />
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Connecting students with world-class <span className="text-foreground font-semibold">Expert Tutors</span>.
                            Personalized lessons designed to unlock your global potential and academic success.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                            <Button
                                size="lg"
                                className="bg-[#00baff] text-white rounded-lg px-10 h-11 text-base font-semibold hover:bg-[#00baff]/90 transition-all shadow-lg shadow-[#00baff]/20"
                            >
                                Find Your Tutor
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-lg px-10 h-11 text-base border-zinc-200 dark:border-zinc-800 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-900"
                            >
                                Explore Subjects
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right Side Lottie */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-full lg:w-2/5 flex justify-center relative"
                    >
                        <div className="absolute inset-0 bg-[#00baff]/10 rounded-full blur-[80px] -z-10" />
                        <div className="w-full max-w-[500px] lg:max-w-none">
                            <Lottie
                                animationData={studyAbroadLottie}
                                loop={true}
                                autoplay={true}
                                className="w-full h-auto drop-shadow-2xl"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}