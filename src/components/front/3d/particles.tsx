import { useRef, useMemo } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { Mesh } from "three";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { simVertex } from "./shaders/sim-vertex";
import { simFragment } from "./shaders/sim-frag";
import { vertexParticles } from "./shaders/vertex-particles";
import { fragment } from "./shaders/fragment";

const FBOSetup = () => {
  const fboScene = new THREE.Scene();
  const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  //   const fboGeometry = new THREE.PlaneGeometry(2, 2);

  //   const fboTexture = FboTextureGenerator(128);

  //   const fboMaterial = new THREE.ShaderMaterial({
  //     fragmentShader: fragment,
  //     vertexShader: vertexParticles,
  //     uniforms: {
  //       uPositions: { value: fboTexture },
  //       uTime: { value: 0 },
  //       resolution: { value: new THREE.Vector4() },
  //       progress: { value: 0 },
  //     },
  //   });

  //   const fboMesh = new THREE.Mesh(fboGeometry, fboMaterial);
  //   fboScene.add(fboMesh);
  fboCamera.position.set(0, 0, 0.5);
  fboCamera.lookAt(0, 0, 0);

  //   return { fboScene, fboCamera, fboTexture, fboMesh, fboMaterial };
  return { fboScene, fboCamera };
};

// Create texture function
const FboTextureGenerator = (size: number) => {
  // Create array with 4 channels (RGBA) for each texel
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i * size + j) * 4;
      let theta = Math.random() * Math.PI * 2;
      let r = 0.5 + Math.random() * 0.5;
      // Generate random RGB values for each texel
      data[index] = Math.cos(theta) * r;
      data[index + 1] = Math.sin(theta) * r;
      data[index + 2] = 1.0;
      data[index + 3] = 1.0;
    }
  }
  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
};

const InfoTextureGenerator = (size: number) => {
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i * size + j) * 4;
      data[index] = 0.5 + Math.random();
      data[index + 1] = 0.5 + Math.random();
      data[index + 2] = 1.0;
      data[index + 3] = 1.0;
    }
  }
  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.needsUpdate = true;
  return texture;
};

const UvGenerator = (size: number) => {
  const count = size * size;
  const positions = new Float32Array(count * 3);
  const uv = new Float32Array(count * 2);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = i + j * size;
      positions[index * 3] = Math.random();
      positions[index * 3 + 1] = Math.random();
      positions[index * 3 + 2] = 0;
      const uvIndex = i + j * size;
      uv[uvIndex * 2] = i / size;
      uv[uvIndex * 2 + 1] = j / size;
    }
  }
  return { positions, uv };
};

export function Particles() {
  const points = useRef<THREE.Points>(null);

  // Create texture only once when component mounts
  const size = 256;
  const fboTexture = useMemo(() => {
    return FboTextureGenerator(size);
  }, []);

  const infoTexture = useMemo(() => {
    return InfoTextureGenerator(size);
  }, []);

  const { positions, uv } = useMemo(() => UvGenerator(size), []);

  const { fboScene, fboCamera } = useMemo(() => FBOSetup(), []);

  const fboUniforms = useMemo(
    () => ({
      uPositions: { value: fboTexture },
      uInfo: { value: infoTexture },
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      progress: { value: 0 },
    }),
    [fboTexture, infoTexture]
  );
  // Create time uniform reference
  const uniforms = useMemo(
    () => ({
      uPositions: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      progress: { value: 0 },
    }),
    [fboTexture]
  );

  let fbo1 = useFBO(1024, 1024, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
  });

  let fbo2 = useFBO(1024, 1024, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
  });

  // Update time uniform
  const isFirstFrameRef = useRef(true);

  useFrame(({ gl, scene, camera, clock }) => {
    if (points.current) {
      // Update time values
      fboUniforms.uTime.value = clock.getElapsedTime();
      uniforms.uTime.value = clock.getElapsedTime();

      // For the first frame, use the original texture data
      // For subsequent frames, use the previous simulation result
      if (isFirstFrameRef.current) {
        console.log(fboUniforms.uPositions.value);
        fboUniforms.uPositions.value = fboTexture;
        isFirstFrameRef.current = false;
      } else {
        fboUniforms.uPositions.value = fbo2.texture as THREE.DataTexture;
      }
      // Use the simulation result (fbo1) for particles
      uniforms.uPositions.value = fbo1.texture as THREE.Texture;

      // Render simulation to fbo1
      gl.setRenderTarget(fbo1);
      gl.render(fboScene, fboCamera);
      gl.setRenderTarget(null);

      // Render the scene
      gl.render(scene, camera);

      // Swap FBOs for next frame
      const temp = fbo1;
      fbo1 = fbo2;
      fbo2 = temp;
    }
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-uv" args={[uv, 2]} />
        </bufferGeometry>
        <shaderMaterial
          side={THREE.DoubleSide}
          fragmentShader={fragment}
          vertexShader={vertexParticles}
          uniforms={uniforms}
          transparent={true}
        />
      </points>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            fragmentShader={simFragment}
            vertexShader={simVertex}
            uniforms={fboUniforms}
          />
        </mesh>,
        fboScene
      )}
    </>
  );
}
