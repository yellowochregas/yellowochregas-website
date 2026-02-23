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
      className="py-16 md:py-24 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-4 block">
              About Us
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-6">
              Your Trusted Local Plumbing & Heating Experts
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Yellow Ochre Gas is a family-run Plumbing & Heating business offering an extensive range of services across Greater London and surrounding areas.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                data-testid={`about-feature-${index}`}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-yellow-500/30 transition-all group"
              >
                <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-500/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-center">
              <span className="font-heading text-4xl font-bold text-yellow-600">166+</span>
              <p className="text-sm text-gray-600 mt-1">Happy Customers</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-4xl font-bold text-yellow-600">5.0</span>
              <p className="text-sm text-gray-600 mt-1">Star Rating</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-4xl font-bold text-yellow-600">24/7</span>
              <p className="text-sm text-gray-600 mt-1">Availability</p>
            </div>
            <div className="text-center">
              <span className="font-heading text-4xl font-bold text-yellow-600">100%</span>
              <p className="text-sm text-gray-600 mt-1">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
