import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, FlaskConical, Pill, Stethoscope, LogOut, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

export const Route = createFileRoute("/dashboard/patient")({
  head: () => ({
    meta: [{ title: "Patient Dashboard — MediBook" }],
  }),
  component: PatientDashboard,
});

const STATUS_ICON: Record<string, React.ReactNode> = {
  Pending: <Clock className="h-4 w-4 text-yellow-500" />,
  Confirmed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  Cancelled: <XCircle className="h-4 w-4 text-red-500" />,
};

function PatientDashboard() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [apptLoading, setApptLoading] = useState(true);

  useEffect(() => {
    if (!loading && !profile) navigate({ to: "/auth" });
    if (!loading && profile?.role === "doctor") navigate({ to: "/dashboard/doctor" });
  }, [loading, profile, navigate]);

  useEffect(() => {
    if (profile?.uid) {
      fetch(`${API_BASE_URL}/appointments?patientId=${profile.uid}`)
        .then((r) => r.json())
        .then(setAppointments)
        .catch(console.error)
        .finally(() => setApptLoading(false));
    }
  }, [profile]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    navigate({ to: "/" });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-secondary/30 py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl bg-card p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">
              {profile?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary">Patient Dashboard</div>
              <h1 className="text-xl font-bold">Welcome, {profile?.name}!</h1>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Stethoscope, label: "Find Doctors", sub: "Book an appointment", to: "/find-doctors", color: "from-blue-500 to-indigo-500" },
            { icon: Pill, label: "Order Medicines", sub: "Get medicines delivered", to: "/medicines", color: "from-emerald-500 to-teal-500" },
            { icon: FlaskConical, label: "Lab Tests", sub: "Home sample collection", to: "/lab-tests", color: "from-purple-500 to-pink-500" },
          ].map((item) => (
            <Link key={item.label} to={item.to} className="group rounded-2xl bg-card p-6 shadow-soft hover-lift flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white`}>
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-semibold">{item.label}</div>
                <div className="text-xs text-muted-foreground">{item.sub}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Appointments */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">My Appointments</h2>
          {apptLoading ? (
            <div className="rounded-2xl bg-card p-8 text-center text-muted-foreground shadow-soft">Loading...</div>
          ) : appointments.length === 0 ? (
            <div className="rounded-2xl border bg-card p-10 text-center shadow-soft">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">No appointments yet. Book your first appointment!</p>
              <Button asChild variant="hero" className="mt-4">
                <Link to="/find-doctors">Find a Doctor</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt.id} className="flex items-center justify-between rounded-2xl bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-primary-foreground">
                      <Stethoscope className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold">{appt.doctorName}</div>
                      <div className="text-sm text-muted-foreground">{appt.specialty} · {appt.date} at {appt.timeSlot}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {STATUS_ICON[appt.status]}
                    <span>{appt.status}</span>
                    <span className="ml-2 font-bold">₹{appt.fees}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
