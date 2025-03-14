import { useControls } from "leva";
import { fragmentNoise, vertexNoise } from "./shader";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Material, MathUtils, Mesh, ShaderMaterial } from "three";

export function Model() {
  const mesh = useRef<Mesh>(null);

  // const { amplitude, waveLength } = useControls({
  //   amplitude: { value: 0.25, min: 0, max: 2, step: 0.1 },

  //   waveLength: { value: 5, min: 0, max: 20, step: 0.5 },
  // });

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3,
      },
      u_time: {
        value: 0.0,
      },
    }),
    []
  );

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      const material = mesh.current.material as ShaderMaterial;
      material.uniforms.u_time.value = 0.4 * clock.getElapsedTime();

      material.uniforms.u_intensity.value = MathUtils.lerp(
        material.uniforms.u_intensity.value,
        0.85,
        0.02
      );
    }
  });

  return (
    <mesh ref={mesh} scale={[0.8, 0.8, 0.8]}>
      {/* <planeGeometry args={[1, 1, 15, 15]} /> */}
      <icosahedronGeometry args={[2, 20]} />

      <shaderMaterial
        wireframe={true}
        fragmentShader={fragmentNoise}
        vertexShader={vertexNoise}
        uniforms={uniforms}
      />
    </mesh>
  );
}
