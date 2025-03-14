"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  // useGSAP(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  //   gsap.to(slider.current, {
  //     scrollTrigger: {
  //       trigger: document.documentElement,
  //       scrub: 0.25,
  //       start: 0,
  //       end: window.innerHeight,
  //       onUpdate: (e) => (direction = e.direction * -1),
  //     },
  //     x: "-500px",
  //   });
  //   requestAnimationFrame(animate);
  // }, []);

  // const animate = () => {
  //   if (xPercent < -100) {
  //     xPercent = 0;
  //   } else if (xPercent > 0) {
  //     xPercent = -100;
  //   }
  //   gsap.set(firstText.current, { xPercent: xPercent });
  //   gsap.set(secondText.current, { xPercent: xPercent });
  //   requestAnimationFrame(animate);
  //   xPercent += 0.1 * direction;
  // };

  return (
    <div className="relative h-screen w-full flex overflow-hidden justify-center items-center">
      <div className="w-[300px] h-[300px] rounded-full overflow-hidden">
        <Image
          src="/images/profile.jpeg"
          alt="background"
          className="object-cover w-full h-full"
          width={300}
          height={300}
        />
      </div>

      {/* <div className="absolute top-[calc(100vh-350px)]">
        <div ref={slider} className="relative whitespace-nowrap">
          <p
            ref={firstText}
            className="relative m-0 text-white text-[230px] font-medium pr-[50px]"
          >
            Freelance Developer -
          </p>

          <p
            ref={secondText}
            className="absolute left-full top-0 m-0 text-white text-[230px] font-medium pr-[50px]"
          >
            Freelance Developer -
          </p>
        </div>
      </div> */}
    </div>
  );
}
