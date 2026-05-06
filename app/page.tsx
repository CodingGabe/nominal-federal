import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import ProofSection from "@/components/ProofSection";
import MissionSection from "@/components/MissionSection";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div className="bg-background-muted">
      <Nav />
      <Hero />
      <MarqueeStrip />
      <ProblemSection />
      <BenefitsSection />
      <ProofSection />
      <MissionSection />
      <CTASection />
    </div>
  );
}
