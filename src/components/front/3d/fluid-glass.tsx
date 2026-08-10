"use client";

import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import { useMemo } from "react";

const GLASS_Z = 1.5;
// Fullscreen pane of "fluid" glass between the camera and the particle
// ring, so the whole animation is viewed through it. The liquid feel
// comes from the material's animated noise distortion rather than the
// pointer-following lens this started as.
//
// The pane is sized via geometry args, NOT mesh scale: three.js scales
// the refraction ray by the mesh's per-axis model scale, so a
// non-uniformly scaled plane refracts more along its stretched axis and
// visibly squashes the scene on wide screens.
export function FluidGlass({
    ior = 1.08,
    thickness = 1.2,
    chromaticAberration = 0.04,
    distortion = 0.6,
    distortionScale = 0.7,
    temporalDistortion = 0.2,
    samples = 4,
    resolution = 768,
    backgroundColor = "#000000",
}: {
    ior?: number;
    thickness?: number;
    chromaticAberration?: number;
    distortion?: number;
    distortionScale?: number;
    temporalDistortion?: number;
    samples?: number;
    resolution?: number;
    backgroundColor?: string;
}) {
    const viewport = useThree((state) => state.viewport);
    const camera = useThree((state) => state.camera);
    // Viewport size at the pane's depth; re-renders on resize. Slight
    // overscan avoids edge gaps.
    const { width, height } = viewport.getCurrentViewport(camera, [
        0,
        0,
        GLASS_Z,
    ]);
    const background = useMemo(
        () => new THREE.Color(backgroundColor),
        [backgroundColor],
    );

    return (
        <mesh position={[0, 0, GLASS_Z]}>
            <planeGeometry args={[width * 1.05, height * 1.05]} />
            <MeshTransmissionMaterial
                transmission={1}
                roughness={0}
                ior={ior}
                thickness={thickness}
                anisotropy={0.01}
                chromaticAberration={chromaticAberration}
                distortion={distortion}
                distortionScale={distortionScale}
                temporalDistortion={temporalDistortion}
                samples={samples}
                resolution={resolution}
                background={background}
            />
        </mesh>
    );
}
