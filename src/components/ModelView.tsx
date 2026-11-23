import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import { Suspense, type ComponentRef, type Dispatch, type RefObject, type SetStateAction } from "react";
import Lights from "./Lights";
import IPhone from "./IPhone";

type ModelViewProps = {
    index: number;
    groupRef: RefObject<THREE.Group | null>;
    gsapType: string;
    controlRef: RefObject<ComponentRef<typeof OrbitControls> | null>;
    setRotationState: Dispatch<SetStateAction<number>>;
    size: string;
    item: {
        title: string;
        color: string[];
        img: string;
    };
};

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }: ModelViewProps) => {
    return (
        <View index={index} id={gsapType} className={`w-full h-full absolute ${index === 2 ? "-right-full" : ""}`}>
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />

            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />

            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.5}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() => setRotationState(controlRef.current?.getAzimuthalAngle() ?? 0)}
            />

            <group ref={groupRef} name={index === 1 ? "small" : "large"} position={[0, 0, 0]}>
                <Suspense fallback={null}>
                    <IPhone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} item={item} size={size} />
                </Suspense>
            </group>
        </View>
    );
};

export default ModelView;
