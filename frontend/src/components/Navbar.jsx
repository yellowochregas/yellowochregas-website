import { useState, useEffect } from "react";
import { Phone, Menu } from "lucide-react";
import Button from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#reviews", label: "Reviews" },
  { href: "#areas", label: "Areas" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ scrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // 🔍 Detect active section
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // 🎯 Smooth scroll with offset
  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);

    if (element) {
      const offset = 80;
      const top = element.offsetTop - offset;

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/80 shadow-md border-b border-gray-200"
          : "bg-white border-b border-gray-100"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <a
            href="#"
            data-testid="navbar-logo"
            className="flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="font-heading font-bold text-black text-lg">YO</span>
            </div>

            <div className="hidden sm:block">
              <span className="font-heading font-bold text-black text-xl">
                Yellow Ochre
              </span>
              <span className="font-heading text-yellow-500 text-xl ml-1">
                Gas
              </span>
              <span className="text-xs text-gray-500 block">
                Gas Safe Registered
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                className={`text-sm uppercase tracking-wide font-semibold transition-all ${
                  activeSection === link.href
                    ? "text-yellow-500"
                    : "text-black hover:text-yellow-500"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+447903753797" data-testid="navbar-call-btn">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full px-6 py-5 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-2">
            {/* Call Button */}
            <a href="tel:+447903753797" data-testid="navbar-call-btn-mobile">
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-black rounded-full shadow-md"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </a>

            {/* Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="mobile-menu-btn"
                  className="text-black hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[280px] bg-white">
                <div className="flex flex-col gap-6 mt-8 px-2">

                  {/* Logo */}
                  <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="font-heading font-bold text-black text-lg">YO</span>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-black">
                        Yellow Ochre
                      </span>
                      <span className="font-heading text-yellow-500 ml-1">
                        Gas
                      </span>
                    </div>
                  </div>

                  {/* Links */}
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                      className={`py-2 text-left text-lg font-semibold transition-colors ${
                        activeSection === link.href
                          ? "text-yellow-500"
                          : "text-black hover:text-yellow-500"
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}

                  {/* CTA */}
                  <a href="tel:+447903753797" className="mt-4">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-full shadow-md">
                      <Phone className="w-4 h-4 mr-2" />
                      +44 7593 217699
                    </Button>
                  </a>

                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>
    </header>
  );
}