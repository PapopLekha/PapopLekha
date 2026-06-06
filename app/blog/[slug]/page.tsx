"use client";
import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { comfortaa, roboto_mono } from "../../../lib/fonts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Hypertext from "../../../components/ui/Hypertext";
import { blogWithTags } from "../../../lib/prisma";
import styles from "./Page.module.scss";

const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [post, setPost] = useState<blogWithTags | null>(null);
  const [notFoundState, setNotFoundState] = useState(false);

  useEffect(() => {
    fetch(`/api/blog?slug=${slug}`)
      .then((r) => {
        if (r.status === 404) { setNotFoundState(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setPost(data); });
  }, [slug]);

  if (notFoundState) notFound();

  const date = post ? new Date(post.date) : null;

  return (
    <main className={`${comfortaa.className} ${styles.page}`}>
      <div className={styles.banner}>
        {post?.banner && (
          <Image src={post.banner} alt={post.title} fill style={{ objectFit: "cover" }} priority />
        )}
        <div className={styles.bannerMeta}>
          <div className={styles.bannerTitle}>
            <Hypertext
              text={(post?.title ?? slug).toUpperCase()}
              style={{ margin: 0, color: "#ECEFF4" }}
            />
          </div>
          {date && (
            <p className={roboto_mono.className}>
              {MONTH[date.getMonth()]} {date.getFullYear()}
            </p>
          )}
        </div>
      </div>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Link href="/blog" className={`${styles.linkBtn} ${roboto_mono.className}`} style={{ alignSelf: "flex-start" }}>
          <FontAwesomeIcon icon={faArrowLeft} />
          All Posts
        </Link>

        <hr className={styles.divider} />

        {date && (
          <div className={styles.metaRow}>
            <p className={`${styles.date} ${roboto_mono.className}`}>
              {MONTH[date.getMonth()]} {date.getFullYear()}
            </p>
            {post?.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag.id} className={styles.tag}>{tag.name}</span>
                ))}
              </div>
            )}
          </div>
        )}

        <hr className={styles.divider} />

        <div className={styles.body}>
          {post?.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          )) ?? <p style={{ opacity: 0.4 }}>Loading...</p>}
        </div>
      </motion.div>
    </main>
  );
}
