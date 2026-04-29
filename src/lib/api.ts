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
