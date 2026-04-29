using Google.Cloud.Firestore;

namespace Medibook.API.Models
{
    [FirestoreData]
    public class Doctor
    {
        [FirestoreDocumentId]
        public string Id { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Name { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Specialty { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Experience { get; set; } = string.Empty;

        [FirestoreProperty]
        public double Rating { get; set; }

        [FirestoreProperty]
        public int Reviews { get; set; }

        [FirestoreProperty]
        public double Fees { get; set; }

        [FirestoreProperty]
        public string Location { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Image { get; set; } = string.Empty;

        [FirestoreProperty]
        public string Gender { get; set; } = string.Empty;

        [FirestoreProperty]
        public bool Available { get; set; }
    }
}
