using Google.Cloud.Firestore;
using Medibook.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Medibook.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly FirestoreDb _firestoreDb;
        private const string UsersCollection = "users";
        private const string DoctorsCollection = "doctors";
        private const string PatientsCollection = "patients";

        public AuthController(FirestoreDb firestoreDb)
        {
            _firestoreDb = firestoreDb;
        }

        public class SignupRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string Name { get; set; } = string.Empty;
            public string Phone { get; set; } = string.Empty;
            public string Role { get; set; } = "patient";
            public string? ClinicName { get; set; }
            public string? Specialty { get; set; }
        }

        [HttpPost("signup")]
        public async Task<ActionResult<User>> Signup([FromBody] SignupRequest request)
        {
            var usersCollection = _firestoreDb.Collection(UsersCollection);
            
            // Check if email already exists
            var query = usersCollection.WhereEqualTo("Email", request.Email);
            var snapshot = await query.GetSnapshotAsync();
            if (snapshot.Documents.Count > 0)
            {
                return BadRequest("Email is already registered");
            }

            var newUser = new User
            {
                Email = request.Email,
                Password = request.Password,
                Name = request.Name,
                Phone = request.Phone,
                Role = request.Role
            };

            var userDocRef = await usersCollection.AddAsync(newUser);
            newUser.Id = userDocRef.Id;

            // Create doctor or patient record based on role
            if (request.Role == "doctor")
            {
                var newDoctor = new Doctor
                {
                    UserId = newUser.Id,
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone,
                    ClinicName = request.ClinicName ?? string.Empty,
                    Specialty = request.Specialty ?? string.Empty,
                    Available = true
                };
                
                var doctorsCollection = _firestoreDb.Collection(DoctorsCollection);
                await doctorsCollection.AddAsync(newDoctor);
            }
            else if (request.Role == "patient")
            {
                var newPatient = new Patient
                {
                    UserId = newUser.Id,
                    Name = request.Name,
                    Email = request.Email,
                    Phone = request.Phone
                };
                
                var patientsCollection = _firestoreDb.Collection(PatientsCollection);
                await patientsCollection.AddAsync(newPatient);
            }

            return Ok(newUser);
        }

        public class LoginRequest
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] LoginRequest request)
        {
            var collection = _firestoreDb.Collection(UsersCollection);
            var query = collection.WhereEqualTo("Email", request.Email).WhereEqualTo("Password", request.Password);
            var snapshot = await query.GetSnapshotAsync();

            if (snapshot.Documents.Count == 0)
            {
                return Unauthorized("Invalid email or password");
            }

            var doc = snapshot.Documents[0];
            var user = doc.ConvertTo<User>();
            user.Id = doc.Id;

            return Ok(user);
        }
    }
}
