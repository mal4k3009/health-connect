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
        private const string CollectionName = "users";

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
        }

        [HttpPost("signup")]
        public async Task<ActionResult<User>> Signup([FromBody] SignupRequest request)
        {
            var collection = _firestoreDb.Collection(CollectionName);
            
            // Check if email already exists
            var query = collection.WhereEqualTo("Email", request.Email);
            var snapshot = await query.GetSnapshotAsync();
            if (snapshot.Documents.Count > 0)
            {
                return BadRequest("Email is already registered");
            }

            var newUser = new User
            {
                Email = request.Email,
                Password = request.Password, // Unhashed for simplicity per context
                Name = request.Name,
                Phone = request.Phone,
                Role = request.Role
            };

            var docRef = await collection.AddAsync(newUser);
            newUser.Id = docRef.Id;

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
            var collection = _firestoreDb.Collection(CollectionName);
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
