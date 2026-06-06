import s from "./CardSkeleton.module.scss";

export default function CardSkeleton() {
  return (
    <div className={s.card}>
      <div className={s.image} />
      <div className={s.content}>
        <div className={s.line} style={{ width: "38%" }} />
        <div className={s.line} style={{ width: "80%" }} />
        <div className={s.line} style={{ width: "65%" }} />
        <div className={s.line} style={{ width: "55%" }} />
        <div className={s.tags}>
          <div className={s.tag} />
          <div className={s.tag} style={{ width: "2.5rem" }} />
        </div>
      </div>
    </div>
  );
}
