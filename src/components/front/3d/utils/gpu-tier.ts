import { getGPUTier } from "detect-gpu";

export interface ParticleSettings {
  size: number;
  tier: 0 | 1 | 2 | 3;
  maxDpr: number;
  antialias: boolean;
  glassSamples: number;
  glassResolution: number;
}

const settingsByTier: Record<ParticleSettings["tier"], ParticleSettings> = {
  0: {
    tier: 0,
    size: 45,
    maxDpr: 1,
    antialias: false,
    glassSamples: 1,
    glassResolution: 256,
  },
  1: {
    tier: 1,
    size: 91,
    maxDpr: 1,
    antialias: false,
    glassSamples: 2,
    glassResolution: 384,
  },
  2: {
    tier: 2,
    size: 181,
    maxDpr: 1.25,
    antialias: true,
    glassSamples: 3,
    glassResolution: 512,
  },
  3: {
    tier: 3,
    size: 272,
    maxDpr: 1.5,
    antialias: true,
    glassSamples: 4,
    glassResolution: 768,
  },
};

export const getGPUSettings = async (): Promise<ParticleSettings> => {
  try {
    const gpuTier = await getGPUTier();
    const tier = Math.min(3, Math.max(0, gpuTier.tier)) as ParticleSettings["tier"];
    return settingsByTier[tier];
  } catch {
    // If benchmarking is unavailable, use the cheapest scene rather than
    // guessing that the device can sustain a more expensive configuration.
    return settingsByTier[0];
  }
};
