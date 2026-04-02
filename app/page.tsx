import Navbar from '@/components/Navbar'
import Hero from "@/components/Hero";
import BentoFeatures from "@/components/BentoFeatures";
import WhiteSection from "@/components/WhiteSection";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
   <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <BentoFeatures />
        <WhiteSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}