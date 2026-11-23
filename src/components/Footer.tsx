import { useState } from "react";
import { footerDirectory, footerLinks } from "../constants";
import { appleImg } from "../utils";

const current_year = new Date().getFullYear();

const Footer = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

    const toggleSection = (title: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    return (
        <footer className="bg-[#161617] text-gray py-10 sm:px-10 px-5 border-t border-white/10">
            <div className="screen-max-width">
                <p className="text-[11px] leading-relaxed text-zinc-500 pb-5 mb-5">
                    Disclaimer: This is a personal portfolio project built for educational purposes and is not affiliated with or endorsed by Apple
                    Inc. All product names, logos, images, and videos belong to Apple Inc.
                </p>

                {/* 1. Breadcrumb Trail */}
                <div className="flex items-center gap-2.5 text-xs text-zinc-400 pb-5 border-b border-white/10">
                    <img src={appleImg} alt="Apple" width={12} height={15} className="opacity-80" />
                    <span className="text-zinc-600">›</span>
                    <span>iPhone</span>
                    <span className="text-zinc-600">›</span>
                    <span className="text-zinc-300">iPhone 15 Pro</span>
                </div>

                {/* 2. Desktop Directory (5 Columns) */}
                <div className="hidden md:grid grid-cols-5 gap-8 py-8">
                    {footerDirectory.map((section) => (
                        <div key={section.title} className="space-y-2.5">
                            <h3 className="text-xs font-semibold text-zinc-200">{section.title}</h3>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link}>
                                        <button
                                            type="button"
                                            className="text-xs text-gray hover:text-white hover:underline transition-colors text-left cursor-pointer"
                                        >
                                            {link}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* 3. Mobile Accordion Directory */}
                <div className="md:hidden divide-y divide-white/10 border-b border-white/10">
                    {footerDirectory.map((section) => {
                        const isOpen = Boolean(openSections[section.title]);
                        return (
                            <div key={section.title} className="py-3">
                                <button
                                    type="button"
                                    aria-expanded={isOpen}
                                    onClick={() => toggleSection(section.title)}
                                    className="w-full flex items-center justify-between text-xs font-medium text-zinc-200 cursor-pointer"
                                >
                                    <span>{section.title}</span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`text-gray transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                    >
                                        <path d="M2.5 4.5L6 8L9.5 4.5" />
                                    </svg>
                                </button>

                                {isOpen && (
                                    <ul className="mt-3 space-y-2 pl-2 pb-1">
                                        {section.links.map((link) => (
                                            <li key={link}>
                                                <button
                                                    type="button"
                                                    className="text-xs text-gray hover:text-white transition-colors text-left cursor-pointer"
                                                >
                                                    {link}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* 4. More Ways to Shop */}
                <div className="pt-6">
                    <p className="font-normal text-gray text-xs leading-relaxed">
                        More ways to shop:{" "}
                        <button type="button" className="underline text-blue cursor-pointer">
                            Find an Apple Store
                        </button>{" "}
                        or{" "}
                        <button type="button" className="underline text-blue cursor-pointer">
                            other retailer
                        </button>{" "}
                        near you. Or call 000800-040-1966.
                    </p>
                </div>

                <div className="bg-white/10 my-4 h-px w-full hidden md:block" />

                {/* 5. Copyright & Legal Links */}
                <div className="flex md:flex-row flex-col md:items-center justify-between gap-3 pt-2 md:pt-0">
                    <p className="text-gray text-xs">Copyright © {current_year} Apple Inc. All rights reserved.</p>

                    <div className="flex flex-wrap items-center gap-y-1">
                        {footerLinks.map((link, i) => (
                            <span key={link} className="text-gray text-xs flex items-center">
                                <button type="button" className="hover:text-white hover:underline transition-colors cursor-pointer">
                                    {link}
                                </button>
                                {i !== footerLinks.length - 1 && <span className="mx-2 text-zinc-600">|</span>}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
