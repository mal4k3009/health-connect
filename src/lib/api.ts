export const API_BASE_URL = "http://localhost:5275/api";

export async function fetchDoctors() {
  const response = await fetch(`${API_BASE_URL}/doctors`);
  if (!response.ok) throw new Error("Failed to fetch doctors");
  return response.json();
}

export async function fetchSpecialties() {
  const response = await fetch(`${API_BASE_URL}/specialties`);
  if (!response.ok) throw new Error("Failed to fetch specialties");
  return response.json();
}

export async function fetchMedicines() {
  const response = await fetch(`${API_BASE_URL}/medicines`);
  if (!response.ok) throw new Error("Failed to fetch medicines");
  return response.json();
}

export async function fetchLabTests() {
  const response = await fetch(`${API_BASE_URL}/labtests`);
  if (!response.ok) throw new Error("Failed to fetch lab tests");
  return response.json();
}

export async function fetchAppointments(params: { patientId?: string; doctorId?: string }) {
  const query = params.patientId
    ? `?patientId=${params.patientId}`
    : params.doctorId
    ? `?doctorId=${params.doctorId}`
    : "";
  const response = await fetch(`${API_BASE_URL}/appointments${query}`);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
}

export async function createAppointment(data: Record<string, unknown>) {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create appointment");
  return response.json();
}

export async function updateAppointmentStatus(id: string, status: string) {
  const response = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error("Failed to update appointment status");
  return response.json();
}
