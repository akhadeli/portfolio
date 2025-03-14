"use client";

import ThreeFiberScene from "@/components/ThreeFiberScene";

export default function ThreeExamplePage() {
  return (
    <div className="relative w-full h-screen">
      <ThreeFiberScene />

      {/* Optional overlay information */}
      <div className="absolute top-4 left-4 bg-black/50 text-white p-4 rounded">
        <h1 className="text-xl font-bold">React Three Fiber Example</h1>
        <p>A wireframe plane with custom shaders</p>
      </div>
    </div>
  );
}
