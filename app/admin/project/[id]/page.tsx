"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import s from "../../admin.module.scss";
import ImageUploadField from "../../ImageUploadField";

type Form = {
  name: string;
  role: string;
  date: string;
  description: string;
  projdesc: string;
  projgoal: string;
  projpers: string;
  image: string;
  url: string;
  source: string;
  tags: string;
  technologies: string;
  published: boolean;
  hilight: boolean;
};

const empty: Form = {
  name: "", role: "", date: "", description: "",
  projdesc: "", projgoal: "", projpers: "",
  image: "", url: "", source: "",
  tags: "", technologies: "",
  published: false, hilight: false,
};

export default function ProjectForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/project/${id}`)
        .then((r) => r.json())
        .then((data) =>
          setForm({
            name: data.name,
            role: data.role,
            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
            description: data.description,
            projdesc: data.projdesc,
            projgoal: data.projgoal,
            projpers: data.projpers,
            image: data.image ?? "",
            url: data.url ?? "",
            source: data.source ?? "",
            tags: data.tags.map((t: any) => t.name).join(", "),
            technologies: data.technologies.map((t: any) => t.name).join(", "),
            published: data.published,
            hilight: data.hilight,
          })
        );
    }
  }, [id, isNew]);

  const set = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const check = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));

  const parseCsv = (val: string) => val.split(",").map((s) => s.trim()).filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = {
      ...form,
      tags: parseCsv(form.tags),
      technologies: parseCsv(form.technologies),
    };
    const res = await fetch(
      isNew ? "/api/admin/project" : `/api/admin/project/${id}`,
      { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    setSaving(false);
    if (res.ok) router.push("/admin/project");
    else setError("Save failed — name must be unique and all required fields filled.");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/project/${id}`, { method: "DELETE" });
    router.push("/admin/project");
  };

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>{isNew ? "New Project" : "Edit Project"}</h1>
        <Link href="/admin/project" className={s.btn}>← Back</Link>
      </div>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.row}>
          <div className={s.field}>
            <label>Name *</label>
            <input className={s.input} required value={form.name} onChange={set("name")} placeholder="My Project" />
          </div>
          <div className={s.field}>
            <label>Role *</label>
            <input className={s.input} required value={form.role} onChange={set("role")} placeholder="Frontend / Backend / Full Stack" />
          </div>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label>Date *</label>
            <input className={s.input} type="date" required value={form.date} onChange={set("date")} />
          </div>
          <ImageUploadField label="Image" value={form.image} onChange={(url) => setForm((prev) => ({ ...prev, image: url }))} />
        </div>

        <div className={s.field}>
          <label>Short description (card)</label>
          <input className={s.input} value={form.description} onChange={set("description")} placeholder="One-line summary shown on cards" />
        </div>

        <div className={s.field}>
          <label>Full description</label>
          <textarea className={s.textarea} value={form.projdesc} onChange={set("projdesc")} rows={4} />
        </div>

        <div className={s.field}>
          <label>Project goal</label>
          <textarea className={s.textarea} value={form.projgoal} onChange={set("projgoal")} rows={3} />
        </div>

        <div className={s.field}>
          <label>My contribution</label>
          <textarea className={s.textarea} value={form.projpers} onChange={set("projpers")} rows={3} />
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label>Live URL</label>
            <input className={s.input} value={form.url} onChange={set("url")} placeholder="https://..." />
          </div>
          <div className={s.field}>
            <label>Source (GitHub)</label>
            <input className={s.input} value={form.source} onChange={set("source")} placeholder="https://github.com/..." />
          </div>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label>Tags</label>
            <input className={s.input} value={form.tags} onChange={set("tags")} placeholder="react, next.js, typescript" />
            <p className={s.hint}>Comma-separated</p>
          </div>
          <div className={s.field}>
            <label>Technologies</label>
            <input className={s.input} value={form.technologies} onChange={set("technologies")} placeholder="React, PostgreSQL, Prisma" />
            <p className={s.hint}>Comma-separated</p>
          </div>
        </div>

        <div className={s.checkboxRow}>
          <label className={s.checkboxField}>
            <input type="checkbox" checked={form.published} onChange={check("published")} />
            <label>Published</label>
          </label>
          <label className={s.checkboxField}>
            <input type="checkbox" checked={form.hilight} onChange={check("hilight")} />
            <label>Highlight (shown on home)</label>
          </label>
        </div>

        {error && <p style={{ color: "var(--color-red)", margin: 0 }}>{error}</p>}

        <hr className={s.divider} />
        <div className={s.formActions}>
          <button type="submit" className={`${s.btn} ${s.btnPrimary}`} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
          {!isNew && (
            <button type="button" className={`${s.btn} ${s.btnDanger}`} onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
