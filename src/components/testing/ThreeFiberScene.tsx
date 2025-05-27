import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { fragment, vertex } from "./shader";

// ShaderPlane component - equivalent to the plane mesh in the original code
function ShaderPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  // Animation frame - replaces the render method in the original code
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const elapsedTime = clock.getElapsedTime();
      meshRef.current.rotation.x = 0.2 * elapsedTime;
      meshRef.current.rotation.y = 0.1 * elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1, 128, 128]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        wireframe={true}
        fragmentShader={fragment}
        vertexShader={vertex}
        uniforms={{
          progress: { value: 0 },
        }}
      />
    </mesh>
  );
}

// Scene setup component - handles responsive sizing
function Scene() {
  const { camera } = useThree();

  // Position camera initially
  useEffect(() => {
    camera.position.z = 2;
  }, [camera]);

  return (
    <>
      <ambientLight color={new THREE.Color(1, 1, 1)} />
      <ShaderPlane />
      <OrbitControls />
    </>
  );
}

// Main component that wraps everything
export default function ThreeFiberScene() {
  return (
    <Canvas
      gl={{
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      }}
      style={{ width: "100%", height: "100vh" }}
    >
      <Scene />
    </Canvas>
  );
}
