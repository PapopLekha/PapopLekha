"use client";
import { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import Typing from "../ui/Typing";
import { useChain, animated, useSpring, useSpringRef } from "@react-spring/web";
import { config } from "@react-spring/web";
import Hypertext from "../ui/Hypertext";
import JumpText from "../ui/JumpText";
import { useInView } from "react-intersection-observer";
import { roboto_mono, comfortaa } from "../../lib/fonts";

const Home = () => {

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const typingref = useSpringRef();
  const fadeinref = useSpringRef();
  const [play, setPlay] = useState<boolean>(false);
  const speed = 1000;
  const typing = useSpring({
    ref: typingref,
    config: config.gentle,
    from: { scale: 1.5 },
    delay: speed,
    to: { scale: 1 },
  });
  const fadeinup = useSpring({
    ref: fadeinref,
    config: config.gentle,
    from: { opacity: 0, transform: "translateY(200px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });
  const fadeindown = useSpring({
    ref: fadeinref,
    config: config.stiff,
    from: { opacity: 0, transform: "translateY(-200px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
  });

  useChain(inView ? [typingref, fadeinref] : [typingref,fadeinref], [0, speed / 1000]);

  return (
    <main style={{height:"100vh"}} ref={ref}>
      <animated.div className={styles.bannertop} style={{ ...fadeindown }}>
        <JumpText text="👾" />
        <div> HI! I'M POP</div>
        <JumpText text="👾" />
      </animated.div>
      <animated.div className={styles.name} style={{ ...typing }}>
        <Typing context="Papop Lekhapanyaporn" speed={speed} cursor={true} />
      </animated.div>
      <animated.div className={styles.bannertop} style={{ ...fadeinup }}>
        <Hypertext text="WELCOME TO MY WEBSITE" />
      </animated.div>
    </main>
  );
};

export default Home;
