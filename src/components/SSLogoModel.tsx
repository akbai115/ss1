'use client';

import { useGLTF, Center, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

export function SSLogoModel() {
    const { scene } = useGLTF('/ss.glb');
    const ref = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (ref.current) {
            // Continuous rotation
            ref.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={ref}>
                <Center>
                    <primitive
                        object={scene}
                        scale={1}
                    />
                </Center>
            </group>
        </Float>
    );
}

useGLTF.preload('/ss.glb');
