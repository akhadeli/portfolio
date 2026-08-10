"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Box, CircleDot, Grid3X3, Pause, Play, Sparkles, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PARTICLE_COUNT = 18000;

const SHAPES = [
  { label: "Banner", icon: Type },
  { label: "Orb", icon: CircleDot },
  { label: "Torus", icon: Box },
  { label: "Field", icon: Grid3X3 },
] as const;

const GLYPHS: Record<string, string[]> = {
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  H: ["10001", "10001", "10001", "11111", "10001", "10001", "10001"],
  I: ["11111", "00100", "00100", "00100", "00100", "00100", "11111"],
  K: ["10001", "10010", "10100", "11000", "10100", "10010", "10001"],
  L: ["10000", "10000", "10000", "10000", "10000", "10000", "11111"],
};

const vertexShader = `
  uniform float uTime;
  uniform float uMorph;
  uniform float uFrom;
  uniform float uTo;
  uniform float uPointSize;
  uniform float uDpr;

  attribute vec3 aText;
  attribute vec3 aOrb;
  attribute vec3 aTorus;
  attribute vec3 aField;
  attribute vec4 aSeed;

  varying vec3 vColor;
  varying float vAlpha;

  vec3 shapeAt(float index) {
    if (index < 0.5) return aText;
    if (index < 1.5) return aOrb;
    if (index < 2.5) return aTorus;
    return aField;
  }

  void main() {
    float eased = uMorph * uMorph * (3.0 - 2.0 * uMorph);
    vec3 fromPosition = shapeAt(uFrom);
    vec3 toPosition = shapeAt(uTo);
    vec3 morphed = mix(fromPosition, toPosition, eased);

    float transitionEnergy = sin(eased * 3.141592653589793);
    vec3 scatterDirection = normalize(vec3(
      sin(aSeed.x * 6.28318),
      cos(aSeed.y * 6.28318),
      sin(aSeed.z * 6.28318)
    ));

    morphed += scatterDirection * transitionEnergy * (0.16 + aSeed.w * 0.12);
    morphed.y += sin(uTime * (0.7 + aSeed.z) + aSeed.x * 14.0) * 0.018;

    vec4 mvPosition = modelViewMatrix * vec4(morphed, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    float perspective = 1.0 / max(0.45, -mvPosition.z);
    gl_PointSize = uPointSize * uDpr * perspective * (0.72 + aSeed.w * 0.65);

    vec3 cool = vec3(0.45, 0.78, 1.0);
    vec3 gold = vec3(1.0, 0.73, 0.34);
    vec3 mint = vec3(0.48, 1.0, 0.78);
    vec3 violet = vec3(0.78, 0.58, 1.0);
    vec3 horizontal = mix(cool, gold, smoothstep(-2.5, 2.5, morphed.x));
    vec3 vertical = mix(mint, violet, smoothstep(-1.3, 1.3, morphed.y));

    vColor = mix(horizontal, vertical, 0.28 + 0.22 * sin(uTime + aSeed.y * 6.28318));
    vColor += transitionEnergy * vec3(0.18, 0.14, 0.08);
    vAlpha = 0.62 + transitionEnergy * 0.28;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 point = gl_PointCoord - 0.5;
    float distanceToCenter = length(point);
    float particle = smoothstep(0.5, 0.08, distanceToCenter);
    float core = smoothstep(0.18, 0.0, distanceToCenter);

    if (particle < 0.02) discard;

    vec3 color = vColor + core * 0.45;
    gl_FragColor = vec4(color, particle * vAlpha);
  }
`;

type ParticleTargets = {
  position: Float32Array;
  text: Float32Array;
  orb: Float32Array;
  torus: Float32Array;
  field: Float32Array;
  seeds: Float32Array;
};

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTextCells(text: string) {
  const cells: Array<{ x: number; y: number }> = [];
  let offsetX = 0;

  for (const character of text) {
    const glyph = GLYPHS[character] ?? GLYPHS.A;

    glyph.forEach((row, y) => {
      [...row].forEach((value, x) => {
        if (value === "1") cells.push({ x: offsetX + x, y });
      });
    });

    offsetX += 6;
  }

  return { cells, width: Math.max(1, offsetX - 1), height: 7 };
}

function createTargets(count: number): ParticleTargets {
  const random = mulberry32(1327);
  const text = new Float32Array(count * 3);
  const orb = new Float32Array(count * 3);
  const torus = new Float32Array(count * 3);
  const field = new Float32Array(count * 3);
  const seeds = new Float32Array(count * 4);
  const position = new Float32Array(count * 3);
  const textCells = buildTextCells("AKHADELI");
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const fieldColumns = Math.ceil(Math.sqrt(count * 1.8));
  const fieldRows = Math.ceil(count / fieldColumns);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const i4 = i * 4;
    const seedX = random();
    const seedY = random();
    const seedZ = random();
    const seedW = random();

    seeds[i4] = seedX;
    seeds[i4 + 1] = seedY;
    seeds[i4 + 2] = seedZ;
    seeds[i4 + 3] = seedW;

    const cell = textCells.cells[Math.floor(random() * textCells.cells.length)];
    const textX = ((cell.x + random()) / textCells.width - 0.5) * 5.2;
    const textY = (0.5 - (cell.y + random()) / textCells.height) * 1.45;
    const textZ = Math.sin(textX * 1.8) * 0.08 + (random() - 0.5) * 0.22;

    text[i3] = textX;
    text[i3 + 1] = textY;
    text[i3 + 2] = textZ;

    const sphereT = (i + 0.5) / count;
    const sphereY = 1 - 2 * sphereT;
    const sphereRadius = Math.sqrt(Math.max(0, 1 - sphereY * sphereY));
    const sphereTheta = goldenAngle * i;
    const orbRadius = 1.55 + 0.12 * Math.sin(seedX * Math.PI * 2);

    orb[i3] = Math.cos(sphereTheta) * sphereRadius * orbRadius;
    orb[i3 + 1] = sphereY * orbRadius;
    orb[i3 + 2] = Math.sin(sphereTheta) * sphereRadius * orbRadius;

    const torusU = seedX * Math.PI * 2;
    const torusV = ((i * 0.38196601125) % 1) * Math.PI * 2;
    const major = 1.38;
    const minor = 0.43 + 0.06 * Math.sin(seedZ * Math.PI * 2);

    torus[i3] = (major + minor * Math.cos(torusV)) * Math.cos(torusU);
    torus[i3 + 1] = minor * Math.sin(torusV);
    torus[i3 + 2] = (major + minor * Math.cos(torusV)) * Math.sin(torusU);

    const column = i % fieldColumns;
    const row = Math.floor(i / fieldColumns);
    const fieldX = (column / Math.max(1, fieldColumns - 1) - 0.5) * 4.8;
    const fieldY = (row / Math.max(1, fieldRows - 1) - 0.5) * 2.45;
    const fieldZ =
      Math.sin(fieldX * 1.65 + seedX * 2.2) * 0.32 +
      Math.cos(fieldY * 3.8 + seedY * 4.4) * 0.24;

    field[i3] = fieldX;
    field[i3 + 1] = fieldY;
    field[i3 + 2] = fieldZ;

    position[i3] = textX;
    position[i3 + 1] = textY;
    position[i3 + 2] = textZ;
  }

  return { position, text, orb, torus, field, seeds };
}

function MorphParticles({ targetIndex }: { targetIndex: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const fromShape = useRef(0);
  const toShape = useRef(0);
  const morphProgress = useRef(1);
  const targets = useMemo(() => createTargets(PARTICLE_COUNT), []);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 1 },
      uFrom: { value: 0 },
      uTo: { value: 0 },
      uPointSize: { value: 24 },
      uDpr: { value: 1 },
    }),
    []
  );

  useEffect(() => {
    if (targetIndex === toShape.current) return;

    fromShape.current = toShape.current;
    toShape.current = targetIndex;
    morphProgress.current = 0;

    if (materialRef.current) {
      materialRef.current.uniforms.uFrom.value = fromShape.current;
      materialRef.current.uniforms.uTo.value = toShape.current;
      materialRef.current.uniforms.uMorph.value = 0;
    }
  }, [targetIndex]);

  useFrame((state, delta) => {
    const material = materialRef.current;
    const points = pointsRef.current;

    if (!material || !points) return;

    morphProgress.current = Math.min(1, morphProgress.current + delta * 0.7);
    material.uniforms.uTime.value = state.clock.getElapsedTime();
    material.uniforms.uMorph.value = morphProgress.current;
    material.uniforms.uDpr.value = state.viewport.dpr;

    points.rotation.y = Math.sin(state.clock.elapsedTime * 0.25) * 0.12 + state.pointer.x * 0.12;
    points.rotation.x = -state.pointer.y * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[targets.position, 3]} />
        <bufferAttribute attach="attributes-aText" args={[targets.text, 3]} />
        <bufferAttribute attach="attributes-aOrb" args={[targets.orb, 3]} />
        <bufferAttribute attach="attributes-aTorus" args={[targets.torus, 3]} />
        <bufferAttribute attach="attributes-aField" args={[targets.field, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[targets.seeds, 4]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function MorphScene({ targetIndex }: { targetIndex: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 46 }}
      dpr={[1, 1.75]}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={["#000000"]} />
      <MorphParticles targetIndex={targetIndex} />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        enablePan={false}
        minDistance={4.2}
        maxDistance={8}
      />
    </Canvas>
  );
}

export default function ParticleMorphLab() {
  const [targetIndex, setTargetIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = window.setInterval(() => {
      setTargetIndex((current) => (current + 1) % SHAPES.length);
    }, 4300);

    return () => window.clearInterval(timer);
  }, [autoPlay]);

  const selectShape = useCallback((index: number) => {
    setTargetIndex(index);
    setAutoPlay(false);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute inset-0 [background:linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0)_38%,rgba(0,0,0,0.32)_100%)]" />

      <div className="absolute inset-0 [&_canvas]:h-full [&_canvas]:w-full">
        <MorphScene targetIndex={targetIndex} />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div>
          <div className="text-sm font-light uppercase tracking-[0.28em] text-foreground">
            Particle Morph Lab
          </div>
          <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {SHAPES[targetIndex].label}
          </div>
        </div>

        <Button
          type="button"
          size="icon"
          variant="outline"
          title={autoPlay ? "Pause morph cycle" : "Play morph cycle"}
          aria-label={autoPlay ? "Pause morph cycle" : "Play morph cycle"}
          aria-pressed={autoPlay}
          className="pointer-events-auto border-white/20 bg-black/45 text-white backdrop-blur hover:bg-white hover:text-black"
          onClick={() => setAutoPlay((value) => !value)}
        >
          {autoPlay ? <Pause /> : <Play />}
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 pb-5 sm:pb-8">
        <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-1 border border-white/15 bg-black/55 p-1.5 backdrop-blur-md">
          {SHAPES.map((shape, index) => {
            const Icon = shape.icon;
            const isActive = targetIndex === index;

            return (
              <Button
                key={shape.label}
                type="button"
                variant="ghost"
                size="sm"
                title={shape.label}
                aria-pressed={isActive}
                className={cn(
                  "h-9 flex-1 gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground hover:bg-white/10 hover:text-white",
                  isActive && "bg-white text-black hover:bg-white hover:text-black"
                )}
                onClick={() => selectShape(index)}
              >
                <Icon className="size-3.5" />
                <span className="hidden sm:inline">{shape.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <Sparkles className="pointer-events-none absolute bottom-24 right-5 size-4 text-white/50 sm:right-8" />
    </main>
  );
}
