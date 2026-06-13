import { useEffect, useRef, useMemo, useState, useLayoutEffect } from "react";
import { useFrame, createPortal } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { simVertex } from "./shaders/sim-vertex";
import { simFragment } from "./shaders/sim-frag";
import { vertexParticles } from "./shaders/vertex-particles";
import { fragment } from "./shaders/fragment";
import { getGPUSettings, type ParticleSettings } from "./utils/gpu-tier";
// import { vertex as vertexParticles, fragment } from "./shaders/droom-shaders";

const FBOSetup = () => {
  const fboScene = new THREE.Scene();
  const fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
  fboCamera.position.set(0, 0, 0.5);
  fboCamera.lookAt(0, 0, 0);

  return { fboScene, fboCamera };
};

const FboTextureGenerator = (size: number) => {
  const data = new Float32Array(size * size * 4);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const index = (i * size + j) * 4;
      const theta = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.5;

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

export function Particles({ active = true }: { active?: boolean }) {
  const [gpuSettings, setGpuSettings] = useState<ParticleSettings | null>(null);

  useLayoutEffect(() => {
    let cancelled = false;

    const initGPU = async () => {
      const settings = await getGPUSettings();
      if (!cancelled) setGpuSettings(settings);
    };

    initGPU();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!gpuSettings) return null;

  return <ParticleSystem active={active} settings={gpuSettings} />;
}

function ParticleSystem({
  active,
  settings,
}: {
  active: boolean;
  settings: ParticleSettings;
}) {
  const points = useRef<THREE.Points>(null);
  const simMaterial = useRef<THREE.ShaderMaterial>(null);
  const renderMaterial = useRef<THREE.ShaderMaterial>(null);

  const fboTexture = useMemo(() => {
    return FboTextureGenerator(settings.size);
  }, [settings.size]);

  const infoTexture = useMemo(() => {
    return InfoTextureGenerator(settings.size);
  }, [settings.size]);

  const { positions, uv } = useMemo(
    () => UvGenerator(settings.size),
    [settings.size]
  );

  const { fboScene, fboCamera } = useMemo(() => FBOSetup(), []);

  const fboUniforms = useMemo(
    () => ({
      uPositions: { value: fboTexture },
      uInfo: { value: infoTexture },
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      progress: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseClicked: { value: false },
    }),
    [fboTexture, infoTexture]
  );

  const uniforms = useMemo(
    () => ({
      uPositions: { value: null as THREE.Texture | null },
      uTime: { value: 0 },
      resolution: { value: new THREE.Vector4() },
      progress: { value: 0 },
    }),
    []
  );

  const fbo1 = useFBO(settings.size, settings.size, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });

  const fbo2 = useFBO(settings.size, settings.size, {
    type: THREE.FloatType,
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    depthBuffer: false,
    stencilBuffer: false,
    generateMipmaps: false,
  });

  const pingPongRef = useRef(true);
  const isFirstFrameRef = useRef(true);

  useEffect(() => {
    return () => {
      fboTexture.dispose();
      infoTexture.dispose();
    };
  }, [fboTexture, infoTexture]);

  useFrame(({ gl, clock }) => {
    if (
      active &&
      points.current &&
      simMaterial.current &&
      renderMaterial.current
    ) {
      const simUniforms = simMaterial.current.uniforms;
      const renderUniforms = renderMaterial.current.uniforms;
      const sourceTarget = pingPongRef.current ? fbo2 : fbo1;
      const destTarget = pingPongRef.current ? fbo1 : fbo2;

      simUniforms.uTime.value += 0.05;
      renderUniforms.uTime.value = clock.getElapsedTime();

      if (isFirstFrameRef.current) {
        simUniforms.uPositions.value = fboTexture;
        isFirstFrameRef.current = false;
      } else {
        simUniforms.uPositions.value = sourceTarget.texture;
      }
      renderUniforms.uPositions.value = destTarget.texture;

      const previousRenderTarget = gl.getRenderTarget();

      gl.setRenderTarget(destTarget);
      gl.render(fboScene, fboCamera);
      gl.setRenderTarget(previousRenderTarget);

      pingPongRef.current = !pingPongRef.current;
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
          ref={renderMaterial}
          fragmentShader={fragment}
          vertexShader={vertexParticles}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
        />
      </points>
      {createPortal(
        <mesh>
          <planeGeometry args={[2, 2]} />
          <shaderMaterial
            ref={simMaterial}
            fragmentShader={simFragment}
            vertexShader={simVertex}
            uniforms={fboUniforms}
          />
        </mesh>,
        fboScene as unknown as Parameters<typeof createPortal>[1]
      )}
      <mesh
        position={[0, 0, 1]}
        onPointerMove={(e) => {
          simMaterial.current?.uniforms.uMouse.value.set(e.point.x, e.point.y);
        }}
        onPointerDown={() => {
          if (simMaterial.current)
            simMaterial.current.uniforms.uMouseClicked.value = true;
        }}
        onPointerUp={() => {
          if (simMaterial.current)
            simMaterial.current.uniforms.uMouseClicked.value = false;
        }}
      >
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial
          colorWrite={false}
          depthWrite={false}
          depthTest={false}
        />
      </mesh>
    </>
  );
}
