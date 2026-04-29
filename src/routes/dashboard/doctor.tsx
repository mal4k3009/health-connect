import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Clock, LogOut, Stethoscope, Users, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";

export const Route = createFileRoute("/dashboard/doctor")({
  head: () => ({
    meta: [{ title: "Doctor Dashboard — MediBook" }],
  }),
  component: DoctorDashboard,
});

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  Confirmed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

function DoctorDashboard() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [apptLoading, setApptLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !profile) navigate({ to: "/auth" });
    if (!loading && profile?.role === "patient") navigate({ to: "/dashboard/patient" });
  }, [loading, profile, navigate]);

  useEffect(() => {
    if (profile?.id) {
      fetch(`${API_BASE_URL}/appointments?doctorId=${profile.id}`)
        .then((r) => r.json())
        .then(setAppointments)
        .catch(console.error)
        .finally(() => setApptLoading(false));
    }
  }, [profile]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
      toast.success(`Appointment ${status.toLowerCase()}`);
    } catch {
      toast.error("Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

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

  const confirmed = appointments.filter((a) => a.status === "Confirmed").length;
  const pending = appointments.filter((a) => a.status === "Pending").length;

  return (
    <section className="min-h-screen bg-secondary/30 py-10">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl bg-card p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary text-2xl font-bold text-primary-foreground">
              <Stethoscope className="h-7 w-7" />
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-wider text-primary">Doctor Dashboard</div>
              <h1 className="text-xl font-bold">Dr. {profile?.name}</h1>
              <p className="text-sm text-muted-foreground">{profile?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Users, label: "Total Appointments", value: appointments.length, color: "from-blue-500 to-indigo-500" },
            { icon: CheckCircle2, label: "Confirmed", value: confirmed, color: "from-emerald-500 to-teal-500" },
            { icon: Clock, label: "Pending", value: pending, color: "from-yellow-500 to-orange-500" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-card p-6 shadow-soft flex items-center gap-4">
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Appointments */}
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold">Appointment Requests</h2>
          {apptLoading ? (
            <div className="rounded-2xl bg-card p-8 text-center text-muted-foreground shadow-soft">Loading...</div>
          ) : appointments.length === 0 ? (
            <div className="rounded-2xl border bg-card p-10 text-center shadow-soft">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-3 text-muted-foreground">No appointments yet. Your schedule is clear!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments.map((appt) => (
                <div key={appt.id} className="rounded-2xl bg-card p-5 shadow-soft">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-semibold">{appt.patientName}</div>
                      <div className="text-sm text-muted-foreground">{appt.date} at {appt.timeSlot}</div>
                      {appt.notes && <div className="mt-1 text-xs text-muted-foreground italic">"{appt.notes}"</div>}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${STATUS_COLORS[appt.status]}`}>
                        {appt.status}
                      </span>
                      <span className="font-bold text-sm">₹{appt.fees}</span>
                    </div>
                  </div>
                  {appt.status === "Pending" && (
                    <div className="mt-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="hero"
                        disabled={updating === appt.id}
                        onClick={() => updateStatus(appt.id, "Confirmed")}
                      >
                        <CheckCircle2 className="h-4 w-4" /> Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={updating === appt.id}
                        onClick={() => updateStatus(appt.id, "Cancelled")}
                      >
                        <XCircle className="h-4 w-4" /> Cancel
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
