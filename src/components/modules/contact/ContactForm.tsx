"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
    return (
        <div className="p-8 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-gray-900/50">
            <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-sans">Name</label>
                        <Input placeholder="Your full name" className="rounded-lg border-zinc-200 dark:border-zinc-800 focus:ring-[#00baff]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-sans">Email</label>
                        <Input type="email" placeholder="Email address" className="rounded-lg border-zinc-200 dark:border-zinc-800" />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-sans">Subject</label>
                    <Input placeholder="How can we help you?" className="rounded-lg border-zinc-200 dark:border-zinc-800" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 font-sans">Message</label>
                    <Textarea placeholder="Write your message here..." className="min-h-[120px] rounded-lg border-zinc-200 dark:border-zinc-800" />
                </div>
                <Button className="w-full bg-[#00baff] hover:bg-[#00baff]/90 text-white font-semibold rounded-lg h-11">
                    Send Message
                </Button>
            </form>
        </div>
    );
}