import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProblemSection from "@/components/ProblemSection";

export default function Home() {
  return (
    <div className="bg-background-muted">
      <Nav />
      <Hero />
      <MarqueeStrip />
      <ProblemSection />
    </div>
  );
}
