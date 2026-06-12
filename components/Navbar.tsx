"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { NAV_LINKS, BRAND } from "@/lib/constants";
import { useLanguage } from "@/lib/LanguageContext";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_I18N_KEYS: Record<string, string> = {
  "/services": "nav.services",
  "/case-studies": "nav.portfolio",
  "/blog": "nav.blog",
  "/contact": "nav.contact",
};

export default function Navbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const ticking = useRef(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          const sections = ["hero", "portfolio", "faq"];
          const pos = window.scrollY + 140;
          let current = sections[0];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el && el.offsetTop <= pos) current = id;
          }
          setActiveSection(current);
          ticking.current = false;
        });
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        mobileOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [mobileOpen]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    // External page links (not anchor-based)
    if (!href.startsWith("#")) {
      window.location.href = href;
      return;
    }
    const id = href.replace("#", "");
    if (typeof document === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const top = el.offsetTop - 72;
      if (prefersReduced) {
        window.scrollTo(0, top);
      } else {
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, []);

  const brandHref = pathname === "/" ? "#hero" : "/";

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <nav
        style={{
          backgroundColor: scrolled ? "var(--bg-nav)" : "transparent",
          backdropFilter: scrolled ? "saturate(180%) blur(12px)" : "blur(0)",
          WebkitBackdropFilter: scrolled ? "saturate(180%) blur(12px)" : "blur(0)",
          borderBottomWidth: scrolled ? "1px" : "0",
          borderBottomColor: scrolled ? "var(--border-subtle)" : "transparent",
          transition: "background-color 0.3s ease-out, border-color 0.3s ease-out, backdrop-filter 0.3s ease-out",
        }}
        aria-label="Primary"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href={brandHref}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(brandHref);
            }}
            className="text-th-text font-light text-lg tracking-brand hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md"
            aria-label={`${BRAND.name} — go to top`}
          >
            <span className="font-light">{BRAND.name}</span>
            <span className="ml-2 text-[10px] text-accent/80 tracking-widest uppercase hidden sm:inline">
              Studio
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.startsWith("/#")
                ? link.href.slice(2)
                : link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (link.href.startsWith("#")) e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`text-sm transition-colors duration-200 relative py-1 focus-visible:outline-none focus-visible:text-th-text ${
                    isActive ? "text-th-text" : "text-th-muted hover:text-th-text"
                  }`}
                >
                  {t(NAV_I18N_KEYS[link.href]) as string}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </a>
              );
            })}
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="/contact?source=nav-quote"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/contact?source=nav-quote");
              }}
              className="text-sm px-4 py-2 rounded-md bg-accent text-white hover:bg-accent/85 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            >
              {t("nav.getQuote") as string}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-th-text p-2 rounded-md hover:bg-th-bg-s transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 flex flex-col gap-1.5" aria-hidden="true">
                <span
                  className={`block h-px bg-th-text transition-all duration-200 ${
                    mobileOpen ? "rotate-45 translate-y-[7px]" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-th-text transition-all duration-200 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-px bg-th-text transition-all duration-200 ${
                    mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden backdrop-blur-xl border-t border-th-border"
              style={{ backgroundColor: "var(--bg-nav)" }}
            >
              <div className="px-6 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="text-th-text2 hover:text-th-text transition-colors py-3 text-sm border-b border-th-border"
                  >
                    {t(NAV_I18N_KEYS[link.href]) as string}
                  </a>
                ))}
                <a
                  href="/contact?source=nav-quote"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("/contact?source=nav-quote");
                  }}
                  className="block text-center text-sm font-medium py-2.5 rounded-md bg-accent text-white hover:bg-accent/85 transition-all duration-200 mt-2"
                >
                  {t("nav.getQuote") as string}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 -z-10 md:hidden" style={{ backgroundColor: "var(--overlay)" }} aria-hidden="true" />
      )}
    </header>
  );
}
