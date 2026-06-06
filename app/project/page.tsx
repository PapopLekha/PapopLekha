'use client'
import { useState, useEffect } from "react";
import styles from './Page.module.scss'
import { comfortaa } from "../../lib/fonts";
import { projectWithInfo } from "../../lib/prisma";
import ProjectCard from "../../components/layout/ProjectCard";
import CardSkeleton from "../../components/layout/CardSkeleton";
import Hypertext from "../../components/ui/Hypertext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Project() {
  const [projects, setProjects] = useState<projectWithInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("../api/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className={comfortaa.className}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Hypertext text="PROJECTS" style={{ margin: 0 }} />
        </div>
      </div>

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : projects.length === 0 ? (
        <p className={styles.empty}>Nothing here at the moment.</p>
      ) : (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      )}
    </main>
  );
}
