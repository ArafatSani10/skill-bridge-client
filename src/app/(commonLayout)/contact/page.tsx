import ContactInfo from "@/components/modules/contact/ContactInfo";
import ContactForm from "@/components/modules/contact/ContactForm";

export default function ContactPage() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-16">
            <div className="max-w-3xl mb-16">
                <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100 font-sans tracking-tight">
                    Get in <span className="text-[#00baff]">touch</span>
                </h1>
                <p className="text-base text-zinc-500 dark:text-zinc-400 font-sans mt-3">
                    Have questions about our tutors or platform? We're here to help.
                    Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <ContactInfo />
                <ContactForm />
            </div>
        </main>
    );
}