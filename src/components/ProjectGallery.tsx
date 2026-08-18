"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const INTERVAL_MS = 5000;

type ProjectGalleryProps = {
  images: string[];
  alt: string;
};

export function ProjectGallery({ images, alt }: ProjectGalleryProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [paused, setPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const canCycle = images.length > 1;

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !canCycle || paused || reduceMotion) {
      return;
    }

    const id = window.setInterval(() => {
      api.scrollNext();
    }, INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [api, canCycle, paused, reduceMotion, selectedIndex]);

  if (images.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{ loop: canCycle, align: "start" }}
      setApi={setApi}
      className="mt-10 w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-xl border border-border">
        <CarouselContent className="ml-0">
          {images.map((src, index) => (
            <CarouselItem key={src} className="pl-0">
              <div className="relative aspect-[16/10] w-full bg-sand">
                <Image
                  src={src}
                  alt={`${alt} ${index + 1}`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </div>
      {canCycle ? (
        <>
          <CarouselPrevious className="left-3 z-10 border-border bg-background/80 hover:bg-background" />
          <CarouselNext className="right-3 z-10 border-border bg-background/80 hover:bg-background" />
        </>
      ) : null}
    </Carousel>
  );
}
