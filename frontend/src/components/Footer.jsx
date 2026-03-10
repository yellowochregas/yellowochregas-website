import { Phone, MapPin, Clock, Star, Shield } from "lucide-react";

const services = [
  "Boiler Installation",
  "Boiler Repair & Servicing",
  "Gas Safety Certificates",
  "Cooker Installation",
  "Water Leak Repair",
  "Gas Leak Repair",
  "Power Flushing",
  "General Plumbing"
];

const areas = [
  "Braintree",
  "Barking",
  "Dagenham",
  "Colchester",
  "Greater London"
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer data-testid="footer" className="footer-dark">
      {/* Main Footer */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="font-heading font-bold text-black text-lg">YO</span>
              </div>
              <div>
                <span className="font-heading font-bold text-white">Yellow Ochre</span>
                <span className="font-heading text-yellow-500 ml-1">Gas</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Family-run Heating & Plumbing business offering professional, reliable, and affordable solutions across Greater London.
            </p>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-sm text-gray-400">5.0 (166 Reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-yellow-500" />
              <span className="footer-link">Gas Safe Registered</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("#services")}
                    className="footer-link text-sm transition-colors hover:bg-yellow-500"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">Service Areas</h4>
            <ul className="space-y-3">
              {areas.map((area, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection("#areas")}
                    className="footer-link text-sm transition-colors flex items-center gap-2 hover:bg-yellow-500"
                  >
                    <MapPin className="w-4 h-4" />
                    {area}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-bold text-white mb-6">Contact Us</h4>
            <div className="space-y-4">
              <a
                href="tel:+447903753797"
                data-testid="footer-phone-link"
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-500 transition-colors"
              >
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm">Call Us</p>
                  <p className="font-bold text-white">+44 7593 217699</p>
                </div>
              </a>

              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm">Location</p>
                  <p className="font-bold text-white">Braintree CM7 3DP</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm">Availability</p>
                  <p className="font-bold text-white">Open 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <p>&copy; {currentYear} Yellow Ochre Gas. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/admin" data-testid="footer-admin-link" className="hover:text-yellow-500 transition-colors">
                Admin
              </a>
              <span>|</span>
              <span>Plumbing & Heating Specialists</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
