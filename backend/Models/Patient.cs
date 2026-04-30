using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class Patient
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string UserId { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Email { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Phone { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Age { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Gender { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Address { get; set; } = string.Empty;

        [FirestoreProperty]
        public string CreatedAt { get; set; } = System.DateTime.UtcNow.ToString("o");
    }
}
