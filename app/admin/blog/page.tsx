"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { blogWithTags } from "../../../lib/prisma";
import s from "../admin.module.scss";

export default function BlogList() {
  const [items, setItems] = useState<blogWithTags[]>([]);

  useEffect(() => {
    fetch("/api/admin/blog").then((r) => r.json()).then(setItems);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>Blog</h1>
        <Link href="/admin/blog/new" className={`${s.btn} ${s.btnPrimary}`}>
          + New Post
        </Link>
      </div>
      <div className={s.list}>
        {items.map((b) => (
          <div key={b.id} className={s.listItem}>
            <div className={s.listItemInfo}>
              <h3>
                {b.title}{" "}
                {!b.published && <span className={`${s.badge} ${s.badgeDraft}`}>draft</span>}
              </h3>
              <p>
                /{b.slug} · {new Date(b.date).toLocaleDateString()} ·{" "}
                {b.tags.map((t) => t.name).join(", ") || "no tags"}
              </p>
            </div>
            <div className={s.listItemActions}>
              <Link href={`/admin/blog/${b.id}`} className={`${s.btn} ${s.btnSm}`}>
                Edit
              </Link>
              <button className={`${s.btn} ${s.btnSm} ${s.btnDanger}`} onClick={() => handleDelete(b.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
