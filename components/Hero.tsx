"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = sectionRef.current?.querySelectorAll<HTMLElement>(
      "[data-animate]"
    );
    if (!elements?.length || prefersReduced) return;

    elements.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = `opacity 0.65s ease ${i * 80}ms, transform 0.65s ease ${i * 80}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background-muted"
    >
      {/* Background — swap this div for <Image> once the hero asset is ready */}
      <div className="absolute inset-0 bg-[#0f1a0f]" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 pt-32 pb-0">
        <h1
          data-animate
          className="max-w-5xl text-center font-muoto text-h1 leading-tight tracking-tight text-foreground-active"
        >
          Deploy critical capabilities at mission speed
        </h1>

        <p
          data-animate
          className="max-w-lg text-center font-muoto text-body-nom text-foreground-muted"
        >
          Accelerate the ability to validate and field warfighter capabilities.
        </p>

        <button
          data-animate
          className="rounded-none border border-neutral-700 bg-neutral-900 px-8 py-3 font-fraktion-mono text-[13px] font-bold uppercase tracking-tight text-white transition-colors hover:border-neutral-600 hover:bg-neutral-800"
        >
          Request a Demo
        </button>
      </div>

      {/* Product screenshot */}
      <div
        data-animate
        className="relative z-10 mx-auto mt-16 w-full max-w-4xl px-6"
      >
        <div className="relative min-h-[500px] overflow-hidden rounded-t-lg border border-border bg-background">
          <p className="pt-24 text-center text-foreground-muted">
            [ Nominal App UI ]
          </p>

          {/* Fade mask */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-background-muted" />
        </div>
      </div>
    </section>
  );
}
