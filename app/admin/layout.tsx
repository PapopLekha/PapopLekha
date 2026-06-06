"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import styles from "./layout.module.scss";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/project", label: "Projects" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/experience", label: "Experience" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className={styles.shell}>
      {/* Desktop sidebar */}
      <aside className={styles.sidebar}>
        <p className={styles.sidebarLabel}>Admin</p>
        <nav className={styles.nav}>
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${isActive(href) ? styles.navLinkActive : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userRow}>
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt="avatar"
                width={28}
                height={28}
                className={styles.avatar}
              />
            )}
            <span className={styles.userName}>{session?.user?.name}</span>
          </div>
          <button
            className={styles.signOutBtn}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <nav className={styles.mobileNav}>
        {navItems.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.mobileNavLink} ${isActive(href) ? styles.mobileNavLinkActive : ""}`}
          >
            {label}
          </Link>
        ))}
        <button
          className={styles.mobileSignOut}
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          Sign out
        </button>
      </nav>

      <main className={styles.content}>{children}</main>
    </div>
  );
}
