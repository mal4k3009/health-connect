import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { MapPin, Phone, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — MediBook" },
      { name: "description", content: "Get in touch with the MediBook team — we're here to help 24/7." },
      { property: "og:title", content: "Contact Us — MediBook" },
      { property: "og:description", content: "Reach the MediBook team anytime." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">Contact</span>
          <h1 className="mt-2 text-4xl font-bold md:text-5xl">Get in <span className="text-gradient-primary">Touch</span></h1>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">We'd love to hear from you. Send us a message and our team will respond shortly.</p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-card p-8 shadow-card">
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><MapPin className="h-5 w-5" /></div><div><div className="font-semibold">Address</div><div className="text-muted-foreground">1234 Healthcare Avenue, Suite 500, New York, NY 10001</div></div></div>
              <div className="flex items-start gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><Phone className="h-5 w-5" /></div><div><div className="font-semibold">Phone</div><div className="text-muted-foreground">+1 (800) 123-4567</div></div></div>
              <div className="flex items-start gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-primary-foreground"><Mail className="h-5 w-5" /></div><div><div className="font-semibold">Email</div><div className="text-muted-foreground">hello@medibook.com</div></div></div>
            </div>
            <div className="mt-6 aspect-video overflow-hidden rounded-2xl bg-secondary">
              <iframe title="Map" src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.97%2C40.74&layer=mapnik" className="h-full w-full border-0" />
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Message sent!"); (e.target as HTMLFormElement).reset(); }}
            className="space-y-4 rounded-3xl bg-card p-8 shadow-card"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Input required placeholder="Full Name" className="h-12 rounded-xl" />
              <Input required type="email" placeholder="Email Address" className="h-12 rounded-xl" />
            </div>
            <Input required placeholder="Subject" className="h-12 rounded-xl" />
            <textarea required placeholder="Your Message" rows={7} className="w-full rounded-xl border border-input bg-background p-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
            <Button type="submit" variant="hero" size="lg" className="w-full">Send Message</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
