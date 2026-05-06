"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CTASection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const els = [
      { el: headlineRef.current, delay: 0 },
      { el: sublineRef.current, delay: 100 },
      { el: buttonsRef.current, delay: 200 },
    ];

    els.forEach(({ el }) => {
      if (!el) return;
      el.style.opacity = "0";
      if (!prefersReduced) el.style.transform = "translateY(20px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          const item = els.find(({ el }) => el === target);
          if (!item) return;
          target.style.transition = `opacity 600ms ease-out ${item.delay}ms${
            prefersReduced ? "" : `, transform 600ms ease-out ${item.delay}ms`
          }`;
          target.style.opacity = "1";
          if (!prefersReduced) target.style.transform = "translateY(0)";
          observer.unobserve(target);
        });
      },
      { threshold: 0.3 }
    );

    els.forEach(({ el }) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section data-nav-theme="dark" className="relative min-h-[600px] overflow-hidden bg-black py-32 flex items-center justify-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cta-bg.png"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Center mask — darkens the middle for readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Edge vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, black 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-6 text-center">
        <h2
          ref={headlineRef}
          className="max-w-4xl font-muoto text-h1 font-normal leading-tight text-white"
        >
          Purpose-built for the test &amp; evaluation enterprise
        </h2>

        <p
          ref={sublineRef}
          className="font-muoto text-body-nom text-white/70"
        >
          Act faster.
        </p>

        <div ref={buttonsRef} className="mt-4 flex justify-center gap-4">
          <button className="rounded-none border border-[var(--btn-primary-border)] bg-[var(--btn-primary-bg)] px-12 py-4 font-fraktion-mono text-btn uppercase tracking-widest text-[var(--btn-primary-fg)] transition-colors duration-200 hover:border-[var(--btn-primary-border-hover)]">
            Contact Us
          </button>
          <button className="rounded-none border border-[var(--btn-secondary-border)] bg-[var(--btn-secondary-bg)] px-12 py-4 font-fraktion-mono text-btn uppercase tracking-widest text-[var(--btn-secondary-fg)] transition-colors duration-200 hover:border-[var(--btn-secondary-border-hover)]">
            Request a Demo
          </button>
        </div>
      </div>
    </section>
  );
}
