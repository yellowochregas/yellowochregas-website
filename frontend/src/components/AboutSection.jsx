import { Shield, Clock, Award, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

const features = [
  {
    icon: Users,
    title: "Experienced Engineers",
    description: "Our team brings years of expertise to every job"
  },
  {
    icon: Clock,
    title: "24/7 Emergency Service",
    description: "Available around the clock for urgent repairs"
  },
  {
    icon: Award,
    title: "Customer Satisfaction",
    description: "5-star rated with 166+ happy customers"
  },
  {
    icon: Shield,
    title: "Fully Insured & Certified",
    description: "Gas Safe registered and fully covered"
  }
];





export default function AboutSection() {
  const [stats, setStats] = useState({
  customers: 0,
  rating: 0,
  availability: 0,
  satisfaction: 0,
});
  const { ref, inView: isVisible } = useInView({
  triggerOnce: true,
  threshold: 0.5,
});

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

useEffect(() => {
  if (!isVisible) return;

  const duration = 2000;
  const interval = 20;
  const steps = duration / interval;

  let step = 0;
  
  const timer = setInterval(() => {
  step++;

    const progress = step / steps; // 0 → 1
    const easedProgress = easeOutCubic(progress);

    setStats({
      customers: Math.min(Math.floor(166 * easedProgress), 166),
      rating: Math.min((5 * easedProgress), 5).toFixed(1),
      availability: Math.min(Math.floor(24 * easedProgress), 24),
      satisfaction: Math.min(Math.floor(100 * easedProgress), 100),
    });

    if (step >= steps) {
      clearInterval(timer);
    }
  }, interval);

  return () => clearInterval(timer);
}, [isVisible]); // ✅ FIXED

  return (
    <section
      id="about"
      data-testid="about-section"
      className="section-padding bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="animate-fade-in-up">
            <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
              About Us
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight mb-6 leading-tight">
              Trusted Local Engineers Delivering Fast, Reliable Plumbing & Heating Services
            </h2>
            <div className="space-y-4 text-black leading-relaxed mt-6 sm:mt-8">
              <p>
                We’re a family-run heating and plumbing company trusted by homeowners across Greater London for fast, reliable, and professional service.
              </p>
              <p>
                From emergency repairs to full boiler installations, our Gas Safe registered engineers are available 24/7 to get your home running safely and efficiently.
              </p>
              <p>
                With over 166 five-star reviews, our reputation is built on honest pricing, quality workmanship, and putting our customers first — every time.
              </p>
            </div>
          </div>

          <div className="relative mb-8">
            <img
              src="/images/gas-safe-engineer-2.jpg"
              alt="Gas Safe Engineer at work"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute bottom-4 left-4 bg-yellow-500 text-black font-bold px-4 py-2 rounded-lg shadow-md">
              Gas Safe Registered
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`about-feature-${index}`}
                className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-bold text-black mb-2">
                  {feature.title}
                </h3>
                <p className="text-black text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
            
        {/* Trust Stats */}
        <div ref={ref} className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <span className="text-3xl sm:text-4xl font-bold text-yellow-500">
                {stats.customers}+
              </span>
              <p className="text-sm text-black font-semibold mt-1">Happy Customers</p>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <span className="text-3xl sm:text-4xl font-bold text-yellow-500">
                {stats.rating}
              </span>
              <p className="text-sm text-black font-semibold mt-1">Star Rating</p>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <span className="text-3xl sm:text-4xl font-bold text-yellow-500">
                {stats.availability}/7
              </span>
              <p className="text-sm text-black font-semibold mt-1">Availability</p>
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "0ms" }}>
              <span className="text-3xl sm:text-4xl font-bold text-yellow-500">
                {stats.satisfaction}%
              </span>
              <p className="text-sm text-black font-semibold mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
