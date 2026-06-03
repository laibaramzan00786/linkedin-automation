'use client';
import Pricing from '../../components/Pricing';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PricingPage = () => {
  return (
    <main className="min-h-screen ">
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
};

export default PricingPage;