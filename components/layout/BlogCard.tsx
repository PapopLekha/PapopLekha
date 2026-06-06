"use client";
import Image from "next/image";
import styles from "./BlogCard.module.scss";
import { comfortaa, roboto_mono } from "../../lib/fonts";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { blogWithTags } from "../../lib/prisma";

const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const BlogCard = ({ post }: { post: blogWithTags }) => {
  const router = useRouter();
  const date = new Date(post.date);

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      onClick={() => router.push(`/blog/${post.slug}`)}
    >
      <div className={styles.imageWrapper}>
        {post.banner ? (
          <Image src={post.banner} alt={post.title} fill style={{ objectFit: "cover" }} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>
      <div className={styles.content}>
        <p className={`${styles.date} ${roboto_mono.className}`}>
          {MONTH[date.getMonth()]} {date.getFullYear()}
        </p>
        <h3 className={`${styles.title} ${comfortaa.className}`}>{post.title}</h3>
        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag.id} className={styles.tag}>{tag.name}</span>
            ))}
          </div>
        )}
        <p className={styles.excerpt}>{post.excerpt}</p>
      </div>
    </motion.div>
  );
};

export default BlogCard;
