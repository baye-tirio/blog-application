"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  return (
    <div>
      <Link
        className={`nav-link ${pathname === href ? "nav-link-active" : ""}`}
        href={href}
      >
        {label}
      </Link>
    </div>
  );
}
