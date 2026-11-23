type BagFlyoutProps = {
    isOpen: boolean;
    onClose: () => void;
};

const BagFlyout = ({ isOpen, onClose }: BagFlyoutProps) => {
    return (
        <div
            className={`absolute top-full left-0 w-full bg-[#161617] border-b border-white/10 shadow-2xl transition-all duration-200 ease-out z-50 ${
                isOpen ? "opacity-100 translate-y-0 pointer-events-auto visible" : "opacity-0 -translate-y-2 pointer-events-none invisible"
            }`}
        >
            <div className="screen-max-width sm:px-10 px-5 pt-10 pb-14 space-y-6">
                <p className="text-2xl font-semibold text-white">Your Bag is empty.</p>
                <div className="space-y-2">
                    <p className="text-xs text-gray">My Profile</p>
                    <ul className="space-y-1.5 text-xs font-medium text-zinc-300">
                        {["Orders", "Your Saves", "Account", "Sign in"].map((item) => (
                            <li key={item}>
                                <button type="button" onClick={onClose} className="hover:text-white transition-colors cursor-pointer">
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BagFlyout;
