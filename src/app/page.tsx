"use client";

import Hero from "@/components/front/hero";
import { ReactLenis, useLenis } from "lenis/react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import Preloader from "@/components/front/preloader";
import Scene from "@/components/front/3d/scene";
import Image from "next/image";

export default function Home() {
  const lenis = useLenis(({ scroll }) => {});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <ReactLenis root>
      <div className="flex flex-col items-center justify-center min-h-screen gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
          {/* <AnimatePresence>{isLoading && <Preloader />}</AnimatePresence> */}
          <>
            {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full z-50">
              <div className="w-full h-full rounded-full overflow-hidden shadow-[0_0_16px_16px_white_inset]">
                <Image
                  src="/images/profile.jpeg"
                  alt="Profile picture"
                  className="object-cover w-full h-full"
                  width={300}
                  height={300}
                  priority
                />
              </div>
            </div> */}
            <div className="w-full h-screen">
              <Scene />
            </div>
          </>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
      </div>
    </ReactLenis>
  );
}
