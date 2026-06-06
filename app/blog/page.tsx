"use client";
import { useState, useEffect } from "react";
import styles from "./Page.module.scss";
import { comfortaa } from "../../lib/fonts";
import { blogWithTags } from "../../lib/prisma";
import BlogCard from "../../components/layout/BlogCard";
import Hypertext from "../../components/ui/Hypertext";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Blog() {
  const [posts, setPosts] = useState<blogWithTags[]>([]);

  useEffect(() => {
    fetch("/api/blog").then((r) => r.json()).then(setPosts);
  }, []);

  return (
    <main className={comfortaa.className}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Hypertext text="BLOG" style={{ margin: 0 }} />
        </div>
      </div>
      <motion.div
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        animate={posts.length > 0 ? "visible" : "hidden"}
      >
        {posts.length > 0 ? (
          posts.map((post) => <BlogCard key={post.id} post={post} />)
        ) : (
          <p style={{ fontWeight: "400", opacity: 0.5 }}>Loading...</p>
        )}
      </motion.div>
    </main>
  );
}
