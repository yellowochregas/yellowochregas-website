import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
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

  const scrollToSection = (href) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-md"
          : "bg-white"
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
              <span className="font-heading font-bold text-gray-900 text-lg">YOG</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading font-bold text-gray-800 text-lg">Yellow Ochre</span>
              <span className="font-heading text-yellow-600 text-lg ml-1">Gas</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                data-testid={`nav-link-${link.label.toLowerCase()}`}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-700 hover:text-yellow-600 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:+447903753797" data-testid="navbar-call-btn">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-full px-6">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center gap-2">
            <a href="tel:+447593217699" data-testid="navbar-call-btn-mobile">
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-full">
                <Phone className="w-4 h-4" />
              </Button>
            </a>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  data-testid="mobile-menu-btn"
                  variant="ghost"
                  size="icon"
                  className="text-gray-800"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white">
                <div className="flex flex-col gap-6 mt-8">
                  <div className="flex items-center gap-2 pb-4 border-b">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="font-heading font-bold text-gray-900 text-lg">YOG</span>
                    </div>
                    <div>
                      <span className="font-heading font-bold text-gray-800">Yellow Ochre</span>
                      <span className="font-heading text-yellow-600 ml-1">Gas</span>
                    </div>
                  </div>
                  
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-lg text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                  
                  <a href="tel:+447903753797" className="mt-4">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-full">
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
