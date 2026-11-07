"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/reports", label: "Reports" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          href="/"
          className="site-brand"
          onClick={() => setOpen(false)}
          aria-label="Capital Notions home"
        >
          <Image src="/cn-mark.png" alt="" width={30} height={30} priority />
          <span>Capital Notions</span>
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-nav"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="Main"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`site-nav__link${isActive(link.href) ? " is-active" : ""}`}
              aria-current={isActive(link.href) ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className={`site-nav__cta${isActive("/subscribe") ? " is-active" : ""}`}
            aria-current={isActive("/subscribe") ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Subscribe
          </Link>
        </nav>
      </div>
    </header>
  );
}
