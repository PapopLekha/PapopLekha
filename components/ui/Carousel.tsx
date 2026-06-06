"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import styles from "./Carousel.module.scss";
import Image from "next/image";
import Link from "next/link";
import { PrevButton, NextButton, DotButton } from "./Button";

type Prototype = {
  children: React.ReactNode;
  options: EmblaOptionsType;
};

const Carousel: React.FC<Prototype> = (props) => {
  const { children, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);
  // const [emblaRef, emblaApi] = useEmblaCarousel(options);
  // const [scrollProgress, setScrollProgress] = useState(0);

  // const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  // const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  // const scrollPrev = useCallback(
  //   () => emblaApi && emblaApi.scrollPrev(),
  //   [emblaApi]
  // );

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    console.log(emblaApi.scrollProgress());
  }, [emblaApi]);

  // const scrollTo = useCallback(
  //   (index: number) => emblaApi && emblaApi.scrollTo(index),
  //   [emblaApi]
  // );

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    console.log(emblaApi.scrollProgress());
  }, [emblaApi]);

  // const onSelect = useCallback(() => {
  //   if (!emblaApi) return;
  //   setPrevBtnEnabled(emblaApi.canScrollPrev());
  //   setNextBtnEnabled(emblaApi.canScrollNext());
  // }, [emblaApi]);

  // useEffect(() => {
  //   if (!emblaApi) return;
  //   onScroll();
  //   emblaApi.on("scroll", onScroll);
  //   emblaApi.on("reInit", onScroll);
  // }, [emblaApi, onScroll, onSelect]);

  return (
    <div className={styles.embla}>
      <div className={styles.viewport} ref={emblaRef}>
        <div className={styles.container} onClick={scrollNext}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
