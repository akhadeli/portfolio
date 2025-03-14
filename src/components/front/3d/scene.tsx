import { Canvas } from "@react-three/fiber";
import { Particles } from "./particles";

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <Particles />
    </Canvas>
  );
}
