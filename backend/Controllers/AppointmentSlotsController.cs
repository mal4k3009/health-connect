using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentSlotsController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string CollectionName = "appointmentSlots";

        public AppointmentSlotsController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppointmentSlot>>> GetAppointmentSlots()
        {
            var query = _firestoreDb.Collection(CollectionName);
            var snapshot = await query.GetSnapshotAsync();

            var slots = new List<AppointmentSlot>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var slot = document.ConvertTo<AppointmentSlot>();
                    slot.Id = document.Id;
                    slots.Add(slot);
                }
            }

            return Ok(slots);
        }

        [HttpGet("doctor/{doctorId}")]
        public async Task<ActionResult<IEnumerable<AppointmentSlot>>> GetAppointmentSlotsByDoctor(string doctorId)
        {
            var query = _firestoreDb.Collection(CollectionName).WhereEqualTo("DoctorId", doctorId);
            var snapshot = await query.GetSnapshotAsync();

            var slots = new List<AppointmentSlot>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var slot = document.ConvertTo<AppointmentSlot>();
                    slot.Id = document.Id;
                    slots.Add(slot);
                }
            }

            return Ok(slots);
        }

        [HttpGet("doctor/{doctorId}/date/{date}")]
        public async Task<ActionResult<IEnumerable<AppointmentSlot>>> GetAppointmentSlotsByDoctorAndDate(string doctorId, string date)
        {
            var query = _firestoreDb.Collection(CollectionName)
                .WhereEqualTo("DoctorId", doctorId)
                .WhereEqualTo("Date", date);
            var snapshot = await query.GetSnapshotAsync();

            var slots = new List<AppointmentSlot>();
            foreach (var document in snapshot.Documents)
            {
                if (document.Exists)
                {
                    var slot = document.ConvertTo<AppointmentSlot>();
                    slot.Id = document.Id;
                    slots.Add(slot);
                }
            }

            return Ok(slots);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentSlot>> GetAppointmentSlot(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (snapshot.Exists)
            {
                var slot = snapshot.ConvertTo<AppointmentSlot>();
                slot.Id = snapshot.Id;
                return Ok(slot);
            }

            return NotFound();
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentSlot>> CreateAppointmentSlot([FromBody] AppointmentSlot slot)
        {
            if (string.IsNullOrEmpty(slot.DoctorId))
            {
                return BadRequest("DoctorId is required");
            }

            slot.AvailableSlots = slot.TotalSlots; // Initialize available slots to total
            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(slot);
            slot.Id = docRef.Id;

            return CreatedAtAction(nameof(GetAppointmentSlot), new { id = slot.Id }, slot);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAppointmentSlot(string id, [FromBody] AppointmentSlot slot)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            await docRef.SetAsync(slot);
            return NoContent();
        }

        [HttpPut("{id}/decrease-availability")]
        public async Task<IActionResult> DecreaseAvailability(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists)
            {
                return NotFound();
            }

            var slot = snapshot.ConvertTo<AppointmentSlot>();
            if (slot.AvailableSlots > 0)
            {
                slot.AvailableSlots--;
                await docRef.SetAsync(slot);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointmentSlot(string id)
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
