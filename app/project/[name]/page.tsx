'use client'
import { use, useEffect, useState } from "react";
import { comfortaa, roboto_mono } from "../../../lib/fonts";
import styles from "./Page.module.scss";
import Image from "next/image";
import Link from "next/link";
import { projectWithInfo } from "../../../lib/prisma";
import Hypertext from "../../../components/ui/Hypertext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

async function getProject(name: string) {
  const res = await fetch(`/api/project?name=${name}`);
  if (!res.ok) return null;
  return res.json();
}

export default function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [project, setProject] = useState<projectWithInfo | null>(null);

  useEffect(() => {
    getProject(name).then((data) => setProject(data));
  }, [name]);

  return (
    <main className={`${comfortaa.className} ${styles.page}`}>
      {/* Banner */}
      <div className={styles.banner}>
        {project?.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        )}
        <div className={styles.bannerMeta}>
          <div className={styles.bannerTitle}>
            <Hypertext text={(project?.name ?? name).toUpperCase()} style={{ margin: 0, color: "#ECEFF4" }} />
          </div>
          {project?.role && <p>{project.role}</p>}
        </div>
      </div>

      {/* Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Back link */}
        <Link href="/project" className={`${styles.linkBtn} ${roboto_mono.className}`} style={{ alignSelf: "flex-start" }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          All Projects
        </Link>

        <hr className={styles.divider} />

        {/* Meta: date + tags */}
        <div className={styles.metaRow}>
          {project?.date && (
            <p className={`${styles.date} ${roboto_mono.className}`}>
              {MONTH[new Date(project.date).getMonth()]} {new Date(project.date).getFullYear()}
            </p>
          )}
          {project?.tags && project.tags.length > 0 && (
            <div className={styles.tags}>
              {project.tags.map((tag: any) => (
                <span key={tag.id} className={styles.tag}>{tag.name}</span>
              ))}
            </div>
          )}
        </div>

        {/* External links */}
        {(project?.url || project?.source) && (
          <div className={styles.linkRow}>
            {project.url && (
              <Link href={project.url} target="_blank" className={`${styles.linkBtn} ${roboto_mono.className}`}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                Website
              </Link>
            )}
            {project.source && (
              <Link href={project.source} target="_blank" className={`${styles.linkBtn} ${roboto_mono.className}`}>
                <FontAwesomeIcon icon={faGithub} />
                Source
              </Link>
            )}
          </div>
        )}

        <hr className={styles.divider} />

        {/* Description */}
        {project?.projdesc && (
          <div className={styles.section}>
            <h2>Description</h2>
            <p>{project.projdesc}</p>
          </div>
        )}

        {/* Project Goal */}
        {project?.projgoal && (
          <div className={styles.section}>
            <h2>Project Goal</h2>
            <p>{project.projgoal}</p>
          </div>
        )}

        {/* Personal Contribution */}
        {project?.projpers && (
          <div className={styles.section}>
            <h2>My Contribution</h2>
            <p>{project.projpers}</p>
          </div>
        )}

        {/* Technologies */}
        {project?.technologies && project.technologies.length > 0 && (
          <div className={styles.section}>
            <h2>Tech Stack</h2>
            <div className={styles.tags}>
              {project.technologies.map((tech: any) => (
                <span key={tech.name} className={styles.tag}>{tech.name}</span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </main>
  );
}
