import type { Metadata } from "next";
import ParticleMorphLab from "@/components/testing/particle-morph-lab";

export const metadata: Metadata = {
  title: "Particle Morph Lab",
  description:
    "Experimental particle morphing canvas used for private visual testing.",
  alternates: {
    canonical: "/lab/particle-morph",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ParticleMorphPage() {
  return <ParticleMorphLab />;
}
