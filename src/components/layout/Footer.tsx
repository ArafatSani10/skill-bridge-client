"use client"

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from "lucide-react";
import logo from "../../../public/logo.png"; // আপনার লোগো পাথ অনুযায়ী ঠিক করে নিন

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: "Browse Tutors", href: "/tutors" },
            { name: "Online Courses", href: "/courses" },
            { name: "How it Works", href: "/how-it-works" },
            { name: "Pricing", href: "/pricing" },
        ],
        company: [
            { name: "About Us", href: "/about" },
            { name: "Careers", href: "/careers" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" },
        ],
        support: [
            { name: "Help Center", href: "/help" },
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "Cookie Policy", href: "/cookies" },
        ],
    };

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Linkedin, href: "#", label: "LinkedIn" },
        { icon: Github, href: "#", label: "GitHub" },
    ];

    return (
        <footer className="w-full bg-background border-t dark:bg-[#00091a] dark:border-white/10">
            <div className="max-w-7xl mx-auto px-4 pt-10 pb-8">

                {/* Upper Section: Grid */}
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-12">

                    {/* Brand Column */}
                    <div className="lg:col-span-2 ">
                        <Link href="/" className="i">
                            {/* 1. Left: Logo Section */}
                            <div className="flex-1 flex items-center">
                                <Link href="/" className="flex items-center">
                                    <div className="relative h-32 w-48 sm:h-32 sm:w-56">
                                        <Image
                                            src={logo}
                                            alt="Skill Bridge Logo"
                                            fill
                                            priority
                                            className="object-contain -mt-10 object-left"
                                        />
                                    </div>
                                </Link>
                            </div>
                        </Link>
                        <p className="text-muted-foreground mb-2 -pt-10 -mt-5 text-sm leading-relaxed max-w-xs">
                            Skill Bridge is a leading platform connecting passionate learners with expert tutors worldwide. Empowering the next generation through quality education.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    className="p-2 rounded-full bg-muted hover:bg-[#00baff] hover:text-white transition-all duration-300"
                                >
                                    <social.icon className="size-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs ">Platform</h4>
                        <ul className="space-y-4">
                            {footerLinks.platform.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-[#00baff] text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs ">Company</h4>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-[#00baff] text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-foreground mb-6 uppercase text-xs tracking-widest">Support</h4>
                        <ul className="space-y-4">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-muted-foreground hover:text-[#00baff] text-sm transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-muted dark:border-white/5 my-8" />

                {/* Bottom Section: Copyright & Contact Info */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-muted-foreground text-xs text-center md:text-left">
                        © {currentYear} Skill Bridge Inc. All rights reserved. Built with ❤️ for better education.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2 text-xs">
                            <Mail className="size-3.5 text-[#00baff]" />
                            <span>hello@skillbridge.com</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                            <MapPin className="size-3.5 text-[#00baff]" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;