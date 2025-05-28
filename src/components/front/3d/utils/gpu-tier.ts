import { getGPUTier } from "detect-gpu";

export interface ParticleSettings {
  size: number;
}

export const getGPUSettings = async (): Promise<ParticleSettings> => {
  const gpuTier = await getGPUTier();

  // Default settings for different tiers - only adjusting particle count
  const settings: Record<number, ParticleSettings> = {
    0: { size: 64 }, // Low-end or fallback
    1: { size: 128 }, // Mid-range
    2: { size: 256 }, // High-end
    3: { size: 384 }, // Top-tier
  };

  // Get settings based on GPU tier, fallback to tier 1 if not found
  return settings[gpuTier.tier] || settings[1];
};
