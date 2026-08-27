"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import s from "../../admin.module.scss";
import ImageUploadField from "../../ImageUploadField";

type Form = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  banner: string;
  content: string;
  tags: string;
  published: boolean;
};

const empty: Form = {
  slug: "", title: "", date: "", excerpt: "",
  banner: "", content: "", tags: "", published: false,
};

export default function BlogForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/blog/${id}`)
        .then((r) => r.json())
        .then((data) =>
          setForm({
            slug: data.slug,
            title: data.title,
            date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
            excerpt: data.excerpt,
            banner: data.banner ?? "",
            content: data.content.join("\n\n"),
            tags: data.tags.map((t: any) => t.name).join(", "),
            published: data.published,
          })
        );
    }
  }, [id, isNew]);

  const set = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const check = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.checked }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = {
      ...form,
      content: form.content.split(/\n\n+/).map((p) => p.trim()).filter(Boolean),
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    };
    const res = await fetch(
      isNew ? "/api/admin/blog" : `/api/admin/blog/${id}`,
      { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    setSaving(false);
    if (res.ok) router.push("/admin/blog");
    else setError("Save failed — slug must be unique and required fields filled.");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    router.push("/admin/blog");
  };

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>{isNew ? "New Blog Post" : "Edit Post"}</h1>
        <Link href="/admin/blog" className={s.btn}>← Back</Link>
      </div>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.row}>
          <div className={s.field}>
            <label>Title *</label>
            <input className={s.input} required value={form.title} onChange={set("title")} placeholder="My Post Title" />
          </div>
          <div className={s.field}>
            <label>Slug *</label>
            <input className={s.input} required value={form.slug} onChange={set("slug")} placeholder="my-post-title" />
            <p className={s.hint}>URL: /blog/slug</p>
          </div>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label>Date *</label>
            <input className={s.input} type="date" required value={form.date} onChange={set("date")} />
          </div>
          <ImageUploadField label="Banner image" value={form.banner} onChange={(url) => setForm((prev) => ({ ...prev, banner: url }))} />
        </div>

        <div className={s.field}>
          <label>Excerpt</label>
          <textarea className={s.textarea} value={form.excerpt} onChange={set("excerpt")} rows={2} placeholder="Short summary shown on the card" />
        </div>

        <div className={s.field}>
          <label>Content</label>
          <textarea className={s.textarea} value={form.content} onChange={set("content")} rows={12} placeholder="Write your content here. Separate paragraphs with a blank line." />
          <p className={s.hint}>Blank line = new paragraph.</p>
        </div>

        <div className={s.field}>
          <label>Tags</label>
          <input className={s.input} value={form.tags} onChange={set("tags")} placeholder="dev, tutorial, hpc" />
          <p className={s.hint}>Comma-separated</p>
        </div>

        <div className={s.checkboxRow}>
          <label className={s.checkboxField}>
            <input type="checkbox" checked={form.published} onChange={check("published")} />
            <label>Published</label>
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
