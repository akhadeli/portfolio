"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import styles from "./portfolio-landing.module.css";

const nexusixImages = [
    {
        src: "/images/nexusix-for-you-feed.avif",
        alt: "Nexusix For You feed",
    },
    {
        src: "/images/nexusix-profile-view.avif",
        alt: "Nexusix profile view",
    },
    {
        src: "/images/nexusix-share-interface.avif",
        alt: "Nexusix share interface",
    },
] as const;

export default function ProjectCarousel() {
    return (
        <Carousel
            className={styles.projectCarousel}
            opts={{ loop: true }}
            aria-label="Nexusix product screens"
        >
            <CarouselContent className={styles.projectCarouselTrack}>
                {nexusixImages.map((image) => (
                    <CarouselItem
                        className={styles.projectCarouselItem}
                        key={image.src}
                    >
                        <div className={styles.projectCarouselImage}>
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                sizes="(min-width: 1081px) 342px, calc(100vw - 40px)"
                            />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className={styles.carouselPrevious} />
            <CarouselNext className={styles.carouselNext} />
        </Carousel>
    );
}
