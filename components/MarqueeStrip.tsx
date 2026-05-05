const items = [
  "P 83473012.12",
  "0 10 0002 20002 / 0 12 0002 02228 / 0 10 0002 20002",
  "✦",
  "CONTINUOUS TESTING",
  "NOMINAL POWERS MISSION-CRITICAL ENGINEERING WORK WITH MODERN ANALYSIS TOOLS",
  "✦",
  "REAL-TIME OBSERVABILITY",
  "P 83473012.12",
  "✦",
  "ALL SYSTEMS NOMINAL",
  "CONTINUOUS TESTING",
  "✦",
];

function Strip() {
  return (
    <>
      {items.map((item, i) => (
        <span
          key={i}
          className="font-fraktion-mono text-sm uppercase tracking-widest text-foreground-muted"
        >
          {item}
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrip() {
  return (
    <div
      className="relative flex h-12 w-full items-center overflow-hidden border-y border-border bg-background-muted"
      aria-label="Feature highlights"
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        <Strip />
        {/* Duplicate for seamless loop — hidden from assistive tech */}
        <span aria-hidden="true" className="contents">
          <Strip />
        </span>
      </div>
    </div>
  );
}
