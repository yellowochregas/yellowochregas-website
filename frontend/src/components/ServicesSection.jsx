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
    description: "Expert installation of new gas boilers with full warranty and aftercare support."
  },
  {
    icon: Wrench,
    title: "Boiler Repair & Servicing",
    description: "Fast diagnosis and repair of all boiler makes. Annual servicing available."
  },
  {
    icon: FileCheck,
    title: "Landlord Gas Safety Certificates",
    description: "CP12 certificates for landlords. Competitive rates and fast turnaround."
  },
  {
    icon: UtensilsCrossed,
    title: "Cooker Installation",
    description: "Safe installation and connection of gas cookers and hobs."
  },
  {
    icon: Droplets,
    title: "Water Leak Inspection & Repair",
    description: "Detection and repair of water leaks with minimal disruption."
  },
  {
    icon: AlertTriangle,
    title: "Gas Leak Inspection & Repair",
    description: "Emergency gas leak detection and repair. Available 24/7."
  },
  {
    icon: Wind,
    title: "Power Flushing",
    description: "Remove sludge and debris from your heating system for better efficiency."
  },
  {
    icon: Settings,
    title: "General Plumbing & Heating",
    description: "Comprehensive plumbing and heating services for all your needs."
  }
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      data-testid="services-section"
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
            Our Services
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
            Professional Plumbing & Heating Solutions
          </h2>
          <p className="text-black leading-relaxed">
            From emergency repairs to new installations, we offer a complete range of services to keep your home comfortable and safe.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              data-testid={`service-card-${index}`}
              className="service-card group cursor-pointer"
            >
              <div className="service-icon">
                <service.icon strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-xl font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-black text-sm leading-relaxed">
                {service.description}
              </p>
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
  );
}
