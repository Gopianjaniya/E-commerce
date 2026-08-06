import React, { useState } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you within 24 hours. 💬");
      setForm({ name: "", email: "", message: "" });
      setSending(false);
    }, 800);
  };

  const contactInfo = [
    { icon: <MapPin size={18} />, label: "Address", value: "2nd Floor, Fashion Hub\nMG Road, Indore, MP 452001" },
    { icon: <Phone size={18} />, label: "Phone", value: "+91 98765 43210" },
    { icon: <Mail size={18} />, label: "Email", value: "support@apnacart.com" },
    { icon: <Clock size={18} />, label: "Hours", value: "Mon – Sat, 9 AM – 7 PM IST" },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-12">
          <Title text1="CONTACT" text2="US" />
          <p className="text-gray-400 text-sm mt-1">We'd love to hear from you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Left — Contact info */}
          <div className="space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 opacity-20" />
              <img
                src={assets.contactImage}
                alt="Contact"
                className="w-full h-56 sm:h-72 object-cover"
              />
            </div>

            <div className="card p-6 space-y-5">
              <h3 className="font-bold text-gray-800 text-base">Get in Touch</h3>
              {contactInfo.map(({ icon, label, value }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-gray-700 font-medium whitespace-pre-line">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <div className="card p-7">
            <h3 className="font-bold text-gray-800 text-base mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Your Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  type="text"
                  placeholder="Rahul Sharma"
                  required
                  className="input-modern"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Email Address</label>
                <input
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  type="email"
                  placeholder="rahul@example.com"
                  required
                  className="input-modern"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={5}
                  placeholder="Tell us how we can help…"
                  required
                  className="input-modern resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2"
              >
                {sending ? <span className="spinner" /> : <><Send size={16} /> Send Message</>}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Careers at ApnaCart</p>
              <p className="text-sm text-gray-500 mb-4">
                We're always looking for passionate people to join our team. If you're interested in fashion, e-commerce, or customer experience, we'd love to hear from you.
              </p>
              <button className="btn-outline text-sm">Explore Careers</button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
