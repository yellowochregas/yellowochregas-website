// ContactSection.jsx

import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

// Corrected named imports from shadcn/ui-style components
import Button from "./ui/button";
import Input from "./ui/input";
import Textarea from "./ui/textarea";
import Label from "./ui/label";

// Backend API URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      const errorMessage = error.response?.data?.detail || "Failed to send message. Please try calling us.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black tracking-tight mb-4">
            Contact Us Today
          </h2>
          <p className="text-black leading-relaxed">
            Need emergency help or want to schedule a service? Get in touch and we'll respond promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            {/* Emergency Call CTA */}
            <div className="emergency-cta mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-black mb-2">
                    Emergency? Call Now!
                  </h3>
                  <a
                    href="tel:+447903753797"
                    data-testid="contact-phone-link"
                    className="text-3xl font-bold text-black hover:opacity-80 transition-opacity"
                  >
                    +44 7903 753797
                  </a>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock className="w-5 h-5 text-black" />
                    <span className="text-black font-semibold">Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Location</h4>
                  <p className="text-black">Barking IG11 0QA, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Service Areas</h4>
                  <p className="text-black">Barking, Dagenham, Colchester, Greater London</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-bold text-black mb-1">Availability</h4>
                  <p className="text-black">Open 24 Hours - 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-card">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-black mb-3">
                  Thank You!
                </h3>
                <p className="text-black mb-6">
                  Your message has been received. We'll get back to you shortly.
                </p>
                <Button
                  data-testid="send-another-btn"
                  onClick={() => setSubmitted(false)}
                  className="border-2 border-yellow-500 text-black bg-transparent hover:bg-yellow-500 font-semibold rounded-full px-6"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-black font-bold mb-2 block">
                    Your Name *
                  </Label>
                  <input
                    id="name"
                    name="name"
                    data-testid="contact-name-input"
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="form-input-refined w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-black font-bold mb-2 block">
                    Email Address *
                  </Label>
                  <input
                    id="email"
                    name="email"
                    data-testid="contact-email-input"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input-refined w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-black font-bold mb-2 block">
                    Phone Number *
                  </Label>
                  <input
                    id="phone"
                    name="phone"
                    data-testid="contact-phone-input"
                    type="tel"
                    placeholder="+44 7XXX XXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className="form-input-refined w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-black font-bold mb-2 block">
                    Your Message *
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    data-testid="contact-message-input"
                    placeholder="Describe your plumbing or heating issue..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    className="form-input-refined w-full resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={loading}
                  className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-center text-sm text-black">
                  We'll respond within 1 hour during working hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
