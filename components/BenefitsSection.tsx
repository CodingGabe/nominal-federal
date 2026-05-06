"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const labels = ["Increase speed", "Reduce Cost", "Enhance Reliability"];

const cardData = [
  {
    index: 0,
    stickyClass: "sticky top-0 z-10",
    img: "/images/speed.png",
    alt: "Increase speed",
    copy: "Nominal accelerates the ability to validate and field warfighter capabilities, enabling organizations to continuously test and iterate on hardware systems more quickly, executing more test cycles in a period of time.",
  },
  {
    index: 1,
    stickyClass: "sticky top-8 z-20",
    img: "/images/reduce-cost.png",
    alt: "Reduce cost",
    copy: "Nominal reduces the overall cost of testing by enabling more test cycles in a given period of time and reducing organizational cycle time across teams, including hardware engineers, test operators, and support staff.",
  },
  {
    index: 2,
    stickyClass: "sticky top-16 z-30",
    img: "/images/enhance.png",
    alt: "Enhance reliability",
    copy: "Nominal’s software platform integrates live streaming and historical batch data from multiple pieces of hardware in a common operating picture, enabling rapid iteration on numerous technologies during operational tests of mission-critical systems.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BenefitsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState([false, false, false]);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(
            (entry.target as HTMLElement).dataset.benefitIndex ?? "0"
          );

          if (!entry.isIntersecting) return;

          // Trigger entry animation once
          setVisible((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });

          // Sync left label when card is majority in view
          if (entry.intersectionRatio >= 0.5) {
            setActiveIndex(index);
          }
        });
      },
      { threshold: [0.1, 0.5] }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section data-nav-theme="light" className="relative bg-white py-24">
      <div className="absolute top-0 right-0 h-[400px] w-[600px] pointer-events-none overflow-hidden">
        <Image
          src="/images/product-section-bg.webp"
          alt=""
          fill
          className="object-cover object-left-bottom"
          aria-hidden="true"
        />
      </div>
      <div className="mx-auto max-w-7xl px-16">
        <div className="grid grid-cols-[7fr_13fr] items-start gap-16">

          {/* ── Left sticky column ─────────────────────────────────────── */}
          <div className="sticky top-24 self-start">
            <div className="mb-6 w-full border-t border-black" />
            <h2 className="mb-16 font-fraktion-mono text-h2 uppercase leading-tight text-black">
              Learn from tests faster than the pace of threats
            </h2>

            {labels.map((label, i) => (
              <div key={i} className="mb-8">
                <div className="mb-3 w-full border-t border-black" />
                <p
                  className={`font-muoto text-sm transition-colors duration-200 ${
                    i === activeIndex
                      ? "text-black"
                      : "text-foreground-disabled"
                  }`}
                >
                  {label}
                </p>
                <div className="mt-3 w-full border-t border-black" />
              </div>
            ))}
          </div>

          {/* ── Right scrolling column ─────────────────────────────────── */}
          <div className="flex flex-col gap-0">
            {cardData.map(({ index, stickyClass, img, alt, copy }) => {
              const isVisible = visible[index];
              // Cards behind the current active card compress slightly
              const isScaled = index < activeIndex;

              // Build className avoiding transform conflicts:
              // `scale` and `translate` are independent CSS properties in Tailwind v4,
              // so they compose without interfering with each other.
              const cardClass = [
                "relative w-full min-h-[480px] overflow-hidden border-t border-border",
                stickyClass,
                "transition-all duration-500 ease-out",
                isVisible ? "opacity-100" : "opacity-0",
                // translate — skip when reduced motion (element sits at translate-y-0 by default)
                !prefersReduced
                  ? isVisible
                    ? "translate-y-0"
                    : "translate-y-10"
                  : "translate-y-0",
                // scale — skip when reduced motion
                !prefersReduced
                  ? isScaled
                    ? "scale-[0.97]"
                    : "scale-100"
                  : "scale-100",
              ].join(" ");

              return (
                <div
                  key={index}
                  ref={(el: HTMLDivElement | null) => {
                    cardRefs.current[index] = el;
                  }}
                  data-benefit-index={String(index)}
                  className={cardClass}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={img}
                      alt={alt}
                      fill
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90" />
                  </div>

                  {/* Text overlay */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-8">
                    <p className="max-w-lg font-muoto text-base leading-relaxed text-foreground-active">
                      {copy}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
