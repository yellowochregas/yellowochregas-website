import { Shield, Clock, Award, Users } from "lucide-react";

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
  return (
    <section
      id="about"
      data-testid="about-section"
      className="section-padding bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
              About Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-black tracking-tight mb-6 accent-underline">
              Your Trusted Local Heating & Plumbing Experts
            </h2>
            <div className="space-y-4 text-black leading-relaxed mt-10">
              <p>
                Yellow Ochre Gas is a family-run Heating & Plumbing business offering an extensive range of services across Greater London and surrounding areas.
              </p>
              <p>
                We pride ourselves on delivering professional, reliable, and affordable plumbing & heating solutions. Whether you need an emergency repair at midnight or a scheduled boiler installation, our team is here to help.
              </p>
              <p>
                With over 166 five-star reviews, we've built our reputation on trust, quality workmanship, and exceptional customer service.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`about-feature-${index}`}
                className="feature-box"
              >
                <div className="feature-icon mb-4">
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
        <div className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            <div className="text-center">
              <span className="stat-number">166+</span>
              <p className="text-sm text-black font-semibold mt-1">Happy Customers</p>
            </div>
            <div className="text-center">
              <span className="stat-number">5.0</span>
              <p className="text-sm text-black font-semibold mt-1">Star Rating</p>
            </div>
            <div className="text-center">
              <span className="stat-number">24/7</span>
              <p className="text-sm text-black font-semibold mt-1">Availability</p>
            </div>
            <div className="text-center">
              <span className="stat-number">100%</span>
              <p className="text-sm text-black font-semibold mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
