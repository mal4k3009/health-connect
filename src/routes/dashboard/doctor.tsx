import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Calendar, CheckCircle2, Clock, LogOut, Stethoscope, Users, XCircle, Plus, Trash2, FlaskConical, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type TabType = "appointments" | "labTests" | "appointmentSlots";

function DoctorDashboard() {
  const { profile, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("appointments");

  // Appointments state
  const [appointments, setAppointments] = useState<any[]>([]);
  const [apptLoading, setApptLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  // Lab Tests state
  const [labTests, setLabTests] = useState<any[]>([]);
  const [labTestLoading, setLabTestLoading] = useState(false);
  const [showLabTestForm, setShowLabTestForm] = useState(false);
  const [labTestForm, setLabTestForm] = useState({ name: "", price: "", time: "" });

  // Appointment Slots state
  const [appointmentSlots, setAppointmentSlots] = useState<any[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [showSlotForm, setShowSlotForm] = useState(false);
  const [slotForm, setSlotForm] = useState({ date: "", startTime: "", endTime: "", totalSlots: "", fees: "" });

  useEffect(() => {
    if (!loading && !profile) navigate({ to: "/auth" });
    if (!loading && profile?.role === "patient") navigate({ to: "/dashboard/patient" });
  }, [loading, profile, navigate]);

  // Load appointments
  useEffect(() => {
    if (profile?.id) {
      fetch(`${API_BASE_URL}/appointments?doctorId=${profile.id}`)
        .then((r) => r.json())
        .then(setAppointments)
        .catch(console.error)
        .finally(() => setApptLoading(false));
    }
  }, [profile]);

  // Load lab tests
  useEffect(() => {
    if (profile?.id && activeTab === "labTests") {
      loadLabTests();
    }
  }, [profile, activeTab]);

  // Load appointment slots
  useEffect(() => {
    if (profile?.id && activeTab === "appointmentSlots") {
      loadAppointmentSlots();
    }
  }, [profile, activeTab]);

  const loadLabTests = async () => {
    if (!profile?.id) return;
    setLabTestLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/labtests/doctor/${profile.id}`);
      const data = await res.json();
      setLabTests(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load lab tests");
    } finally {
      setLabTestLoading(false);
    }
  };

  const loadAppointmentSlots = async () => {
    if (!profile?.id) return;
    setSlotsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/appointmentslots/doctor/${profile.id}`);
      const data = await res.json();
      setAppointmentSlots(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load appointment slots");
    } finally {
      setSlotsLoading(false);
    }
  };

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

  const addLabTest = async () => {
    if (!labTestForm.name || !labTestForm.price || !labTestForm.time || !profile?.id) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/labtests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: profile.id,
          doctorName: profile.name,
          clinicName: "Your Clinic",
          name: labTestForm.name,
          price: parseFloat(labTestForm.price),
          time: labTestForm.time,
        }),
      });

      if (res.ok) {
        toast.success("Lab test added successfully");
        setLabTestForm({ name: "", price: "", time: "" });
        setShowLabTestForm(false);
        loadLabTests();
      } else {
        toast.error("Failed to add lab test");
      }
    } catch (err) {
      toast.error("Error adding lab test");
    }
  };

  const deleteLabTest = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/labtests/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Lab test deleted");
        loadLabTests();
      } else {
        toast.error("Failed to delete lab test");
      }
    } catch (err) {
      toast.error("Error deleting lab test");
    }
  };

  const addAppointmentSlot = async () => {
    if (!slotForm.date || !slotForm.startTime || !slotForm.endTime || !slotForm.totalSlots || !slotForm.fees || !profile?.id) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/appointmentslots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: profile.id,
          doctorName: profile.name,
          date: slotForm.date,
          startTime: slotForm.startTime,
          endTime: slotForm.endTime,
          totalSlots: parseInt(slotForm.totalSlots),
          consultationFees: parseFloat(slotForm.fees),
        }),
      });

      if (res.ok) {
        toast.success("Appointment slot added successfully");
        setSlotForm({ date: "", startTime: "", endTime: "", totalSlots: "", fees: "" });
        setShowSlotForm(false);
        loadAppointmentSlots();
      } else {
        toast.error("Failed to add appointment slot");
      }
    } catch (err) {
      toast.error("Error adding appointment slot");
    }
  };

  const deleteAppointmentSlot = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/appointmentslots/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Appointment slot deleted");
        loadAppointmentSlots();
      } else {
        toast.error("Failed to delete appointment slot");
      }
    } catch (err) {
      toast.error("Error deleting appointment slot");
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

        {/* Tabs */}
        <div className="mt-6 flex gap-2 border-b">
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-2 font-semibold border-b-2 transition-smooth ${
              activeTab === "appointments" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Calendar className="inline-block h-4 w-4 mr-2" /> Appointments
          </button>
          <button
            onClick={() => setActiveTab("labTests")}
            className={`px-4 py-2 font-semibold border-b-2 transition-smooth ${
              activeTab === "labTests" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <FlaskConical className="inline-block h-4 w-4 mr-2" /> Lab Tests
          </button>
          <button
            onClick={() => setActiveTab("appointmentSlots")}
            className={`px-4 py-2 font-semibold border-b-2 transition-smooth ${
              activeTab === "appointmentSlots" ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clock className="inline-block h-4 w-4 mr-2" /> Appointment Slots
          </button>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <>
              {/* Stats */}
              <div className="grid gap-4 sm:grid-cols-3 mb-6">
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
            </>
          )}

          {/* Lab Tests Tab */}
          {activeTab === "labTests" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Your Lab Tests</h2>
                <Button onClick={() => setShowLabTestForm(!showLabTestForm)} className="gap-2">
                  <Plus className="h-4 w-4" /> Add Lab Test
                </Button>
              </div>

              {showLabTestForm && (
                <div className="rounded-2xl bg-card p-6 shadow-soft mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Add New Lab Test</h3>
                    <button onClick={() => setShowLabTestForm(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid gap-4">
                    <Input
                      placeholder="Test Name (e.g., Blood Test)"
                      value={labTestForm.name}
                      onChange={(e) => setLabTestForm({ ...labTestForm, name: e.target.value })}
                    />
                    <Input
                      placeholder="Price (₹)"
                      type="number"
                      value={labTestForm.price}
                      onChange={(e) => setLabTestForm({ ...labTestForm, price: e.target.value })}
                    />
                    <Input
                      placeholder="Time Required (e.g., 30 mins)"
                      value={labTestForm.time}
                      onChange={(e) => setLabTestForm({ ...labTestForm, time: e.target.value })}
                    />
                    <Button onClick={addLabTest} className="gap-2">
                      <Save className="h-4 w-4" /> Save Lab Test
                    </Button>
                  </div>
                </div>
              )}

              {labTestLoading ? (
                <div className="rounded-2xl bg-card p-8 text-center text-muted-foreground shadow-soft">Loading...</div>
              ) : labTests.length === 0 ? (
                <div className="rounded-2xl border bg-card p-10 text-center shadow-soft">
                  <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-3 text-muted-foreground">No lab tests added yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {labTests.map((test) => (
                    <div key={test.id} className="rounded-2xl bg-card p-5 shadow-soft">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold">{test.name}</div>
                          <div className="text-sm text-muted-foreground">₹{test.price} • {test.time}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteLabTest(test.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Appointment Slots Tab */}
          {activeTab === "appointmentSlots" && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Appointment Slots</h2>
                <Button onClick={() => setShowSlotForm(!showSlotForm)} className="gap-2">
                  <Plus className="h-4 w-4" /> Add Slot
                </Button>
              </div>

              {showSlotForm && (
                <div className="rounded-2xl bg-card p-6 shadow-soft mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Add New Appointment Slot</h3>
                    <button onClick={() => setShowSlotForm(false)}>
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      placeholder="Date (YYYY-MM-DD)"
                      type="date"
                      value={slotForm.date}
                      onChange={(e) => setSlotForm({ ...slotForm, date: e.target.value })}
                    />
                    <Input
                      placeholder="Start Time (HH:mm)"
                      type="time"
                      value={slotForm.startTime}
                      onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                    />
                    <Input
                      placeholder="End Time (HH:mm)"
                      type="time"
                      value={slotForm.endTime}
                      onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                    />
                    <Input
                      placeholder="Total Slots Available"
                      type="number"
                      value={slotForm.totalSlots}
                      onChange={(e) => setSlotForm({ ...slotForm, totalSlots: e.target.value })}
                    />
                    <Input
                      placeholder="Consultation Fees (₹)"
                      type="number"
                      value={slotForm.fees}
                      onChange={(e) => setSlotForm({ ...slotForm, fees: e.target.value })}
                      className="sm:col-span-2"
                    />
                    <Button onClick={addAppointmentSlot} className="gap-2 sm:col-span-2">
                      <Save className="h-4 w-4" /> Save Slot
                    </Button>
                  </div>
                </div>
              )}

              {slotsLoading ? (
                <div className="rounded-2xl bg-card p-8 text-center text-muted-foreground shadow-soft">Loading...</div>
              ) : appointmentSlots.length === 0 ? (
                <div className="rounded-2xl border bg-card p-10 text-center shadow-soft">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-3 text-muted-foreground">No appointment slots created yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {appointmentSlots.map((slot) => (
                    <div key={slot.id} className="rounded-2xl bg-card p-5 shadow-soft">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="font-semibold">{slot.date} • {slot.startTime} - {slot.endTime}</div>
                          <div className="text-sm text-muted-foreground">
                            Available: {slot.availableSlots}/{slot.totalSlots} • Fees: ₹{slot.consultationFees}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => deleteAppointmentSlot(slot.id)}
                          className="gap-2"
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
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
