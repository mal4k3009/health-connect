import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, Heart, Users, Award, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroTeam from "@/assets/hero-team.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — MediBook" },
      { name: "description", content: "Learn about MediBook's mission to make healthcare accessible, modern, and human." },
      { property: "og:title", content: "About Us — MediBook" },
      { property: "og:description", content: "Learn about MediBook's mission to make healthcare accessible." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const stats = [
    { icon: Users, value: "10K+", label: "Verified Doctors" },
    { icon: Heart, value: "1M+", label: "Happy Patients" },
    { icon: Award, value: "500+", label: "Partner Hospitals" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];
  const features = [
    { icon: ShieldCheck, title: "Trusted Doctors", desc: "Every doctor on our platform is verified and credentialed." },
    { icon: Clock, title: "24/7 Emergency Help", desc: "Round-the-clock care when minutes matter most." },
    { icon: Calendar, title: "Easy Appointment Booking", desc: "Book in under 60 seconds with smart scheduling." },
    { icon: Heart, title: "Digital Healthcare Support", desc: "Manage records, prescriptions and reports in one place." },
  ];
  return (
    <>
      <section className="gradient-hero py-20">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">About MediBook</span>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Healthcare, <span className="text-gradient-primary">Reimagined</span></h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">We connect millions of patients with the best doctors, clinics and hospitals — all from one beautifully simple platform.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="overflow-hidden rounded-3xl shadow-elevated">
              <img src={heroTeam} alt="Our medical team" loading="lazy" width={1536} height={1024} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">MediBook was founded with a simple belief: quality healthcare should be accessible to everyone, everywhere. We're building tools that empower patients and doctors alike.</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-2xl bg-card p-5 shadow-soft">
                    <s.icon className="h-6 w-6 text-primary" />
                    <div className="mt-2 text-2xl font-bold">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl">Why Patients <span className="text-gradient-primary">Trust Us</span></h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 shadow-soft hover-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="hero" size="lg"><Link to="/find-doctors">Find a Doctor</Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
