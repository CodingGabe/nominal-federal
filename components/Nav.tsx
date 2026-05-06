"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const NAV_BOTTOM = 64;

    const update = () => {
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      let activeTheme = "dark";
      sections.forEach((section) => {
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= NAV_BOTTOM && bottom > NAV_BOTTOM) {
          activeTheme = section.getAttribute("data-nav-theme") ?? "dark";
        }
      });
      setIsDark(activeTheme === "dark");
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300">
      <Link href="/" className="flex items-center">
        <Image
          src="/images/nominal-logo-white.svg"
          alt="Nominal"
          width={120}
          height={32}
          priority
          className={`transition-all duration-300${isDark ? "" : " invert"}`}
        />
      </Link>

      <div className="flex items-center gap-2.5">
        <button
          className={`rounded-none px-4 py-[9px] font-fraktion-mono text-[13px] font-bold uppercase tracking-tight transition-colors duration-300 ${
            isDark
              ? "border border-white bg-white text-black hover:bg-transparent hover:text-white"
              : "border border-black bg-black text-white hover:bg-transparent hover:text-black"
          }`}
        >
          Request a Demo
        </button>
        <button
          className={`rounded-none bg-transparent px-4 py-[9px] font-fraktion-mono text-[13px] font-bold uppercase tracking-tight transition-colors duration-300 ${
            isDark
              ? "border border-white text-white hover:bg-white hover:text-black"
              : "border border-black text-black hover:bg-black hover:text-white"
          }`}
        >
          Open App
        </button>
      </div>
    </header>
  );
}
