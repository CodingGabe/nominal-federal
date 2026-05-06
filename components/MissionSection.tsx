"use client";

import { useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconChecklist() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="22" height="22" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 8.5l2.5 2.5L14 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 14h10M7 17.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconHierarchy() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="7" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="10" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9" y="16.5" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.5 8v3.5c0 .6.4 1 1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.5 14.5v3c0 .6.4 1 1 1H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="16" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="16.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const cards = [
  {
    Icon: IconChecklist,
    title: "Government-owned test and evaluation",
    body: "Purpose-built for government test organizations managing T&E across complex, multi-domain programs with full data ownership and auditability.",
    borderClass: "border border-neutral-300",
  },
  {
    Icon: IconHierarchy,
    title: "Multi-vendor, government-led programs",
    body: "Designed for programs integrating hardware and software from multiple prime contractors, with a unified operating picture that spans every vendor.",
    borderClass: "border-t border-b border-neutral-300",
  },
  {
    Icon: IconLock,
    title: "Secure and contested environments",
    body: "Deployable in air-gapped and low-bandwidth environments, supporting classified networks and contested operational conditions from day one.",
    borderClass: "border border-neutral-300",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function MissionSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const header = headerRef.current;
    const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (header) {
      header.style.opacity = "0";
      if (!prefersReduced) header.style.transform = "translateY(12px)";
      header.style.transition = "opacity 400ms ease-out, transform 400ms ease-out";
    }

    cardEls.forEach((card, i) => {
      card.style.opacity = "0";
      if (!prefersReduced) card.style.transform = "translateY(12px)";
      card.style.transition = `opacity 500ms ease-out ${i * 120}ms, transform 500ms ease-out ${i * 120}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          if (!prefersReduced) el.style.transform = "translateY(0)";
          observer.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    if (header) observer.observe(header);
    cardEls.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-16">
        {/* Header */}
        <div ref={headerRef} className="mb-16 text-center">
          <div className="mx-auto mb-6 w-64 border-t border-neutral-300" />
          <h2 className="font-fraktion-mono text-h2 uppercase leading-tight tracking-widest text-black">
            Built for the most demanding programs
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-0">
          {cards.map(({ Icon, title, body, borderClass }, i) => (
            <div
              key={i}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[i] = el;
              }}
              className={`flex flex-col gap-6 bg-white p-8 ${borderClass}`}
            >
              <div className="text-neutral-800">
                <Icon />
              </div>
              <h3 className="font-muoto text-h4 font-normal leading-snug text-black">
                {title}
              </h3>
              <p className="font-muoto text-base leading-relaxed text-neutral-500">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
