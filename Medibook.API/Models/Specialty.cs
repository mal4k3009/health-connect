using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class Specialty
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Icon { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Color { get; set; } = string.Empty;
    }
}
