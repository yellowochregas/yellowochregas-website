import { useEffect, useState } from "react";
import { MapPin, CheckCircle, Phone } from "lucide-react";

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
  const [userArea, setUserArea] = useState(null);
  useEffect(() => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Reverse geocode using OpenStreetMap (FREE)
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );
        const data = await res.json();

        const city =
          data.address.city ||
          data.address.town ||
          data.address.village;

        if (city) {
          setUserArea(city);
        }
      } catch (err) {
        console.log("Location fetch failed");
      }
    },
    () => {
      console.log("User denied location");
    }
  );
}, []);
  return (
    <section
      id="areas"
      data-testid="areas-section"
      className="py-16 sm:py-20 section-dark-refined"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="animate-fade-in-up">
            <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
              Service Areas
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
              Fast Response Across Greater London & Essex
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8 max-w-xl">
              Based in Braintree, our Gas Safe engineers are strategically positioned to reach you quickly. Whether it’s an emergency or scheduled job, we’re always nearby and ready to help.
            </p>

            {/* Trust Strip */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
                ⚡ Fast Local Response
              </div>
              <div className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
                🛠️ Local Engineers Near You
              </div>
              <div className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-semibold backdrop-blur">
                ⏱️ Same-Day Availability
              </div>
            </div>

            {userArea && (
                <div className="mb-6 bg-yellow-500 text-black px-5 py-3 rounded-xl font-semibold shadow-lg animate-fade-in-up">
                  📍 Good news! We serve your area: <span className="font-bold">{userArea}</span>
                </div>
              )}

            {/* Areas Grid */}
            <div className="grid grid-cols-2 gap-4">
              {areas.map((area, index) => {
                const isUserArea =
                  userArea &&
                  area.toLowerCase().includes(userArea.toLowerCase());

                return (
                  <div
                    key={index}
                    data-testid={`area-item-${index}`}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 border transition-all animate-fade-in-up
                      ${
                        isUserArea
                          ? "bg-yellow-500 text-black border-yellow-500 scale-105 shadow-lg"
                          : "bg-white/5 text-white border-white/10 hover:bg-white/10"
                      }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CheckCircle
                      className={`w-5 h-5 ${
                        isUserArea ? "text-black" : "text-yellow-500"
                      }`}
                    />
                    <span className="font-medium">{area}</span>
                  </div>
                );
              })}
            </div>

            {/* Location Card */}
            <div className="mt-10 p-5 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 flex items-start gap-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-black" />
              </div>

              <div>
                <p className="text-white font-bold text-lg">
                  Based in Braintree
                </p>
                <p className="text-gray-300">
                  Covering Greater London & Essex daily
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <a
                href="tel:+447903753797"
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-4 rounded-full shadow-lg transition-all hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                Call Now — We’re Near You
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-yellow-500/20 blur-2xl rounded-2xl" />

            <iframe
              data-testid="google-map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39737.36823657851!2d0.052722!3d51.536667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a68d32e63ae1%3A0x4e50fceabe4e1b46!2sBarking%2C%20UK!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
              className="relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}