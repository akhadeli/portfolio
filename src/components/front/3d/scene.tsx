import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { Particles } from "./particles";
import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

export default function Scene() {
  return (
    <Canvas>
      <Particles />
    </Canvas>
  );
}
