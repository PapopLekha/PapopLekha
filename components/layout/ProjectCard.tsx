"use client";
import { projectWithInfo } from "../../lib/prisma";
import Image from "next/image";
import styles from "./ProjectCard.module.scss";
import { comfortaa, roboto_mono } from "../../lib/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const ProjectCard = ({ project }: { project: projectWithInfo }) => {
  const router = useRouter();
  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => router.push(`/project/${project.name}`)}
    >
      <div className={styles.imageWrapper}>
        {project.image && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className={styles.content}>
        <p className={`${styles.date} ${roboto_mono.className}`}>
          {MONTH[new Date(project.date).getMonth()]} {new Date(project.date).getFullYear()}
        </p>
        <div className={styles.titleRow}>
          <h3 className={`${styles.title} ${comfortaa.className}`}>{project.name}</h3>
          <div className={styles.links}>
            {project.url && (
              <Link href={project.url} passHref target="_blank" onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            )}
            {project.source && (
              <Link href={project.source} passHref target="_blank" onClick={(e) => e.stopPropagation()}>
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
          </div>
        </div>
        {project.tags && project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag: any) => (
              <span key={tag.id} className={styles.tag}>{tag.name}</span>
            ))}
          </div>
        )}
        {project.description && (
          <p className={styles.description}>{project.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
