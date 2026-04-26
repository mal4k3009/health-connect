import { createFileRoute } from "@tanstack/react-router";
import { Phone, Ambulance, Activity, Building2, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency Services — MediBook" },
      { name: "description", content: "24/7 ambulance, ICU, emergency doctors and nearby hospitals at your fingertips." },
      { property: "og:title", content: "Emergency Services — MediBook" },
      { property: "og:description", content: "24/7 emergency healthcare available now." },
    ],
  }),
  component: EmergencyPage,
});

const services = [
  { icon: Ambulance, title: "Ambulance Service", desc: "GPS-tracked ambulances in under 10 minutes.", time: "10 min ETA" },
  { icon: Activity, title: "ICU Support", desc: "Critical care units with specialist coverage.", time: "24/7" },
  { icon: Building2, title: "Nearby Hospitals", desc: "Find the closest emergency-ready hospitals.", time: "Live" },
  { icon: Stethoscope, title: "Emergency Doctors", desc: "On-call doctors for immediate consultation.", time: "Now" },
];

function EmergencyPage() {
  return (
    <>
      <section className="gradient-emergency py-20 text-emergency-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" /> Emergency Hotline Active
          </span>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">We're Here, <span className="opacity-90">24/7</span></h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">Immediate access to ambulance, ICU, hospitals and emergency doctors. Don't wait.</p>
          <a href="tel:108" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-emergency shadow-elevated transition-smooth hover:scale-[1.02] animate-pulse-ring">
            <Phone className="h-6 w-6" /> Call Now: 108
          </a>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="rounded-2xl border bg-card p-6 shadow-soft hover-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-emergency text-emergency-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-3 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-medium text-primary">{s.time}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button variant="emergency" size="lg" asChild>
              <a href="tel:108"><Phone className="h-5 w-5" /> Emergency Hotline</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
