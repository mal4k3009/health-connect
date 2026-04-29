using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string CollectionName = "doctors";

        public DoctorsController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            var query = _firestoreDb.Collection(CollectionName);
            var snapshot = await query.GetSnapshotAsync();

            var doctors = new List<Doctor>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var doctor = document.ConvertTo<Doctor>();
                    doctor.Id = document.Id;
                    doctors.Add(doctor);
                }
            }

            return Ok(doctors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (snapshot.Exists)
            {
                var doctor = snapshot.ConvertTo<Doctor>();
                doctor.Id = snapshot.Id;
                return Ok(doctor);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<Doctor>> CreateDoctor(Doctor doctor)
        {
            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(doctor);
            doctor.Id = docRef.Id;

            return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
        }
    }
}
