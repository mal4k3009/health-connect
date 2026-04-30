import { API_BASE_URL } from "./api";

export type UserRole = "patient" | "doctor";

export interface UserProfile {
  id: string; // The backend uses Id
  name: string;
  phone: string;
  email: string;
  role: UserRole;
}

export async function signUp(
  email: string,
  password: string,
  name: string,
  phone: string,
  role: UserRole,
  clinicName?: string,
  specialty?: string
): Promise<UserProfile> {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, phone, role, clinicName, specialty }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Signup failed");
  }

  const profile: UserProfile = await res.json();
  localStorage.setItem("medibook_user", JSON.stringify(profile));
  return profile;
}

export async function signIn(
  email: string,
  password: string
): Promise<UserProfile> {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Invalid email or password");
  }

  const profile: UserProfile = await res.json();
  localStorage.setItem("medibook_user", JSON.stringify(profile));
  return profile;
}

export async function signOut(): Promise<void> {
  localStorage.removeItem("medibook_user");
}

export function getCurrentUser(): UserProfile | null {
  const userJson = localStorage.getItem("medibook_user");
  if (userJson) {
    try {
      return JSON.parse(userJson) as UserProfile;
    } catch (e) {
      return null;
    }
  }
  return null;
}

