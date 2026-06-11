"use client";

import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";
import { FluidGlass } from "./fluid-glass";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Particles />
      <FluidGlass />
    </Canvas>
  );
}
