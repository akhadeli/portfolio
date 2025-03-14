import { Canvas } from "@react-three/fiber";
import { Model } from "./model";
import { Particles } from "./particles";
import { OrbitControls } from "@react-three/drei";
export default function Scene() {
  return (
    <Canvas>
      {/* <Model /> */}
      <Particles />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}
