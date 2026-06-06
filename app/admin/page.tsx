"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import s from "./admin.module.scss";

type Counts = { projects: number; blogs: number; experiences: number };

export default function AdminDashboard() {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/project").then((r) => r.json()),
      fetch("/api/admin/blog").then((r) => r.json()),
      fetch("/api/admin/experience").then((r) => r.json()),
    ]).then(([projects, blogs, experiences]) => {
      setCounts({
        projects: projects.length,
        blogs: blogs.length,
        experiences: experiences.length,
      });
    });
  }, []);

  const sections = [
    { label: "Projects", href: "/admin/project", count: counts?.projects },
    { label: "Blog Posts", href: "/admin/blog", count: counts?.blogs },
    { label: "Experience", href: "/admin/experience", count: counts?.experiences },
  ];

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>Dashboard</h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", maxWidth: 600 }}>
        {sections.map(({ label, href, count }) => (
          <Link key={href} href={href} style={{ textDecoration: "none" }}>
            <div
              style={{
                padding: "1.5rem",
                border: "1px solid var(--color-line)",
                borderRadius: 10,
                background: "color-mix(in srgb, var(--color-background) 85%, white 15%)",
                transition: "box-shadow .2s",
              }}
            >
              <p style={{ margin: 0, fontSize: "2rem", fontWeight: 700 }}>
                {count ?? "—"}
              </p>
              <p style={{ margin: "0.25rem 0 0", fontSize: "0.8rem", opacity: 0.55 }}>
                {label}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
