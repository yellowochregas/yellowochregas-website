import { Phone, Clock, Star, ChevronDown } from "lucide-react";
import Button from "./ui/button";

export default function HeroSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[90vh] flex items-center hero-bg"
    >
      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 max-w-7xl py-20">
        <div className="max-w-3xl">
          {/* Trust Badge */}
          <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-white text-sm font-medium">24/7 Emergency Service</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-white text-sm font-medium ml-2">5.0 (166 Reviews)</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight mb-6 animate-fade-in-up animation-delay-200">
            24/7 Reliable Plumbing & Heating Services in Braintree, England.
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in-up animation-delay-400">
            Family-run heating & plumbing specialists you can trust. Serving Braintree, and all of Greater London with professional, reliable service.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
            <a href="tel:+447903753797" data-testid="hero-call-btn">
              <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 animate-pulse-glow">
                <Phone className="w-5 h-5 mr-2" />
                Call Now!
              </Button>
            </a>
            <Button
              data-testid="hero-quote-btn"
              onClick={scrollToContact}
              variant="outline"
              className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-6 text-lg rounded-full transition-all"
            >
              Get a Free Quote
            </Button>
          </div>

          {/* Contact Info */}
          <div className="mt-10 flex flex-col sm:flex-row gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">+44 7593 217699</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500">|</span>
              <span>Braintree CM7 3DP, UK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 scroll-indicator">
        <button
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-white/70 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
