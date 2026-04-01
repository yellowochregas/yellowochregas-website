import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import ReviewsSection from "../components/ReviewsSection";
import ServiceAreasSection from "../components/ServiceAreasSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import FloatingCTA from "../components/FloatingCTA";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar scrolled={scrolled} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ReviewsSection />
        <ServiceAreasSection />
        <ContactSection />
        <FloatingCTA />
      </main>
      <Footer />
    </div>
  );
}
