import { useRef, useMemo, useEffect } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { vertexParticles, simFragment } from "./droom-shaders";
import { simVertex } from "../front/3d/shaders/sim-vertex";
import { fragment } from "./shader";

export const DroomParticles = () => {
  const points = useRef<THREE.Points>(null);
  const SIZE = 256;

  // Set up FBO scene and camera
  const FBOSetup = () => {
    const fboScene = new THREE.Scene();
    const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    fboCamera.position.set(0, 0, 0.5);
    fboCamera.lookAt(0, 0, 0);
    return { fboScene, fboCamera };
  };

  // Create position texture
  const createPositionTexture = (size: number) => {
    const data = new Float32Array(size * size * 4);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = (i * size + j) * 4;
        const theta = Math.random() * Math.PI * 2;
        const r = 0.5 + Math.random() * 0.5;
        data[index] = Math.cos(theta) * r; // X position
        data[index + 1] = Math.sin(theta) * r; // Y position
        data[index + 2] = 0.0; // Z position
        data[index + 3] = 1.0; // W component
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

  // Create velocity texture
  const createVelocityTexture = (size: number) => {
    const data = new Float32Array(size * size * 4);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = (i * size + j) * 4;
        data[index] = (Math.random() - 0.5) * 0.02; // X velocity
        data[index + 1] = (Math.random() - 0.5) * 0.02; // Y velocity
        data[index + 2] = 0.0; // Z velocity
        data[index + 3] = Math.random() * 0.5; // Velocity magnitude
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

  // Create vector field texture
  const createVectorFieldTexture = (size: number) => {
    const data = new Float32Array(size * size * 4);
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = (i * size + j) * 4;
        data[index] = Math.random() * 2 - 1; // X direction
        data[index + 1] = Math.random() * 2 - 1; // Y direction
        data[index + 2] = 0.0; // Z direction
        data[index + 3] = Math.random(); // Time offset
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

  // Generate particle attributes
  const generateParticleAttributes = (size: number) => {
    const count = size * size;
    const positions = new Float32Array(count * 3);
    const uvs = new Float32Array(count * 2);
    const particlesUVArray = new Float32Array(count * 2);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const index = i * size + j;

        // Position data (will be replaced by texture data, but needed for initial setup)
        positions[index * 3] = 0;
        positions[index * 3 + 1] = 0;
        positions[index * 3 + 2] = 0;

        // Standard UVs
        uvs[index * 2] = i / (size - 1);
        uvs[index * 2 + 1] = j / (size - 1);

        // Special UVs for texture lookup
        particlesUVArray[index * 2] = i / (size - 1);
        particlesUVArray[index * 2 + 1] = j / (size - 1);
      }
    }

    return { positions, uvs, particlesUVArray };
  };

  // Initialize memoized resources
  const { fboScene, fboCamera } = useMemo(() => FBOSetup(), []);
  const positionTexture = useMemo(() => createPositionTexture(SIZE), []);
  const velocityTexture = useMemo(() => createVelocityTexture(SIZE), []);
  const vectorFieldTexture = useMemo(() => createVectorFieldTexture(SIZE), []);
  const { positions, uvs, particlesUVArray } = useMemo(
    () => generateParticleAttributes(SIZE),
    []
  );

  // Create FBO references
  const fbo1Ref = useRef<THREE.WebGLRenderTarget | null>(null);
  const fbo2Ref = useRef<THREE.WebGLRenderTarget | null>(null);
  const pingPongRef = useRef(true);

  // Create FBOs
  const fbo1 = useFBO({
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    depthBuffer: false,
  });

  const fbo2 = useFBO({
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    depthBuffer: false,
  });

  // Set up FBO refs after mounting
  useEffect(() => {
    fbo1Ref.current = fbo1;
    fbo2Ref.current = fbo2;
  }, [fbo1, fbo2]);

  // Define uniforms for simulation and rendering
  const simulationUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDeltaTime: { value: 0.016 },
      uPositions: { value: positionTexture },
      uVelocity: { value: velocityTexture },
      uVectorField: { value: vectorFieldTexture },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseClicked: { value: false },
      resolution: {
        value: new THREE.Vector4(SIZE, SIZE, 1.0 / SIZE, 1.0 / SIZE),
      },
    }),
    [positionTexture, velocityTexture, vectorFieldTexture]
  );

  const renderUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPositions: { value: null as THREE.Texture | null },
      uVelocity: { value: velocityTexture },
      uVectorField: { value: vectorFieldTexture },
      uScale: { value: new THREE.Vector2(1.0, 1.0) },
      uPointSize: { value: 4.0 },
      uBaseColor: { value: new THREE.Color(0.05, 0.2, 0.5) },
      uAccentColor: { value: new THREE.Color(0.6, 0.8, 1.0) },
    }),
    [velocityTexture, vectorFieldTexture]
  );

  const lastTime = useRef(0);
  const isFirstFrame = useRef(true);

  // Main render loop
  useFrame(({ gl, scene, camera, clock }) => {
    if (!points.current || !fbo1Ref.current || !fbo2Ref.current) return;

    const currentTime = clock.getElapsedTime();
    const deltaTime = currentTime - lastTime.current;
    lastTime.current = currentTime;

    // Update time uniforms
    simulationUniforms.uTime.value = currentTime;
    simulationUniforms.uDeltaTime.value = Math.min(deltaTime, 0.032); // Cap at ~30fps to avoid large steps
    renderUniforms.uTime.value = currentTime;

    // Determine which FBOs to use based on ping-pong state
    const sourceTarget = pingPongRef.current
      ? fbo2Ref.current
      : fbo1Ref.current;
    const destTarget = pingPongRef.current ? fbo1Ref.current : fbo2Ref.current;

    // Set source texture for simulation
    if (isFirstFrame.current) {
      simulationUniforms.uPositions.value = positionTexture;
      isFirstFrame.current = false;
    } else {
      simulationUniforms.uPositions.value =
        sourceTarget.texture as THREE.DataTexture;
    }

    // Render simulation step to destTarget
    gl.setRenderTarget(destTarget);
    gl.render(fboScene, fboCamera);
    gl.setRenderTarget(null);

    // Update particles with simulation result
    renderUniforms.uPositions.value = destTarget.texture;

    // Render visible scene
    gl.render(scene, camera);

    // Toggle ping-pong state for next frame
    pingPongRef.current = !pingPongRef.current;
  });

  return (
    <>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
          <bufferAttribute
            attach="attributes-particlesUVArray"
            args={[particlesUVArray, 2]}
          />
        </bufferGeometry>
        <rawShaderMaterial
          fragmentShader={simFragment}
          vertexShader={vertexParticles}
          uniforms={renderUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Simulation plane (rendered to FBO) */}
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            fragmentShader={simFragment}
            vertexShader={simVertex}
            uniforms={simulationUniforms}
          />
        </mesh>,
        fboScene
      )}

      {/* Invisible interaction plane */}
      <mesh
        position={[0, 0, 1]}
        onPointerMove={(e) => {
          simulationUniforms.uMouse.value.set(e.point.x, e.point.y);
        }}
        onPointerDown={() => {
          simulationUniforms.uMouseClicked.value = true;
        }}
        onPointerUp={() => {
          simulationUniforms.uMouseClicked.value = false;
        }}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </>
  );
};

export default DroomParticles;
