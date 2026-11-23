import { useProgress } from "@react-three/drei";

const SPOKES = [0, 45, 90, 135, 180, 225, 270, 315];

const Loader = () => {
    const { active } = useProgress();

    if (!active) return null;

    return (
        <div role="status" aria-label="Loading" className="absolute inset-0 flex-center pointer-events-none z-10">
            <svg className="w-7 h-7 animate-spin text-white/75" viewBox="0 0 24 24">
                {SPOKES.map((angle, i) => (
                    <rect
                        key={angle}
                        x="11"
                        y="2.5"
                        width="2"
                        height="5.5"
                        rx="1"
                        fill="currentColor"
                        opacity={0.25 + (i / SPOKES.length) * 0.75}
                        transform={`rotate(${angle} 12 12)`}
                    />
                ))}
            </svg>
        </div>
    );
};

export default Loader;