import Image from "next/image";
import { ShieldCheck, Users, BookOpen, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold font-serif text-primary mb-6">About UNN Bookshop</h1>
        <p className="text-lg text-muted-foreground">
          The University of Nigeria, Nsukka (UNN) Bookshop is the official academic resource center for the university community. 
          We are dedicated to providing students, faculty, and researchers with high-quality educational materials.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-muted/30 p-8 rounded-2xl border">
          <h2 className="text-2xl font-bold font-serif text-primary mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            To facilitate academic excellence by ensuring timely, affordable, and convenient access to essential learning resources 
            for the entire university community through innovative digital solutions.
          </p>
        </div>
        <div className="bg-muted/30 p-8 rounded-2xl border">
          <h2 className="text-2xl font-bold font-serif text-primary mb-4">Our Vision</h2>
          <p className="text-muted-foreground">
            To be the leading university bookshop in Africa, setting the standard for digital academic resource management 
            and student support services.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <BookOpen className="h-6 w-6" />
          </div>
          <h3 className="text-3xl font-bold">50k+</h3>
          <p className="text-sm text-muted-foreground">Books Sold</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-3xl font-bold">30k+</h3>
          <p className="text-sm text-muted-foreground">Happy Students</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-3xl font-bold">100%</h3>
          <p className="text-sm text-muted-foreground">Authentic</p>
        </div>
        <div className="space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
            <Award className="h-6 w-6" />
          </div>
          <h3 className="text-3xl font-bold">60+</h3>
          <p className="text-sm text-muted-foreground">Years of Service</p>
        </div>
      </div>

      {/* Team Section Placeholder */}
      <div className="text-center">
        <h2 className="text-3xl font-bold font-serif text-primary mb-12">University Management</h2>
        <div className="grid md:grid-cols-3 gap-8">
           {[1, 2, 3].map((i) => (
             <div key={i} className="group relative overflow-hidden rounded-xl bg-muted aspect-[3/4]">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10">
                    <span className="text-4xl font-serif font-bold opacity-20">UNN</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white text-left">
                  <h3 className="font-bold text-lg">University Official</h3>
                  <p className="text-sm opacity-80">Management Team</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
