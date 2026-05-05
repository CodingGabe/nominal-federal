"use client";

import { useEffect, useRef } from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconGrid() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="0" y="0" width="5" height="5" rx="0.5" fill="currentColor" />
      <rect x="7" y="0" width="5" height="5" rx="0.5" fill="currentColor" />
      <rect x="0" y="7" width="5" height="5" rx="0.5" fill="currentColor" />
      <rect x="7" y="7" width="5" height="5" rx="0.5" fill="currentColor" />
    </svg>
  );
}

function IconWarning() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 5.5v4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="12.5" r="0.75" fill="currentColor" />
    </svg>
  );
}

function IconPlus() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconSlack() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="0"  y="4.5" width="3" height="4" rx="1.5" fill="#36C5F0" />
      <rect x="4.5" y="0"  width="4" height="3" rx="1.5" fill="#2EB67D" />
      <rect x="10" y="4.5" width="3" height="4" rx="1.5" fill="#ECB22E" />
      <rect x="4.5" y="10" width="4" height="3" rx="1.5" fill="#E01E5A" />
    </svg>
  );
}

function IconWorkbook() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      aria-hidden="true"
      className="text-foreground-muted"
    >
      <rect x="1" y="1" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3.5 4.5h6M3.5 6.5h6M3.5 8.5h4"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ─── Card 1 — Data ingestion ──────────────────────────────────────────────────

const ingestRows = [
  { label: "Streaming", source: "onboard",  status: "Live", live: true  },
  { label: "Video",     source: "onboard",  status: "Live", live: true  },
  { label: "Files",     source: "backfill", status: "30s",  live: false },
  { label: "Logs",      source: "onboard",  status: "2m",   live: false },
];

function Card1() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-neutral-900">
      <div className="flex min-h-[360px] flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2 text-foreground-active">
            <IconGrid />
            <span className="font-muoto text-base">[NO.3] Corvette Z06 GT3.R</span>
          </div>
          <p className="mt-0.5 font-muoto text-sm text-foreground-muted">
            Rolex 24 at Daytona race
          </p>
        </div>

        <div className="mt-6 rounded-sm bg-black p-4">
          <span className="font-fraktion-mono text-xs uppercase tracking-widest text-foreground-muted">
            Ingesting
          </span>
          <div className="mt-3">
            {ingestRows.map((row, i) => (
              <div
                key={i}
                data-row=""
                className="flex items-center justify-between border-b border-border py-2 text-sm"
              >
                <div className="flex items-center gap-2 font-fraktion-mono text-foreground-muted">
                  <span>{row.label}</span>
                  <span className="text-foreground-disabled">/</span>
                  <span className="text-foreground-disabled">{row.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  {row.live ? (
                    <>
                      <div className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-green-400" />
                      <span className="font-fraktion-mono text-foreground-muted">{row.status}</span>
                    </>
                  ) : (
                    <span className="font-fraktion-mono text-foreground-disabled">{row.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card 2 — Conditions & alerts ────────────────────────────────────────────

const conditions = [
  { dot: "bg-blue-400",   field: "brake_pressure_bar", op: ">", value: "85"  },
  { dot: "bg-purple-400", field: "brake_temp_fl_c",    op: ">", value: "800" },
  { dot: "bg-green-400",  field: "brake_temp_fr_c",    op: ">", value: "800" },
];

function Card2() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-neutral-900">
      <div className="flex min-h-[360px] flex-col justify-between p-6">
        <div>
          <p className="mb-4 font-muoto text-base text-foreground-active">Definition</p>
          {conditions.map((c, i) => (
            <div
              key={i}
              data-row=""
              className="flex items-center gap-3 border-b border-border py-3 font-fraktion-mono text-sm"
            >
              <div className={`h-2 w-2 flex-shrink-0 rounded-full ${c.dot}`} />
              <span className="text-foreground">{c.field}</span>
              <span className="text-foreground-muted">{c.op}</span>
              <span className="text-foreground">{c.value}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-4 mt-6 font-muoto text-base text-foreground-active">
            Notification channels
          </p>
          <div
            data-row=""
            className="flex items-center gap-3 border-b border-border py-3 text-sm text-foreground-muted"
          >
            <IconSlack />
            <span className="font-muoto">#safety-crew</span>
          </div>
          <div
            data-row=""
            className="flex items-center gap-3 border-b border-border py-3 text-sm text-foreground-muted"
          >
            <IconWorkbook />
            <span className="font-muoto">Brake pressure safety</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Card 3 — Alert detail ────────────────────────────────────────────────────

const metaRows = [
  { label: "Assets",     value: "[NO.3] Corvette Z06 GT3.R"   },
  { label: "Start",      value: "Jan 25, 2025  19:34:26.457"  },
  { label: "End",        value: "Jan 25, 2025  19:34:26.457"  },
];

const compareRows = ["Lap 11 — Nicky Catsburg", "Lap 11 — Alexander Sims"];

function Card3() {
  return (
    <div className="overflow-hidden rounded-sm border border-border bg-neutral-900">
      <div className="flex min-h-[360px] flex-col justify-between p-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-status-destructive">
              <IconWarning />
            </span>
            <span className="font-muoto text-lg text-foreground-active">Brake temp spike</span>
          </div>

          <div className="mt-4">
            {metaRows.map((row, i) => (
              <div
                key={i}
                data-row=""
                className="flex items-center justify-between border-b border-border py-3 text-sm"
              >
                <span className="font-fraktion-mono uppercase tracking-wide text-foreground-muted">
                  {row.label}
                </span>
                <span className="font-muoto text-foreground">{row.value}</span>
              </div>
            ))}

            <div
              data-row=""
              className="flex items-center justify-between border-b border-border py-3 text-sm"
            >
              <span className="font-fraktion-mono uppercase tracking-wide text-foreground-muted">
                Created by
              </span>
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-neutral-700 font-fraktion-mono text-[10px] font-bold text-foreground-active">
                  AR
                </div>
                <span className="font-muoto text-foreground">Austin Robinson</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="mb-3 flex items-center justify-between text-foreground-muted">
            <span className="font-fraktion-mono text-xs uppercase tracking-widest">
              Compare across
            </span>
            <IconPlus />
          </div>
          {compareRows.map((label, i) => (
            <div
              key={i}
              data-row=""
              className="flex items-center border-b border-border py-2.5 text-sm"
            >
              <div className="mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-neutral-600" />
              <span className="font-muoto text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Card configs ─────────────────────────────────────────────────────────────

const cards = [
  {
    delay: 0,
    rowStagger: 100,
    caption: "Data sits fragmented across formats, networks, and organizations.",
    Card: Card1,
  },
  {
    delay: 150,
    rowStagger: 150,
    caption: "Test analysis takes weeks to assemble into useful insights.",
    Card: Card2,
  },
  {
    delay: 300,
    rowStagger: 120,
    caption: "Engineers waste time closing reports instead of diagnosing problems.",
    Card: Card3,
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll<HTMLElement>("[data-card]");
    if (!cardEls.length) return;

    cardEls.forEach((card) => {
      card.style.opacity = "0";
      if (!prefersReduced) card.style.transform = "translateY(16px)";

      card.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        row.style.opacity = "0";
        if (!prefersReduced) row.style.transform = "translateY(8px)";
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          const cardDelay = parseInt(card.dataset.cardDelay ?? "0");
          const rowStagger = parseInt(card.dataset.rowStagger ?? "100");

          const easing = "ease-out";
          const xform = (ms: number) =>
            prefersReduced ? "" : `, transform 400ms ${easing} ${ms}ms`;

          card.style.transition = `opacity 400ms ${easing} ${cardDelay}ms${xform(cardDelay)}`;
          card.style.opacity = "1";
          if (!prefersReduced) card.style.transform = "translateY(0)";

          card.querySelectorAll<HTMLElement>("[data-row]").forEach((row, i) => {
            const rowDelay = cardDelay + 200 + i * rowStagger;
            row.style.transition = `opacity 300ms ${easing} ${rowDelay}ms${xform(rowDelay).replace("400ms", "300ms")}`;
            row.style.opacity = "1";
            if (!prefersReduced) row.style.transform = "translateY(0)";
          });

          observer.unobserve(card);
        });
      },
      { threshold: 0.2 }
    );

    cardEls.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-24">
      <div className="mx-auto max-w-7xl px-16">
        {/* Top row: heading + body */}
        <div className="grid grid-cols-[2fr_3fr] items-start gap-16">
          <div>
            <div className="mb-6 w-32 border-t border-border" />
            <h2 className="font-fraktion-mono text-h2 uppercase leading-tight tracking-widest text-foreground-active">
              Field capabilities with confidence
            </h2>
          </div>

          <p className="font-muoto text-body-nom leading-relaxed text-foreground-muted text-right">
            The U.S. government is fielding capabilities faster as systems become more autonomous,
            software-driven, and interconnected. Modern warfare demands speed, adaptability, and
            multi-domain operations. But the test infrastructure supporting these systems hasn&apos;t
            kept pace and remains a patchwork of disconnected tools built for slower programs and
            simpler architectures.
          </p>
        </div>

        {/* Cards row */}
        <div className="mt-16 grid grid-cols-3 gap-6">
          {cards.map(({ delay, rowStagger, caption, Card }) => (
            <div
              key={delay}
              data-card=""
              data-card-delay={String(delay)}
              data-row-stagger={String(rowStagger)}
              className="flex flex-col"
            >
              <Card />
              <p className="mt-4 font-fraktion-mono text-sm uppercase leading-snug tracking-wide text-foreground-muted">
                {caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
