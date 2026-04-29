using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string CollectionName = "medicines";

        public MedicinesController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Medicine>>> GetMedicines()
        {
            var query = _firestoreDb.Collection(CollectionName);
            var snapshot = await query.GetSnapshotAsync();

            var medicines = new List<Medicine>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var medicine = document.ConvertTo<Medicine>();
                    medicine.Id = document.Id;
                    medicines.Add(medicine);
                }
            }

            return Ok(medicines);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Medicine>> GetMedicine(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (snapshot.Exists)
            {
                var medicine = snapshot.ConvertTo<Medicine>();
                medicine.Id = snapshot.Id;
                return Ok(medicine);
            }

            return NotFound();
        }
        
        [HttpPost]
        public async Task<ActionResult<Medicine>> CreateMedicine(Medicine medicine)
        {
            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(medicine);
            medicine.Id = docRef.Id;

            return Ok(medicine);
        }
    }
}
