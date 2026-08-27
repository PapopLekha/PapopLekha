"use client";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import s from "../../admin.module.scss";
import ImageUploadField from "../../ImageUploadField";

type Form = {
  type: string;
  institution: string;
  role: string;
  from: string;
  to: string;
  description: string;
  logo: string;
  order: string;
};

const empty: Form = {
  type: "WORK",
  institution: "",
  role: "",
  from: "",
  to: "",
  description: "",
  logo: "",
  order: "0",
};

export default function ExperienceForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();
  const [form, setForm] = useState<Form>(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      fetch(`/api/admin/experience/${id}`)
        .then((r) => r.json())
        .then((data) =>
          setForm({
            type: data.type,
            institution: data.institution,
            role: data.role,
            from: data.from,
            to: data.to,
            description: data.description.join("\n"),
            logo: data.logo ?? "",
            order: String(data.order),
          })
        );
    }
  }, [id, isNew]);

  const set = (field: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const body = {
      ...form,
      description: form.description.split("\n").map((l) => l.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };
    const res = await fetch(
      isNew ? "/api/admin/experience" : `/api/admin/experience/${id}`,
      { method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
    );
    setSaving(false);
    if (res.ok) router.push("/admin/experience");
    else setError("Save failed — check required fields.");
  };

  const handleDelete = async () => {
    if (!confirm("Delete this entry?")) return;
    await fetch(`/api/admin/experience/${id}`, { method: "DELETE" });
    router.push("/admin/experience");
  };

  return (
    <div>
      <div className={s.pageHeader}>
        <h1>{isNew ? "New Experience Entry" : "Edit Experience"}</h1>
        <Link href="/admin/experience" className={s.btn}>← Back</Link>
      </div>

      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.row}>
          <div className={s.field}>
            <label>Type *</label>
            <select className={s.select} value={form.type} onChange={set("type")}>
              <option value="WORK">Work</option>
              <option value="EDUCATION">Education</option>
              <option value="ORGANISATION">Organisation</option>
            </select>
          </div>
          <div className={s.field}>
            <label>Order</label>
            <input className={s.input} type="number" value={form.order} onChange={set("order")} min={0} />
          </div>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label>Institution *</label>
            <input className={s.input} required value={form.institution} onChange={set("institution")} placeholder="Company / School / Org" />
          </div>
          <div className={s.field}>
            <label>Role *</label>
            <input className={s.input} required value={form.role} onChange={set("role")} placeholder="Software Engineer" />
          </div>
        </div>

        <div className={s.row}>
          <div className={s.field}>
            <label>From *</label>
            <input className={s.input} required value={form.from} onChange={set("from")} placeholder="2023" />
          </div>
          <div className={s.field}>
            <label>To *</label>
            <input className={s.input} required value={form.to} onChange={set("to")} placeholder="2025 or present" />
          </div>
        </div>

        <div className={s.field}>
          <label>Description</label>
          <textarea className={s.textarea} value={form.description} onChange={set("description")} placeholder="One bullet point per line" rows={5} />
          <p className={s.hint}>Each line becomes a bullet point.</p>
        </div>

        <ImageUploadField label="Logo" value={form.logo} onChange={(url) => setForm((prev) => ({ ...prev, logo: url }))} />

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
