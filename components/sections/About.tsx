"use client";
import styles from "./About.module.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Carousel from "../ui/Carousel";
import type { EmblaOptionsType } from "embla-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Hypertext from "../ui/Hypertext";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { comfortaa } from "../../lib/fonts";
const About = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: window.innerWidth - e.clientX * 1.2,
        y: window.innerHeight - e.clientY * 1.1,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={styles.about} >
      {/* <div className={styles.about} style={{transform:`translate(${mousePos.x * 0.02}px,${mousePos.y * 0.02}px)`}}> */}
      <p>HI! I'M POP</p>
      <h1 className={comfortaa.className} >Papop Lekhapanyaporn</h1>
      <h2 className={comfortaa.className}>Software Developer</h2>
      <p className={styles.introduction}>
        I'm a self taught developer with a B.Sc. in Computer Science.
        I have a huge interest in High Performance Computing and Distributed Systems!
      </p>
      <p className={styles.introduction}>
        I recently graduated and am now working as an HPC System Engineer, where I'm part of a team migrating legacy cluster management to an Ansible-based solution.
        I'm also interested in building small projects and helping beginners get into coding.
      </p>
      <p className={styles.introduction}>
        Coding is my passion and I love to learn new things!
      </p>
    </div>
  );
};
export default About;
