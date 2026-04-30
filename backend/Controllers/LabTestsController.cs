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

        [HttpGet("doctor/{doctorId}")]
        public async Task<ActionResult<IEnumerable<LabTest>>> GetLabTestsByDoctor(string doctorId)
        {
            var query = _firestoreDb.Collection(CollectionName).WhereEqualTo("DoctorId", doctorId);
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
        public async Task<ActionResult<LabTest>> CreateLabTest([FromBody] LabTest labTest)
        {
            if (string.IsNullOrEmpty(labTest.DoctorId))
            {
                return BadRequest("DoctorId is required");
            }

            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(labTest);
            labTest.Id = docRef.Id;

            return CreatedAtAction(nameof(GetLabTest), new { id = labTest.Id }, labTest);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateLabTest(string id, [FromBody] LabTest labTest)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            await docRef.SetAsync(labTest);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabTest(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            await docRef.DeleteAsync();
            return NoContent();
        }
    }
}
