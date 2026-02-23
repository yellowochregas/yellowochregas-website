import { MapPin, CheckCircle } from "lucide-react";

const areas = [
  "Braintree",
  "Dagenham",
  "Colchester",
  "Greater London",
  "Ilford",
  "Romford",
  "Stratford",
  "East Ham"
];

export default function ServiceAreasSection() {
  return (
    <section
      id="areas"
      data-testid="areas-section"
      className="py-16 md:py-24 bg-gray-800"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-yellow-500 mb-4 block">
              Service Areas
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
              Serving Braintree & Surrounding Areas
            </h2>
            <p className="text-gray-300 leading-relaxed mb-8">
              Based in Braintree, we provide fast and reliable plumbing and heating services across East London and Essex. Our engineers are always nearby, ready to help with your emergency or scheduled work.
            </p>

            {/* Areas Grid */}
            <div className="grid grid-cols-2 gap-3">
              {areas.map((area, index) => (
                <div
                  key={index}
                  data-testid={`area-item-${index}`}
                  className="flex items-center gap-2 text-gray-200"
                >
                  <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>

            {/* Location Info */}
            <div className="mt-8 p-4 bg-gray-700/50 rounded-lg flex items-start gap-3">
              <MapPin className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
              <div>
                <p className="text-white font-semibold">Our Base Location</p>
                <p className="text-gray-300 text-sm">Braintree CM7 3DP, United Kingdom</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="map-container rounded-xl overflow-hidden shadow-2xl">
            <iframe
              data-testid="google-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39737.36823657851!2d0.052722!3d51.536667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a68d32e63ae1%3A0x4e50fceabe4e1b46!2sBarking%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yellow Ochre Gas Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
