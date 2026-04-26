import { Link } from "@tanstack/react-router";
import { Star, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/data/mock";

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-card hover-lift">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={doctor.image}
          alt={doctor.name}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        {doctor.available && (
          <span className="absolute left-3 top-3 rounded-full bg-success px-2.5 py-1 text-xs font-medium text-success-foreground shadow-soft">
            Available
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="text-sm font-medium text-primary">{doctor.specialty}</div>
        <h3 className="mt-1 text-lg font-semibold">{doctor.name}</h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {doctor.location} · {doctor.experience} exp
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{doctor.rating}</span>
            <span className="text-muted-foreground">({doctor.reviews})</span>
          </div>
          <div className="text-sm font-semibold text-foreground">${doctor.fees}</div>
        </div>
        <Button asChild variant="hero" className="mt-4 w-full">
          <Link to="/auth">
            <Calendar className="h-4 w-4" /> Book Appointment
          </Link>
        </Button>
      </div>
    </div>
  );
}
