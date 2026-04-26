import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DoctorCard } from "@/components/DoctorCard";
import { doctors, specialties } from "@/data/mock";

export const Route = createFileRoute("/find-doctors")({
  head: () => ({
    meta: [
      { title: "Find Doctors — MediBook" },
      { name: "description", content: "Search and book trusted doctors by specialty, location, fees and availability." },
      { property: "og:title", content: "Find Doctors — MediBook" },
      { property: "og:description", content: "Search and book trusted doctors near you." },
    ],
  }),
  component: FindDoctorsPage,
});

function FindDoctorsPage() {
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [gender, setGender] = useState<"" | "Male" | "Female">("");
  const [maxFees, setMaxFees] = useState(150);
  const [availOnly, setAvailOnly] = useState(false);
  const [specialty, setSpecialty] = useState("");

  const results = useMemo(() => {
    return doctors.filter((d) =>
      (!q || d.name.toLowerCase().includes(q.toLowerCase()) || d.specialty.toLowerCase().includes(q.toLowerCase())) &&
      (!loc || d.location.toLowerCase().includes(loc.toLowerCase())) &&
      (!gender || d.gender === gender) &&
      d.fees <= maxFees &&
      (!availOnly || d.available) &&
      (!specialty || d.specialty === specialty)
    );
  }, [q, loc, gender, maxFees, availOnly, specialty]);

  return (
    <>
      <section className="gradient-hero py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Find Your <span className="text-gradient-primary">Doctor</span></h1>
          <p className="mt-2 text-muted-foreground">Search 10,000+ verified doctors near you</p>

          <div className="mt-6 grid gap-3 rounded-2xl bg-card p-3 shadow-card md:grid-cols-[1fr_1fr_auto]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search disease or specialist" className="h-12 rounded-xl pl-10" />
            </div>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="Location" className="h-12 rounded-xl pl-10" />
            </div>
            <Button variant="hero" size="lg">Search</Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="space-y-6 rounded-2xl border bg-card p-5 shadow-soft h-fit">
            <div className="flex items-center gap-2 text-sm font-semibold"><Filter className="h-4 w-4 text-primary" /> Filters</div>

            <div>
              <div className="mb-2 text-xs font-medium text-muted-foreground">SPECIALTY</div>
              <div className="space-y-1.5">
                <button onClick={() => setSpecialty("")} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${!specialty ? "bg-secondary text-primary font-medium" : "hover:bg-secondary"}`}>All</button>
                {specialties.map((s) => (
                  <button key={s.name} onClick={() => setSpecialty(s.name)} className={`w-full rounded-lg px-3 py-2 text-left text-sm ${specialty === s.name ? "bg-secondary text-primary font-medium" : "hover:bg-secondary"}`}>{s.icon} {s.name}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 text-xs font-medium text-muted-foreground">GENDER</div>
              <div className="flex gap-2">
                {(["", "Male", "Female"] as const).map((g) => (
                  <button key={g || "all"} onClick={() => setGender(g)} className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium ${gender === g ? "gradient-primary text-primary-foreground border-transparent" : "hover:bg-secondary"}`}>{g || "All"}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground"><span>MAX FEES</span><span className="text-foreground">${maxFees}</span></div>
              <input type="range" min={20} max={150} value={maxFees} onChange={(e) => setMaxFees(Number(e.target.value))} className="w-full accent-[var(--primary)]" />
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={availOnly} onChange={(e) => setAvailOnly(e.target.checked)} className="h-4 w-4 rounded accent-[var(--primary)]" />
              Available today
            </label>
          </aside>

          <div>
            <div className="mb-4 text-sm text-muted-foreground">{results.length} doctors found</div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((d) => (
                <DoctorCard key={d.id} doctor={d} />
              ))}
            </div>
            {results.length === 0 && (
              <div className="rounded-2xl border bg-card p-12 text-center text-muted-foreground">No doctors match your filters. Try adjusting them.</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
