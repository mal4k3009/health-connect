import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { FlaskConical, Home, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { labTests } from "@/data/mock";

export const Route = createFileRoute("/lab-tests")({
  head: () => ({
    meta: [
      { title: "Lab Tests — MediBook" },
      { name: "description", content: "Book lab tests with home sample collection and quick reports." },
      { property: "og:title", content: "Lab Tests — MediBook" },
      { property: "og:description", content: "Book lab tests with home sample collection." },
    ],
  }),
  component: LabTestsPage,
});

function LabTestsPage() {
  return (
    <>
      <section className="gradient-hero py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Lab Tests <span className="text-gradient-primary">at Home</span></h1>
          <p className="mt-2 text-muted-foreground">NABL-certified labs · Free home sample collection</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {labTests.map((t) => (
              <div key={t.id} className="rounded-2xl border bg-card p-6 shadow-soft hover-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{t.name}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Home className="h-4 w-4 text-primary" /> Home sample collection</div>
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Reports in {t.time}</div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-2xl font-bold">${t.price}</div>
                  <Button variant="hero" onClick={() => toast.success(`${t.name} booked!`)}>Book Test</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
