import {
  Phone,
  MapPin,
  Clock,
  Star,
  Shield,
  MessageCircle
} from "lucide-react";

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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white">

      {/* 🔥 TOP CTA STRIP */}
      <div className="bg-yellow-500 text-black py-4 px-4 text-center font-semibold">
        🚨 Need urgent help? Call now — we’re available 24/7
        <a href="tel:+447593217699" className="ml-2 underline font-bold">
          +44 7593 217699
        </a>
      </div>

      {/* MAIN FOOTER */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* COMPANY */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="font-bold text-black">YO</span>
              </div>
              <span className="font-bold">
                Yellow Ochre <span className="text-yellow-500">Gas</span>
              </span>
            </div>

            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Trusted plumbing & heating experts serving Greater London.
              Fast response, certified engineers, and reliable service you can count on.
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="text-sm text-gray-400">5.0 (166 Reviews)</span>
            </div>

            {/* Trust */}
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-yellow-500" />
              Gas Safe Registered
            </div>
          </div>

          {/* SERVICES */}
          <div>
            <h4 className="font-bold mb-5">Services</h4>
            <ul className="space-y-2 text-sm">
              {services.map((service, i) => (
                <li key={i}>
                  <button
                    onClick={() => scrollToSection("#services")}
                    className="text-gray-400 hover:text-yellow-500 transition"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* AREAS */}
          <div>
            <h4 className="font-bold mb-5">Service Areas</h4>
            <ul className="space-y-2 text-sm">
              {areas.map((area, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-yellow-500" />
                  {area}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-bold mb-5">Contact</h4>

            <div className="space-y-4">

              {/* Call */}
              <a
                href="tel:+447593217699"
                className="flex items-center gap-3 hover:text-yellow-500 transition"
              >
                <Phone />
                <span>+44 7593 217699</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/447593217699"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-400 transition"
              >
                <MessageCircle />
                <span>WhatsApp Chat</span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin />
                <span>Braintree, UK</span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 text-gray-400">
                <Clock />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🔥 SEO TEXT */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-gray-500 text-sm leading-relaxed max-w-4xl">
          We provide expert plumbing and heating services across Greater London,
          including Braintree, Barking, Dagenham, and surrounding areas. Whether
          you need emergency boiler repairs, gas safety certificates, or full
          system installations, our certified engineers are ready to help 24/7.
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>&copy; {currentYear} Yellow Ochre Gas. All rights reserved.</p>

          <div className="flex gap-4 items-center">
            <a href="/admin" className="hover:text-yellow-500">
              Admin
            </a>
            <span>|</span>
            <span>Plumbing & Heating Specialists</span>
          </div>
        </div>
      </div>
    </footer>
  );
}