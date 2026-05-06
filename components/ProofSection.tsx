"use client";

import { useEffect, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const domains = ["AIR", "LAND", "SEA", "SPACE", "AIR", "LAND"];

// ─── Logo card ────────────────────────────────────────────────────────────────

function LogoCard({
  domain,
  ariaHidden,
}: {
  domain: string;
  ariaHidden?: boolean;
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="flex h-[120px] w-[280px] flex-shrink-0 flex-col items-center justify-center gap-3 border border-white/20"
    >
      {/* Logo placeholder — swap for real <Image> once assets are provided */}
      <div className="h-10 w-[120px] bg-white/20" />
      <span className="font-fraktion-mono text-xs uppercase tracking-widest text-white/60">
        {domain}
      </span>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProofSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const marqueeWrapperRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const lastScrollYRef = useRef(0);
  const offsetRef = useRef(0); // current translateX in pixels

  // Entry animations
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const header = headerRef.current;
    const marqueeWrapper = marqueeWrapperRef.current;

    if (header) {
      header.style.opacity = "0";
      if (!prefersReduced) header.style.transform = "translateY(16px)";
      header.style.transition =
        "opacity 500ms ease-out, transform 500ms ease-out";
    }
    if (marqueeWrapper) {
      marqueeWrapper.style.opacity = "0";
      // Slight delay so header animates in before the marquee fades up
      marqueeWrapper.style.transition = "opacity 600ms ease-out 200ms";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          if (el === header && !prefersReduced) {
            el.style.transform = "translateY(0)";
          }
          observer.unobserve(el);
        });
      },
      { threshold: 0.2 }
    );

    if (header) observer.observe(header);
    if (marqueeWrapper) observer.observe(marqueeWrapper);

    return () => observer.disconnect();
  }, []);

  // Scroll-driven marquee — 1:1 translateX, no CSS animation
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;
      const delta = current - lastScrollYRef.current;
      lastScrollYRef.current = current;

      const inner = marqueeInnerRef.current;
      if (!inner) return;

      // -50% of the inner div = one full set of logos (the loop boundary)
      const minTranslate = -(inner.scrollWidth / 2);
      offsetRef.current = Math.max(
        minTranslate,
        Math.min(0, offsetRef.current - delta)
      );
      inner.style.transform = `translateX(${offsetRef.current}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section data-nav-theme="dark" className="bg-black py-24">
      {/* Header row — constrained width */}
      <div className="mx-auto max-w-7xl px-16">
        <div
          ref={headerRef}
          className="flex items-start justify-between gap-16"
        >
          {/* Left: heading */}
          <div className="max-w-lg">
            <div className="mb-6 w-full border-t border-white/30" />
            <h2 className="font-fraktion-mono text-h2 uppercase leading-tight tracking-tight text-white">
              Deployed by U.S. military organizations and best-in-class defense
              technology companies
            </h2>
          </div>

          {/* Right: CTA */}
          <div className="flex-shrink-0 self-start pt-2">
            <button className="rounded-none border border-[var(--btn-primary-border)] bg-[var(--btn-primary-bg)] px-8 py-4 font-fraktion-mono text-[16px] uppercase tracking-widest text-[var(--btn-primary-fg)] transition-colors duration-200 hover:border-[var(--btn-primary-border-hover)]">
              Request a Demo
            </button>
          </div>
        </div>
      </div>

      {/* Logo marquee — full bleed, outside max-w container */}
      <div ref={marqueeWrapperRef} className="mt-16 overflow-hidden">
        <div
          ref={marqueeInnerRef}
          className="flex"
        >
          {/* First pass — visible to assistive tech */}
          {domains.map((domain, i) => (
            <LogoCard key={i} domain={domain} />
          ))}
          {/* Duplicate for seamless loop */}
          {domains.map((domain, i) => (
            <LogoCard key={`dup-${i}`} domain={domain} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  );
}
