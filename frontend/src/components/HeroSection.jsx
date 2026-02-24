import { Phone, Clock, Star, ChevronDown, Shield } from "lucide-react";
import Button from "./ui/button";

export default function HeroSection() {
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Layer 1: Background Image (New branded image) - Enhanced Contrast */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://customer-assets.emergentagent.com/job_yellow-gas-pro/artifacts/ll9ta1gq_IMG_3934.JPG')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.25) brightness(1.05) saturate(1.1)",
          transform: "scale(1.02)" // Prevent edge artifacts from filter
        }}
      />
      
      {/* Layer 2: Subtle overlay for text readability - slightly reduced for bolder background */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/90 via-white/75 to-white/30" />
      
      {/* Layer 3: Content Container */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 max-w-7xl py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in-up">
              <div className="trust-badge flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-md border border-gray-100">
                <Clock className="w-4 h-4 text-yellow-500" />
                <span className="text-black text-sm font-semibold">24/7 Emergency Service</span>
              </div>
              <div className="trust-badge flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-md border border-gray-100">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-black text-sm font-semibold">5.0 (166 Reviews)</span>
              </div>
              <div className="trust-badge flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-md border border-gray-100">
                <Shield className="w-4 h-4 text-yellow-500" />
                <span className="text-black text-sm font-semibold">Gas Safe Registered</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight mb-6 animate-fade-in-up animation-delay-200">
              24/7 Reliable Plumbing & Heating Services in Greater London
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-black mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
              Family-run heating & plumbing specialists you can trust. Serving Braintree, Dagenham, Colchester and all of Greater London with professional, reliable service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
              <a href="tel:+447903753797" data-testid="hero-call-btn">
                <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
              <Button
                data-testid="hero-quote-btn"
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-white/95 backdrop-blur-sm border-2 border-yellow-500 text-black hover:bg-yellow-500 font-semibold px-8 py-6 text-lg rounded-full transition-all hover:-translate-y-1 shadow-md"
              >
                Get a Free Quote
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6 text-black">
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-gray-100">
                <Phone className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-lg">+44 7593 217699</span>
              </div>
              <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-gray-100">
                <span className="text-yellow-500 text-xl">📍</span>
                <span className="font-medium">Braintree CM7 3DP, UK</span>
              </div>
            </div>
          </div>

          {/* Right Column: Foreground Hero Image - Softer treatment to let background dominate */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative">
              {/* Decorative background element */}
              <div className="absolute -inset-4 bg-yellow-500/15 rounded-3xl blur-2xl" />
              
              {/* Hero Image - slightly softer to let branded background stand out more */}
              <div 
                className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white/60"
                style={{
                  filter: "contrast(0.95) brightness(1.02)"
                }}
              >
                <img 
                  src="https://images.pexels.com/photos/8486978/pexels-photo-8486978.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Professional Heating Engineer from Yellow Ochre Gas"
                  className="w-full max-w-md lg:max-w-lg h-auto object-cover"
                  loading="eager"
                />
                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent" />
              </div>
              
              {/* Floating badge on image */}
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-black font-bold px-5 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 scroll-indicator">
        <button
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-yellow-500 hover:text-yellow-600 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}