'use client'
import React from "react";
import { useState, useEffect } from "react";
import styles from './Page.module.scss'
import { comfortaa } from "../../lib/fonts";
import { projectWithInfo } from "../../lib/prisma";
import ProjectCard from "../../components/layout/ProjectCard";
import Hypertext from "../../components/ui/Hypertext";
import { motion } from "framer-motion";

async function getAllProjects() {
  const res = await fetch(`../api/projects`);
  const data = await res.json();
  return data;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const Project = () => {
  const [projects, setProjects] = useState<projectWithInfo[]>([]);

  useEffect(() => {
    getAllProjects().then((data) => setProjects(data));
  }, []);

  return (
    <main className={comfortaa.className}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Hypertext text="PROJECTS" style={{ margin: 0 }} />
        </div>
      </div>
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate={projects.length > 0 ? "visible" : "hidden"}
      >
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p style={{ fontWeight: "400", opacity: 0.5 }}>Loading...</p>
        )}
      </motion.div>
    </main>
  );
};

export default Project;
