import { Mail, Phone, MapPin, Clock } from "lucide-react";

const infoItems = [
    { icon: Mail, label: "Email us", value: "support@skillbridge.com" },
    { icon: Phone, label: "Call us", value: "+880 123 456 789" },
    { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
    { icon: Clock, label: "Working hours", value: "Sat - Thu, 10am - 8pm" },
];

export default function ContactInfo() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {infoItems.map((item, index) => (
                <div key={index} className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-gray-900">
                    <item.icon className="size-5 text-[#00baff] mb-3" strokeWidth={2} />
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 font-sans">{item.label}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-sans mt-1">{item.value}</p>
                </div>
            ))}
        </div>
    );
}