using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentsController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string CollectionName = "appointments";

        public AppointmentsController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        // GET /api/appointments?patientId=xxx  OR  ?doctorId=xxx
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments(
            [FromQuery] string? patientId,
            [FromQuery] string? doctorId)
        {
            Query query = _firestoreDb.Collection(CollectionName);

            if (!string.IsNullOrEmpty(patientId))
                query = query.WhereEqualTo("PatientId", patientId);
            else if (!string.IsNullOrEmpty(doctorId))
                query = query.WhereEqualTo("DoctorId", doctorId);

            var snapshot = await query.GetSnapshotAsync();
            var appointments = new List<Appointment>();

            foreach (var doc in snapshot.Documents)
            {
                if (doc.Exists)
                {
                    var appt = doc.ConvertTo<Appointment>();
                    appt.Id = doc.Id;
                    appointments.Add(appt);
                }
            }

            return Ok(appointments);
        }

        // GET /api/appointments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(string id)
        {
            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();

            if (!snapshot.Exists) return NotFound();

            var appt = snapshot.ConvertTo<Appointment>();
            appt.Id = snapshot.Id;
            return Ok(appt);
        }

        // POST /api/appointments  — Book an appointment
        [HttpPost]
        public async Task<ActionResult<Appointment>> CreateAppointment(Appointment appointment)
        {
            appointment.Status = "Pending";
            appointment.CreatedAt = DateTime.UtcNow.ToString("o");

            var collection = _firestoreDb.Collection(CollectionName);
            var docRef = await collection.AddAsync(appointment);
            appointment.Id = docRef.Id;

            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
        }

        // PUT /api/appointments/{id}/status  — Confirm or Cancel
        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(string id, [FromBody] UpdateStatusRequest request)
        {
            var validStatuses = new[] { "Pending", "Confirmed", "Cancelled" };
            if (!validStatuses.Contains(request.Status))
                return BadRequest($"Status must be one of: {string.Join(", ", validStatuses)}");

            var docRef = _firestoreDb.Collection(CollectionName).Document(id);
            var snapshot = await docRef.GetSnapshotAsync();
            if (!snapshot.Exists) return NotFound();

            await docRef.UpdateAsync("Status", request.Status);
            return Ok(new { id, status = request.Status });
        }
    }

    public class UpdateStatusRequest
    {
        public string Status { get; set; } = string.Empty;
    }
}
