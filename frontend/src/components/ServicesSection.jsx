import { useState } from "react";
import { 
  Flame, 
  Wrench, 
  FileCheck, 
  UtensilsCrossed, 
  Droplets, 
  AlertTriangle,
  Wind,
  Settings
} from "lucide-react";

const services = [
  {
    icon: Flame,
    title: "Boiler Installation",
    description: "Expert installation of new gas boilers with full warranty and aftercare support.",
    featured: true,
    details: [
      "New boiler supply & installation",
      "Energy-efficient system upgrades",
      "Full system testing & certification",
      "Aftercare and maintenance support"
    ]
  },
  {
    icon: Wrench,
    title: "Boiler Repair & Servicing",
    description: "Fast diagnosis and repair of all boiler makes. Annual servicing available.",
    details: [
      "Safe Isolation",
      "Initial Inspection & Visual Check",
      "Removing Casing & Internal Cleaning",
      "Condensate Trap Service",
      "Flue and Ventilation Check",
      "Safety Device Testing",
      "Component Inspection",
      "Combustion Analysis",
      "Final Testing & Reporting"
    ]
  },
  {
    icon: FileCheck,
    title: "Landlord Gas Safety Certificates",
    description: "CP12 certificates for landlords. Competitive rates and fast turnaround.",
    details: [
      "Find a Qualified Engineer",
      "Schedule the Inspection",
      "The Inspection (CP12 Check)",
      "Receive the Certificate"
    ]
  },
  {
    icon: UtensilsCrossed,
    title: "Cooker Installation",
    description: "Safe installation and connection of gas cookers and hobs.",
    details: [
      "Safety First",
      "Access Wiring",
      "Connect Power Cable",
      "Secure Cable",
      "Position and Level",
      "Final Inspection"
    ]
  },
  {
    icon: Droplets,
    title: "Water Leak Inspection & Repair",
    description: "Detection and repair of water leaks with minimal disruption.",
    details: [
      "Check the Water Meter",
      "Visual Inspection",
      "Toilet Test",
      "Use Specialized Tools",
      "Shut Off Water Supply",
      "Drain the Lines"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Gas Leak Inspection & Repair",
    description: "Emergency gas leak detection and repair. Available 24/7.",
    details: [
      "Initial Inspection & Detection",
      "Pressure Testing",
      "Environmental Cues",
      "Isolate the Supply",
      "Repair or Replace Components"
    ]
  },
  {
    icon: Wind,
    title: "Power Flushing",
    description: "Remove sludge and debris from your heating system for better efficiency.",
    details: [
      "Assess System",
      "Locate Access Point",
      "Connect Machine",
      "Isolate Areas",
      "Circulate and Reverse",
      "Individual Radiator Flush",
      "Agitation"
    ]
  },
  {
    icon: Settings,
    title: "General Plumbing & Heating",
    description: "Comprehensive plumbing and heating services for all your needs.",
    details: [
      "Preparation and Safety",
      "Planning and Design",
      "Rough-In Phase",
      "Testing and Inspection",
      "Fixture Installation (Trim-Out)",
      "Final Inspection"
    ]
  }
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);
  return (
    <>
    <section
      id="services"
      data-testid="services-section"
      className="py-16 sm:py-20 bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
            Our Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
            Reliable Plumbing & Heating Services You Can Count On
          </h2>
          <p className="text-black leading-relaxed">
            From emergency repairs to new installations, we offer a complete range of services to keep your home comfortable and safe.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {services.featured && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
              Popular
            </div>
            )}
          {services.map((service, index) => (
            <div
              key={index}
              data-testid={`service-card-${index}`}
              onClick={() => setSelectedService(service)}
              className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-black text-sm leading-relaxed">
                {service.description}
              </p>
                <div className="mt-4">
                  <a
                    href="tel:+447903753797"
                    className="text-yellow-500 font-semibold text-sm group-hover:underline"
                  >
                    Get this service →
                  </a>
                </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-black mb-4">
            Need a service not listed? We handle all plumbing and heating needs.
          </p>
          <a
            href="tel:+447903753797"
            data-testid="services-call-btn"
            className="inline-flex items-center text-yellow-500 hover:text-yellow-600 font-bold transition-colors"
          >
            Call us to discuss your requirements →
          </a>
        </div>
      </div>
    </section>
     {selectedService && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div
          className="bg-white rounded-2xl max-w-lg w-full p-6 relative animate-fade-in-up"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedService(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold mb-4">
            {selectedService.title}
          </h3>

          <p className="text-gray-700 mb-4">
            {selectedService.description}
          </p>

          <ul className="space-y-2 mb-6">
            {selectedService.details.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-yellow-500">✔</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+447903753797"
              className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-full text-center"
            >
              Call Now
            </a>

            <button
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                setSelectedService(null);
              }}
              className="border-2 border-yellow-500 text-black px-6 py-3 rounded-full"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);
}
