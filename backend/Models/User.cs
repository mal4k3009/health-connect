using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class User
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Email { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Password { get; set; } = string.Empty; // Ideally hashed, but keeping it simple as per instructions

        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Phone { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Role { get; set; } = "patient"; // patient or doctor
    }
}
