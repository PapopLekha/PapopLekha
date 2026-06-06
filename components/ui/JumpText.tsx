"use client";
import React from "react";
import { useSpring, animated } from "@react-spring/web";
import { config } from "@react-spring/web";
import { useState } from "react";
import styles from "../../styles/Components.module.scss";
import { useEffect } from "react";
type Prototype = {
  text: string;
};

const AnimatedDiv = animated.div as React.ComponentType<{ children?: React.ReactNode; className?: string; style?: any }>;

const JumpText: React.FC<Prototype> = (props) => {
  const { text } = props;
  const [sine, setSine] = useState(0);

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setSine(Math.sin(iteration)-1);
      iteration += 0.2;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const { transform } = useSpring({
    transform: `translateY(${sine *0.8}rem)`,
    config: config.wobbly,
  });

  return (
  <AnimatedDiv className={styles.jumpText} style={{transform}}>{text}</AnimatedDiv>
  );
};

export default JumpText;
