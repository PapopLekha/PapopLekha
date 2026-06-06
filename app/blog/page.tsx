"use client";
import { useState, useEffect } from "react";
import styles from "./Page.module.scss";
import { comfortaa } from "../../lib/fonts";
import { blogWithTags } from "../../lib/prisma";
import BlogCard from "../../components/layout/BlogCard";
import CardSkeleton from "../../components/layout/CardSkeleton";
import Hypertext from "../../components/ui/Hypertext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Blog() {
  const [posts, setPosts] = useState<blogWithTags[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <main className={comfortaa.className}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Hypertext text="BLOG" style={{ margin: 0 }} />
        </div>
      </div>

      {loading ? (
        <div className={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : posts.length === 0 ? (
        <p className={styles.empty}>Nothing here at the moment.</p>
      ) : (
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {posts.map((post) => <BlogCard key={post.id} post={post} />)}
        </motion.div>
      )}
    </main>
  );
}
