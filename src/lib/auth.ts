import { app } from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const auth = getAuth(app);
export const db = getFirestore(app);

export type UserRole = "patient" | "doctor";

export interface UserProfile {
  uid: string;
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
  role: UserRole
): Promise<UserProfile> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const profile: UserProfile = {
    uid: cred.user.uid,
    name,
    phone,
    email,
    role,
  };
  await setDoc(doc(db, "users", cred.user.uid), profile);
  return profile;
}

export async function signIn(
  email: string,
  password: string
): Promise<UserProfile> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const snap = await getDoc(doc(db, "users", cred.user.uid));
  if (!snap.exists()) throw new Error("User profile not found");
  return snap.data() as UserProfile;
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(auth);
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  return snap.data() as UserProfile;
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}
