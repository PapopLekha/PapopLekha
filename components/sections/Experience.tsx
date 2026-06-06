'use client'

import styles from './Experience.module.scss'
import { comfortaa, roboto_mono } from '../../lib/fonts';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { experienceEntry } from '../../lib/prisma';

const ExperienceCard = ({ index: _index, ...info }: experienceEntry & { index: number }) => {
  const { institution, role, from, to, description, logo } = info;

  return (
    <div className={styles.card}>
      <div className={`${styles.header} ${roboto_mono.className}`}>
        <h4>{role} @{institution}</h4>
        <div className={styles.date}>
          <h4>{from} - {to}</h4>
        </div>
      </div>
      <div className={`${styles.info} ${comfortaa.className}`}>
        <div className={styles.description}>
          <ul>
            {description.map((d) => (
              <li key={d}><p>{d}</p></li>
            ))}
          </ul>
        </div>
        {logo && (
          <div className={styles.image}>
            <Image src={logo} alt={institution} fill />
          </div>
        )}
      </div>
    </div>
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

  const sections: { key: keyof Grouped; label: string }[] = [
    { key: 'WORK', label: 'Work' },
    { key: 'EDUCATION', label: 'Education' },
    { key: 'ORGANISATION', label: 'Organisation' },
  ];

  return (
    <main className={styles.main}>
      {sections.map(({ key, label }) =>
        grouped[key].length > 0 ? (
          <div key={key} className={styles.wrapper}>
            <h2 className={comfortaa.className}>{label}</h2>
            {grouped[key].map((e, i) => (
              <ExperienceCard key={e.id} {...e} index={i} />
            ))}
          </div>
        ) : null
      )}
    </main>
  );
};

export default Experience;
