using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class Medicine
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Category { get; set; } = string.Empty;

        [FirestoreProperty]
        public double Price { get; set; }

        [FirestoreProperty]
        public string Image { get; set; } = string.Empty;
    }
}
