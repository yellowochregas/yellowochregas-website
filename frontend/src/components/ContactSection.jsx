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
      const errorMessage =
        error.response?.data?.detail ||
        "Failed to send message. Please try calling us.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="py-16 md:py-24 bg-gray-50"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-yellow-600 mb-4 block">
            Get In Touch
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-4">
            Contact Us Today
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Need emergency help or want to schedule a service? Get in touch and we'll respond promptly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <div>
            {/* Emergency Call CTA */}
            <div className="bg-yellow-500 rounded-2xl p-8 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-yellow-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                    Emergency? Call Now!
                  </h3>
                  <a
                    href="tel:+447903753797"
                    data-testid="contact-phone-link"
                    className="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
                  >
                    +44 7593 217699
                  </a>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock className="w-5 h-5 text-gray-800" />
                    <span className="text-gray-800 font-medium">Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                  <p className="text-gray-600">Braintree CM7 3DP, United Kingdom</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Service Areas</h4>
                  <p className="text-gray-600">Braintree, Dagenham, Colchester, Greater London</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Availability</h4>
                  <p className="text-gray-600">Open 24 Hours - 7 Days a Week</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-gray-800 mb-3">
                  Thank You!
                </h3>
                <p className="text-gray-600 mb-6">
                  Your message has been received. We'll get back to you shortly.
                </p>
                <Button
                  data-testid="send-another-btn"
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    data-testid="contact-name-input"
                    type="text"
                    placeholder="Name..."
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    data-testid="contact-email-input"
                    type="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-gray-700 font-medium">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    data-testid="contact-phone-input"
                    type="tel"
                    placeholder="+44 7XXX XXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    minLength={10}
                    className="mt-2 h-12 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Your Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    data-testid="contact-message-input"
                    placeholder="Describe your plumbing or heating issue..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    className="mt-2 bg-gray-50 border-gray-200 focus:border-yellow-500 focus:ring-yellow-500 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={loading}
                  className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
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

                <p className="text-center text-sm text-gray-500">
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