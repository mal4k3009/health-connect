import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, ShieldCheck, Clock, Stethoscope, Pill, FlaskConical, Phone, ArrowRight, Heart, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DoctorCard } from "@/components/DoctorCard";
import { fetchDoctors, fetchSpecialties, fetchMedicines, fetchLabTests } from "@/lib/api";
import heroDoctor from "@/assets/hero-doctor.jpg";
import heroTeam from "@/assets/hero-team.jpg";
import heroHospital from "@/assets/hero-hospital.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MediBook — Book Doctor Appointments Online" },
      { name: "description", content: "Find trusted doctors, clinics, hospitals & healthcare services instantly. Book appointments, order medicines, schedule lab tests." },
      { property: "og:title", content: "MediBook — Book Doctor Appointments Online" },
      { property: "og:description", content: "Find trusted doctors, clinics, hospitals & healthcare services instantly." },
    ],
  }),
  component: HomePage,
});

const slides = [
  { image: heroDoctor, title: "Book Doctor Appointments Online Easily", subtitle: "Find trusted doctors, clinics, hospitals & healthcare services instantly" },
  { image: heroTeam, title: "Care from World-Class Specialists", subtitle: "Connect with top-rated doctors across 30+ specialties" },
  { image: heroHospital, title: "Modern Hospital, At Your Fingertips", subtitle: "Quality healthcare delivered to your doorstep, 24/7" },
];

function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div
          key={`text-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-background/80 px-4 py-1.5 text-xs font-medium text-primary shadow-soft backdrop-blur">
            <Heart className="h-3.5 w-3.5" /> #1 Online Healthcare Platform
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {s.title.split(" ").slice(0, 3).join(" ")}{" "}
            <span className="text-gradient-primary">{s.title.split(" ").slice(3).join(" ")}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">{s.subtitle}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/find-doctors"><Search className="h-4 w-4" /> Find Doctor</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/auth"><Calendar className="h-4 w-4" /> Book Appointment</Link>
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Users, label: "10K+ Doctors" },
              { icon: Award, label: "500+ Hospitals" },
              { icon: Heart, label: "1M+ Patients" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-background/60 p-3 backdrop-blur shadow-soft">
                <s.icon className="mx-auto h-5 w-5 text-primary" />
                <div className="mt-1 text-xs font-medium">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-1.5 rounded-full transition-smooth ${idx === i ? "w-8 gradient-primary" : "w-3 bg-border"}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          key={`img-${i}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl gradient-primary opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-3xl shadow-elevated">
            <img src={s.image} alt={s.title} width={1536} height={1024} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-card p-4 shadow-elevated md:block animate-float">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary">
                <ShieldCheck className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Verified Doctors</div>
                <div className="text-sm font-semibold">100% Trusted</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const aboutCards = [
  { icon: ShieldCheck, title: "Trusted Doctors", desc: "Verified specialists across 30+ medical fields." },
  { icon: Clock, title: "24/7 Emergency Help", desc: "Round-the-clock access to emergency care." },
  { icon: Calendar, title: "Easy Appointment Booking", desc: "Book your slot in under 60 seconds." },
  { icon: Heart, title: "Digital Healthcare Support", desc: "Records, prescriptions and reports in one app." },
];

function AboutSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">About Us</span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Your Health, <span className="text-gradient-primary">Our Priority</span></h2>
          <p className="mt-3 text-muted-foreground">We're transforming the way healthcare is delivered — modern, accessible, and human.</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-2xl border bg-card p-6 shadow-soft hover-lift"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-soft">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
              <Link to="/about" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-smooth group-hover:gap-2">
                Read More <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpecialtiesSection({ specialties, doctors }: { specialties: any[], doctors: any[] }) {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Find by Specialty</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Browse Top <span className="text-gradient-primary">Specialists</span></h2>
          </div>
          <Button asChild variant="soft" className="hidden md:inline-flex">
            <Link to="/find-doctors">View All <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {specialties.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link to="/find-doctors" className="block rounded-2xl bg-card p-5 text-center shadow-soft hover-lift">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-2xl">
                  {s.icon}
                </div>
                <div className="mt-3 text-sm font-semibold">{s.name}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-xl font-bold">Top Rated Doctors</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.slice(0, 4).map((d) => (
              <DoctorCard key={d.id} doctor={d} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/find-doctors">View All Doctors <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function EmergencyPreview() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl gradient-emergency p-8 text-emergency-foreground shadow-elevated md:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Emergency Services
              </span>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Need Help Right Now?</h2>
              <p className="mt-3 max-w-md text-white/90">
                Ambulance, ICU, nearby hospitals and emergency doctors — available 24/7 with one tap.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="tel:108" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-emergency shadow-soft transition-smooth hover:scale-[1.02]">
                  <Phone className="h-5 w-5" /> Call Now: 108
                </a>
                <Button asChild variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <Link to="/emergency">View All <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["Ambulance Service", "ICU Support", "Nearby Hospitals", "Emergency Doctors"].map((t) => (
                <div key={t} className="rounded-xl bg-white/10 p-4 backdrop-blur">
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-white/80">Available 24/7</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MedicinesPreview({ medicines }: { medicines: any[] }) {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Pharmacy</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Order <span className="text-gradient-primary">Medicines</span></h2>
          </div>
          <Button asChild variant="soft" className="hidden md:inline-flex">
            <Link to="/medicines">View All <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
          {medicines.map((m) => (
            <div key={m.id} className="min-w-[220px] rounded-2xl bg-card p-5 shadow-soft hover-lift">
              <div className="flex h-24 items-center justify-center rounded-xl bg-secondary text-5xl">{m.image}</div>
              <div className="mt-3 text-xs font-medium text-primary">{m.category}</div>
              <div className="mt-1 text-sm font-semibold">{m.name}</div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-base font-bold">₹{m.price}</div>
                <Button size="sm" variant="hero">Add</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LabTestsPreview({ labTests }: { labTests: any[] }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Diagnostics</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Lab Tests <span className="text-gradient-primary">at Home</span></h2>
          </div>
          <Button asChild variant="soft" className="hidden md:inline-flex">
            <Link to="/lab-tests">View All <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4">
          {labTests.map((t) => (
            <div key={t.id} className="min-w-[260px] rounded-2xl border bg-card p-5 shadow-soft hover-lift">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                <FlaskConical className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-base font-semibold">{t.name}</h3>
              <div className="mt-1 text-xs text-muted-foreground">Home sample collection · Reports in {t.time}</div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-lg font-bold">₹{t.price}</div>
                <Button size="sm" variant="hero">Book Test</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPreview() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-10 rounded-3xl bg-card p-8 shadow-card md:p-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">Get in <span className="text-gradient-primary">Touch</span></h2>
            <p className="mt-3 text-muted-foreground">Have a question? Our team is happy to help.</p>
            <div className="mt-8 space-y-4 text-sm">
              <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><Stethoscope className="h-5 w-5" /></div><div><div className="font-semibold">Address</div><div className="text-muted-foreground">1234 Healthcare Ave, Suite 500</div></div></div>
              <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><Phone className="h-5 w-5" /></div><div><div className="font-semibold">Phone</div><div className="text-muted-foreground">+1 (800) 123-4567</div></div></div>
              <div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><Pill className="h-5 w-5" /></div><div><div className="font-semibold">Email</div><div className="text-muted-foreground">hello@medibook.com</div></div></div>
            </div>
            <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-secondary">
              <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.97%2C40.74&layer=mapnik" className="h-full w-full border-0" />
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); import("sonner").then(({ toast }) => toast.success("Message sent! We'll get back to you soon.")); (e.target as HTMLFormElement).reset(); }}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required placeholder="Full Name" className="h-12 rounded-xl" />
              <Input required type="email" placeholder="Email Address" className="h-12 rounded-xl" />
            </div>
            <Input required placeholder="Subject" className="h-12 rounded-xl" />
            <textarea required placeholder="Your Message" rows={6} className="w-full rounded-xl border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [specialties, setSpecialties] = useState<any[]>([]);
  const [medicines, setMedicines] = useState<any[]>([]);
  const [labTests, setLabTests] = useState<any[]>([]);

  useEffect(() => {
    fetchDoctors().then(setDoctors).catch(console.error);
    fetchSpecialties().then(setSpecialties).catch(console.error);
    fetchMedicines().then(setMedicines).catch(console.error);
    fetchLabTests().then(setLabTests).catch(console.error);
  }, []);

  return (
    <>
      <HeroSlider />
      <AboutSection />
      <SpecialtiesSection specialties={specialties} doctors={doctors} />
      <EmergencyPreview />
      <MedicinesPreview medicines={medicines} />
      <LabTestsPreview labTests={labTests} />
      <ContactPreview />
    </>
  );
}
