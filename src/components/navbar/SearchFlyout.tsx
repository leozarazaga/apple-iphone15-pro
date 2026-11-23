import { useEffect, useRef } from "react";
import { searchQuickLinks } from "../../constants";
import { searchImg } from "../../utils";

type SearchFlyoutProps = {
    isOpen: boolean;
    searchQuery: string;
    onSearchChange: (value: string) => void;
    onClose: () => void;
};

const SearchFlyout = ({ isOpen, searchQuery, onSearchChange, onClose }: SearchFlyoutProps) => {
    const searchInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                searchInputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <div
            className={`absolute top-full left-0 w-full bg-[#161617] border-b border-white/10 shadow-2xl transition-all duration-200 ease-out z-50 ${
                isOpen ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
            }`}
        >
            <div className="screen-max-width sm:px-10 px-5 pt-10 pb-14">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        onClose();
                    }}
                    className="flex items-center gap-3 pb-6"
                >
                    <img src={searchImg} alt="" width={18} height={18} className="opacity-60" />
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search apple.com"
                        className="w-full bg-transparent text-2xl font-semibold text-white placeholder-zinc-500 outline-none"
                    />
                    {searchQuery && (
                        <button type="button" onClick={() => onSearchChange("")} className="text-xs text-gray hover:text-white cursor-pointer">
                            Clear
                        </button>
                    )}
                </form>

                <div className="space-y-2.5">
                    <p className="text-xs text-gray">Quick Links</p>
                    <ul className="space-y-1.5">
                        {searchQuickLinks.map((link) => (
                            <li key={link}>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="group flex items-center gap-2.5 text-xs font-medium text-zinc-300 hover:text-white py-1 transition-colors cursor-pointer"
                                >
                                    <span className="text-gray group-hover:text-white transition-colors">→</span>
                                    <span>{link}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchFlyout;
