import { useState } from "react";
import { navMenus, type NavMenuItem } from "../../constants";

type MobileDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
    const [activeMobileMenu, setActiveMobileMenu] = useState<NavMenuItem | null>(null);

    if (!isOpen) return null;

    const handleClose = () => {
        setActiveMobileMenu(null);
        onClose();
    };

    return (
        <div className="md:hidden fixed inset-0 bg-[#161617] z-50 flex flex-col overflow-y-auto">
            <div className="h-12 px-5 flex items-center justify-between shrink-0">
                {activeMobileMenu ? (
                    <button
                        type="button"
                        aria-label="Back to main menu"
                        onClick={() => setActiveMobileMenu(null)}
                        className="p-2 -ml-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg
                            width="10"
                            height="18"
                            viewBox="0 0 10 18"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 1L1 9L9 17" />
                        </svg>
                    </button>
                ) : (
                    <span />
                )}

                <button
                    type="button"
                    aria-label="Close menu"
                    onClick={handleClose}
                    className="p-2 -mr-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <path d="M2 2L14 14M14 2L2 14" />
                    </svg>
                </button>
            </div>

            {/* Content Area: Top-Level List vs. Category Drill-Down */}
            <div className="px-11 pt-2 pb-16">
                {!activeMobileMenu ? (
                    <ul className="space-y-3">
                        {navMenus.map((menu) => (
                            <li key={menu.label}>
                                <button
                                    type="button"
                                    onClick={() => setActiveMobileMenu(menu)}
                                    className="w-full text-left text-[28px] font-semibold tracking-tight text-zinc-200 hover:text-white transition-colors cursor-pointer leading-snug"
                                >
                                    {menu.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="space-y-8">
                        {/* Primary Large Links */}
                        <div>
                            <ul className="space-y-2.5">
                                {activeMobileMenu.primary.items.map((item) => (
                                    <li key={item}>
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="text-left text-[28px] font-semibold tracking-tight text-zinc-200 hover:text-white transition-colors cursor-pointer leading-tight"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {/* Secondary Sub-Links */}
                            {activeMobileMenu.primary.secondaryItems && (
                                <ul className="mt-6 space-y-2.5">
                                    {activeMobileMenu.primary.secondaryItems.map((subItem) => (
                                        <li key={subItem}>
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="text-left text-sm font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
                                            >
                                                {subItem}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Additional Sections */}
                        {activeMobileMenu.secondary.map((col) => (
                            <div key={col.heading} className="space-y-2.5 pt-2">
                                <p className="text-sm text-gray">{col.heading}</p>
                                <ul className="space-y-2.5">
                                    {col.items.map((item) => (
                                        <li key={item}>
                                            <button
                                                type="button"
                                                onClick={handleClose}
                                                className="text-left text-sm font-medium text-zinc-200 hover:text-white transition-colors cursor-pointer"
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileDrawer;
