'use client';

import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function HoodModel() {
    const { scene } = useGLTF('/hood.glb');
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            // Subtle floating animation
            ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            // Very slow rotation
            ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
        }
    });

    return (
        <group ref={ref}>
            <Center>
                <primitive
                    object={scene}
                    scale={2.5}
                    rotation={[0, Math.PI, 0]}
                />
            </Center>
        </group>
    );
}

useGLTF.preload('/hood.glb');
