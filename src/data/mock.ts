import doc1 from "@/assets/doctor-1.jpg";
import doc2 from "@/assets/doctor-2.jpg";
import doc3 from "@/assets/doctor-3.jpg";
import doc4 from "@/assets/doctor-4.jpg";

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  fees: number;
  location: string;
  image: string;
  gender: "Male" | "Female";
  available: boolean;
};

export const doctors: Doctor[] = [
  { id: "1", name: "Dr. Sarah Mitchell", specialty: "Cardiologist", experience: "12 yrs", rating: 4.9, reviews: 320, fees: 80, location: "New York", image: doc1, gender: "Female", available: true },
  { id: "2", name: "Dr. James Carter", specialty: "Dentist", experience: "9 yrs", rating: 4.8, reviews: 215, fees: 50, location: "Boston", image: doc2, gender: "Male", available: true },
  { id: "3", name: "Dr. Mei Lin", specialty: "Skin Specialist", experience: "8 yrs", rating: 4.7, reviews: 180, fees: 60, location: "San Francisco", image: doc3, gender: "Female", available: false },
  { id: "4", name: "Dr. Robert Hayes", specialty: "Orthopedic", experience: "15 yrs", rating: 4.9, reviews: 412, fees: 100, location: "Chicago", image: doc4, gender: "Male", available: true },
  { id: "5", name: "Dr. Emily Brown", specialty: "Child Specialist", experience: "10 yrs", rating: 4.8, reviews: 298, fees: 70, location: "Seattle", image: doc1, gender: "Female", available: true },
  { id: "6", name: "Dr. Ahmed Khan", specialty: "Eye Specialist", experience: "11 yrs", rating: 4.7, reviews: 250, fees: 75, location: "Houston", image: doc2, gender: "Male", available: true },
];

export const specialties = [
  { name: "Dentist", icon: "🦷", color: "from-blue-100 to-blue-50" },
  { name: "Cardiologist", icon: "❤️", color: "from-red-100 to-red-50" },
  { name: "Skin Specialist", icon: "✨", color: "from-pink-100 to-pink-50" },
  { name: "Child Specialist", icon: "👶", color: "from-yellow-100 to-yellow-50" },
  { name: "Eye Specialist", icon: "👁️", color: "from-indigo-100 to-indigo-50" },
  { name: "Orthopedic", icon: "🦴", color: "from-emerald-100 to-emerald-50" },
];

export const medicines = [
  { id: "m1", name: "Paracetamol 500mg", category: "Fever", price: 5.99, image: "💊" },
  { id: "m2", name: "Vitamin D3 60K", category: "Vitamins", price: 12.5, image: "🟡" },
  { id: "m3", name: "Cetirizine 10mg", category: "Cold", price: 4.5, image: "💊" },
  { id: "m4", name: "Metformin 500mg", category: "Diabetes", price: 9.0, image: "💊" },
  { id: "m5", name: "Amlodipine 5mg", category: "BP", price: 7.25, image: "💊" },
  { id: "m6", name: "Multivitamin Plus", category: "Vitamins", price: 14.99, image: "🟢" },
  { id: "m7", name: "Cough Syrup 100ml", category: "Cold", price: 8.0, image: "🧴" },
  { id: "m8", name: "Insulin Pen", category: "Diabetes", price: 32.0, image: "💉" },
];

export const labTests = [
  { id: "t1", name: "Complete Blood Test", price: 25, time: "6 hrs" },
  { id: "t2", name: "Thyroid Profile", price: 35, time: "12 hrs" },
  { id: "t3", name: "Full Body Checkup", price: 99, time: "24 hrs" },
  { id: "t4", name: "Sugar (Fasting)", price: 12, time: "4 hrs" },
  { id: "t5", name: "Urine Routine", price: 10, time: "6 hrs" },
  { id: "t6", name: "COVID-19 RT-PCR", price: 45, time: "8 hrs" },
];
