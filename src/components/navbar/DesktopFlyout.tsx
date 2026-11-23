import type { NavMenuItem } from "../../constants";

type DesktopFlyoutProps = {
    activeMenu: NavMenuItem | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClose: () => void;
};

const DesktopFlyout = ({ activeMenu, onMouseEnter, onMouseLeave, onClose }: DesktopFlyoutProps) => {
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={`hidden md:block absolute top-full left-0 w-full bg-[#161617] border-b border-white/10 shadow-2xl transition-all duration-200 ease-out z-50 ${
                activeMenu ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
            }`}
        >
            {activeMenu && (
                <div className="screen-max-width sm:px-10 px-5 pt-10 pb-14">
                    <div className="flex items-start gap-16 lg:gap-24">
                        {/* Primary Left Column (Large Typography) */}
                        <div className="min-w-52.5">
                            <p className="text-xs text-gray mb-3">{activeMenu.primary.heading}</p>
                            <ul className="space-y-2">
                                {activeMenu.primary.items.map((item) => (
                                    <li key={item}>
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="text-2xl font-semibold text-zinc-200 hover:text-white transition-colors text-left cursor-pointer leading-tight"
                                        >
                                            {item}
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            {activeMenu.primary.secondaryItems && (
                                <ul className="mt-5 space-y-1.5">
                                    {activeMenu.primary.secondaryItems.map((subItem) => (
                                        <li key={subItem}>
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="text-xs font-medium text-zinc-300 hover:text-white transition-colors text-left cursor-pointer"
                                            >
                                                {subItem}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Secondary Right Columns (Compact Typography) */}
                        {activeMenu.secondary.map((col) => (
                            <div key={col.heading}>
                                <p className="text-xs text-gray mb-3">{col.heading}</p>
                                <ul className="space-y-2">
                                    {col.items.map((item) => (
                                        <li key={item}>
                                            <button
                                                type="button"
                                                onClick={onClose}
                                                className="text-xs font-medium text-zinc-300 hover:text-white transition-colors text-left cursor-pointer"
                                            >
                                                {item}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DesktopFlyout;
