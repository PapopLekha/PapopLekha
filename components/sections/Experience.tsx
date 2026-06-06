'use client'

import styles from './Experience.module.scss'
import { comfortaa, montserrat, roboto_mono } from '../../lib/fonts';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { experienceEntry } from '../../lib/prisma';

const ExperienceCard = (info: experienceEntry) => {
  const { institution, role, from, to, description, logo } = info;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef);

  return (
    <motion.div
      layout
      initial={false}
      ref={containerRef}
      style={{
        transform: isInView ? "none" : "translateX(100%)",
        opacity: isInView ? 1 : 0,
        transition: "all 1s cubic-bezier(0.17, 0.55, 0.55, 1)",
      }}
      className={styles.card}
    >
      <motion.div layout className={`${styles.header} ${roboto_mono.className}`}>
        <h4>{role} @{institution}</h4>
        <motion.div layout className={styles.date}>
          <h4>{from} - {to}</h4>
        </motion.div>
      </motion.div>
      <motion.div layout className={`${styles.info} ${comfortaa.className}`}>
        <motion.div layout className={styles.description}>
          <motion.ul layout>
            {description.map((d) => (
              <motion.li key={d}><p>{d}</p></motion.li>
            ))}
          </motion.ul>
        </motion.div>
        {logo && (
          <motion.div layout className={styles.image}>
            <Image src={logo} alt={institution} fill />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

type Grouped = {
  WORK: experienceEntry[];
  EDUCATION: experienceEntry[];
  ORGANISATION: experienceEntry[];
};

const Experience = () => {
  const [grouped, setGrouped] = useState<Grouped>({ WORK: [], EDUCATION: [], ORGANISATION: [] });

  useEffect(() => {
    fetch('/api/experience')
      .then((r) => r.json())
      .then((entries: experienceEntry[]) => {
        const g: Grouped = { WORK: [], EDUCATION: [], ORGANISATION: [] };
        entries.forEach((e) => g[e.type].push(e));
        setGrouped(g);
      });
  }, []);

  return (
    <main className={styles.main}>
      {grouped.WORK.length > 0 && (
        <motion.div layout className={styles.wrapper}>
          <h2 className={comfortaa.className}>Work</h2>
          {grouped.WORK.map((e) => <ExperienceCard key={e.id} {...e} />)}
        </motion.div>
      )}
      {grouped.EDUCATION.length > 0 && (
        <motion.div layout className={styles.wrapper}>
          <h2 className={comfortaa.className}>Education</h2>
          {grouped.EDUCATION.map((e) => <ExperienceCard key={e.id} {...e} />)}
        </motion.div>
      )}
      {grouped.ORGANISATION.length > 0 && (
        <motion.div layout className={styles.wrapper}>
          <h2 className={comfortaa.className}>Organisation</h2>
          {grouped.ORGANISATION.map((e) => <ExperienceCard key={e.id} {...e} />)}
        </motion.div>
      )}
    </main>
  );
};

export default Experience;
