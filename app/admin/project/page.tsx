"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { projectWithInfo } from "../../../lib/prisma";
import s from "../admin.module.scss";

export default function ProjectList() {
  const [items, setItems] = useState<projectWithInfo[]>([]);

  useEffect(() => {
    fetch("/api/admin/project").then((r) => r.json()).then(setItems);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/project/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>Projects</h1>
        <Link href="/admin/project/new" className={`${s.btn} ${s.btnPrimary}`}>
          + New Project
        </Link>
      </div>
      <div className={s.list}>
        {items.map((p) => (
          <div key={p.id} className={s.listItem}>
            <div className={s.listItemInfo}>
              <h3>
                {p.name}{" "}
                {!p.published && <span className={`${s.badge} ${s.badgeDraft}`}>draft</span>}
                {p.hilight && <span className={s.badge}>highlight</span>}
              </h3>
              <p>
                {new Date(p.date).toLocaleDateString()} ·{" "}
                {p.tags.map((t) => t.name).join(", ") || "no tags"}
              </p>
            </div>
            <div className={s.listItemActions}>
              <Link href={`/admin/project/${p.id}`} className={`${s.btn} ${s.btnSm}`}>
                Edit
              </Link>
              <button className={`${s.btn} ${s.btnSm} ${s.btnDanger}`} onClick={() => handleDelete(p.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
