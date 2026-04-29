using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class LabTest
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty]
        public double Price { get; set; }

        [FirestoreProperty]
        public string Time { get; set; } = string.Empty;
    }
}
