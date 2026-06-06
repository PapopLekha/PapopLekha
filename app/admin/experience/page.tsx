"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { experienceEntry } from "../../../lib/prisma";
import s from "../admin.module.scss";

export default function ExperienceList() {
  const [items, setItems] = useState<experienceEntry[]>([]);

  useEffect(() => {
    fetch("/api/admin/experience").then((r) => r.json()).then(setItems);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this experience entry?")) return;
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const grouped: Record<string, experienceEntry[]> = {};
  items.forEach((e) => {
    (grouped[e.type] ??= []).push(e);
  });

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>Experience</h1>
        <Link href="/admin/experience/new" className={`${s.btn} ${s.btnPrimary}`}>
          + New Entry
        </Link>
      </div>

      {Object.entries(grouped).map(([type, entries]) => (
        <div key={type} style={{ marginBottom: "2rem" }}>
          <p className={s.navSection} style={{ margin: "0 0 0.75rem" }}>{type}</p>
          <div className={s.list}>
            {entries.map((e) => (
              <div key={e.id} className={s.listItem}>
                <div className={s.listItemInfo}>
                  <h3>{e.role} @ {e.institution}</h3>
                  <p>{e.from} — {e.to} · order {e.order}</p>
                </div>
                <div className={s.listItemActions}>
                  <Link href={`/admin/experience/${e.id}`} className={`${s.btn} ${s.btnSm}`}>
                    Edit
                  </Link>
                  <button className={`${s.btn} ${s.btnSm} ${s.btnDanger}`} onClick={() => handleDelete(e.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
