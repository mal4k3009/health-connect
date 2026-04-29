import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchMedicines } from "@/lib/api";

export const Route = createFileRoute("/medicines")({
  head: () => ({
    meta: [
      { title: "Medicines — MediBook" },
      { name: "description", content: "Order genuine medicines online with fast home delivery." },
      { property: "og:title", content: "Medicines — MediBook" },
      { property: "og:description", content: "Order medicines online with fast delivery." },
    ],
  }),
  component: MedicinesPage,
});

const categories = ["All", "Fever", "Cold", "Diabetes", "BP", "Vitamins"];

function MedicinesPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [medicines, setMedicines] = useState<any[]>([]);

  useEffect(() => {
    fetchMedicines().then(setMedicines).catch(console.error);
  }, []);

  const filtered = medicines.filter((m) => (cat === "All" || m.category === cat) && (!q || m.name.toLowerCase().includes(q.toLowerCase())));

  return (
    <>
      <section className="gradient-hero py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="text-3xl font-bold md:text-4xl">Online <span className="text-gradient-primary">Pharmacy</span></h1>
          <p className="mt-2 text-muted-foreground">Genuine medicines delivered to your door</p>
          <div className="relative mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search medicines..." className="h-12 rounded-xl bg-card pl-10 shadow-soft" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-3">
            {categories.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-smooth ${cat === c ? "gradient-primary text-primary-foreground border-transparent shadow-soft" : "bg-card hover:bg-secondary"}`}>{c}</button>
            ))}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((m) => (
              <div key={m.id} className="rounded-2xl border bg-card p-5 shadow-soft hover-lift">
                <div className="flex h-32 items-center justify-center rounded-xl bg-secondary text-6xl">{m.image}</div>
                <div className="mt-3 text-xs font-medium text-primary">{m.category}</div>
                <div className="mt-1 text-base font-semibold">{m.name}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-lg font-bold">₹{m.price}</div>
                  <Button size="sm" variant="hero" onClick={() => toast.success(`${m.name} added to cart`)}><ShoppingCart className="h-4 w-4" /> Add</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
