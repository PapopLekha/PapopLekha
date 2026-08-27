"use client";
import { useState } from "react";
import s from "./admin.module.scss";

export default function ImageUploadField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploading(true);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body });
    setUploading(false);
    if (res.ok) onChange((await res.json()).url);
  };

  return (
    <div className={s.field}>
      <label>{label}</label>
      <input className={s.input} value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://...blob.vercel-storage.com/..." />
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
      {uploading && <p className={s.hint}>Uploading…</p>}
    </div>
  );
}
