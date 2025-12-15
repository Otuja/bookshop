"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import BackgroundGeometry from "@/components/ui/BackgroundGeometry";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
  };

  return (
    <div className="min-h-screen pt-24 pb-16 relative">
      <BackgroundGeometry />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-serif mb-4">Contact Us</h1>
            <p className="text-muted-foreground">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">
                    University of Nigeria, Nsukka<br />
                    Enugu State, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground">
                    +234 800 123 4567<br />
                    Mon - Fri, 8am - 5pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground">
                    support@unnbookshop.com<br />
                    info@unnbookshop.com
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold font-serif mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-primary text-primary-foreground h-10 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors">
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
