"use client";
import React from "react";
import { useState, useEffect } from "react";
import { projectWithInfo } from "../../lib/prisma";
import Image from "next/image";
import styles from "./Projects.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Hypertext from "../ui/Hypertext";
import { comfortaa, roboto_mono } from "../../lib/fonts";
import ProjectBanner from "../layout/ProjectBanner";
import { motion, type Variants } from "framer-motion";
import { useRef } from "react";
import { useCycle, useInView } from "framer-motion";

const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getAllProjects() {
  const res = await fetch(`../api/projects?highlight=1`);
  const data = await res.json();
  return data;
}

const Projects = () => {
  const [projects, setProjects] = useState<projectWithInfo[]>();
  const [highlight, setHighlight] = useState<projectWithInfo>();
  const projectRef = useRef(null);
  const isInView = useInView(projectRef, { once: true });

  const containerVariants: Variants = {
    open: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
    closed: {
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
    closed: {
      opacity: 0,
      y: "100%",
      scale: 0,
    },
  };

  useEffect(() => {
    getAllProjects().then((projects) => {
      setProjects(projects);
    });
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.side_by_side}>
        <motion.div
          layout
          initial={false}
          animate={isInView ? "open" : "closed"}
          variants={containerVariants}
          ref={projectRef}
          className={styles.wrapper}>
          {projects ?
            projects.map((project) => (
              <motion.div variants={itemVariants} key={project.id} onClick={() => setHighlight(project)}>
                <ProjectBanner project={project} />
              </motion.div>
            )) :
            <p style={{ fontWeight: '400' }}>loading...</p>
          }
        </motion.div>
        <div className={styles.display}>
          {
            highlight ?
              <motion.div layout className={styles.card}>
                <div className={styles.banner}>
                  {highlight.image && (
                    <Image src={highlight.image} alt={highlight.name} fill style={{ objectFit: "cover" }} />
                  )}
                </div>
                <div className={styles.header}>
                  <div className={styles.profile}>
                    {highlight.image && (
                      <Image
                        src={highlight.image}
                        alt={highlight.name}
                        fill
                        style={{ objectFit: "cover", borderRadius: "50%" }} />
                    )}
                  </div>
                  <div style={{ width: "90%", margin: "0% 5%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h2 className={comfortaa.className} style={{ margin: 0 }}>{highlight.name}</h2>
                    <div>
                      {highlight.url && (
                        <Link href={highlight.url} passHref>
                          <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                        </Link>
                      )}
                      {highlight.source && (
                        <Link href={highlight.source} passHref>
                          <FontAwesomeIcon icon={faGithub} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className={styles.description}>
                  <p>{highlight.description}</p>
                </div>
                <div className={styles.tags}>
                  {
                    highlight.tags &&
                    highlight.tags.map((tag: any) => (
                      <p key={tag.id} style={{ margin: "0.5em 1em", padding: "0.5em", fontWeight: '400' }} className={styles.tag}>
                        {tag.name}
                      </p>
                    ))
                  }
                </div>
              </motion.div>
              :
              <motion.div layout style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div className={styles.card} style={{ filter: "blur(1em)", margin: "-1em" }}>
                  <div className={styles.banner}>
                    <div className={styles.placeholder} />
                  </div>
                  <div className={styles.header}>
                    <div className={styles.profile}>
                      <div className={styles.placeholder} style={{ borderRadius: "50%" }} />
                    </div>
                    <div style={{ width: "90%", margin: "0% 5%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div className={styles.placeholder} />
                      <div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.description}>
                    <div className={styles.placeholder} />
                  </div>
                  <div className={styles.tags}>
                    <div className={styles.placeholder} />
                  </div>
                </div>
                <h3 style={{ position: "absolute", color: "var(--color-text-secondary)" }}>Select the project to see more</h3>
              </motion.div>
          }
        </div>
      </div>
      <Link className={styles.more} style={{ fontWeight: '700' }} href="/project" passHref>
        <Hypertext text={"EXPLORE MORE"} />
        <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </main>
  );
};

export default Projects;
