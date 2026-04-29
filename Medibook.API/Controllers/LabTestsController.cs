using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LabTestsController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string CollectionName = "labTests";

        public LabTestsController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LabTest>>> GetLabTests()
        {
            var query = _firestoreDb.Collection(CollectionName);
            var snapshot = await query.GetSnapshotAsync();

            var labTests = new List<LabTest>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var labTest = document.ConvertTo<LabTest>();
                    labTest.Id = document.Id;
                    labTests.Add(labTest);
                }
            }

            return Ok(labTests);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LabTest>> GetLabTest(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (snapshot.Exists)
            {
                var labTest = snapshot.ConvertTo<LabTest>();
                labTest.Id = snapshot.Id;
                return Ok(labTest);
            }

            return NotFound();
        }
        
        [HttpPost]
        public async Task<ActionResult<LabTest>> CreateLabTest(LabTest labTest)
        {
            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(labTest);
            labTest.Id = docRef.Id;

            return Ok(labTest);
        }
    }
}
