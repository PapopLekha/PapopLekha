import { projectWithInfo } from "../../lib/prisma";
import Image from "next/image";
import styles from "../../styles/Components.module.scss";
import { comfortaa, roboto_mono } from "../../lib/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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

const ProjectBanner = ({ project }: { project: projectWithInfo }) => {
  return (
    <Link className={styles.project} href="">
      {/* <Link className={styles.project} href={`/project/${project.name}`} > */}
      <div className={styles.project__image}>
        <Image
          src={project.image ? project.image : ""}
          alt={project.image ? project.name : ""}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div
        className={styles.project__info}
        style={{ color: "#ECEFF4" }}
      >
        <p className={`${styles.project__date} ${roboto_mono.className}`}>
          {MONTH[new Date(project.date).getMonth()]}{" "}
          {new Date(project.date).getFullYear()}
        </p>
        <h1 className={`${styles.project__title} ${comfortaa.className}`}>
          {project.name}
          {project.url && (
            <Link href={project.url} passHref>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          )}
        </h1>
        <div className={styles.project__links}>
          <div className={styles.project__tags}>
            {project.tags &&
              project.tags.map((tag: any) => (
                <p key={tag.id} style={{ fontWeight: '400' }} className={styles.project__tag}>
                  {tag.name}
                </p>
              ))}
          </div>
          <div className={styles.project__tags}>
            {project.source && (
              <Link href={project.source} passHref>
                <FontAwesomeIcon icon={faGithub} />
              </Link>
            )}
          </div>
        </div>
        <p className={styles.project__description}>{project.description}</p>
        <div
          className={styles.project__line}
          style={{ backgroundColor: "var(--color-background)" }}
        ></div>
      </div>
    </Link >
  );
};

export default ProjectBanner;
