import { useEffect, useRef, useState } from "react";
import { navMenus, type NavMenuItem } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";
import BagFlyout from "./navbar/BagFlyout";
import DesktopFlyout from "./navbar/DesktopFlyout";
import MobileDrawer from "./navbar/MobileDrawer";
import SearchFlyout from "./navbar/SearchFlyout";

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState<NavMenuItem | null>(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isBagOpen, setIsBagOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const flyoutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const isAnyOverlayOpen = Boolean(activeMenu) || isSearchOpen || isBagOpen;

    const closeAllMenus = () => {
        setActiveMenu(null);
        setIsSearchOpen(false);
        setIsBagOpen(false);
        setMobileMenuOpen(false);
        setSearchQuery("");
    };

    const handleMenuEnter = (menu: NavMenuItem) => {
        if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
        setIsSearchOpen(false);
        setIsBagOpen(false);
        setActiveMenu(menu);
    };

    const handleMenuLeave = () => {
        flyoutTimeoutRef.current = setTimeout(() => {
            setActiveMenu(null);
        }, 150);
    };

    const handleFlyoutEnter = () => {
        if (flyoutTimeoutRef.current) clearTimeout(flyoutTimeoutRef.current);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeAllMenus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "unset";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [mobileMenuOpen]);

    return (
        <>
            <header
                className={`relative z-50 w-full transition-colors duration-200 ${
                    isAnyOverlayOpen ? "bg-[#161617]" : "bg-black/80 backdrop-blur-xl"
                }`}
            >
                <nav className="screen-max-width sm:px-10 px-5 h-12 flex items-center justify-between">
                    {/* Apple Logo */}
                    <button
                        type="button"
                        onClick={closeAllMenus}
                        aria-label="Apple Home"
                        className="cursor-pointer opacity-90 hover:opacity-100 transition-opacity shrink-0"
                    >
                        <img src={appleImg} alt="Apple" width={14} height={18} />
                    </button>

                    {/* Desktop Category Items */}
                    <div className="hidden md:flex flex-1 justify-center items-center">
                        {navMenus.map((menu) => {
                            const isActive = activeMenu?.label === menu.label;
                            return (
                                <button
                                    key={menu.label}
                                    type="button"
                                    onMouseEnter={() => handleMenuEnter(menu)}
                                    onMouseLeave={handleMenuLeave}
                                    onClick={() => handleMenuEnter(menu)}
                                    className={`px-4 lg:px-5 py-3 text-xs tracking-wide cursor-pointer transition-colors ${
                                        isActive ? "text-white" : "text-gray hover:text-white"
                                    }`}
                                >
                                    {menu.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Actions: Search, Bag, Mobile Trigger */}
                    <div className="flex items-center gap-6 shrink-0">
                        <button
                            type="button"
                            aria-label="Search"
                            onClick={() => {
                                setActiveMenu(null);
                                setIsBagOpen(false);
                                setMobileMenuOpen(false);
                                setIsSearchOpen((prev) => !prev);
                            }}
                            className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <img src={searchImg} alt="search" width={16} height={16} />
                        </button>

                        <button
                            type="button"
                            aria-label="Bag"
                            onClick={() => {
                                setActiveMenu(null);
                                setIsSearchOpen(false);
                                setMobileMenuOpen(false);
                                setIsBagOpen((prev) => !prev);
                            }}
                            className="cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                        >
                            <img src={bagImg} alt="bag" width={16} height={16} />
                        </button>

                        {/* Mobile 2-line Menu Button */}
                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => {
                                setActiveMenu(null);
                                setIsSearchOpen(false);
                                setIsBagOpen(false);
                                setMobileMenuOpen(true);
                            }}
                            className="md:hidden w-6 h-6 flex flex-col items-center justify-center gap-1.5 text-zinc-300 hover:text-white cursor-pointer"
                        >
                            <span className="w-4 h-[1.5px] bg-current" />
                            <span className="w-4 h-[1.5px] bg-current" />
                        </button>
                    </div>
                </nav>

                <DesktopFlyout activeMenu={activeMenu} onMouseEnter={handleFlyoutEnter} onMouseLeave={handleMenuLeave} onClose={closeAllMenus} />

                <SearchFlyout isOpen={isSearchOpen} searchQuery={searchQuery} onSearchChange={setSearchQuery} onClose={closeAllMenus} />

                <BagFlyout isOpen={isBagOpen} onClose={closeAllMenus} />
            </header>

            {/* Background Dimming Scrim */}
            {isAnyOverlayOpen && (
                <div
                    onClick={closeAllMenus}
                    aria-hidden="true"
                    className="fixed inset-0 top-12 bg-black/50 backdrop-blur-md z-40 transition-opacity duration-200"
                />
            )}

            <MobileDrawer isOpen={mobileMenuOpen} onClose={closeAllMenus} />
        </>
    );
};

export default Navbar;
