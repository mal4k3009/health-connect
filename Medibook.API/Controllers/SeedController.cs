using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;

        public SeedController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpPost]
        public async Task<IActionResult> SeedDatabase()
        {
            // Seed Specialties
            var specialties = new List<Specialty>
            {
                new Specialty { Name = "Dentist", Icon = "🦷", Color = "from-blue-100 to-blue-50" },
                new Specialty { Name = "Cardiologist", Icon = "❤️", Color = "from-red-100 to-red-50" },
                new Specialty { Name = "Skin Specialist", Icon = "✨", Color = "from-pink-100 to-pink-50" },
                new Specialty { Name = "Child Specialist", Icon = "👶", Color = "from-yellow-100 to-yellow-50" },
                new Specialty { Name = "Eye Specialist", Icon = "👁️", Color = "from-indigo-100 to-indigo-50" },
                new Specialty { Name = "Orthopedic", Icon = "🦴", Color = "from-emerald-100 to-emerald-50" }
            };

            foreach (var specialty in specialties)
            {
                await _firestoreDb.Collection("specialties").AddAsync(specialty);
            }

            // Seed Doctors
            var doctors = new List<Doctor>
            {
                new Doctor { Name = "Dr. Priya Sharma", Specialty = "Cardiologist", Experience = "12 yrs", Rating = 4.9, Reviews = 320, Fees = 800, Location = "Mumbai", Image = "/src/assets/doctor-1.jpg", Gender = "Female", Available = true },
                new Doctor { Name = "Dr. Rahul Desai", Specialty = "Dentist", Experience = "9 yrs", Rating = 4.8, Reviews = 215, Fees = 500, Location = "Pune", Image = "/src/assets/doctor-2.jpg", Gender = "Male", Available = true },
                new Doctor { Name = "Dr. Anjali Verma", Specialty = "Skin Specialist", Experience = "8 yrs", Rating = 4.7, Reviews = 180, Fees = 600, Location = "Bengaluru", Image = "/src/assets/doctor-3.jpg", Gender = "Female", Available = false },
                new Doctor { Name = "Dr. Vikram Singh", Specialty = "Orthopedic", Experience = "15 yrs", Rating = 4.9, Reviews = 412, Fees = 1000, Location = "Delhi", Image = "/src/assets/doctor-4.jpg", Gender = "Male", Available = true },
                new Doctor { Name = "Dr. Neha Kapoor", Specialty = "Child Specialist", Experience = "10 yrs", Rating = 4.8, Reviews = 298, Fees = 700, Location = "Chennai", Image = "/src/assets/doctor-1.jpg", Gender = "Female", Available = true },
                new Doctor { Name = "Dr. Suresh Iyer", Specialty = "Eye Specialist", Experience = "11 yrs", Rating = 4.7, Reviews = 250, Fees = 750, Location = "Hyderabad", Image = "/src/assets/doctor-2.jpg", Gender = "Male", Available = true }
            };

            foreach (var doctor in doctors)
            {
                await _firestoreDb.Collection("doctors").AddAsync(doctor);
            }

            // Seed Medicines
            var medicines = new List<Medicine>
            {
                new Medicine { Name = "Paracetamol 500mg", Category = "Fever", Price = 50, Image = "💊" },
                new Medicine { Name = "Vitamin D3 60K", Category = "Vitamins", Price = 120, Image = "🟡" },
                new Medicine { Name = "Cetirizine 10mg", Category = "Cold", Price = 40, Image = "💊" },
                new Medicine { Name = "Metformin 500mg", Category = "Diabetes", Price = 90, Image = "💊" },
                new Medicine { Name = "Amlodipine 5mg", Category = "BP", Price = 70, Image = "💊" },
                new Medicine { Name = "Multivitamin Plus", Category = "Vitamins", Price = 150, Image = "🟢" },
                new Medicine { Name = "Cough Syrup 100ml", Category = "Cold", Price = 80, Image = "🧴" },
                new Medicine { Name = "Insulin Pen", Category = "Diabetes", Price = 320, Image = "💉" }
            };

            foreach (var medicine in medicines)
            {
                await _firestoreDb.Collection("medicines").AddAsync(medicine);
            }

            // Seed Lab Tests
            var labTests = new List<LabTest>
            {
                new LabTest { Name = "Complete Blood Test", Price = 250, Time = "6 hrs" },
                new LabTest { Name = "Thyroid Profile", Price = 350, Time = "12 hrs" },
                new LabTest { Name = "Full Body Checkup", Price = 990, Time = "24 hrs" },
                new LabTest { Name = "Sugar (Fasting)", Price = 120, Time = "4 hrs" },
                new LabTest { Name = "Urine Routine", Price = 100, Time = "6 hrs" },
                new LabTest { Name = "COVID-19 RT-PCR", Price = 450, Time = "8 hrs" }
            };

            foreach (var labTest in labTests)
            {
                await _firestoreDb.Collection("labTests").AddAsync(labTest);
            }

            return Ok("Database seeded successfully.");
        }
    }
}
