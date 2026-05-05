import Link from "next/link";

function LogoMark() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      {/* 6-spoke asterisk mark */}
      <line
        x1="9" y1="1" x2="9" y2="17"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <line
        x1="2.5" y1="5.25" x2="15.5" y2="12.75"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
      <line
        x1="15.5" y1="5.25" x2="2.5" y2="12.75"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      />
    </svg>
  );
}

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
      <Link href="/" className="flex items-center gap-2.5 text-white">
        <LogoMark />
        <span className="font-fraktion-mono text-[13px] font-bold uppercase tracking-[0.08em]">
          Nominal
        </span>
      </Link>

      <div className="flex items-center gap-2.5">
        <button className="rounded-none border border-neutral-700 bg-neutral-900 px-4 py-[9px] font-fraktion-mono text-[13px] font-bold uppercase tracking-tight text-white transition-colors hover:border-neutral-600 hover:bg-neutral-800">
          Request a Demo
        </button>
        <button className="rounded-none border border-white/40 bg-transparent px-4 py-[9px] font-fraktion-mono text-[13px] font-bold uppercase tracking-tight text-white transition-colors hover:border-white/70 hover:bg-white/10">
          Open App
        </button>
      </div>
    </header>
  );
}
