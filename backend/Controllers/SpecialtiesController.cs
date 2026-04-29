using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialtiesController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string CollectionName = "specialties";

        public SpecialtiesController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specialty>>> GetSpecialties()
        {
            var query = _firestoreDb.Collection(CollectionName);
            var snapshot = await query.GetSnapshotAsync();

            var specialties = new List<Specialty>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var specialty = document.ConvertTo<Specialty>();
                    specialty.Id = document.Id;
                    specialties.Add(specialty);
                }
            }

            return Ok(specialties);
        }
        
        [HttpPost]
        public async Task<ActionResult<Specialty>> CreateSpecialty(Specialty specialty)
        {
            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(specialty);
            specialty.Id = docRef.Id;

            return Ok(specialty);
        }
    }
}
