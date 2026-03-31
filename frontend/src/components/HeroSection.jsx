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
      {/* Layer 1: Background Image - Enhanced Contrast */}
      <div 
        className="absolute inset-0 z-0 hero-bg"
        style={{
          backgroundImage: "url('/images/Gas-engineer-at-work-in-kitchen.png')",
          backgroundSize: "cover",
          backgroundPosition: "70% center",
          backgroundRepeat: "no-repeat",
          filter: "contrast(1.35) brightness(0.95) saturate(1.15)",
        }}
      />
      
      {/* Subtle dark overlay for depth */}
      <div className="absolute inset-0 z-5 bg-black/10" />

      {/* Layer 2: Subtle overlay for text readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-white/85 to-transparent" />
      
      {/* Layer 3: Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 max-w-7xl py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-1 gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="text-center max-w-3xl mx-auto">
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
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight mb-6 animate-fade-in-up animation-delay-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
              Trusted Plumbing & Heating Experts in Greater London
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-black mb-10 leading-relaxed animate-fade-in-up animation-delay-400">
              Family-run heating & plumbing specialists you can trust. Serving Braintree, Barking, Dagenham, Colchester and all of Greater London with professional, reliable service.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 animate-fade-in-up animation-delay-400">
              <a href="tel:+447903753797" data-testid="hero-call-btn">
                <Button className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>
              </a>
              <Button
                data-testid="hero-quote-btn\"
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-5 sm:px-8 sm:py-6 text-base sm:text-lg rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105">
                Get a Free Quote
              </Button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 sm:mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6 text-black">
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

          {/* Right Column: Branded Image as Foreground Element 
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-fade-in-up">
            <div className="relative">
               Decorative glow behind the image 
              <div className="absolute -inset-6 bg-yellow-500/30 rounded-3xl blur-3xl" />
              
               Branded Image as foreground card 
              <div 
                className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/80"
                style={{
                  filter: "contrast(1.3) brightness(1.08) saturate(1.15)"
                }}
              >
                <img 
                  src="https://customer-assets.emergentagent.com/job_yellow-gas-pro/artifacts/ll9ta1gq_IMG_3934.JPG"
                  alt="Yellow Ochre Gas - Plumbing & Heating"
                  className="w-full max-w-md lg:max-w-lg h-auto object-cover"
                  loading="eager"
                />
              </div>
              
               Floating badge on image 
              <div className="absolute -bottom-4 -left-4 bg-yellow-500 text-black font-bold px-5 py-3 rounded-xl shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Available 24/7</span>
                </div>
              </div>
              
               Additional floating element 
              <div className="absolute -top-3 -right-3 bg-white text-black font-bold px-4 py-2 rounded-lg shadow-lg border border-yellow-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm">5.0 Rating</span>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      {/*</div>*/}

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 scroll-indicator">
        <button
          onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
          className="text-yellow-500 hover:text-yellow-600 transition-colors bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md\"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>
    </section>
  );
}
