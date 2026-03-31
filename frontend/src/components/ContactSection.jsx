import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageCircle
} from "lucide-react";

import Button from "./ui/button";
import Label from "./ui/label";

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
    <section id="contact" className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-bold uppercase tracking-widest text-yellow-500 mb-4 block">
            Get In Touch
          </span>

          <h2 className="font-heading text-3xl md:text-4xl font-bold text-black mb-4">
            Need Help Fast? We’re Here 24/7
          </h2>

          <p className="text-gray-600">
            Call, message, or request a quote — we respond quickly and get the job done right.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* LEFT SIDE */}
          <div className="space-y-8">

            {/* Emergency CTA */}
            <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-2">Emergency? Call Now</h3>

              <a
                href="tel:+447593217699"
                className="text-3xl font-bold text-yellow-500"
              >
                +44 7593 217699
              </a>

              <div className="flex items-center gap-2 mt-3 text-sm">
                <Clock className="w-4 h-4" />
                <span>Available 24/7</span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/447593217699"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="font-semibold">
                Chat with us on WhatsApp
              </span>
            </a>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
                ⚡ Fast Response
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
                🛠️ Expert Engineers
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
                ✅ Guaranteed Work
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <MapPin className="text-yellow-500" />
                <div>
                  <p className="font-bold">Location</p>
                  <p className="text-gray-600">
                    Braintree CM7 3DP, UK
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <CheckCircle className="text-yellow-500" />
                <div>
                  <p className="font-bold">Service Areas</p>
                  <p className="text-gray-600">
                    Greater London & Essex
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <Clock className="text-yellow-500" />
                <div>
                  <p className="font-bold">Availability</p>
                  <p className="text-gray-600">
                    24 Hours / 7 Days
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-gray-600 mb-4">
                  We’ll get back to you shortly.
                </p>

                <Button onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <Label>Your Name</Label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <Label>Phone</Label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                </div>

                <div>
                  <Label>Message</Label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 rounded-full"
                >
                  {loading ? "Sending..." : "Send Message"}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  ⚡ We usually respond within 1 hour
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}